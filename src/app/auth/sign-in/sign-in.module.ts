import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { SingInRoutingModule } from './sign-in-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SignInService } from 'src/app/logic/auth/exports';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SingInRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    BasicCardModule,
    MatProgressBarModule,
  ],
  providers: [SignInService],
})
export class SignInModule {}
