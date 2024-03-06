import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password:['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }
  get confirm_password(){
    return this.registerForm.get('confirm_password');

  }

  get message() {
    return this.registerForm.get('message');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
    } else {
      console.log(this.registerForm)

      this.registerForm.markAllAsTouched();
    }
    
  }
}
