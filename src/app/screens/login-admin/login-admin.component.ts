import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent implements OnInit {
  // tạo reactive form object
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  submitForm() {
    const student = { ...this.loginForm.value };
    console.log(this.loginForm.value);
  }
  googleLogin() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((resp) => {
        console.log(resp);
        this.authService.login(resp.email, resp.id).subscribe((data) => {
          console.log('google login', data);
          if (data) {
            this.router.navigate(['/admin']);
          } else {
            alert('Account not exists!');
          }
        });
      });
  }
}
