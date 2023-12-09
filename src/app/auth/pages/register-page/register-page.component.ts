import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );
  private user?: User;

  constructor(private snackbar: MatSnackBar,){ }

  public myForm: FormGroup= this.fb.group({
    name:     ['', [ Validators.required ]],
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  })

  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'cerrar', {
      duration: 5000,
    })
  }

  get currentuser(): User{
    const user = this.myForm.value as User;
    return user;
  }

  register(){
    this.authService.register( this.currentuser )
      .subscribe( user => {
        this.showSnackbar(`Se ha registrado correctamente!!!`);
        this.router.navigateByUrl('recipes/login');
      });
      return;

  }
}
