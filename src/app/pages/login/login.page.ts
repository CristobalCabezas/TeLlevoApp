import { Component, OnInit } from '@angular/core';
import { AlertController,NavController} from '@ionic/angular';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController, 
    private router: Router) { 

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
      'password': new FormControl("",[Validators.required, Validators.minLength(4),Validators.maxLength(4)])
    })

  }

  ngOnInit() {
  }

  sendDetailsWithState() {
    let navigationExtras: NavigationExtras = {
      state: {nombre: this.formularioLogin.value.nombre}
      };
      this.router.navigate(['/choice'], navigationExtras);
  }

  async ingresar(){
    var f = this.formularioLogin.value;

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
  
  
  
  
  
  
  
  /*value = "cris";
  formularioLogin: FormGroup; 

  usuario = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(4)]),
  });

  constructor(private navCtrl: NavController, private alertController:AlertController, private router: Router) { }

  ngOnInit() {
  }

  

  /*sendDetailsWithState() {
    let navigationExtras: NavigationExtras = {
      state: {user: this.usuario.value.user}
      };
      this.router.navigate(['/menu'],navigationExtras); // Esta linea es la que me permite navegar a otro page 
  }

  //Metodo para navegar desde un metodo llamado desde el html
  goToPagina2(){
    console.log("entramos al metodo");
    if("cris"==this.usuario.value.user){
      this.sendDetailsWithState();
    }else{
      this.presentAlert();
    }
    
    // this.navCtrl.navigateForward('/home');
  }

  //Metodo de alerta 
  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Error Login',
      subHeader: 'Infomación : ',
      message: 'Usuario o contraseña son incorrecto',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }*/


}
