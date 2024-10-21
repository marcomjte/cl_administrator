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

  getPerson(text:string): Observable<any> {
    return this.http.get<any>(this.URL_API + '?valueSearch=' + text)
  }

  getPage(url_link:string): Observable<any> {
    return this.http.get<any>(url_link)
  }

  store(name: string, work_company: string, url_web_page: string, note: string, phones:any, emails:any, addresses:any) {
    return this.http.post<any>(this.URL_API, {name:name,work_company:work_company, url_web_page:url_web_page, note:note, phones:phones, emails:emails, addresses:addresses}, httpOptions);
  }

  getPersonById(id: number): Observable<any> {
    return this.http.get<any>(this.URL_API + '/' + id)
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.URL_API + '/' + id)
  }
}