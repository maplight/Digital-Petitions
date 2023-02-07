import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePersonalDetailsModalComponent } from './change-personal-details-modal.component';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangePersonalDetailsService } from 'src/app/logic/auth/exports';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

@NgModule({
  declarations: [ChangePersonalDetailsModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputErrorModule,
    DialogResultModule,
    BasicModalModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    LoadingBarModule,
  ],
})
export class ChangePersonalDetailsModalModule {}
