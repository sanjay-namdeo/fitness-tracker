import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  constructor(private matSnackBar: MatSnackBar) {}
  loadingStateChanged = new Subject<boolean>();

  // Resuable snack bar
  showMatSnackBar(message, action, duration) {
    this.matSnackBar.open(message, action, {
      duration: duration
    });
  }
}
