import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-cualified-box',
  templateUrl: './qualified-box.component.html',
})
export class QualifiedBoxComponent {
  @Input() showDownloadPacket: boolean = false;
}
