import { UserModel } from "./UserModel"
import { Panier } from "./panier"

export class Commande {
  id !:number
  code !:string
  adresse_livraison !:string
  panier !:Panier
  user !:UserModel
}
