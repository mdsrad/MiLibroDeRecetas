import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email:    ['marta@gmail.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  })

  onLogin(): void{
    const { email, password } = this.myForm.value;

    this.authService.login( email, password )
    .subscribe({
      next: () => this.router.navigateByUrl('/recipes'),
      error: (message) => {
        Swal.fire(
          {
            title: 'Error!',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#FFC436',
          });
      }
    })
  }
}
