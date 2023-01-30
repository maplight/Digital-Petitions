import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePersonalDetailsModalComponent } from './change-personal-details-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ChangePersonalDetailsService } from 'src/app/logic/auth/exports';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

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
    LoadingBarModule,
  ],
})
export class ChangePersonalDetailsModalModule {}
