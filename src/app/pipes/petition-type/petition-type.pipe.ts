import { Pipe, PipeTransform } from '@angular/core';
import { PetitionType } from 'src/app/core/api/API';

@Pipe({
  name: 'petitionType',
})
export class PetitionTypePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value === PetitionType.CANDIDATE ? 'Candidate' : 'Issue';
  }
}
