import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'dp-view-signatures-alert',
  templateUrl: './view-signatures-alert.component.html',
})
export class ViewSignaturesAlertComponent implements OnInit, OnChanges {
  @Input() type!: 'alert' | 'success' | 'error';
  @Input() message!: string;
  @Input() show: boolean = false;

  protected currentStyle = '';
  protected alertStyle =
    'flex flex-row w-full justify-between py-[27px] px-6 bg-[#FFEF98] rounded-lg';
  protected successStyle =
    'flex flex-row md:max-w-[500px] w-full justify-between py-[27px] px-6 bg-[#E6FFE2] rounded-lg';
  protected errorStyle =
    'flex flex-row md:max-w-[500px] w-full justify-between py-[27px] px-6 bg-red-500 rounded-lg';

  constructor() {
    switch (this.type) {
      case 'alert':
        this.currentStyle = this.alertStyle;
        break;
      case 'success':
        this.currentStyle = this.successStyle;
        break;
      case 'error':
        this.currentStyle = this.errorStyle;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    switch (this.type) {
      case 'alert':
        this.currentStyle = this.alertStyle;
        break;
      case 'success':
        this.currentStyle = this.successStyle;
        break;
      case 'error':
        this.currentStyle = this.errorStyle;
    }
  }

  ngOnInit(): void {
    switch (this.type) {
      case 'alert':
        this.currentStyle = this.alertStyle;
        break;
      case 'success':
        this.currentStyle = this.successStyle;
        break;
      case 'error':
        this.currentStyle = this.errorStyle;
    }
  }

  onCancelClick() {
    this.show = false;
  }
}
