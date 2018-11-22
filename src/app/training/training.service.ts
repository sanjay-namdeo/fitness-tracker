import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  availableExercisesChanged = new Subject<Exercise[]>();
  pastTrainingsChanged = new Subject<Exercise[]>();

  private ongoingExercise: Exercise;
  private availableExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  getAvailableTrainings() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(resultArray => {
          return resultArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((result: Exercise[]) => {
        this.availableExercises = result;
        this.availableExercisesChanged.next(result);
      });
  }

  getOngoingExercise() {
    return { ...this.ongoingExercise };
  }

  startExercise(exerciseId: string) {
    this.ongoingExercise = this.availableExercises.find(
      ex => ex.id === exerciseId
    );
    this.exerciseChanged.next(this.ongoingExercise);
  }

  completeTraining() {
    this.addTrainingsToDB({
      ...this.ongoingExercise,
      date: new Date(),
      state: 'completed',
      duration: this.ongoingExercise.duration,
      calories: this.ongoingExercise.calories
    });
    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelTraining(progress: number) {
    this.addTrainingsToDB({
      ...this.ongoingExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.ongoingExercise.duration * (progress / 100),
      calories: this.ongoingExercise.calories * (progress / 100)
    });
    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchPastTrainingsFromDB() {
    this.db
      .collection('pastTrainings')
      .valueChanges()
      .subscribe((result: Exercise[]) => {
        this.pastTrainingsChanged.next(result);
      });
  }

  addTrainingsToDB(exercise: Exercise) {
    this.db.collection('pastTrainings').add(exercise);
  }
}
