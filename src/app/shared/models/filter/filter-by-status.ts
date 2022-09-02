import { PetitionStatus, PetitionStatusQuery } from 'src/app/core/api/API';

export interface FilterByStatus {
  name: string;
  value: PetitionStatusQuery | undefined;
  active?: boolean;
}
export const FilterByStatusInactive: FilterByStatus[] = [
  { name: 'All types', value: undefined, active: true },
  { name: 'Passed', value: PetitionStatusQuery.QUALIFIED, active: false },
  { name: 'Failed', value: PetitionStatusQuery.NOT_QUALIFIED, active: false },
];
export const FilterByStatusAny: FilterByStatus[] = [
  { name: 'All types', value: undefined, active: true },
  { name: 'Passed', value: PetitionStatusQuery.QUALIFIED, active: false },
  { name: 'Failed', value: PetitionStatusQuery.NOT_QUALIFIED, active: false },
  { name: 'Cancelled', value: PetitionStatusQuery.CANCELED, active: false },
  { name: 'Active', value: PetitionStatusQuery.ACTIVE, active: false },
  { name: 'Awaiting Approval', value: PetitionStatusQuery.NEW, active: false },
  { name: 'Failed', value: PetitionStatusQuery.REJECTED, active: false },
  { name: 'Withdrawn', value: PetitionStatusQuery.WITHDRAWN, active: false },
];
