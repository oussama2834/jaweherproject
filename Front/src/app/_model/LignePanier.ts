import { Product } from "./Product";
import { UserModel } from "./UserModel";
import { Panier } from "./panier";

export class LignePanier{
  id !:number
  produit !:Product
  quantite !:number
  total !: number
  panier !: Panier;
}
