import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { Recipe, Ingredientes } from '../../interfaces/recipes.interface_bk';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styles: [
  ]
})
export class AddNewRecipeComponent implements OnInit{

  public grados = [
    { id: 1, desc: '80º'}, { id: 2, desc: '90º'}, { id: 3, desc: '100º'}, { id: 4, desc: '110º'}, { id: 5, desc: '120º'},
    { id: 6, desc: '130º'}, { id: 7, desc: '140º'}, { id: 7, desc: '150º'}, { id: 7, desc: '160º'}, { id: 7, desc: '170º'},
    { id: 7, desc: '180º'}, { id: 7, desc: '190º'}, { id: 7, desc: '200º'}, { id: 7, desc: '210º'}, { id: 7, desc: '220º'},
    { id: 7, desc: '230º'}
  ]

  public medidas = [
    {id: 'Kilogramos', desc: 'Kilogramos' },
    {id: 'Gramos', desc: 'Gramos'},
    {id: 'Litros', desc: 'Litros'},
    {id: 'Mililitros', desc: 'Mililitros'},
    {id: 'Unidad', desc: 'Unidad'},
    {id: 'Medida de yogur', desc: 'Medida de yogur'},
    {id: 'Al gusto', desc: 'Al gusto'}
  ]

  public todosIngredientes: Ingredientes [] = [];
  public miRecipe?: Recipe;

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

  constructor(
    private router: Router,
    private recipeService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
  ){}

  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'cerrar', {
      duration: 5000,
    })
  }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit')) return;
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.recipeService.getRecipeById( id ) ),
    ).subscribe( recipe => {
      if ( !recipe ) return this.router.navigateByUrl('/');

      this.recipeForm.reset( recipe );
      this.miRecipe = recipe;
      return;
    });
  }

    get currentRecipe(): Recipe{
      const recipe = this.recipeForm.value as Recipe;
      return recipe;
    }

    get currentIngredients(): Ingredientes{
      const Ingredientes = this.recipeForm.value as Ingredientes;
      return Ingredientes;
    }


    goBack():void{
      if ( this.router.url.includes('edit')) {
        this.router.navigateByUrl(`recipes/${ this.currentRecipe.id}`);
      }else{
        this.router.navigateByUrl(`recipes/list`);
      }
    }

  onSubmit(){

    if( this.recipeForm.invalid ) return;

    if ( this.currentRecipe.id ){
      for (const item of this.todosIngredientes){
        if ( item ) {
          this.currentRecipe.ingredientes = this.todosIngredientes;
        }
      }

      this.recipeService.updateRecipe( this.currentRecipe )
        .subscribe( recipe => {
          this.showSnackbar(`${ recipe?.title } grabada correctamente!!!`);
          this.router.navigateByUrl(`recipes/${ recipe.id }`);
        });
        return;
    }

    for (const item of this.todosIngredientes){
      if ( item ) {
        this.currentRecipe.ingredientes = this.todosIngredientes;
      }
    }

    this.recipeService.addRecipe( this.currentRecipe )
      .subscribe( recipe => {
        this.showSnackbar(`${ recipe?.title } grabada correctamente!!!`);
        this.router.navigateByUrl('recipes/list');
      })
  }

  addIngrediente(){
    if ( this.currentIngredients.nombre === '' || this.currentIngredients.unidadMedida === '' ) return;
    if ( this.currentIngredients.nombre !== '' && this.currentIngredients.cantidad === '0'  && this.currentIngredients.unidadMedida !== 'Al gusto') return;
    if ( this.currentIngredients.nombre !== '' && this.currentIngredients.cantidad !== '0'  && this.currentIngredients.unidadMedida === 'Al gusto') return;

    if (this.currentIngredients.cantidad !== '0' ){
    this.todosIngredientes.push({
      nombre: this.currentIngredients.nombre,
      unidadMedida: this.currentIngredients.unidadMedida,
      cantidad: this.currentIngredients.cantidad
    });}
    else {
      this.todosIngredientes.push({
        nombre: this.currentIngredients.nombre,
        cantidad: "",
        unidadMedida: this.currentIngredients.unidadMedida
      });
    }
  }

  eliminarIngrediente(nombre: string){
    const ingrAeliminar = nombre;
    const index = this.todosIngredientes.findIndex( x => x.nombre === ingrAeliminar );
    this.todosIngredientes.splice(index, 1);
  }

}
