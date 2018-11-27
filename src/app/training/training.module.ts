import { NgModule } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

import { SharedModule } from './../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [SharedModule, AngularFirestoreModule, TrainingRoutingModule],
  providers: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
