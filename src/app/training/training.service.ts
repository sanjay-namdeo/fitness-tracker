import { AuthService } from './../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  availableExercisesChanged = new Subject<Exercise[]>();
  pastTrainingsChanged = new Subject<Exercise[]>();
  private firebaseSubscriptions: Subscription[] = [];

  private ongoingExercise: Exercise;
  private availableExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) { }

  /**
   * Subscribe to snapShot changes. Whenever database changes, this will be invoked.
   * Add this subscription to the list of list of subscription, which will be used
   * to unsubscibe when user logouts.
   * Using pipe and map, transform data to the Exercise data model.
   * Then assign it to availableExercies array. Call observers to inform that availableExercies
   * have updated, whic is subscribed by new training to show drop down menu.
   */
  getAvailableTrainings() {
    this.firebaseSubscriptions.push(this.db
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
      }));
  }

  getOngoingExercise() {
    return { ...this.ongoingExercise };
  }

  /**
   * When user starts a training, set it as ongoingExercise and inform training component
   * that there is an ongoing training and show current training component,
   * otherwise show new training component.
   * @param exerciseId
   */
  startExercise(exerciseId: string) {
    this.ongoingExercise = this.availableExercises.find(
      ex => ex.id === exerciseId
    );
    this.exerciseChanged.next(this.ongoingExercise);
  }

  /**
   * Called whenever current ongoing training completes. Push this data to database.
   * set ongoing exercise to null and call observers to show new training component
   * and hide current training component
   */
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

  /**
   * Called whenever current ongoing training is cancelled. Push this data to database.
   * set ongoing exercise to null and call observers to show new training component
   * and hide current training component
   */
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

  /**
   * Get all completed or cancelled trainings. Inform past training components when data is updated/received
   * It is pastTrainingsChanged is subscribed by past training components to show data in a datatable.
   */
  fetchPastTrainingsFromDB() {
    this.firebaseSubscriptions.push(this.db
      .collection('pastTrainings')
      .valueChanges()
      .subscribe((result: Exercise[]) => {
        this.pastTrainingsChanged.next(result);
      }));
  }

  /**
   * Insert input exercise in the database
   * @param exercise
   */
  addTrainingsToDB(exercise: Exercise) {
    this.db.collection('pastTrainings').add(exercise);
  }

  /**
   * When user logouts, cancel subscriptions to get available and pas trainings.
   */
  onLogoutCancelSubscription() {
    this.firebaseSubscriptions.forEach(subs => subs.unsubscribe());
  }
}
