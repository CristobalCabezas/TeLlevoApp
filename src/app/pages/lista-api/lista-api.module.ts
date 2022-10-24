import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaApiPageRoutingModule } from './lista-api-routing.module';

import { ListaApiPage } from './lista-api.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaApiPageRoutingModule
  ],
  declarations: [ListaApiPage]
})
export class ListaApiPageModule {}
