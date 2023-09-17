import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { __importDefault } from 'tslib';

@Component({
  selector: 'dp-color-picker',
  templateUrl: './color-picker.component.html',
})
export class ColorPickerComponent implements OnInit {
  ngOnInit(): void {
    this.eventColor.emit(this.color);
  }
  protected hue!: string | null;
  @Input() color!: string | null | undefined;
  @Output() eventColor: EventEmitter<string | null> = new EventEmitter();

  // Emit color from input
  sendInputColor(event: Event | null) {
    const target = event?.target as HTMLInputElement;
    this.eventColor.emit(target.value);
  }

  // Emit color from palette
  sendColor(value: string | null) {
    this.color = value;
    this.eventColor.emit(value);
  }
}
