import { ExpenseItem } from './expense-item';

export interface BudgetItem {
    amount: number;
    description: string;
    expenseItems: ExpenseItem[];
}
