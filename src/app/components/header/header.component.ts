import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private filterService: FilterService) {}

  toggleFilter(): void {
    this.filterService.toggleVisibility(); // Alterna la visibilidad
  }
}
