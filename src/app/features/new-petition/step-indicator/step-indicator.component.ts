import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-step-indicator',
  templateUrl: './step-indicator.component.html',
})
export class StepIndicatorComponent implements OnInit {
  @Input() step: 'type' | 'issue' | 'candidate' | 'result' = 'type';

  private basicStyleElement: string =
    'bg-[#EFEFEF] w-6 h-6 rounded-full flex justify-center items-center font-roboto text-[#8A8A8A] text-sm leading-[14px] font-normal border border-[#EFEFEF] cursor-default';
  private basicStyleLine: string = 'bg-[#EFEFEF] w-[122px] h-[2px]';
  private accentStyleElement: string =
    'bg-[#ECF0FF] w-6 h-6 rounded-full flex justify-center items-center font-roboto text-[#2D5BFF] text-sm leading-[14px] font-normal border border-[#ECF0FF] cursor-default';
  private accentStyleLine: string = 'bg-[#ECF0FF] w-[122px] h-[2px]';

  protected styleElement1: string = this.basicStyleElement;
  protected styleElement2: string = this.basicStyleElement;
  protected styleElement3: string = this.basicStyleElement;
  protected styleLine1: string = this.basicStyleLine;
  protected styleLine2: string = this.basicStyleLine;

  constructor() {}

  ngOnInit(): void {
    switch (this.step) {
      case 'type':
        this.styleElement1 = this.accentStyleElement;
        break;
      case 'issue':
        this.styleElement1 = this.accentStyleElement;
        this.styleLine1 = this.accentStyleLine;
        this.styleElement2 = this.accentStyleElement;
        break;
      case 'candidate':
        this.styleElement1 = this.accentStyleElement;
        this.styleLine1 = this.accentStyleLine;
        this.styleElement2 = this.accentStyleElement;
        break;
      case 'result':
        this.styleElement1 = this.accentStyleElement;
        this.styleLine1 = this.accentStyleLine;
        this.styleElement2 = this.accentStyleElement;
        this.styleLine2 = this.accentStyleLine;
        this.styleElement3 = this.accentStyleElement;
    }
  }
}
