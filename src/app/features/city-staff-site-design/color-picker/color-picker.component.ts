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
import { MatExpansionPanel } from '@angular/material/expansion';
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
  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;

  // Allow panel to be opened/closed
  onColorClick() {
    this.panel?.toggle();
  }

  // Emit color from input
  sendInputColor(_event: Event | null) {
    this.eventColor.emit(this.color);
  }

  // Emit color from palette
  sendColor(value: string | null) {
    this.color = value;
    this.eventColor.emit(value);
  }
}
