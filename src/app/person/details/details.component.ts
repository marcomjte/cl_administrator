import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';

import {MatTabsModule} from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';

import {PersonService} from '../person.service';
import {Person} from '../person';

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

  constructor(private toastr: ToastrService) {
    const personId = parseInt(this.route.snapshot.params['id'], 10);
    this.personService.getPersonById(personId).subscribe((response) => {
      this.person = response.data;
    },(error) => {
      this.toastr.warning(error, 'Ocurrió un problema', {
        timeOut: 4000,
      });
    });
  }
}