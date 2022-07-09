import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    BasicCardModule,
  ],
})
export class SignUpModule {}
