import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, Params } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { AlertController, ToastController, LoadingController  } from '@ionic/angular';
import { ConsumoAPIService } from '../../services/consumo-api.service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Datos } from '../../interfaces/datos';
import { Observable } from 'rxjs/internal/Observable';
//import { Users } from 'src/app/interfaces/users';

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
  datos: any[] = [];
  val: any;
  //users: Users[] = [];
  //user: Datos;
  //public array: any[];
  post: Datos = {
    fecha: "",
    origen: "",
    destino: "",
    conductor: "",
    cupo: 0
  };
  editing = false;

  constructor(private consumoApi:ConsumoAPIService, private activeroute: ActivatedRoute, private router: Router, private alertController:AlertController, private alertCtrl: AlertController, private toastCtrl: ToastController, private loadingCtrl: LoadingController, public http: HttpClient) {

    /*this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {       
        this.userHome = this.router.getCurrentNavigation().extras.state.nombre; 
        console.log("Dato a mostrar" + this.userHome)     
        }
      });*/
    
      this.activeroute.paramMap.subscribe((paramMap) => {
        if (paramMap.get("postId")) {
          this.consumoApi
            .getPostById(paramMap.get("postId"))
            .subscribe((res) => {
              this.post = res;
              this.editing = true;
            });
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

   ngOnInit(): void {

    console.log('hoola');
    this.getusers().subscribe(res=> {
      console.log("Res",res)
      this.datos = res;
    })

    /*const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    await loading.present();
    this.consumoApi.getAllTasks()
    .subscribe(async (tasks) => {
      console.log(tasks);
      this.datos = tasks;
      await loading.dismiss();
    });

    let sub = this.route.params.subscribe(params =>{
      this.val = params['id'];
    });
    console.log("id: " + this.val);

    this.consumoApi.getUpdateUser(this.val).subscribe(data => {
      this.user = data;
    })*/
     
  }
  gotoHome(){
    this.router.navigate(['/home']);
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

/*createTask() {
  const task = {
    id: "6",
    fecha: "30/10/2021",
    origen: "Antonio Varas 123, Santiago",
    destino: "Mi casa",
    conductor: "Pablo Gonzalez Soto",
    cupo: 4
  };
  this.consumoApi.createTask(task)
  .subscribe((newTask) => {
    console.log(newTask);
  });
}

updateTask() {
  const task = {
    id: "1",
    fecha: "30/10/2021",
    origen: "Antonio Varas 123, Santiago",
    destino: "Mi casa",
    conductor: "Pablo Gonzalez Soto",
    cupo: 4 - 1
  };
  this.consumoApi.updateTask(task)
  .subscribe(historial => {
    console.log(historial);
  });
}*

updateTask(id: string, index: number) {
  
  index = 0;

  const task = {
    id: id,
    fecha: this.listaApi[index].fecha,
    origen: this.listaApi[index].origen,
    destino: this.listaApi[index].destino,
    conductor: this.listaApi[index].conductor,
    cupo: this.listaApi[index].cupo - 1
  };

  
  this.consumoApi.updateTask(id, task)
  .subscribe(() => {
    this.datos.splice(index, 1);
    this.presentToast('Su asiento fue reservado con exito');
    window.location.reload()
  });
};



updateTask(){
  this.consumoApi.updateUser(this.user).subscribe(historial => {
    this.presentToast('Su asiento fue reservado con exito');
  });
  this.getusers().subscribe((response)=>{
    this.datos = response;
  });
}*/


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  };

  /*updatePost() {
    this.consumoApi
      .updatePost(this.post.id, {
        cupo: this.post.cupo,
      })
      .subscribe((res) => {
        console.log(res);
        //this.editing = false;
        //this.router.navigate(["/posts"]);
      });
  }*/

}

