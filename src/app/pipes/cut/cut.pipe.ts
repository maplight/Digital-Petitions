import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut',
})
export class CutPipe implements PipeTransform {
  transform(value: string, ...args: number[]): string {
    if (value.length > args[0]) {
      return value.substring(0, args[0]) + '...';
    } else {
      return value;
    }
  }
}
