import { state } from 'src/app/core/states';

export interface CandidatePetitionData {
  fullName: string;
  office: string;
  party: string;
  address: string;
  aptNumber: string;
  city: string;
  state: state;
  zipCode: string;
  atributes?: {
    type: string;
    status: string;
    currentSign?: string;
    totalSign?: string;
  };
}
