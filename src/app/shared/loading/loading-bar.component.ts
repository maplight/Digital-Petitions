import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'dp-loading-bar',
  templateUrl: './loading-bar.component.html',
})
export class LoadingBarComponent {
  @Input() title: string | undefined;
}
