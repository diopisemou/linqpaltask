import { ApiService } from '../../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'first_name', 'last_name', 'admin_email', 'fulladdress', 'action'];
  

  constructor(private userApi: ApiService) {
    this.userApi.GetAdmins().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteUser(index: number, e){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        
        this.userApi.DeleteAdminUser(e._id).subscribe(res => {
          console.log(res);
          if (res.msg != null && res.sucessdelete == true) {
            const data = this.dataSource.data;
            data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
            this.dataSource.data = data;
            Swal.fire(
              'Removed!',
              'User removed successfully.',
              'success'
            );
          } else {
            Swal.fire(
              'Removed!',
              'Error Try Again !',
              'warning'
            );
          } 
        }, err => Swal.fire('Hi',  err, 'warning'));
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'User still in our database.)',
          'error'
        );
      }
    })
  } 

}