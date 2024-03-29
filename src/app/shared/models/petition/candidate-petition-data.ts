import { State } from 'src/app/core/states';

export interface CandidatePetitionData {
  id: number;
  fullName: string;
  office: string;
  party: string;
  address: string;
  aptNumber: string;
  city: string;
  state: State;
  zipCode: string;
  atributes?: {
    type: string;
    status: string;
    currentSign?: number;
    totalSign?: number;
    verifiedSign?: number;
    deadline?: string;
  };
}
