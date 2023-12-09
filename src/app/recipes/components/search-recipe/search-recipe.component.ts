import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Recipe } from '../../interfaces/recipes.interface_bk';
import { RecipesService } from '../../services/recipes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styles: [
  ]
})
export class SearchRecipeComponent {

  public searchInput = new FormControl('');
  public recipes: Recipe[] = [];
  public selectedRecipe?: Recipe;
  private router = inject( Router);


  constructor( private recipeService: RecipesService){}

  searchRecipe(){
    const value: string = this.searchInput.value || '';

    this.recipeService.getSuggestions( value )
    .subscribe( recipes => this.recipes = recipes);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent): void{
    if ( !event.option.value ){
      this.selectedRecipe = undefined;
      return;
    }

    const recipe: Recipe = event.option.value;
    this.searchInput.setValue( recipe.title );

    this.router.navigateByUrl(`recipes/${ recipe.id }`);

  }

}
