import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenresponse, LoginResponse, User } from '../interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private http = inject( HttpClient );
private readonly baseUrl: string = environments.baseUrl;
private user?: User;
private _currentUser = signal<User|null>(null)

constructor() {}

get currentUser(): User|undefined {
  if ( !this.user ) return undefined;
  return structuredClone( this.user);
}

checkAuthentication(): Observable<boolean>{
  if ( !localStorage.getItem('token')) return of(false);

  const token = localStorage.getItem('token');

  return this.http.get<User>(`${ this.baseUrl }/users/2`)
  .pipe(
    tap( user => this.user= user ),
    map( user => !!user),
    catchError( err => of(false) )
  )
}

login( email: string, password:string ): Observable<User>{
  return this.http.get<User>(`${ this.baseUrl }/users/2`)
  .pipe(
    tap ( user =>  this.user = user),
    tap ( user => localStorage.setItem('token', 'dfer343.dfs35.sdfs566ghg')),
  )
}

logout(){
  this.user = undefined;
  localStorage.clear();
}

  // register(name: string, email: string, password: string): Observable<Boolean>{
  //   const url = `${ this.baseUrl }/auth/register`;
  //   const body = { name, email, password }
  //   return this.http.post<LoginResponse>( url, body )
  //   .pipe(
  //     map( ({ user, token  }) => this.setAuthentication(user, token)),
  //     catchError( err => throwError( () => err.error.message ))
  //   );
  // }

}
