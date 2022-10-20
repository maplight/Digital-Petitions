import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-cualified-box',
  templateUrl: './cualified-box.component.html',
})
export class CualifiedBoxComponent {
  @Input() showDownloadPacket: boolean = false;
}
