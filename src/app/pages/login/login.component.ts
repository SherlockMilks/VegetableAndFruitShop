
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/model/User';

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

  constructor() {}

  login() {
    this.loginError = [];

    if(this.email.value==="" || this.password.value===""){

      this.loginError.push('Missing information!');
    }
    else if (this.email.value !== 'test@gmail.com' || this.password.value !== 'test') {

      this.loginError.push('Invalid email or password!');
    } 
    else {
      
      localStorage.setItem('isLoggedIn', 'true');

      
      const user:User={
        email: "test@gmail-com",
        password: "test",
        name: "Test Jones",
        phoneNumber: "+36201111111",
        address:{
          full_adress: "Magyarország, Szeged, Test Utca 45.",
          postal_code: "5631"
        }
      }
      localStorage.setItem('currentUser',JSON.stringify(user));
      
      window.location.href = '/home';
    }
  }
}
