import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dp-withdrawl-result',
  templateUrl: './withdrawl-result.component.html',
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
