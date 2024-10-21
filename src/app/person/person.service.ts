import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import { Observable, catchError, map, throwError } from 'rxjs';

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
      .pipe(catchError(this.handleError));
  }

  getPersonById(id: number): Observable<any> {
    return this.http.get<any>(this.URL_API + '/' + id)
      .pipe(catchError(this.handleError));
  }

  getPage(url_link:string): Observable<any> {
    return this.http.get<any>(url_link)
      .pipe(catchError(this.handleError));
  }

  store(name: string, work_company: string, url_web_page: string, note: string, phones:any, emails:any, addresses:any) {
    return this.http.post<any>(this.URL_API, {name:name,work_company:work_company, url_web_page:url_web_page, note:note, phones:phones, emails:emails, addresses:addresses}, httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(id: number, name: string, work_company: string, url_web_page: string, note: string, phones:any, emails:any, addresses:any) {
    return this.http.put<any>(this.URL_API + '/' + id, {name:name,work_company:work_company, url_web_page:url_web_page, note:note, phones:phones, emails:emails, addresses:addresses}, httpOptions)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.URL_API + '/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let _error = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      _error += 'El servidor no responde:' + error.error;
    } else {
      // Si la respuesta es de validaciones de laravel
      if (error.error.message.name && Array.isArray(error.error.message.name)) {
         error.error.message.name.forEach(function(item:string){
           _error += item;
         })
      }

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      _error += `Backend returned code ${error.status} `;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(_error));
  }
}