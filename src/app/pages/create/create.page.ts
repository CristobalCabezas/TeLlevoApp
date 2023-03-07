import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController,NavController,createAnimation, ModalController  } from '@ionic/angular';
import { ConsumoAPIService } from '../../services/consumo-api.service';
import { GooglemapsComponent } from '../../googlemaps/googlemaps.component';
import { HttpClient } from '@angular/common/http';
import { Datos } from 'src/app/interfaces/datos';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit{

  nombre: string;
  userHome: any;
  tituloUno?: any;
  value = "cris";
  ubicacion: any;
  editing = false;
  dato: Datos = {
    id: null,
    fecha: "",
    origen: "",
    destino: "",
    conductor: "",
    cupo: null
  };

  ngOnInit() {
    this.activeroute.paramMap.subscribe((paramMap) => {
      if (paramMap.get("postId")) {
        this.consumoApi
          .getPostById(paramMap.get("postId"))
          .subscribe((res) => {
            this.dato = res;
            this.editing = true;
          });
      }
    });
  }

  constructor(private consumoApi:ConsumoAPIService, private activeroute: ActivatedRoute, private router: Router, private alertController:AlertController, private modalController: ModalController, private navCtrl: NavController, public http: HttpClient) {

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


    //Con este metodo, se despliega un mensaje en el que se inofrma que el viaje ha sido reservado con exito  
   async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Usuario : ',
      message: 'Estimado ' + this.nombre + ', su viaje ha sido reservado con exito',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  savePost() {
    this.consumoApi
      .createPost(this.dato.fecha, this.dato.origen, this.dato.destino, this.dato.conductor, this.dato.cupo)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(["/driver"]);
      });
  }

  createPost(fecha: string, origen: string, destino: string, conductor: string, cupo: number) {
    return this.http.post<Datos[]>(this.consumoApi.api, {
      fecha,
      origen,
      destino,
      conductor,
      cupo 
    });
  }

  updatePost() {
    this.consumoApi
      .updatePost(this.dato.id, {
        fecha: this.dato.fecha,
        origen: this.dato.origen,
        destino: this.dato.destino,
        conductor: this.dato.conductor,
        cupo: this.dato.cupo
      })
      .subscribe((res) => {
        console.log(res);
        this.editing = false;
        this.router.navigate(["/driver"]);
      });
  }


  async addDirection() {
    const ubicacion = this.ubicacion;
    let position = {
      lat: -33.4331572,
      lng: -70.6142669
    };
    if (ubicacion !== null){
      position = ubicacion;
    }
    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: {position}
    });
    await modalAdd.present();
    const {data} = await modalAdd.onWillDismiss();
    if (data) {
      console.log('data -> ', data);
      this.ubicacion = data.pos;
      console.log('this.nombre ->', this.nombre);
    }
  }

}
