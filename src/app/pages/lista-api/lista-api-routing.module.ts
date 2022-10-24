import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaApiPage } from './lista-api.page';

const routes: Routes = [
  {
    path: '',
    component: ListaApiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaApiPageRoutingModule {}
