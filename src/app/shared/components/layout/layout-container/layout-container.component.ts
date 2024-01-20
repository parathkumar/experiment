import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,HeaderComponent]
})
export class LayoutContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
