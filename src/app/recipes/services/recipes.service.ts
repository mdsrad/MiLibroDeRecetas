

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Recipe } from '../interfaces/recipes.interface_bk';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class RecipesService {


  private baseUrl: string= environments.baseUrl;
  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${ this.baseUrl }/recipes`);
  }

  getRecipeById( id: string ): Observable<Recipe|undefined>{
    return this.http.get<Recipe>(`${ this.baseUrl }/recipes/${ id }`)
      .pipe(
        catchError( error => of( undefined) )
    );
  }

  getSuggestions( query: string): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${ this.baseUrl }/recipes?q=${ query }&_limit=12`);
  }

  addRecipe( recipe: Recipe ): Observable<Recipe>{
    return this.http.post<Recipe>(`${ this.baseUrl }/recipes`, recipe );
  }

  updateRecipe( recipe: Recipe ): Observable<Recipe>{
    if ( !recipe.id ) throw Error('Recipe id is required');
    return this.http.patch<Recipe>(`${ this.baseUrl }/recipes/${ recipe.id }`, recipe );
  }

  deleteRecipeById( id: string ): Observable<boolean>{
    return this.http.delete(`${ this.baseUrl }/recipes/${ id }` )
      .pipe(
        catchError( err => of(false)),
        map( resp => true)
      );
  }
}
