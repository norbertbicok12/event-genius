import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
  }

  onSignup() {
    console.log("signup");
    this.router.navigate(['/signup']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .then(result => {
          console.log('Login successful', result);
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.error('Login failed', error);
          // Handle login error (e.g., show an error message)
        });
    } else {
      console.log('Form is not valid');
    }
  }

  @Input() error: string | null | undefined;
}