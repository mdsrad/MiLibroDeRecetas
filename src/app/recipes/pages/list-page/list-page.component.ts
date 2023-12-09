import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipes.interface_bk';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{
  public recipes: Recipe[] = [];

  constructor( private recipesService: RecipesService){

  }
  ngOnInit(): void {
    this.recipesService.getRecipes()
    .subscribe( recipes => this.recipes = recipes );
  }

}
