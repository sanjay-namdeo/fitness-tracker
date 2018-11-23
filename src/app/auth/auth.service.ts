import { TrainingService } from './../training/training.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(
        authData.email,
        authData.password
      )
      .then(result => {
        this.authSuccess();
      }).catch((error) => {
        this.logout();
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccess();
      }).catch((error) => {
        this.logout();
      });
  }

  logout() {
    this.trainingService.onLogoutCancelSubscription();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  authSuccess() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
