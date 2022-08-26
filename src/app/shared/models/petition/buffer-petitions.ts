import { ResponsePetition } from './response-petition';

export interface BufferPetition {
  cursor?: string;
  items: ResponsePetition[];
}
