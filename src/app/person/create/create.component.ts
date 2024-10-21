import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';

import { PersonService } from '../person.service';
import { Person } from '../person';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreatePersonComponent {
  personService = inject(PersonService);
  person: Person | undefined;
  person_v = { name: "" };

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    work_company: new FormControl(''),
    url_web_page: new FormControl(''),
    note: new FormControl(''),
    phones: new FormArray([
      new FormControl()
    ]),
    emails: new FormArray([
      new FormControl()
    ]),
    addresses: new FormArray([
      new FormControl()
    ])
  });

  constructor(private toastr: ToastrService) {
    this.clearArrayForms();
  }

  submitApplication() {
    this.personService.store(
      this.form.value.name ?? '',
      this.form.value.work_company ?? '',
      this.form.value.url_web_page ?? '',
      this.form.value.note ?? '',
      this.form.value.phones ?? '',
      this.form.value.emails ?? '',
      this.form.value.addresses ?? ''
    ).subscribe((response) => {
      this.toastr.success(response.message, 'Solicitud realizada correctamente', {
        timeOut: 4000,
      });
      this.form.reset();
      this.clearArrayForms();
    },(error) => {
      this.toastr.warning(error, 'Ocurrió un problema', {
        timeOut: 4000,
      });
    });
  }

  getValidity(index:number, name:string) {
    return (<FormArray>this.form.get(name)).controls[index].invalid;
  }

  clearArrayForms(){
    while (this.form.controls['phones'].length !== 0) {
      this.form.controls['phones'].removeAt(0)
    }
    while (this.form.controls['emails'].length !== 0) {
      this.form.controls['emails'].removeAt(0)
    }
    while (this.form.controls['addresses'].length !== 0) {
      this.form.controls['addresses'].removeAt(0)
    }
  }

  addPhone () {
    this.form.controls.phones.push(new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
  }

  removePhone (index:number) {
    this.form.controls['phones'].removeAt(index);
  }

  addEmail () {
    this.form.controls.emails.push(new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]));
  }

  removeEmail (index:number) {
    this.form.controls['emails'].removeAt(index);
  }

  addAddress () {
    this.form.controls.addresses.push(new FormControl());
  }

  removeAddress (index:number) {
    this.form.controls['addresses'].removeAt(index);
  }
}
