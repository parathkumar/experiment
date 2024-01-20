import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LayoutService } from '../services/layout.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports:[CommonModule, MatIconModule,RouterModule,MatSidenavModule, MatListModule]
})
export class SidebarComponent {
  showSidebar:boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private layoutService:LayoutService) {
    layoutService.toggleSidebar.subscribe(
      (toggleSidebar)=>
      {
        this.showSidebar = toggleSidebar;
      }
    )
  }

}
