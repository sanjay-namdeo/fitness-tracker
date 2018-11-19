import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.exerciseChanged.subscribe(
      (exercise: Exercise) => {
        if ( exercise != null) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }

}
