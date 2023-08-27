import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AddNewRecipeComponent } from './pages/add-new-recipe/add-new-recipe.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    RecipePageComponent,
    LayoutPagesComponent,
    ListPageComponent,
    AddNewRecipeComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    MaterialModule,
  ]
})
export class RecipesModule { }
