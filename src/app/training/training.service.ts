import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private ongoingExercise: Exercise;
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private exercises: Exercise[] = [];

  getAvailableTrainings() {
    return this.availableExercises.slice();
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
    this.exercises.push({
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
    this.exercises.push({
      ...this.ongoingExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.ongoingExercise.duration * (progress / 100),
      calories: this.ongoingExercise.calories * (progress / 100)
    });
    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledTrainings() {
    return this.exercises.slice();
  }
}
