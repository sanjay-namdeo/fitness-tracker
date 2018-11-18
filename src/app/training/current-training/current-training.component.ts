import { StopTrainingComponent } from './stop-training.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;
  @Output() currentTrainingStopped = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  startOrResumeTraining() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  ngOnInit() {
    this.startOrResumeTraining();
  }

  stopTraining() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.currentTrainingStopped.emit();
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
