import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  { path : '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path : 'create', loadChildren: () => import('./pages/create-event/create-event.module').then(m => m.CreateEventModule), canActivate: [AuthGuard]},
  { path : 'myevents', loadChildren: () => import('./pages/my-events/my-events.module').then(m => m.MyEventsModule), canActivate: [AuthGuard]},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
