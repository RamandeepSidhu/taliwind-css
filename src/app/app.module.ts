import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpInterceptorService } from './core/interceptors/basic.interceptor';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from './material-module';
import { ConfirmationModelComponent } from './confirmation-model/confirmation-model.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ManageComponent } from './manage/manage.component';
import { TableComponent } from './table/table.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ClientsDataComponent } from './clients-data/clients-data.component';
import { BlogComponent } from './blog/blog.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ConfirmationModelComponent,
    LandingPageComponent,
    ManageComponent,
    TableComponent,
    SideBarComponent,
    ClientsDataComponent,
    BlogComponent,
    HeaderComponent,
    ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MaterialModule,
    MatIconModule
  ],
  providers: [MaterialModule,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  },ToastrService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
