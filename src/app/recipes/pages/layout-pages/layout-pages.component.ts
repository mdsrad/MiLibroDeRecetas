import { Component } from '@angular/core';

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

}
