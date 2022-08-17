export interface IssuePetitionData {
  id: number;
  title: string;
  detail: string;
  atributes?: {
    type: string;
    status: string;
    currentSign?: number;
    totalSign?: number;
    verifiedSign?: number;
    deadline?: string;
  };
}
