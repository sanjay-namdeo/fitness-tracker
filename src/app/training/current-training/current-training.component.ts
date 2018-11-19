import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  onGoingExercise: Exercise;
  step: number;
  progress = 0;
  timer;

  constructor(public dialog: MatDialog, private trainingService: TrainingService) { }

  startOrResumeTraining() {
    this.onGoingExercise = this.trainingService.getOngoingExercise();
    this.step = this.onGoingExercise.duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.trainingService.completeTraining();
      }
    }, this.step);
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
      if ( result ) {
        this.trainingService.cancelTraining(this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
