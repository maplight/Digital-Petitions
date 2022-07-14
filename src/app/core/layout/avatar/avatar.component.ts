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
  /*protected url: string =
    'https://scontent-mia3-2.xx.fbcdn.net/v/t1.6435-9/159920232_2805029483068326_8468044973819636209_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0gyKWY-at9oAX9-iCoY&_nc_ht=scontent-mia3-2.xx&oh=00_AT8mHJfHp3NUBIWyfD7KqZoXy1V4IeIv1Ip-SeLu9ZV08w&oe=62F51DC0';
  */
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
