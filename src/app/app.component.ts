import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';


import {HomeComponent} from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, HomeComponent],
  templateUrl: 'app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
