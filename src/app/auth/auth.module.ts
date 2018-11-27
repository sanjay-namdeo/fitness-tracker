import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [SharedModule, AngularFireAuthModule, AuthRoutingModule],
  providers: [AuthService]
})
export class AuthModule {}
