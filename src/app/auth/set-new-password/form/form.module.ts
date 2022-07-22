import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormComponent],
})
export class FormModule {}
