import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../core/models/login.model';
import { ScopeEnum } from '../core/enums/login-status.code.enum';
import { AuthService } from '../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public hidePassword = true;
  public loginForm!: FormGroup;
  public isPassword: boolean = true;
  public passwordType = 'password';
  public isFocused = false;
  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const submittedForm: any = this.loginForm.value as LoginModel;
      this.isLoading = true;
      this.authService.login(submittedForm).subscribe(
        (response: any) => {
          if (response.status === true) {
            this.toaster.success(response.message, 'Success');
            this.isLoading = false;
            const adminLogin = response.data;
            const hasScope = adminLogin.role === ScopeEnum.scope_id1;
            if (hasScope) {
              localStorage.setItem('auth_token', response.token);
              this.router.navigate(['/home']);
            }
          }
          else {
            this.isLoading = false;
            this.toaster.error(response.message, 'Error');
          }
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
