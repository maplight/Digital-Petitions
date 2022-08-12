import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifySignComponent } from './verify-sign.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';

@NgModule({
  declarations: [VerifySignComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReturnLinkModule,
  ],
  exports: [VerifySignComponent],
})
export class VerifySignModule {}
