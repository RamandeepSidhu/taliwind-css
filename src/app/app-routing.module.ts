
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RedirectToDashboardGuard } from './core/guard/redirect-dashbaord-guard';
import { AuthGuard } from './core/guard/auth.guard';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TableComponent } from './table/table.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ClientsDataComponent } from './clients-data/clients-data.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [RedirectToDashboardGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RedirectToDashboardGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'home', component: LandingPageComponent,canActivate: [AuthGuard]},
  { path: 'client', component: SideBarComponent,canActivate: [AuthGuard]},
  { path: 'blog', component: BlogComponent,canActivate: [AuthGuard]},
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
