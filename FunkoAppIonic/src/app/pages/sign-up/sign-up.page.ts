import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LogInErrorComponent} from "../../components/log-in-error/log-in-error.component";
import {IonicModule, ModalController} from "@ionic/angular";
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {SignInErrorComponent} from "../../components/sign-in-error/sign-in-error.component";
import {SignUpErrorComponent} from "../../components/sign-up-error/sign-up-error.component";

@Component({
  selector: 'sign-up',
  imports: [
    ReactiveFormsModule,
    IonicModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.css']
})
export class SignUpPage {
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);

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
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      const errorMessage = this.getValidationErrorMessage();
      await this.showErrorModal(errorMessage);
      return;
    }

    const { name, surname, email, password, picture } = this.form.getRawValue();

    try {
      await this.authService.register(email, password, name, surname, picture);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Registration error:', error);
      await this.showErrorModal(error.message || 'Error desconocido durante el registro');
    }
  }

  private async showErrorModal(message: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SignUpErrorComponent,
      componentProps: {
        errorMessage: message
      },
      cssClass: 'error-modal'
    });
    await modal.present();
  }

  private getValidationErrorMessage(): string {
    const errors = [];

    if (this.form.get('name')?.errors) {
      if (this.form.get('name')?.errors?.['required']) {
        errors.push('• El nombre es requerido');
      } else if (this.form.get('name')?.errors?.['pattern']) {
        errors.push('• El nombre solo puede contener letras');
      }
    }

    if (this.form.get('surname')?.errors) {
      if (this.form.get('surname')?.errors?.['required']) {
        errors.push('• El apellido es requerido');
      } else if (this.form.get('surname')?.errors?.['pattern']) {
        errors.push('• El apellido solo puede contener letras');
      }
    }

    if (this.form.get('email')?.errors) {
      if (this.form.get('email')?.errors?.['required']) {
        errors.push('• El email es requerido');
      } else if (this.form.get('email')?.errors?.['email']) {
        errors.push('• Email inválido');
      }
    }

    if (this.form.get('password')?.errors) {
      if (this.form.get('password')?.errors?.['required']) {
        errors.push('• La contraseña es requerida');
      } else if (this.form.get('password')?.errors?.['minlength']) {
        errors.push('• La contraseña debe tener al menos 6 caracteres');
      }
    }

    return errors.join('\n');
  }

  private getFirebaseErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso';
      case 'auth/invalid-email':
        return 'Correo electrónico inválido';
      case 'auth/operation-not-allowed':
        return 'Operación no permitida';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil';
      default:
        return 'Error durante el registro. Por favor, inténtalo de nuevo.';
    }
  }
}
