import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormField, MatFormFieldModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule],
    exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule]
})
export class MaterialModule { }
