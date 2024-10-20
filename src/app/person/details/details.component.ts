import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';

import {PersonService} from '../person.service';
import {Person} from '../person';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterLink],
  templateUrl: 'details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsPersonComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  
  personService = inject(PersonService);
  person: Person | undefined;

  constructor() {
    const personId = parseInt(this.route.snapshot.params['id'], 10);
    this.personService.getPersonById(personId).subscribe((response) => {
      this.person = response.data;
    });
  }
}