import { Component, Input } from '@angular/core';

@Component({
  selector: 'dp-input-error',
  templateUrl: './input-error.component.html',
})
export class InputErrorComponent {
  @Input() message: string = '';
}
