import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Subject {
  name: string;
}

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})

export class HomeDetailComponent implements OnInit {

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
    private actRoute: ActivatedRoute,
    private userApi: ApiService,
    private _snackBar: MatSnackBar
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.userApi.GetUser(id).subscribe(data => {
      if (data != null ) {
        this.userForm = this.fb.group({
          first_name: [data.first_name, [Validators.required]],
          last_name: [data.last_name, [Validators.required]],
          user_email: [data.user_email, [Validators.required]],
          fulladdress: [data.fulladdress, [Validators.required]],
          dob: [data.dob, [Validators.required]],
          gender: [data.gender]
        })
      } else {
        //this.openSnackBar("User Not Found", "OK");
        //this.ngZone.run(() => this.router.navigateByUrl('/admin/list-user'));
      } 

    })    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
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
    
  }

}