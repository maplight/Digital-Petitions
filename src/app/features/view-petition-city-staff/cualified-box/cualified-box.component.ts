import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-cualified-box',
  templateUrl: './cualified-box.component.html',
})
export class CualifiedBoxComponent implements OnInit {
  @Input() showDownloadPacket: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
