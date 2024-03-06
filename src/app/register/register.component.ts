import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../core/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password:['', [Validators.required]],
      message: ['', [Validators.required]],
      
    },
    {
      validator: ConfirmPasswordValidator("password", "confirm_password")
    });
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get email() {
    return this.registrationForm.get('email');
  }
  get confirm_password(){
    return this.registrationForm.get('confirm_password');

  }

  get message() {
    return this.registrationForm.get('message');
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
    }  
  }
}
