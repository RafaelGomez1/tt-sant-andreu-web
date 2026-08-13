import { apiRequest } from './client';

export interface FinanceResponse {
  totalBalance: number;
  income: {
    total: number;
    memberCount: number;
    breakdown: {
      casual: number;
      academyBeginner: number;
      academyIntermediate: number;
      competition: number;
    };
  };
  expenses: {
    total: number;
    breakdown?: {
      BeginnerCoaching: number;
      IntermediateCoaching: number;
      CompetitionCoaching: number;
    };
  };
}

export async function getCurrentFinance(): Promise<FinanceResponse> {
  return await apiRequest<FinanceResponse>('/finances/current');
}
