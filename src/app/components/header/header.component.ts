import { Component, inject } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FiguresService} from '../../services/figures.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private filterService: FilterService, private router: Router, private activatedRoute: ActivatedRoute) { }

  toggleFilter(): void {
    this.filterService.toggleVisibility(); // Alterna la visibilidad
  }
  returnHome(): void {
    this.router.navigate(['']);
  }

}
