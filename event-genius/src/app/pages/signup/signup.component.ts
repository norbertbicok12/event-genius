import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  error: string | null | undefined;


  constructor(private authService: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, fullname, password, confirmPassword } = this.signupForm.value;
      if(confirmPassword !== password) {
        this.error = 'Passwords do not match';
        return;
      }
      this.authService.signup(email, fullname, password)
        .then(result => {
          console.log('Signup successful', result);
          this.router.navigate(['/login']);
          // Navigate to another route or perform additional actions upon successful signup
        })
        .catch(error => {
          this.error = 'Signup error: ' + error;
        });
    } else {
      this.error = 'Form is not valid';
    }
  }

}
