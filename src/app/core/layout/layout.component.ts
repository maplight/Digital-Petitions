import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  showMenu: boolean = false;

  constructor(private activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.showMenu = this.activatedroute.snapshot.data['showMenu'];
  }
}
