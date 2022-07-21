import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetNewPasswordComponent } from './set-new-password.component';
import { SetNewPasswordRoutingModule } from './set-new-password-routing.module';

@NgModule({
  declarations: [SetNewPasswordComponent],
  imports: [CommonModule, SetNewPasswordRoutingModule],
})
export class SetNewPasswordModule {}
