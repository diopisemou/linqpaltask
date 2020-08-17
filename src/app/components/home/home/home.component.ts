import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: ApiService, private router: Router) { }
  ngOnInit() { }

  

  goToRegister() {
    this.router.navigate(['/main/register'], { replaceUrl: true });
  }

}
