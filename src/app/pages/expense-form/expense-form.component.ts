import { ExpenseService } from './../../core/services/expense.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IExpense } from '../../core/models/common.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;
  expenseId: string = '';

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.expenseForm = this.fb.group({
      price: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.expenseId = params['id'];
        if (this.expenseId) {
          this.getExpense(this.expenseId);
        }
      },
    });

    console.log(this.expenseId);
  }

  getAllExpenses() {
    this.expenseService
      .getAllExpenses()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  onSubmit() {
    console.log('submit triggered');
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
      const expense: IExpense = {
        price: this.expenseForm.value.price,
        title: this.expenseForm.value.title,
        description: this.expenseForm.value.description,
      };
      if (this.expenseId === undefined) {
        console.log('add');
        this.expenseService.addExpense(expense);
      } else {
        console.log('update');
        this.expenseService.updateExpense(this.expenseId, expense);
      }
      this.router.navigate(['/']);
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }

  getExpense(key: string) {
    this.expenseService
      .getExpenseById(key)
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          let expense = data.payload.toJSON() as IExpense;
          this.expenseForm.patchValue({
            price: expense.price,
            title: expense.title,
            description: expense.description,
          });
        },
      });
  }
}
