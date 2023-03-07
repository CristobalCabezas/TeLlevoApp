import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { AlertController,NavController,createAnimation  } from '@ionic/angular';
import { ConsumoAPIService } from '../../services/consumo-api.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.page.html',
  styleUrls: ['./choice.page.scss'],
})
export class ChoicePage {

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

  ngOnInit() {
  }



}
