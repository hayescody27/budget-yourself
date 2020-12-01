import { Budget } from './budget';
import { BudgetItem } from './budget-item';

export interface User {
    firstName: string;
    lastName: string;
    uid: string;
    email: string;
    budgets: Budget[];
}
