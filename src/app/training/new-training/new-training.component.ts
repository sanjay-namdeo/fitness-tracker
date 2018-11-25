import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  isLoading = false;
  loadingSubscription = new Subscription();
  availableExercisesSubscription = new Subscription();

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => (this.isLoading = isLoading)
    );
    this.availableExercisesSubscription = this.trainingService.availableExercisesChanged.subscribe(
      result => {
        this.exercises = result;
      }
    );
    this.trainingService.getAvailableTrainings();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.selectedExerciseId);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.availableExercisesSubscription.unsubscribe();
  }

  onTryAgain() {
    this.trainingService.getAvailableTrainings();
  }
}
