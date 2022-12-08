import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmSignPetitionComponent } from './confirm-sign-petition.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmSignPetitionRoutingModule } from './confirm-sign-petition-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [ConfirmSignPetitionComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ConfirmSignPetitionRoutingModule,
    ReturnLinkModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class ConfirmSignPetitionModule {}
