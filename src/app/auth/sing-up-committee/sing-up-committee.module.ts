import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingUpCommitteeComponent } from './sing-up-committee.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SingUpCommitteeComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class SingUpCommitteeModule {}
