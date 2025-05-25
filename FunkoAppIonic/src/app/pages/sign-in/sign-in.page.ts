import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SignInErrorComponent } from '../../components/sign-in-error/sign-in-error.component';
import { IonicModule } from '@ionic/angular';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.css'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, FooterComponent, ReactiveFormsModule]
})
export class SignInPage {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', ],
    password: [''],
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: async (error) => {
        console.log('Error durante el login:', error);
        await this.showErrorModal(error.message || 'Error desconocido');
      }
    });
  }

  private async showErrorModal(message: string) {
    const modal = await this.modalCtrl.create({
      component: SignInErrorComponent,
      componentProps: {
        errorMessage: message
      },
      cssClass: 'error-modal'
    });
    await modal.present();
  }

  goToSignUpPage() {
    this.router.navigate(['/sign-up']);
  }
}
