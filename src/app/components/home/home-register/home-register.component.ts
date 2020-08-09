import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatChipInputEvent } from '@angular/material/chips';
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
  // subjectArray: Subject[] = [];
  // SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

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

  // /* Add dynamic languages */
  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   // Add language
  //   if ((value || '').trim() && this.subjectArray.length < 5) {
  //     this.subjectArray.push({ name: value.trim() })
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // /* Remove dynamic languages */
  // remove(subject: Subject): void {
  //   const index = this.subjectArray.indexOf(subject);
  //   if (index >= 0) {
  //     this.subjectArray.splice(index, 1);
  //   }
  // }  

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
        this.successNotification();
      });
    }
  }

  
  successNotification(){
    Swal.fire({
      title: 'Hi',
      text: 'User Succesfully added',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      this.ngZone.run(() => this.router.navigateByUrl('/admin/list-user'))
    })
  } 

  

}