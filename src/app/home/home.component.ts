import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonComponent} from '../person/person.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PersonComponent],
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
}