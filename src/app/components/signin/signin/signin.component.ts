import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  public loginInvalid: boolean;



  constructor(
    public fb: FormBuilder,
    public authService: ApiService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      admin_email: [''],
      admin_password: ['']
    })
  }
  
  ngOnInit() { }

  loginUser() {
    this.authService.signInAdmin(this.signinForm.value)
  }
}