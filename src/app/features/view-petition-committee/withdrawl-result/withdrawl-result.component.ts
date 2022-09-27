import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WithdrawPetitionService } from 'src/app/logic/petition/withdraw-petition.service';

@Component({
  selector: 'dp-withdrawl-result',
  templateUrl: './withdrawl-result.component.html',
  providers: [WithdrawPetitionService],
})
export class WithdrawlResultComponent implements OnInit {
  @Input() data: string = '';

  constructor(private _router: Router, _activatedRoute: ActivatedRoute) {
    this.data = _activatedRoute.snapshot.params['petition'];
  }

  ngOnInit(): void {}

  submit() {
    this._router.navigate(['/committee/home']);
  }
}
