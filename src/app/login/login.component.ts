import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this._formBuilder.group({
    userName: ['admin', Validators.required],
    password: ['12345', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthApiService
  ) { }

  ngOnInit() {

  }

  login() {
    if (this.myForm.valid) {
      const payload = {
        userName: this.myForm.get('userName')?.value,
        password: this.myForm.get('password')?.value,
      }

      this._authService.login(payload);
    }
  }
}
