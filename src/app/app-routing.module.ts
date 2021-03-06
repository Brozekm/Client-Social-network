import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/protected/home/home.component";
import {AuthGuard} from "./core/_guard/auth.guard";
import {LayoutComponent} from "./core/layout/layout.component";
import {SettingsComponent} from "./pages/protected/settings/settings.component";
import {FriendsComponent} from "./pages/protected/friends/friends.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'settings', component: SettingsComponent},
      {path: 'friendsManagement', component: FriendsComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
