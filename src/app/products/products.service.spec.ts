import { ProductsService } from "./products.service";

describe("ProductsService", () => {

  describe("getWithLatestQuantity", () => {
    it("should return product with a quantity of 8 only.", () => {
      const productService = new ProductsService();

      productService.getWithLatestQuantity()
        .subscribe(products => {
          expect(products.quantity).toEqual(8);
        })
    });
  })
})
