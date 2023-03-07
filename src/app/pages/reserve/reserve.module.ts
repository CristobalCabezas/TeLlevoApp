import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputModule } from 'src/app/components/input/input.module';

import { ReservePageRoutingModule } from './reserve-routing.module';

import { ReservePage } from './reserve.page';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservePageRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    InputModule,
    HttpClientModule
  ],
  declarations: [ReservePage]
})
export class ReservePageModule {}
