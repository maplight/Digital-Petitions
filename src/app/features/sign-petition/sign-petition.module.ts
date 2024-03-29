import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignPetitionComponent } from './sign-petition.component';
import { SignPetitionRoutingModule } from './sign-petition-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { SignThisPetitionModule } from './sign-this-petition/sign-this-petition.module';
import { MatButtonModule } from '@angular/material/button';
import { VerifySignModule } from './verify-sign/verify-sign.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [SignPetitionComponent],
  imports: [
    CommonModule,
    SignPetitionRoutingModule,
    ReturnLinkModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    PetitionViewModule,
    SignThisPetitionModule,
    VerifySignModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class SignPetitionModule {}
