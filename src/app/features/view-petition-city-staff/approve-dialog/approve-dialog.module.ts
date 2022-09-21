import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveDialogComponent } from './approve-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ApproveAlertModule } from '../approve-alert/approve-alert.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';

@NgModule({
  declarations: [ApproveDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BasicModalModule,
    MatDialogModule,
    ApproveAlertModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DialogResultModule,
    MatProgressBarModule,
  ],
  exports: [ApproveDialogComponent],
})
export class ApproveDialogModule {}
