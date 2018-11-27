import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrainingComponent } from './training.component';

const appRoutes = [{ path: '', component: TrainingComponent }];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}
