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
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      price: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {}

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
      this.expenseService.addExpense(expense);
      this.router.navigate(['/']);
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }
}
