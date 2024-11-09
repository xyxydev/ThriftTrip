import { Component, HostListener, OnInit } from '@angular/core';
import { productImages } from '../products/products.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  selectedCategory: string = 'all';
  products = productImages;
  searchQuery: string = '';

  

  isMobile: boolean = false;

  ngOnInit() {
    this.checkWindowSize(); // Check window size on initialization
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize(); // Check window size on resize
  }

  private checkWindowSize(): void {
    this.isMobile = window.innerWidth <= 480;
  }

  shuffleArray(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }

  filteredProducts() {
    let filtered = this.selectedCategory === 'all' ? this.products : this.products.filter(product => product.category === this.selectedCategory);

    // Filter products based on search query (name of the product)
    if (this.searchQuery) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    if (this.selectedCategory === 'all') {
      // Shuffle products when 'all' is selected
      return this.shuffleArray(filtered);
    }

    return filtered;
  }
}
