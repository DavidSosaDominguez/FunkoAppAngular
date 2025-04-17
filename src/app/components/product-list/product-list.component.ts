import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { FiguresService } from '../../services/figures.service';
import { Funko } from '../../../funko';

@Component({
  selector: 'app-product-list',
  standalone: true, // 🔥 ¡Lo convertimos en standalone!
  imports: [CommonModule, ProductComponent], // 🔥 Importamos ProductComponent
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  filteredFunkos: Funko[] = [];
  loading = true;
  errorMessage = false;
  searchTerm: string = '';

  constructor(private funkoService: FiguresService) {}

  ngOnInit(): void {
    this.loadAllFunkos();
  }

  private loadAllFunkos(): void {
    this.loading = true;
    this.errorMessage = false;

    this.funkoService.getAllFunkos().subscribe({
      next: (funkos) => {
        this.filteredFunkos = funkos;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = true;
      }
    });
  }
}
