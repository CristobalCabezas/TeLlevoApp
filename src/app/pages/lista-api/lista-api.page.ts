import { Component } from '@angular/core';
import { ConsumoAPIService } from '../../services/consumo-api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-api',
  templateUrl: './lista-api.page.html',
  styleUrls: ['./lista-api.page.scss'],
})
export class ListaApiPage {

  usuarios: any;

  constructor(private consumoApi:ConsumoAPIService, public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.consumoApi.obtenerDatos()
    .subscribe(
      (data)=>{this.usuarios = data;},
      (error)=>{console.log(error);}
    )
  }
}

