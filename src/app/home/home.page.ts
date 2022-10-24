import { Component } from '@angular/core';
import { AlertController,NavController,AnimationController,createAnimation} from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private navCtrl: NavController,private router: Router, private alertController:AlertController,private animationCtrl: AnimationController) { 
    this.animacion();   
   }   
 
   ionViewDidEnter(){

     this.animacion();
   }


  animacion(){
    const squareA = createAnimation()
    .addElement(document.querySelector('#header'))
    .duration(5000)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '0.5' },
      { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
      { offset: 1, transform: 'scale(1)', opacity: '0.5' }
    ]);

    const parent = createAnimation()
  .duration(2000)
  .iterations(Infinity)
  .addAnimation([squareA]);

parent.play();
  }
}
