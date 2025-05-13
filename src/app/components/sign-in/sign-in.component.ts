import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SignInErrorComponent} from '../sign-in-error/sign-in-error.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  modalService = inject(NgbModal);

  constructor(private router: Router) {
  }

  goToSignUpPage() {
    this.router.navigate(['/sign-up']);
  }

  onSubmit() {
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.modalService.open(SignInErrorComponent, {
          size: 'lg',
          centered: true,
        })
      }

    });

  }
}
