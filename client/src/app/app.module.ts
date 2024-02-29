import { CreateUserComponent } from './create-user/create-user.component';

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { JsonTableComponent } from './json-table/json-table.component';

@NgModule({
  declarations: [
    AppComponent,
    // JsonTableComponent,

    // DetailsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [
    provideClientHydration(),
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
