import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  error: boolean = false
  loading: boolean = false
  errorMessage = ''

  loginForm: FormGroup
  account: FormControl
  password: FormControl

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.account = this.fb.control('', Validators.required)
    this.password = this.fb.control('', Validators.required)

    this.loginForm = this.fb.group({
      account: this.account,
      password: this.password
    })
  }

  localLogin() {
    this.loading = true
    this.authenticationService.localLogin(this.loginForm.value).subscribe(
      response => {
        this.loading = false
        const role = response.user.role
        localStorage.setItem('token', response.token)
        localStorage.setItem('currentUser', JSON.stringify(response.user))

        this.router.navigate(['/dashboard']);
      },
      error => {
        this.loading = false
        if (error._body == 'Unauthorized') {
          this.error = true
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos.'
        }
      }
    )
  }
}
