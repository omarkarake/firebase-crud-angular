import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { IExpense } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private dbPath = '/expenses';
  expensesRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.expensesRef = db.list(this.dbPath);
  }

  getAllExpenses() {
    return this.expensesRef;
  }

  addExpense(expense: IExpense) {
    return this.expensesRef.push(expense);
  }

  getExpenseById(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  deleteExpense(key: string) {
    return this.expensesRef.remove(key);
  }

  updateExpense(key: string, expense: IExpense) {
    return this.expensesRef.update(key, expense);
  }
}
