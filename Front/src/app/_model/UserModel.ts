import { RoleModel } from "./RoleModel"

export class UserModel {
id !: number
nom !: string
prenom !: string
username !: string
email !: string
adresse !: string
ville !: string
numero !: string
  motDePasse !: string
  roles !: RoleModel[]
}
