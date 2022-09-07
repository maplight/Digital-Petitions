import { PetitionType } from 'src/app/core/api/API';

export interface FilterByType {
  name: string;
  value: PetitionType | undefined;
  active?: boolean;
}
export const FilterByTypeData: FilterByType[] = [
  { name: 'All types', value: undefined, active: true },
  { name: 'Ballot', value: PetitionType.ISSUE, active: false },
  { name: 'Candidate', value: PetitionType.CANDIDATE, active: false },
];
