import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
// for some reason intellisense imported RouterOutlet from '@angular/router/index',
// which does not exist
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    HeaderComponent,
    HomeComponent,
    RouterOutlet
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
