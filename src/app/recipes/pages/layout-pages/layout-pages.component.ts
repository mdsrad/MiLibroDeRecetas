import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-pages',
  templateUrl: './layout-pages.component.html',
  styles: [
  ]
})
export class LayoutPagesComponent {

  public sidebarItems = [
    {label: 'Recetas', icon:'label', url:'./list'},
    {label: 'Añadir receta', icon:'add', url:'./new-recipe'},
    {label: 'Buscar', icon:'search', url:'./search'},
  ]
  private authService = inject( AuthService );
  private router = inject( Router);


  get user (): User | undefined{
    return this.authService.currentUser;
  }
  get token () {
    return (localStorage.getItem('token'));
  }

  constructor( private activatedRoute: ActivatedRoute, ){}

  goBack():void{
    this.router.navigateByUrl('recipes/list')
  }
  onLogout(){
    this.authService.logout();
  }

}
