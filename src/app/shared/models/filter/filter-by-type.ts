import { PetitionType } from 'src/app/core/api/API';

export interface FilterByType {
  name: string;
  value: PetitionType | undefined | 'ANY';
  active?: boolean;
}
export const FilterByTypeData: FilterByType[] = [
  { name: 'All types', value: 'ANY', active: true },
  { name: 'Ballot', value: PetitionType.ISSUE, active: false },
  { name: 'Candidate', value: PetitionType.CANDIDATE, active: false },
];
