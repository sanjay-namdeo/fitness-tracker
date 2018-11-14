import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule, 
        MatFormFieldModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule],
    exports: [
        MatButtonModule, 
        MatCheckboxModule, 
        MatInputModule, 
        MatFormFieldModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule]
})
export class MaterialModule { }
