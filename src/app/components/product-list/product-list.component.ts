import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Funko} from '../../Interfaces/funko';
import {ProductComponent} from '../product/product.component';
import {FiguresService} from '../../services/figures.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  funkos: Funko[] = [];
  loading = true;
  errorMessage = '';

  funkoService = inject(FiguresService);


  constructor(private http: HttpClient) {
    this.funkos = this.funkoService.getAllFunkos();
  }

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
}
