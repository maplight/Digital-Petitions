import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  showMenu: boolean = false;
  showDemo: boolean = false;

  constructor(
    private activatedroute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.showMenu = this.activatedroute.snapshot.data['showMenu'];
    this.showDemo = this.activatedroute.snapshot.data['showDemo'];
  }
}
