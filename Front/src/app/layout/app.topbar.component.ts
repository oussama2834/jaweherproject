import {OverlayPanel} from 'primeng/overlaypanel';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, Message } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../_model/UserModel';
import { PanierServiceService } from '../_services/panier-service.service';
import { Panier } from '../_model/panier';
import { LignePanier } from '../_model/LignePanier';
import { LignepanierServiceService } from '../_services/lignepanier-service.service';
import { Commande } from '../_model/Commande';
import { CommandeserviceService } from '../_services/commandeservice.service';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    op !: OverlayPanel;
  items!: MenuItem[];
  successMessage: string = '';
  user = new UserModel();
  paniers: Panier[] = [];
  panier: Panier = new Panier();
  paniersEdited: Panier[] = [];
  lignepaniers: LignePanier[] = [];
  commande = new Commande();
  id !: number;
  role = "";
  total !: number;
  checkoutModal = false;
  isSubmitted = false;
  isValid = false;
  msgs: Message[] = [];
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService,
    private panierServiceService: PanierServiceService,
        public userService: UserService,
    public userAuthService: UserAuthService,
    private commandeserviceService :CommandeserviceService,
    public router: Router, private authService: UserAuthService,
    private lignepanierserviceService: LignepanierServiceService,
    private panierserviceService: PanierServiceService) { }

    delete(id: number) {

      this.lignepanierserviceService.delete(id).subscribe(data =>{
        console.log(data);
        this.lignepaniers = this.lignepaniers.filter(ligne => ligne.id != id)
        this.getPaniers();
      })
    }
  ngOnInit() {
    this.user = this.authService.getUser();
    this.id = this.user.id;
    console.log(this.user);
    this.role = this.user.roles[0].role;
    this.panierServiceService.getAll().subscribe(res => {
      this.paniers = res
      this.paniers = this.paniers.filter(p => p.user.id == this.id)
      this.paniersEdited = this.paniers;
      console.log("paniers :", this.paniers)
      this.lignepaniers = this.paniers[0].lignepaniers
      console.log(this.lignepaniers)

      console.log(this.lignepaniers);
    })
  }
  openCheckoutModal() {
    this.checkoutModal = true;
  }
  incrementerQuantite(ligne: LignePanier) {
    ligne.quantite++;
   this.lignepanierserviceService.edit(ligne,this.paniers[0].id).subscribe(data => {
     console.log('panier edited +:',data)
  
   // console.log(ligne)
      this.ngOnInit();
     this.panier = JSON.parse(localStorage.getItem('panier') || '');
     this.panier.total = this.paniers[0].total
        this.panier = this.paniers[0];
        localStorage.setItem("paniered", JSON.stringify(this.panier));
   })

  }
  decrementerQuantite(ligne:LignePanier) {
    if (ligne.quantite > 1) {
      ligne.quantite--;
      this.lignepanierserviceService.edit(ligne,this.paniers[0].id).subscribe(data => {
        console.log('panier edited -:', data)
        this.getPaniers();
         this.panier = JSON.parse(localStorage.getItem('panier')|| '' );
        this.panier = this.paniers[0];
        localStorage.setItem("panier", JSON.stringify(this.panier));
      })
    }

  }
  save() {
    this.isSubmitted = true;
    this.commande.panier = this.paniers[0];
    if (this.commande.adresse_livraison && this.commande.code ) {
    this.commandeserviceService.create(this.commande).subscribe(data => {
      console.log(data)
      this.isValid = true;

      this.checkoutModal = false;

    })
    }
  }
  getPaniers() {
    this.panierserviceService.getAll().subscribe(res => {
      this.paniers = res
      this.paniers = this.paniers.filter(p => p.user.id == this.id)

      console.log("paniers :", this.paniers)
      this.lignepaniers = this.paniers[0]?.lignepaniers
      this.total = this.paniers[0].total;

      // console.log("lignepaniers :",this.lignepaniers)
    })


  }
  hideDialog() {
    this.checkoutModal = false;
}


showSuccessViaMessages() {
  this.msgs = [];
  this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Project added successfully!' });
}

        public isLoggedIn() {
            return this.userAuthService.isLoggedIn();
          }

          public logout() {
            this.userAuthService.clear();
            this.router.navigate(['/auth/login']);
          }

          public isAdmin() {
            return this.userAuthService.isAdmin();

          }
          public isUser(){
            return this.userAuthService.isUser();

          }
}
