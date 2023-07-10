import { Component, ElementRef, Input, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-custom-password',
  templateUrl: './custom-password.component.html',
  styleUrls: ['./custom-password.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomPasswordComponent),
    multi: true,
  }]
})
export class CustomPasswordComponent implements ControlValueAccessor, OnDestroy{
  _onChanged: Function = () => {};
  _onTouched: Function = () => {};
  @Input() passwordFormGroup: FormGroup;
  @Input() controlName: string;
  @ViewChild('passInput') passInput: ElementRef
  subscription: Subscription

  //eye icons
  isShowing: boolean = false; 
  faEye=faEye; faEyeSlash=faEyeSlash

  registerOnChange(fn: (value: any) => void) {
    this.subscription = this.passwordFormGroup.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: Function) {
    this._onTouched = fn;
  }
  writeValue(value: string | null): void {
    if(value) {
      this.passwordFormGroup.setValue({password:value})
    }
  }

  isValid() {
    return (!this.passwordFormGroup.get(this.controlName).valid && this.passwordFormGroup.get(this.controlName).touched)
  }

  onShowPassword() {
    this.isShowing = !this.isShowing
    this.passInput.nativeElement.type = this.isShowing ? "text" : "password"
  }

  getIcon() {
    if(this.isShowing) return faEye;
    else return faEyeSlash;
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe()
  }
}
