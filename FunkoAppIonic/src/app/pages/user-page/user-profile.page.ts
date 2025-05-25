import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {FirestoreUser} from '../../interfaces/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {LogInErrorComponent} from "../../components/log-in-error/log-in-error.component";
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'user-page',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.css']
})
export class UserProfilePage implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe(async user => {
      if(user) {
        this.firestoreUser = await this.authService.getCurrentFirestoreUser();
        this.profileImageUrl = this.firestoreUser ? this.firestoreUser.pictureURL : '';
        if(this.firestoreUser) {
          this.form.patchValue({
            name: this.firestoreUser ? this.firestoreUser.name : 'Default',
            surname: this.firestoreUser ? this.firestoreUser.surname : 'Default',
          })
        }
      }else {
        this.firestoreUser = null;
      }
    });
  }
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  modalService = inject(NgbModal);

  firestoreUser: FirestoreUser|null = null;
  userSub?: Subscription;

  profileImageUrl: string | null = null;
  formError: boolean = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    surname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
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
    if (this.form.invalid) {
      this.formError = true;
      return;
    }

    const {name, surname, picture} = this.form.getRawValue();

    try {
      await this.authService.updateCurrentUser(name, surname, picture ?? undefined);
      this.router.navigate(['/']);
    }catch (error) {
      this.modalService.open(LogInErrorComponent, {
        size: 'lg',
        centered: true
      })
    }
  }
}
