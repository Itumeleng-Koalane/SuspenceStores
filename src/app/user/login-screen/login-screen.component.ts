import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FirstKeyPipe } from "../../Shared/pipes/first-key.pipe";
import { RegisterService } from '../../Shared/services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-screen',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterModule,
    FirstKeyPipe
],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent implements OnInit {
form: FormGroup;
isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, private regService: RegisterService, private toastr: ToastrService, private router: Router){
    this.form = this.formBuilder.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]]
  },{validators: this.passwordMatchValidation});
}
  ngOnInit(): void {
    if(this.regService.isLoggedIn())
      this.router.navigateByUrl('pages/landing-screen');
  }

passwordMatchValidation: ValidatorFn = (control: AbstractControl):null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if(password && confirmPassword && password.value != confirmPassword.value)
  {
    confirmPassword?.setErrors({passwordMismatch:true});
  }
  else
  {
    confirmPassword?.setErrors(null);
  }
    return null;
}

hasDisplayableError(controlName: string): Boolean
{
  const control = this.form.get(controlName);

  return Boolean(control?.invalid) &&
  (this.isSubmitted || Boolean(control?.touched))
}

  onLogin(){
    this.isSubmitted = true;
    if(this.form.valid)
    {
      this.regService.loginUser(this.form.value).subscribe({
        next:(res:any)=>{
          this.regService.saveToken(res.token);
          this.router.navigateByUrl('landing-screen');
          this.form.reset();
          this.isSubmitted = true;
          this.toastr.info('User Logged on','Login successful!');
        },
        error:err=>
          {
          if(err.status == 400)
          {
            this.toastr.error('Email or Password is incorrect!!','Login Failed');
            this.form.reset();
          }
          else
          {
            this.toastr.error('Something went wrong!!','Please try again');
            this.form.reset();
          }
        }
      });
    }
  }
}