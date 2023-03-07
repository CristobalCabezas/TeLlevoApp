import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './services/ingresado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'error404',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },
  {
    path: 'lista-api',
    loadChildren: () => import('./pages/lista-api/lista-api.module').then( m => m.ListaApiPageModule)
  },
  {
    path: 'restore',
    loadChildren: () => import('./pages/restore/restore.module').then( m => m.RestorePageModule)
  },
  {
    path: 'choice',
    loadChildren: () => import('./pages/choice/choice.module').then( m => m.ChoicePageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'driver',
    loadChildren: () => import('./pages/driver/driver.module').then( m => m.DriverPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: "edit/:postId",
    loadChildren: () =>
      import("./pages/create/create.module").then((m) => m.CreatePageModule),
  },
  {
    path: 'vercupo/:postId',
    loadChildren: () => import('./pages/reserve/reserve.module').then( m => m.ReservePageModule)
  },
  {
    path: '**',
    redirectTo: 'error404',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
