import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { AlertController,NavController,createAnimation, ModalController  } from '@ionic/angular';
import { ConsumoAPIService } from '../../services/consumo-api.service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Datos } from 'src/app/interfaces/datos';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage{

  nombre: string;
  userHome: any;
  tituloUno?: any;
  value = "cris";
  ubicacion: any;
  datos: Datos[] = [];

  ngOnInit(): void {

    console.log('hoola');
    this.getusers().subscribe(res=> {
      console.log("Res",res)
      this.datos = res;
    })
  }

  constructor(private consumoApi:ConsumoAPIService, private activeroute: ActivatedRoute, private router: Router, private alertController:AlertController, private modalController: ModalController, private navCtrl: NavController, public http: HttpClient) {



    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {       
        this.userHome = this.router.getCurrentNavigation().extras.state.nombre; 
        console.log("Dato a mostrar" + this.userHome)     
        }
      });
    } 

    mostrarApi(){
      this.consumoApi.getPosts().subscribe((res)=>{
        this.tituloUno = '' + res[0].title;        
      }, (error)=>{
        console.log(error);

      }); 
    }

// Con el siguiente metodo llamamos la lista ubicada en nuestra API local
getusers(){
  return this.http
  .get('../assets/db.json')
  .pipe(
    map ((res:any) => {
      return res.historial;
    })
  )
}

getAllTasks() {
  this.consumoApi.getAllTasks()
  .subscribe(Datos => {
    console.log(Datos);
  });
}

loadPosts() {
  this.consumoApi.getAllTasks().subscribe(
    (res) => {
      this.datos = res;
    },
    (err) => console.log(err)
  );
}

async removePost(id: string) {
  const alert = await this.alertController.create({
    header: "Eliminar",
    subHeader: "Eliminar viaje",
    message: "¿Está seguro de eliminar este viaje?",
    buttons: [
      "No",
      {
        text: "Si",
        handler: () => {
          this.consumoApi.removePost(id).subscribe(
            (res) => {
              console.log(res);
              this.loadPosts();
            },
            (err) => console.log(err)
          );
        },
      },
    ],
  });

  await alert.present();
}

}
