import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../services/auth-service.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  authService = inject(AuthServiceService);
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

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
      error: (err) => {
        console.log(err);
      }

    });

  }
}
