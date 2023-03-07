import { Injectable, Renderer2 } from '@angular/core';
//import { promise } from 'protractor';
//import { environment } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {

  apiKey = 'AIzaSyCaUKPPPX0XItgfJyymAim-e4P30huh0iM';
  mapsLoaded = false;

  constructor() { }

  init(renderer: any, document: any): Promise<any> {
    return new Promise((resolve) => {
      if (this.mapsLoaded) {
        console.log('Google is preview loaded');
        resolve(true);
        return;
      }

      const script = renderer.createElement('script');
      script.id = 'googleMaps';

      window['initMap'] = () => {
        this.mapsLoaded = true;
        if (google) {
          console.log('Google is loaded')
        } else {
          console.log('Google is not Defined')
        }
        resolve(true);
        return;
      }

      if (this.apiKey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=initMap';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?';
      }
      renderer.appendChild(document.body, script);
    })
  }


}
