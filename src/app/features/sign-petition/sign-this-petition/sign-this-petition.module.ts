import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignThisPetitionComponent } from './sign-this-petition.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignThisPetitionComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SignThisPetitionComponent],
})
export class SignThisPetitionModule {}
