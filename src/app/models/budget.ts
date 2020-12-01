import { BudgetItem } from './budget-item';

export interface Budget {
    budgetItems: BudgetItem[];
    budgetName: string;
    budgetStatus: number;

}
