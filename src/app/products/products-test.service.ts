import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable()
export class ProductsService {

  public getProducts() {
    return of([
      {
        id: "AC7655_580",
        name: "adidas Men Outdoor Terrex Agravic Xt Gore-Tex Trail Running Shoes",
        price: "89.9",
        description: "Stay dry and energised in these trail running shoes.",
        brand: "adidas",
        quantity: 4
      },
      {
        id: "AC8285_560",
        name: "adidas Women Noble Indigo Response Bounce Shoes",
        price: "32.9",
        description: "A wildly popular streetwear style since the '60s",
        brand: "adidas",
        quantity: 0
      },
      {
        id: "AC8285_560",
        name: "adidas Women Grey Four Crazy 8 Adv Shoes",
        price: "80",
        description: "Instantly famous for its bold, wavy midsole design.",
        brand: "adidas",
        quantity: 10
      },
      {
        id: "4549604902274",
        name: "asics men's lethal speed rs st football shoe",
        price: "60",
        description: "Entry level boot that offers good all round performance and value",
        brand: "ASICS",
        quantity: 8
      },
      {
        id: "4549605626445",
        name: "asics unisex gel-kayano trainer evo",
        price: "100",
        description: "Based off our industrial-inspired cage exoskeleton design GEL-Kayano Trainer",
        brand: "ASICS",
        quantity: 0
      },
      {
        id: "4549605633573",
        name: "asics unisex gel-lyte runner",
        price: "50.95",
        description: "lyte evolves to pursue a simplistic sporty look. It features a sleek mono-sock upper with integrated tongue for easy on and off access,",
        brand: "ASICS",
        quantity: 3
      },
      {
        id: "nr_10005851",
        name: "nike air max 97",
        price: "32.9",
        description: "The Nike Air Max 97 Men's Shoe remasters the original design with a mesh",
        brand: "nike",
        quantity: 2
      }
    ])
  }
}
