
import { DashboardComponent } from './dashboard/dashboard.component';
import { RedirectToDashboardGuard } from './core/guard/redirect-dashbaord-guard';
import { AuthGuard } from './core/guard/auth.guard';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { TeamComponent } from './team/team.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [RedirectToDashboardGuard],data: { hideHeader: true }  },
  { path: 'register', component: RegisterComponent, canActivate: [RedirectToDashboardGuard] ,data: { hideHeader: true } },
  { path: 'Clients', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'home', component: LandingPageComponent,canActivate: [AuthGuard]},
  { path: 'side', component: SideBarComponent,canActivate: [AuthGuard]},
  { path: 'blog', component: BlogComponent,canActivate: [AuthGuard]},
  { path: 'contact', component: ContactComponent,canActivate: [AuthGuard]},
  { path: 'team', component: TeamComponent,canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
