import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites = new Set<number>();

  isFavorite(id: number): boolean {
    return this.favorites.has(id);
  }

  toggleFavorite(id: number): void {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
  }

  getFavorites(): number[] {
    return Array.from(this.favorites);
  }
}
