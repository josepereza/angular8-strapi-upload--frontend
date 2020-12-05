import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  employee= {
    nombre : "",
    poblacion:"",
    telefono:0
  };
  baseURL = "http://localhost:1337/usuarios";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get Users
  

  // Create User
  addUser(employee:any): Observable<any> {
   
    return this.http.post(`${this.baseURL}`, employee)
  }

 
 

}