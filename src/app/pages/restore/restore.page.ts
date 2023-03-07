import { Component, OnInit } from '@angular/core';
import { AlertController,NavController} from '@ionic/angular';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { ConsumoAPIService } from 'src/app/services/consumo-api.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class RestorePage implements OnInit {

  formularioRestore: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController, 
    private router: Router,
    private consumoApi:ConsumoAPIService) { 

    this.formularioRestore = this.fb.group({
      'nombre': new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
      'password': new FormControl("",[Validators.required, Validators.minLength(4),Validators.maxLength(4)]),
      'confirmacionPassword': new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(8)])
    })

  }

  ngOnInit() {
  }

  sendDetailsWithState() {
    let navigationExtras: NavigationExtras = {
      state: {nombre: this.formularioRestore.value.nombre}
      };
      this.router.navigate(['/login'], navigationExtras);
  }

  async newpass(){
    var f = this.formularioRestore.value;

    var oldusr = JSON.parse(localStorage.getItem('usuario'));

  /*  if(oldusr.nombre == f.nombre && oldusr.password == f.password){
      console.log('Ingresado');
      localStorage.setItem('ingresado','true');
      this.sendDetailsWithState();
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }

    if(this.formularioRestore.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos o no pueden ser menores a 4 ni mayores a 8 caracteres.',
        buttons: ['Aceptar']
      });*/

    if(oldusr.nombre != f.nombre){
       const alert = await this.alertController.create({
       header: 'Usuario incorrecto',
       message: 'El usuario que ingresaste no existe.',
       buttons: ['Aceptar']  
      });
    
      await alert.present();
      return;

    
    }


    var usuario = {
      nombre: f.nombre,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));

    localStorage.setItem('ingresado','true');

    this.navCtrl.navigateRoot('login');
  }

  getAllTasks() {
    this.consumoApi.getAllTasks()
    .subscribe(tasks => {
      console.log(tasks);
    });
  }

}



/*  async ingresar(){
    var f = this.formularioRestore.value;

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario.nombre == f.nombre && usuario.password == f.password){
      console.log('Ingresado');
      localStorage.setItem('ingresado','true');
      this.sendDetailsWithState();
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }

  }
*/