import { IssuePetition } from 'src/app/core/api/API';
import { CandidatePetitionData } from '../exports';

export interface ResponsePetition {
  dataIssue?: IssuePetition;
  dataCandidate?: CandidatePetitionData;
}
