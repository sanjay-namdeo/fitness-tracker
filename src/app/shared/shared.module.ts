import { MaterialModule } from './../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, FormsModule, MaterialModule],
  exports: [CommonModule, FlexLayoutModule, FormsModule, MaterialModule]
})
export class SharedModule {}
