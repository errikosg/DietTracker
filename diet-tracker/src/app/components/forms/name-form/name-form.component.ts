import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css']
})
export class NameFormComponent implements OnInit, OnDestroy{
  currentUser: User = null;
  nameForm: FormGroup;
  error: string = null;
  subscription$: Subscription;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  
  ngOnInit(): void {
    // get initial user
    this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        this.currentUser = user

        // initialize form
        this.nameForm = new FormGroup({
          'name': new FormControl(this.currentUser.name, Validators.required)
        })
      })
    ).subscribe()

    // setup subscription
    this.subscription$ = this.authService.currentUser$.subscribe(user => {
      if(user) {
        this.currentUser = user
      }
    })
  }

  get nameFormControls() {
    return this.nameForm.controls
  }

  onSubmit() {
    const {name} = this.nameForm.value
    this.authService.updateName(name).subscribe({
      next: () => this.nextHandler(),
      error: (err) => this.errorHandler(err)
    })
  }

  nextHandler() {
    this.error = null;
    this.snackBar.open("Username updated successfully", null, { duration: 1500 });
  }

  errorHandler(err: string){
    this.error = err;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
