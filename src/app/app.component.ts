// import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { validatName } from './form.validator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  form!: FormGroup;
  userName!: FormControl;
  lazyUserName!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  email!: FormControl;
  constructor(private fb: FormBuilder) {
    this.initFormControl();
    this.createForm();
  }
  initFormControl() {
    this.userName = new FormControl(
      '',
      [Validators.required],
      [validatName('username')]
    );

    this.lazyUserName = new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [validatName('username')],
      updateOn: 'blur',
    });

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
    ]);

    this.confirmPassword = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    });

    this.email = new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern('.*com$'),
      ],
      asyncValidators: [validatName('email')],
      updateOn: 'blur',
    });
  }

  createForm() {
    this.form = this.fb.group({
      userName: this.userName,
      lazyUserName: this.lazyUserName,
      password: this.password,
      confirmPassword: this.confirmPassword,
      email: this.email,
    });
  }
}
