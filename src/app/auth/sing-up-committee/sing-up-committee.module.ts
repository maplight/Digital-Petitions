import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingUpCommitteeComponent } from './sing-up-committee.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SingUpCommitteeComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
  ],
})
export class SingUpCommitteeModule {}
