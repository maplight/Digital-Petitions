import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewPetitionNameService {
  data: { [id: string]: string } = {};

  constructor() {}

  getTitle(id: string) {
    return this.data[id];
  }

  setTitle(id: string, title: string) {
    this.data[id] = title;
  }
}
