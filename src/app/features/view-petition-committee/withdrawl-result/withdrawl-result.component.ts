import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WithdrawPetitionService } from 'src/app/logic/petition/withdraw-petition.service';

@Component({
  selector: 'dp-withdrawl-result',
  templateUrl: './withdrawl-result.component.html',
  providers: [WithdrawPetitionService],
})
export class WithdrawlResultComponent {
  @Input() data: string = '';

  constructor(private _router: Router) {}

  submit() {
    this._router.navigate(['/committee/home']);
  }
}
