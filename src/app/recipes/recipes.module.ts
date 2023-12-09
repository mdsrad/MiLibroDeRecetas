import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AddNewRecipeComponent } from './pages/add-new-recipe/add-new-recipe.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { RecipeImagePipe } from './pipes/recipe-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';
import { RecipesLayoutComponent } from './layouts/recipes-layout/recipes-layout.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    RecipePageComponent,
    LayoutPagesComponent,
    ListPageComponent,
    AddNewRecipeComponent,
    SearchPageComponent,
    CardComponent,
    RecipeImagePipe,
    SearchRecipeComponent,
    RecipesLayoutComponent,
    ConfirmDialogComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    MaterialModule,
  ]
})
export class RecipesModule { }
