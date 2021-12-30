import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NuevoUsuario} from '../models/nuevo-usuario';
import {Observable} from 'rxjs';
import {Login} from '../models/login';
import {JwtDto} from '../models/Jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = 'http://localhost:8090/auth/';
  constructor(private httpClient: HttpClient) {}
  public nuevo(nuevousuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevousuario);
  }
  public login(loginusuario: Login): Observable<any> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginusuario);
  }
}
