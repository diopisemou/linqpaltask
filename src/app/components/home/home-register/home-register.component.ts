import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-home-register',
  templateUrl: './home-register.component.html',
  styleUrls: ['./home-register.component.css']
})

export class HomeRegisterComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetUserForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userForm: FormGroup;

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userApi: ApiService
  ) { }

  
  /* Reactive book form */
  submitBookForm() {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      user_email: ['', [Validators.required]],
      fulladdress: ['', [Validators.required]],
      ssn: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }


  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.userForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitUserForm() {
    if (this.userForm.valid) {
      this.userApi.AddUser(this.userForm.value).subscribe(res => {
        console.log(res);
        if (res.result._id != null && res.sucesslogin == true) {
          this.successNotification();
        } else {
          this.errorNotification(res.message)
        }
        
      }, err => Swal.fire('Hi',  err, 'warning'));
    }
  }

  
  successNotification(){
    Swal.fire({
      title: 'Hi',
      text: 'User Succesfully added',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      this.ngZone.run(() => this.router.navigateByUrl('/admin/list-user'))
    })
  } 

  errorNotification(message){
    Swal.fire({
      title: 'Hi',
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK',
    }).then(() => {
      
    })
  } 

  

}