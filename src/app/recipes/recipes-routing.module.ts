import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { AddNewRecipeComponent } from './pages/add-new-recipe/add-new-recipe.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';


// localhost:4200/recipes
const routes: Routes = [
  {
    path: '',
    component: LayoutPagesComponent,
    children: [
      { path: 'new-recipe', component: AddNewRecipeComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'edit/:id', component: AddNewRecipeComponent },
      { path: 'list', component: ListPageComponent },
      { path: ':id', component: RecipePageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
