import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, catchError, map } from 'rxjs';

import { Person } from './person';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  URL_API = 'http://localhost:8000/api/person';  // URL to web api

  constructor(private http: HttpClient) {}

  /** GET heroes from the server */
  getPerson(text:string): Observable<any> {
    return this.http.get<any>(this.URL_API + '?valueSearch=' + text)
  }

  getPage(url_link:string): Observable<any> {
    return this.http.get<any>(url_link)
  }

  getPersonById(id: number): Observable<any> {
    return this.http.get<any>(this.URL_API + '/' + id)
  }
}