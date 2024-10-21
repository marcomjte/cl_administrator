import {Component, Input, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import {PersonService} from './person.service';
import {Person} from './person';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'person.component.html',
  styleUrl: './person.component.css'
})

export class PersonComponent {
  personService = inject(PersonService);

  personFilterList: Person[] = [];
  dataResult: any = {
    links : {
      prev :null,
      next :null
    },
    meta:{
      per_page:0,
      total:0,
      from:0,
      to:0
    }
  };
  valueSearch : string = '';

  constructor(private toastr: ToastrService) {
    this.getAll();
  }

  getPage(url_link:string){
    this.personService.getPage(url_link + '&valueSearch=' + this.valueSearch)
      .subscribe((response) => {
        this.dataResult = response;
        this.personFilterList = response.data;
      });
  }

  search(event:any) {
    this.valueSearch = event.target.value;
    this.personService.getPerson(this.valueSearch)
      .subscribe((response) => {
        this.dataResult = response;
        this.personFilterList = response.data;
      },(error) => {
        this.toastr.warning(error, 'Ocurrió un problema', {
          timeOut: 4000,
        });
      });
  }

  getAll(){
    this.personService.getPerson('')
      .subscribe((response) => {
        this.dataResult = response;
        this.personFilterList = response.data;
      },(error) => {
        this.toastr.warning(error, 'Ocurrió un problema', {
          timeOut: 4000,
        });
      });
  }

  delete(index:number, id:number, name:string){
    if(confirm("Estás seguro de borrar el contacto y todos los registros de " + name)) {
      this.personService.delete(id)
        .subscribe((response) => {
          this.personFilterList.splice(index, 1);
        },(error) => {
          this.toastr.warning(error, 'Ocurrió un problema', {
            timeOut: 4000,
          });
        });
    }
  }
}