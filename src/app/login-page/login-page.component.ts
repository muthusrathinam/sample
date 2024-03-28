import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm! : FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailLogin: this.formBuilder.control('', [Validators.required,Validators.maxLength(320), Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      passwordLogin: this.formBuilder.control('', [Validators.required,Validators.minLength(8),Validators.maxLength(64)])});
  }
  get login() {
    return this.loginForm.controls;
  }

  loginCheck(){
    if (this.loginForm.valid) {
      if (this.userCheck()) {
        // Login successful, you can redirect or perform any action here
        this.loginForm.reset();
        alert('Login successful!');

        this.router.navigate(['/homepage']); // Change the route as needed
      } else {
        // Invalid email or password
        alert('Invalid email or password. Please try again.');
      }
    } else {
      // Form is invalid
      alert('Please fill in all the required fields with valid data.');
    }
  }
  userCheck(){
    const existingUsersString = localStorage.getItem('usersData');
    const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
    const user = existingUsers.find((u: any) => u.email === this.loginForm.value.emailLogin);
    return user && user.password === this.hashPassword(this.loginForm.value.passwordLogin);
  }
  signupPage(){
    this.router.navigate(['/signup']);
  }
  hashPassword(password: string): string {
    // Use SHA-256 for password hashing (assuming the same hashing algorithm used during signup)
    return CryptoJS.SHA256(password).toString();
  }

}
