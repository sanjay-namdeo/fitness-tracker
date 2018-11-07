import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
    exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule { }
