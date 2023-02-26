import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../../domain/login';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.APIjogador;

  logados: Login[] = []; 

  constructor(private $http: HttpClient) { }


  authenticate(login: Login): Observable<Login> {
    return this.$http.post<Login>(`${this.API}/login`, login);
  }

  isAuthenticated(): boolean {
    console.log(this.logados)
    if (this.logados.length != 0) {
      return true;
    } else {
      return false;
    }
  }

  addUser(user: Login){
    this.logados.push(user);
    console.log(this.logados)
  }

  logout() {
    delete this.logados[0];
  }
}
