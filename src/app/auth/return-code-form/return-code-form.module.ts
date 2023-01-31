import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnCodeFormComponent } from './return-code-form.component';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ReturnCodeFormRoutingModule } from './return-code-form-routing.module';

@NgModule({
  declarations: [ReturnCodeFormComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    InputErrorModule,
    ReturnLinkModule,
    LoadingBarModule,
    ErrorMsgModule,
    ReturnCodeFormRoutingModule,
  ],
})
export class ReturnCodeFormModule {}
