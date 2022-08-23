import { Pipe, PipeTransform } from '@angular/core';
import { PetitionStatus } from 'src/app/core/api/API';

@Pipe({
  name: 'petitionStatus',
})
export class PetitionStatusPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case PetitionStatus.ACTIVE:
        return 'Active';
        break;
      case PetitionStatus.CANCELED:
        return 'Canceled';
        break;
      case PetitionStatus.NEW:
        return 'Awaiting approval';
        break;
      case PetitionStatus.QUALIFIED:
        return 'Qualified';
        break;
      case PetitionStatus.REJECTED:
        return 'Rejected';
        break;
      case PetitionStatus.WITHDRAWN:
        return 'Withdrawn';
        break;
      default:
        return '';
    }
  }
}
