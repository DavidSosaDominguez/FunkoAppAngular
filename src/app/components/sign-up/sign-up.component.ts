import {Component, inject} from '@angular/core';
import {AuthServiceService} from '../../services/auth-service.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LogInErrorComponent} from '../log-in-error/log-in-error.component';


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
  modalService = inject(NgbModal);

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
      error: () => {
        this.modalService.open(LogInErrorComponent, {
          size: 'lg',
          centered: true
        })
      }
    })
  }
}
