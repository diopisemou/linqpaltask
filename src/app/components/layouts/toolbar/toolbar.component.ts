import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import {TooltipPosition} from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  opened = true;
  positionOptions: TooltipPosition[] = [ 'below'];
  position = new FormControl(this.positionOptions[0]);
  @Input() clicked: any;
  @Output() toggleEvent = new EventEmitter();
    
  constructor(public authService: ApiService) { }

  ngOnInit() {
    
  }
  
  toggleEventClick() {
    this.toggleEvent.emit(this.clicked);
  }
  
  logout() {
    this.authService.doLogout()
  }
  
}
