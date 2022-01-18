import { MemorizeModel } from './models/memorize';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { combineLatest, Observable, of, Subject, throwError } from "rxjs";
import { IProducts, ProductsService } from "./products/products.service";
import { catchError, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

const productsFilter = (filter: ISearch) => {
  return (product: IProducts): boolean => {
    return ((

      (product.brand.toLowerCase().indexOf(filter.select.toLowerCase()) !== -1 || 'all' === filter.select.toLowerCase()) &&
      (filter.radio === 'all' ? true : filter.radio === 'in-stock' ? product.quantity > 0 : product.quantity === 0)
    )
    )
  };
};

const productsInputFilter = (filter: string) => {
  return (product: IProducts): boolean => {
    return ((product.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
      (product.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1)) || product.brand.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

  };
};

export interface ISearch { input: string; select: string; radio: string }

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ProductsService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "ir-dev-test";
  products: IProducts[] = [];
  brands = [];
  products$: Observable<IProducts[]>;
  filter: ISearch = {
    input: '',
    radio: 'all',
    select: 'all'
  };
  searchInput$: Subject<string> = new Subject();
  searchBrand$: Subject<string> = new Subject();
  searchStock$: Subject<string> = new Subject();
  cache: MemorizeModel<Observable<IProducts[]>>;
  destroy$: Subject<boolean> = new Subject();

  constructor(private productsService: ProductsService) { }
  ngOnInit(): void {
    this.products$ = this.productsService.getProducts().pipe(
      tap(products => {
        this.brands = [...products.map(({ brand }) => brand).reduce((prev, cur) => {
          if (prev.indexOf(cur) < 0) { prev.push(cur); }
          return prev;
        }, [])];
        this.cache = new MemorizeModel(of(products));
        this.products = products;
      }),
      catchError(() => of([]))
    );

    combineLatest([
      this.searchInput(),
      this.searchStock(),
      this.searchBrand()
    ]).pipe(
      map(([products]) => products.filter(productsFilter(this.filter))),
      takeUntil(this.destroy$)
    ).subscribe(
      (list: IProducts[]) => {
        this.products = list;
      },
      err => throwError(err)
    );

  }

  searchInput(): Observable<IProducts[]> {
    return this.searchInput$.pipe(
      startWith(this.filter.input),
      debounceTime(400),
      distinctUntilChanged(),
      filter((search: string) => search.length >= 3 || search.length === 0),
      switchMap((input: string) => {
        this.filter.input = input;
        if (this.cache.getMemory(input) !== null) {
          return this.cache.getMemory(input);
        }
        return this.productsService.getProducts();
      }),
      map((products: IProducts[]) => products.filter(productsInputFilter(this.filter.input))),
      tap((products: IProducts[]) => this.cache.setMemory(this.filter.input, of(products)))
    )
  }

  searchStock(): Observable<string> {
    return this.searchStock$.pipe(startWith(this.filter.radio), tap(value => this.filter.radio = value));
  }

  searchBrand(): Observable<string> {
    return this.searchBrand$.pipe(startWith(this.filter.select), tap(value => this.filter.select = value));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

  }

}
