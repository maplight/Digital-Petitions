import {
  PetitionStatus,
  PetitionStatusQuery,
  SignatureStatus,
  SignatureStatusQuery,
} from 'src/app/core/api/API';

export interface FilterByStatus {
  name: string;
  value: PetitionStatusQuery | SignatureStatusQuery | undefined;
  active?: boolean;
}

export const FilterByStatusInactive: FilterByStatus[] = [
  { name: 'All types', value: PetitionStatusQuery.INACTIVE, active: true },
  { name: 'Passed', value: PetitionStatusQuery.QUALIFIED, active: false },
  { name: 'Failed', value: PetitionStatusQuery.NOT_QUALIFIED, active: false },
];
export const FilterByStatusSignatures: FilterByStatus[] = [
  { name: 'All types', value: SignatureStatusQuery.ANY, active: true },
  { name: 'Submited', value: SignatureStatusQuery.SUBMITTED, active: false },
  { name: 'Approved', value: SignatureStatusQuery.APPROVED, active: false },
  { name: 'Denied', value: SignatureStatusQuery.REJECTED, active: false },
  { name: 'Verified', value: SignatureStatusQuery.VERIFIED, active: false },
];
export const FilterByStatusAny: FilterByStatus[] = [
  { name: 'All types', value: PetitionStatusQuery.ANY, active: true },
  { name: 'Passed', value: PetitionStatusQuery.QUALIFIED, active: false },
  { name: 'Failed', value: PetitionStatusQuery.NOT_QUALIFIED, active: false },
  { name: 'Cancelled', value: PetitionStatusQuery.CANCELED, active: false },

  { name: 'Rejected', value: PetitionStatusQuery.REJECTED, active: false },
  { name: 'Active', value: PetitionStatusQuery.ACTIVE, active: false },
  { name: 'Awaiting Approval', value: PetitionStatusQuery.NEW, active: false },

  { name: 'Withdrawn', value: PetitionStatusQuery.WITHDRAWN, active: false },
];
