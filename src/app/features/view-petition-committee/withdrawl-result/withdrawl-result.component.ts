import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewPetitionNameService } from 'src/app/logic/petition/view-petition-name.service';
import { WithdrawPetitionService } from 'src/app/logic/petition/withdraw-petition.service';

@Component({
  selector: 'dp-withdrawl-result',
  templateUrl: './withdrawl-result.component.html',
})
export class WithdrawlResultComponent implements OnInit {
  data: string = '';

  constructor(
    private _router: Router,
    private title: ViewPetitionNameService
  ) {}
  ngOnInit(): void {
    const url = this._router.url;
    const id = url.split('/committee/home/')[1].split('/')[0];
    this.data = this.title.getTitle(id);
  }

  submit() {
    this._router.navigate(['/committee/home']);
  }
}
