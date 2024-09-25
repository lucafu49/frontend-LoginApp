import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl : string = "http://www.loginapp.somee.com/api/";

  constructor(private http: HttpClient) { }

  getClient():Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiUrl}Client/Clients`);
  }

  getClientById(id : number):Observable<Client>{
    return this.http.get<Client>(`${this.apiUrl}Client/${id}`);
  }
  registerClient(request:Client):Observable<Client>{
    return this.http.post<Client>(`${this.apiUrl}Client/Register`,request)
  }
  loginClient(email:string,password:string):Observable<any>{
    const request = {
      mail: email,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}Client/Login`,request);
  }
}
