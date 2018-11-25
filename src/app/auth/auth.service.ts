import { TrainingService } from './../training/training.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>(); // To store authChange Subject, which is subscribed by header and sidebar
  private isAuthenticated = false; // To store logged in status

  /**
   * Constructor injecting 3 different services
   * @param router
   * @param afAuth
   * @param trainingService
   */
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private matSnackBar: MatSnackBar,
    private uiService: UIService
  ) {}

  /**
   * Attach a listner to authChange subscription. This method is called once in app component.
   * authChange invokes all observers whenever user login status changes. If user object is not null
   * that means, user is logged in. Otherwise user logged of.
   */
  initAuthListner() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true); // Inform header and sidebar that user is logged in and show only training and logout menus
        this.router.navigate(['/training']);
      } else {
        this.trainingService.onLogoutCancelSubscription();
        this.isAuthenticated = false;
        this.authChange.next(false); // Inform header and sidebar that user is logged out and show only login and signup menus
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Register a user with a valid email and a valid passowrd. It will invoke authChange observer,
   * as authStatus changes.
   * @param authData
   */
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(
        authData.email,
        authData.password
      )
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        // Show error message in snackbar, moved to ui service for reusability
        this.uiService.showMatSnackBar(error.message, null, 3000);
      });
  }

  /**
   * Login a previously registered user with email and password. It will invoke authChange observer,
   * as authStatus changes.
   * @param authData
   */
  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        // Show error message in snackbar, moved to ui service for reusability
        this.uiService.showMatSnackBar(error.message, null, 3000);
      });
  }

  /**
   * Logout the currently logged in user. It will invoke authChange observer,
   * as authStatus changes.
   */
  logout() {
    this.afAuth.auth.signOut();
  }

  /**
   * If user is logged in then return true elase false.
   * @returns boolean
   */
  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
