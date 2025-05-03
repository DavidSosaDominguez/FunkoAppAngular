import {Component, inject} from '@angular/core';
import {AuthServiceService} from '../../services/auth-service.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';


@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  router = inject(Router);
  authService = inject(AuthServiceService);
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(6)],
  });
  modal = inject(NgbModal);

  onSubmit() {
    const rawForm = this.form.getRawValue();
    this.authService.register(
      rawForm.name,
      rawForm.surname,
      rawForm.email,
      rawForm.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
