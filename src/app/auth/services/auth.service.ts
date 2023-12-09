import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private http = inject( HttpClient );
private readonly baseUrl: string = environments.baseUrl;
private user?: User;

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

register( recipe: User ): Observable<User>{
  return this.http.post<User>(`${ this.baseUrl }/users`, recipe );
}


}
