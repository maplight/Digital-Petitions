import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'dp-view-signatures-alert',
  templateUrl: './view-signatures-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSignaturesAlertComponent implements OnChanges {
  @Input() data!: { type: 'alert' | 'success' | 'error'; message: string };
  protected alertInfo: alertEvent[] = [];

  protected currentStyle = '';
  protected alertStyle =
    'flex flex-row w-full justify-between py-[27px] px-6 bg-[#FFEF98] rounded-lg';
  protected successStyle =
    'flex flex-row w-full justify-between py-[27px] px-6 bg-[#E6FFE2] rounded-lg';
  protected errorStyle =
    'flex flex-row w-full justify-between py-[27px] px-6 bg-red-500 rounded-lg';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue.message != '') {
      let sub: ReplaySubject<boolean> = new ReplaySubject<boolean>();
      console.log(changes);

      switch (changes['data'].currentValue.type) {
        case 'alert':
          this.alertInfo.push({
            message: changes['data'].currentValue.message,
            show$: sub,
            style: this.alertStyle,
          });
          break;
        case 'success':
          this.alertInfo.push({
            message: changes['data'].currentValue.message,
            show$: sub,
            style: this.successStyle,
          });
          break;
        case 'error':
          this.alertInfo.push({
            message: changes['data'].currentValue.message,
            show$: sub,
            style: this.errorStyle,
          });
      }

      this.showEvent(sub);
      setTimeout(() => this.hideEvent(sub), 10000);
      sub.asObservable().subscribe((data) => console.log(data));
    }
  }

  onCancelClick(sub: ReplaySubject<boolean>) {
    sub.next(false);
    sub.complete();
  }

  showEvent(sub: ReplaySubject<boolean>) {
    sub.next(true);
  }

  hideEvent(sub: ReplaySubject<boolean>) {
    sub.next(false);
    sub.complete();
  }
}
type alertEvent = {
  style: string;
  message: string;
  show$: ReplaySubject<boolean>;
};
