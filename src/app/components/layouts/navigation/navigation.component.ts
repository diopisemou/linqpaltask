import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone, HostListener, AfterViewInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';




@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements AfterViewInit {

  opened = true;
  fixedTopGap = 55;
  data: any = {};
  @ViewChild('sidenav') sidenav: MatSidenav;
  
  constructor(public authService: ApiService) { }

  updateData(d) {
    this.sidenav.toggle();
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.fixedTopGap = 55;
      this.opened = true;
    }  
  }
  
  ngAfterViewInit() {
    // this.sidenav.ngAfterContentInit = () => {
    //   if (window.innerWidth < 768) {
    //     this.sidenav.fixedTopGap = 55;
    //     this.opened = false;
    //   } else {
    //     this.sidenav.fixedTopGap = 55;
    //     this.opened = true;
    //   }
    // }    
  }

  

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

 

}