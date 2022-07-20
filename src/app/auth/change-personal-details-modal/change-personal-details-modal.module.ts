import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePersonalDetailsModalComponent } from './change-personal-details-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ChangePersonalDetailsModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogResultModule,
    BasicModalModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
  ],
})
export class ChangePersonalDetailsModalModule {}
