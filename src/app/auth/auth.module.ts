import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpCommitteeModule } from './sign-up-committee/sign-up-committee.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInModule } from './sign-in/sign-in.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule],
  exports: [SignUpCommitteeModule, SignInModule],
})
export class AuthModule {}
