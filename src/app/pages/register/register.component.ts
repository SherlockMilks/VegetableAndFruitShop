import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/model/User';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\+36(1\d{8}|20\d{7}|30\d{7}|70\d{7})$/)]),
    address: new FormGroup({
      full_address: new FormControl('', [Validators.required]),
      postal_code: new FormControl('', [Validators.required]),
    }),
  });
  
  registerError: Array<string>=[];

  constructor(private router: Router, private authService: AuthService) {}

  register(): void {
    this.registerError=[];
    if (this.registerForm.get('email')?.invalid) {
      this.registerError.push("Invalid email!");
    }
    if (this.registerForm.get('phoneNumber')?.invalid) {
      this.registerError.push("Invalid phone number!");
    }
    if (this.registerForm.get('password')?.invalid) {
      this.registerError.push("Invalid password!");
    }

    if (this.registerForm.invalid) {
      this.registerError.push("Please fill in all fields and correct invalid data!");
    }

    const password = this.registerForm.get('password');
    const rePassword = this.registerForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      this.registerError.push("The passwords don't match!");
    }


    if(this.registerError.length!==0) return;

    const userData: Partial<User> = {
      name: this.registerForm.value.name || '',
      email: this.registerForm.value.email || '',
      phoneNumber: this.registerForm.value.phoneNumber || '',
      address:{
        full_adress: this.registerForm.value.address?.full_address || '',
        postal_code: this.registerForm.value.address?.postal_code || ''
      },
      admin_e: false
    };

    const email = this.registerForm.value.email || '';
    const pw = this.registerForm.value.password || '';

    this.authService.signUp(email, pw, userData)
      .then(userCredential => {
        console.log('Registration succesful:', userCredential.user);
        this.authService.signOut().then(() => {
        this.router.navigateByUrl('/login');
    });
      })
      .catch(error => {
        console.error('Registration error:', error);
        
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.registerError.push('This email already in use.');
            break;
          case 'auth/invalid-email':
            this.registerError.push('Invalid email.');
            break;
          case 'auth/weak-password':
            this.registerError.push('The password is too weak. Use at least 6 characters.');
            break;
          default:
            this.registerError.push('An error has occurred during registration. Please try again later.');
        }
    });
  }
}