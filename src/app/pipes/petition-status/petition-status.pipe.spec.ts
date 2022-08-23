import { PetitionStatusPipe } from './petition-status.pipe';

describe('PetitionStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new PetitionStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
