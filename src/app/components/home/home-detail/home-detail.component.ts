import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
        //this.ngZone.run(() => this.router.navigateByUrl('/admin/list-user'));
        this.ngZone.run(() => this.router.navigateByUrl('/main/home'));
      } 

    }, err => Swal.fire('Hi',  err, 'warning'))    
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
 

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.userForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Submit book */
  submitUserForm() {
    
  }



}