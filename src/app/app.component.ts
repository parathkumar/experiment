import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe,JsonPipe, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private readonly supabase: AuthService) {}
  session$ = this.supabase.session$;
  ngOnInit(){
    this.supabase.listenAuthChanges()
  }
}
