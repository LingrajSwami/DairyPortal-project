import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  imports: [

    ServerModule,
    CreateUserComponent
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
