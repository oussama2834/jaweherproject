import { Component } from '@angular/core';
import { CommandeserviceService } from 'src/app/_services/commandeservice.service';
import { Commande } from '../../../_model/Commande';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserModel } from 'src/app/_model/UserModel';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent {
  allOrders: Commande[] = [];
  Orders_client: Commande[] = [];
  user = new UserModel();
  id !: number;
  role = "";
  constructor(private commandeserviceService: CommandeserviceService,
    private authService: UserAuthService
    ) { }
  getCommandes() {
    this.commandeserviceService.getAll().subscribe(data => {
      this.allOrders = data;
      this.Orders_client = this.allOrders.filter(order =>order.panier.user.id == this.id)
      console.log('commandes',this.allOrders)
      console.log('commandespourclient',this.Orders_client)
    })
  }
  ngOnInit() {
    this.user = this.authService.getUser();
    this.role = this.user.roles[0].role;
    this.id = this.user.id;
    this.getCommandes();
  }
  delete(id:number) {
    this.commandeserviceService.delete(id).subscribe(res => console.log(res))
    this.allOrders = this.allOrders.filter(cmd => cmd.id != id)
  }
}
