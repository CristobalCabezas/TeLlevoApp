import { Component } from '@angular/core';
import { ConsumoAPIService } from './services/consumo-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private consumoApi:ConsumoAPIService
  ) {}

  getAllTasks() {
    this.consumoApi.getAllTasks()
    .subscribe(Datos => {
      console.log(Datos);
    });
  }

}
