
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/model/User';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  loginError: Array<string>=[];
  authSubscription?: Subscription;

  constructor(
     private authService: AuthService, 
     private userService: UserService, 
     private router: Router
  ) {}

  login() {
    this.loginError = [];

    if(this.email.value==="" || this.password.value===""){
      this.loginError.push('Missing information!');
      return;
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';


    this.authService.signIn(emailValue, passwordValue)
    .then(userCredential => {
      console.log('Login successful:', userCredential.user);
      this.authService.updateLoginStatus(true);
      this.userService.getCurrentUserData().subscribe(user => {
      if (user) {
      console.log('User:', user);
      localStorage.setItem('currentUser',JSON.stringify(user))
      }});
      this.router.navigateByUrl('/home');
    })
    .catch(error => {
      console.error('Login error:', error);
        
      switch(error.code) {
        case 'auth/user-not-found':
          this.loginError.push('There is no account with this email address!');
          break;
        case 'auth/wrong-password':
          this.loginError.push('The password is incorrect!');
          break;
        default:
          this.loginError.push('Authentication failed. Please try again!');
      }
    });
  }

    ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}
