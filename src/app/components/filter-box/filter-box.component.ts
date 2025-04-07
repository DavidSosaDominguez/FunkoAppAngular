import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-box',
  standalone: true,
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
  imports: [CommonModule] // <-- Ensure CommonModule is included
})
export class FilterBoxComponent implements OnInit {
  isVisible: boolean = false; // Estado inicial: oculto
  priceValue: number = 50; // Valor inicial del slider (puedes ajustarlo según lo desees)

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    // Suscribirse al observable del servicio
    this.filterService.isVisible$.subscribe((visible) => {
      this.isVisible = visible; // Actualiza el estado
    });
  }

  onPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.priceValue = Number(input.value); // Actualiza el valor del precio
  }
}
