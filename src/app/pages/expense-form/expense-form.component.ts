import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent {
  expenseForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      price: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  onSubmit() {
    console.log("submit triggered");
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
    }else{
      this.expenseForm.markAllAsTouched();
    }
  }
}
