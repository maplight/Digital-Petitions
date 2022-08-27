import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogginService {
  constructor() {}
  log(value: any) {
    if (!environment.production) {
      console.log(value);
    }
  }
}
