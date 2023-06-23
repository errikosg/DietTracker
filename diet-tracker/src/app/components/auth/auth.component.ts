import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  loginMode: boolean = true;
  submitButtonText: string = "LOGIN";
  changeButtonText: string = "OR SIGNUP";
  form: FormGroup;
  error: string = null;
  subscription: Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.minLength(6), Validators.required])
    })
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    if(this.loginMode){
      // login
      if(email && password)
        this.authService.login({email:email, password:password}).subscribe({
          next: () => this.nextHandler(),
          error: (err) => this.errorHandler(err)
        })
    }
    else{
      // signup
      if(email && password && name){
        this.authService.signup({email:email, password:password, name:name}).subscribe({
          next: () => this.nextHandler(),
          error: (err) => this.errorHandler(err)
        })
      }
    }
    this.form.reset()
  }

  // handlers
  nextHandler(){
    this.error = null;
    this.loginMode = true;
    this.router.navigate(['/'])
  }

  errorHandler(error: string) {
    this.error = error
  }

  onChangeMode() {
    this.loginMode = !this.loginMode;
    if(this.loginMode){
      this.submitButtonText = "LOGIN";
      this.changeButtonText = "OR SIGNUP"
    }
    else{
      this.submitButtonText = "SIGNUP";
      this.changeButtonText = "OR LOGIN"
    }
  }
}
