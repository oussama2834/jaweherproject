import { LignePanier } from "./LignePanier";
import { UserModel } from "./UserModel";

export class Panier {
  id !: number;
  total !: number;
  lignepaniers !: LignePanier[];
  user !: UserModel;
}
