import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  filters = {
    gender: '',
    club: '',
    country: '',
    minOverall: '',
    maxOverall: '',
    position: '',
    page: 1,
    limit: 20
  };

  applyFilters() {
    this.filters.page = 1;
    this.filtersChanged.emit(this.filters);
  }

  nextPage() {
    this.filters.page++;
    this.filtersChanged.emit(this.filters);
  }

  prevPage() {
    if (this.filters.page > 1) {
      this.filters.page--;
      this.filtersChanged.emit(this.filters);
    }
  }
}
