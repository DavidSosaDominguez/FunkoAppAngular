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
    password: ['', [Validators.required, Validators.minLength(6)]],
    picture: [null as File|null]
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
      this.form.get('picture')?.setValue(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const {name, surname, email, password, picture} = this.form.getRawValue();

    try {
      await this.authService.register(email, password, name, surname, picture);
      this.router.navigate(['/']);
    }catch (error) {
      this.modalService.open(LogInErrorComponent, {
        size: 'lg',
        centered: true
      })
    }
  }
}
