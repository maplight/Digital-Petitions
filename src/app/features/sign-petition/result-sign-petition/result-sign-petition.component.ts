import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'dp-result-sign-petition',
  templateUrl: './result-sign-petition.component.html',
})
export class ResultSignPetitionComponent implements OnInit, OnDestroy {
  title: string = '';
  private _unsubscribeAll = new Subject<void>();
  constructor(protected _activatedRoute: ActivatedRoute) {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => params.get('title')!)
      )
      .subscribe((title) => (this.title = title));
  }
}
