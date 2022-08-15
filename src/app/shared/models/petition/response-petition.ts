import { CandidatePetition, IssuePetition } from 'src/app/core/api/API';

export interface ResponsePetition {
  dataIssue?: IssuePetition;
  dataCandidate?: CandidatePetition;
}
