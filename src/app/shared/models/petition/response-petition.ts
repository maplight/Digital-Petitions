import { IssuePetitionData, CandidatePetitionData } from '../exports';

export interface ResponsePetition {
  dataIssue?: IssuePetitionData;
  dataCandidate?: CandidatePetitionData;
}
