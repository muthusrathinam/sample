import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {


  signupForm! : FormGroup
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  email!: string;
  password!: string;

  constructor(private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstnameSignup: this.formBuilder.control('',[Validators.required,Validators.minLength(2),Validators.maxLength(20), Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)")]),
      lastnameSignup: this.formBuilder.control('',[Validators.required,Validators.minLength(2),Validators.maxLength(20), Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)")]),
      emailSignup: this.formBuilder.control('', [Validators.required,Validators.maxLength(320), Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      mobileSignup: this.formBuilder.control('', [Validators.required,Validators.minLength(4),Validators.maxLength(15),Validators.pattern('[- +()0-9]+')]),
      passwordSignup: this.formBuilder.control('', [Validators.required,Validators.minLength(8),Validators.maxLength(64)])});
  }

  get signup() {
    return this.signupForm.controls;
  }

  userData(){
    console.log("Entered")
    if (this.signupForm.valid) {
      console.log("Valid")
      // Hash the password using SHA-256
      const hashedPassword = this.hashPassword(this.signupForm.value.passwordSignup);

      // Retrieve existing users from local storage
      const existingUsersString = localStorage.getItem('usersData');
      const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

      // Check if the email is already registered
      const isEmailTaken = existingUsers.some((user: any) => user.email === this.signupForm.value.emailSignup);

      if (isEmailTaken) {
        alert('Email is already registered. Please use a different email.');
      } else {
        // Save user data to local storage
        existingUsers.push({
          firstName: this.signupForm.value.firstnameSignup,
          lastName: this.signupForm.value.lastnameSignup,
          email: this.signupForm.value.emailSignup,
          mobile: this.signupForm.value.mobileSignup,
          password: hashedPassword
        });

        localStorage.setItem('usersData', JSON.stringify(existingUsers));
        this.signupForm.reset();

        // Redirect to login page or perform other actions
        alert('Signup successful. Redirecting to login.');
        this.router.navigate(['/login']);

      }
    } else {
      alert('Please fill in all the required fields with valid data.');
    }
  }
  loginPage(){
    this.router.navigate(['/login']);
  }
  hashPassword(password: string): string {
    // Use SHA-256 for password hashing
    return CryptoJS.SHA256(password).toString();
  }
}
