import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css']
})
export class NameFormComponent implements OnInit{
  currentUser: User = null;
  nameForm: FormGroup;

  constructor(
    private authService: AuthService
  ) {}

  
  ngOnInit(): void {
    // get current user
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
  }

  get nameFormControls() {
    return this.nameForm.controls
  }

  onSubmit() {
    console.log(this.nameForm.value)
  }
}
