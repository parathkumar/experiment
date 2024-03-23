import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatError, MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "@core/services";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatButton,
    MatCard,
    MatInput,
    MatIcon,
    MatProgressSpinner,
    NgIf,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm =  this.fb.group({
    email: new FormControl<string>("",{validators: [Validators.required, Validators.email],nonNullable: true}),
    password: new FormControl<string>("", {validators: [Validators.required, Validators.minLength(6)], nonNullable: true})
  });
  forgotPasswordLoader: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    //this.setupForm();
  }

  // setupForm() {
  //   this.loginForm = this.fb.group({
  //     email: ["", [Validators.required, Validators.email]],
  //     password: ["", [Validators.required, Validators.minLength(6)]],
  //   });
  // }
  onLogin() {
    if(this.loginForm.invalid) return;
    const formValues = {...this.loginForm.getRawValue()};
    const {email,password} = formValues;
    this.authService.signIn(email,password).subscribe(
      (response) => {
        this.router.navigate(["/dashboard"]);
      },
      (err) => {  
        if (err.status == 401) {
          this._snackbar.open("Invalid credentials", "Try Again");
        } else {
          this._snackbar.open("Error Occured", "Try Again");
        }
      }
    );
  }
  ForgotPassword() {
    if (this.loginForm.value?.email) {
      let postObj = {
        Username: this.loginForm.value?.email,
        Password: this.loginForm.value?.password,
      };
      this.forgotPasswordLoader = true;
      console.log(postObj);
      // this.authService.forgotPassword(postObj).subscribe(
      //   (response) => {
      //     this.forgotPasswordLoader = false;
      //     if (response) {
      //       this._snackbar.open("Please check your mail", "Ok");
      //     } else {
      //       this._snackbar.open("Account Not Found", "Ok");
      //     }
      //   },
      //   (err) => {
      //     this._snackbar.open("Error Occured", "Try again");
      //   }
      // );
    }
  }
}
