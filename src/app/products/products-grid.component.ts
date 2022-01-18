import { Component, Input } from "@angular/core";
import { IProducts } from "./products.service";

@Component({
  selector: "products-table",
  templateUrl: "products-grid.component.html",
  styleUrls: [],
  providers: []
})
export class ProductsGridComponent {
  @Input() products: IProducts[];

}
