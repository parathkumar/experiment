import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule]
})
export class HeaderComponent implements OnInit {
  toggleSidebarValue:boolean = false;
  constructor(private layoutService:LayoutService,private _router:Router) { 
    
  }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.toggleSidebarValue = !this.toggleSidebarValue;
    this.layoutService.toggleSidebar.emit(this.toggleSidebarValue);
  }

  logout(){
    localStorage.removeItem("jwt");
    this._router.navigateByUrl("/auth/login")
  }
}
