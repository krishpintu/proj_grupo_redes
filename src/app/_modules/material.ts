import { NgModule } from '@angular/core';
//import { MatButtonModule } from '@angular/material/button';
//import {MatDialogModule} from '@angular/material/dialog';
//@NgModule({
    //imports :[MatButtonModule,MatDialogModule],
    //exports: [MatButtonModule,MatDialogModule]
//})
import * as Mat from '@angular/material'; 
@NgModule({
    imports :[
        Mat.MatButtonModule,
        Mat.MatDialogModule,
        Mat.MatSnackBarModule,
        Mat.MatFormFieldModule,
        Mat.MatInputModule,
        Mat.MatRadioModule,
        Mat.MatSelectModule,
        Mat.MatDatepickerModule,
        Mat.MatCheckboxModule,
        Mat.MatTableModule,
        Mat.MatMenuModule,
        Mat.MatStepperModule,
        Mat.MatToolbarModule,
        Mat.MatIconModule,
        Mat.MatCardModule,
        Mat.MatDividerModule,
    ],
    exports: [
        Mat.MatButtonModule,
        Mat.MatDialogModule,
        Mat.MatSnackBarModule,
        Mat.MatFormFieldModule,
        Mat.MatInputModule,
        Mat.MatRadioModule,
        Mat.MatSelectModule,
        Mat.MatDatepickerModule,
        Mat.MatCheckboxModule,
        Mat.MatTableModule,
        Mat.MatMenuModule,
        Mat.MatStepperModule,
        Mat.MatToolbarModule,
        Mat.MatIconModule,
        Mat.MatCardModule,
        Mat.MatDividerModule,
    ]
})


export class MaterialModule { }