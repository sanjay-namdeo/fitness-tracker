import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // initAuthListner subscribes to authChange listner, which is invoked whenever user logins or logouts
    // Based on the status, hide/show relavent menus
    this.authService.initAuthListner();
  }
}
