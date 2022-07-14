import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dp-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input()
  public first_name: string = 'Map';
  @Input()
  public last_name: string = 'Ligth';
  @Input()
  public url: string = '';
  protected l_avatar: string =
    this.first_name[0].toUpperCase() + this.last_name[0].toUpperCase();
  constructor() {}

  ngOnInit(): void {
    this.update_avatar();
  }
  private update_avatar() {
    this.l_avatar =
      this.first_name[0].toUpperCase() + this.last_name[0].toUpperCase();
  }
}
