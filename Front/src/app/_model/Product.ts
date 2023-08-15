import { Category } from "./Category"
import { Photo } from "./Photo"

export class Product
{
  id !:number
  nom !:string
  prix !:number
  quantite !:number
  garantit !:string
  poids !:number
  photos !: Photo[]
  categorie !: Category
}
