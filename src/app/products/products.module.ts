import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProductsGridComponent } from "./products-grid.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductsGridComponent
  ],
  exports: [
    ProductsGridComponent
  ],
  providers: [
  ]
})

export class ProductsModule { }
