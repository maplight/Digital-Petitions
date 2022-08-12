import { state } from 'src/app/core/states';
import { SignaturePetitionType } from './signature-petition-type';

export interface SignaturePetitionData {
  fullName: string;
  address: string;
  city: string;
  state: state;
  zipCode: string;
  verify?: SignaturePetitionType;
}
