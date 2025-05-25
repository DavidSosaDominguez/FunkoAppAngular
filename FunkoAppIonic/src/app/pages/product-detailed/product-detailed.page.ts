import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.page.html',
  styleUrls: ['./product-detailed.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProductDetailedPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
