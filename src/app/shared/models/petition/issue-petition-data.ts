export interface IssuePetitionData {
  title: string;
  text: string;
  atributes?: {
    type: string;
    status: string;
    currentSign?: number;
    totalSign?: number;
    verifiedSign?: number;
    deadline?: string;
  };
}
