import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, filter, switchMap } from 'rxjs';
import { Ingredientes, Recipe } from '../../interfaces/recipes.interface_bk';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styles: [
  ]
})
export class RecipePageComponent implements OnInit{

  //public recipe?: Recipe;
  public todosIngredientes: Ingredientes [] = [];

  constructor(
    private recipeService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
  ){}

  public recipeForm = new FormGroup({
    id:               new FormControl<string>(''),
    title:            new FormControl<string>('', { nonNullable: true }),
    tipo:             new FormControl<string>(''),
    tiempoElaboracion:new FormControl<number>(0),
    tiempoTotal:      new FormControl<number>(0),

    // INGREDIENTES

    nombre:           new FormControl<string>(''),
    unidadMedida:     new FormControl<string>(''),
    cantidad:         new FormControl<string>(''),

    preparacion:      new FormControl<string>(''),
    grados:           new FormControl<string>(''),
    tiempoCoccion:    new FormControl<number>(0),
    alt_image:        new FormControl<string>(''),
  });

  get currentRecipe(): Recipe{
    const recipe = this.recipeForm.value as Recipe;
    return recipe;
  }

  get currentIngredients(): Ingredientes{
    const Ingredientes = this.recipeForm.value as Ingredientes;
    return Ingredientes;
  }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.recipeService.getRecipeById( id ) ),
    ).subscribe( recipe => {

      if( !recipe ) {
        return this.router.navigateByUrl('/');
      }
      this.recipeForm.reset( recipe );
      return;
    });
  }

      //   this.recipe.ingrediente.split(', ').forEach(element => {
      //     console.log(element);
      //   });

      //   this.recipe.cantidad.split(', ').forEach(element => {
      //     console.log(element);
      //   });

      //   this.recipe.unidadMedida.split(', ').forEach(element => {
      //     console.log(element);
      //   });




  goBack():void{
    this.router.navigateByUrl('recipes/list')
  }

  onDeleteRecipe(){
    if( !this.currentRecipe.id) throw Error('Recipe id is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.recipeForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean ) => result),
        switchMap( () =>  this.recipeService.deleteRecipeById( this.currentRecipe.id)),
        filter( (wasDeleted: boolean ) => wasDeleted)
      )
      .subscribe(result => {
        this.router.navigate(['/recipes']);
      })
  }

  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'cerrar', {
      duration: 5000,
    })
  }
}
