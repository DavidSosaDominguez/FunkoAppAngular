import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogInErrorComponent } from '../log-in-error/log-in-error.component';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  modalService = inject(NgbModal);

  profileImageUrl: string | null = null;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    surname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  selectImage(): void {
    const fileInput = document.getElementById('select-picture-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.register(
      rawForm.name,
      rawForm.surname,
      rawForm.email,
      rawForm.password
    ).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.modalService.open(LogInErrorComponent, {
          size: 'lg',
          centered: true
        });
      }
    });
  }
}
