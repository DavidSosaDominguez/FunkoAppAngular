import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Funko {
  id: number;
  name: string;
  series: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  funkos: Funko[] = [];
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Funko[]>('assets/funkos_data.json').subscribe(
      (data: Funko[]) => {
        this.funkos = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los productos';
        this.loading = false;
      }
    );
  }

  viewProductDetailled(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }
}
