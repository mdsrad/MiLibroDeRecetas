import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipes.interface_bk';

@Component({
  selector: 'recipes-recipe-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input()
  public recipe!: Recipe;

  ngOnInit(): void {
    if ( !this.recipe ) throw Error('Recipe property is requires')
  }
}
