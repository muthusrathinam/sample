import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loginForm! : FormGroup;
  signupForm! : FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailLogin: this.formBuilder.control('',[Validators.required]),
      passwordLogin: this.formBuilder.control('', [Validators.required])
    });
    this.signupForm = new FormGroup({
      userSignup: this.formBuilder.control('',[Validators.required]),
      emailSignup: this.formBuilder.control('', [Validators.required]),
      mobileSignup: this.formBuilder.control('', [Validators.required, Validators.maxLength(50),Validators.minLength(3),Validators.pattern('^[^\\s].*\\S$')]),
      passwordSignup: this.formBuilder.control('', [Validators.maxLength(5000),Validators.minLength(5),Validators.pattern(/[^\n" "s]/)]),
      dateSignup: this.formBuilder.control('', [Validators.pattern("^(https:\/\/)([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?")])
    });
  }
  get login() {
    return this.loginForm.controls;
  }
  get signup() {
    return this.signupForm.controls;
  }
  loginCheck(){

  }
  userData(){
    
  }
}
