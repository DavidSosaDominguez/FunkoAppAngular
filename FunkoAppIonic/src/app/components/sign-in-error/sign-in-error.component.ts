import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-sign-in-error',
  template: `
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>Error</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-icon name="warning" size="large" color="danger"></ion-icon>
      <p>{{ errorMessage }}</p>
    </ion-content>
  `,
  imports: [
    IonToolbar,
    IonHeader,
    IonButtons,
    IonTitle,
    IonButton,
    IonContent,
    IonIcon
  ],
  styles: [`
    ion-content {
      text-align: center;
    }

    ion-icon {
      margin-bottom: 16px;
    }
  `]
})
export class SignInErrorComponent {
  @Input() errorMessage!: string;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
