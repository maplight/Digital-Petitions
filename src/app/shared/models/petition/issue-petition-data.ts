export interface IssuePetitionData {
  title: string;
  text: string;
  atributes?: {
    type: string;
    status: string;
    currentSign?: string;
    totalSign?: string;
  };
}
