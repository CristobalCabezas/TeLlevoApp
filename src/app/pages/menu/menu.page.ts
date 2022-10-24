import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { AlertController,NavController,createAnimation  } from '@ionic/angular';
import { ConsumoAPIService } from '../../services/consumo-api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  nombre: string;
  userHome: any;
  tituloUno?: any;
  value = "cris";

  constructor(private consumoApi:ConsumoAPIService, private activeroute: ActivatedRoute, private router: Router, private alertController:AlertController) {

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {       
        this.userHome = this.router.getCurrentNavigation().extras.state.nombre; 
        console.log("Dato a mostrar" + this.userHome)     
        }
      });
    } 

    //Metodos para mostrar 
    mostrar(){
      this.presentAlert();
    }

    mostrarApi(){
      this.consumoApi.getPosts().subscribe((res)=>{
        this.tituloUno = '' + res[0].title;        
      }, (error)=>{
        console.log(error);

      }); 
    }


    //Metodo de alerta 
   async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Usuario : ',
      message: 'Estimado ' + this.nombre + ', su viaje ha sido reservado con exito',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

}
