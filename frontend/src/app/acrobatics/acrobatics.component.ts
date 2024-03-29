import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Exercise } from '../exercises/exercises.component';
import { SortOption } from '../sort-input/sort-input.component';

export interface Acrobatic {
  id: number;
  name: string;
  description: string;
  icon: string;
  difficulty: number;
  exercises: Exercise[];
}

export const acrobatics: Acrobatic[] = [
  { id: 1, name: 'Hyppy', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'settings_accessibility', difficulty: 2, exercises: [] },
  { id: 2, name: 'Seisominen', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'accessibility', difficulty: 1, exercises: [] },
  { id: 3, name: 'Kävely', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'directions_walk', difficulty: 1, exercises: [] },
  { id: 4, name: 'Juoksu', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'directions_run', difficulty: 2, exercises: [] },
  { id: 5, name: 'Heilutus', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'emoji_people', difficulty: 1, exercises: [] },
  { id: 6, name: 'Heitto', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'sports_handball', difficulty: 3, exercises: [] },
  { id: 7, name: 'Nosto', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'sports_kabaddi', difficulty: 4, exercises: [] },
];

@Component({
  selector: 'app-acrobatics',
  templateUrl: './acrobatics.component.html',
  styleUrls: ['./acrobatics.component.scss'],
})
export class AcrobaticsComponent implements OnInit {
  availableAcrobatics = acrobatics;
  sortedAcrobatics: Acrobatic[] = [];
  filteredAcrobatics: Acrobatic[] = [];
  shownAcrobatics: Acrobatic[] = [];

  minDifficulty = 1;
  maxDifficulty = 10;
  query = '';
  currentPage = 0;
  pageSize = 20;
  currentSortBy = 'name';

  sortOptions: SortOption[] = [
    { name: 'NAME', value: 'name' },
    { name: 'DIFFICULTY', value: 'difficulty' },
    { name: 'EMAN', value: 'eman' },
    { name: 'YTLUCIFFID', value: 'ytluciffid' }
  ];

  ngOnInit(): void {
    this.filterAcrobatics();
    this.sortAcrobatics(this.currentSortBy);
  }

  updateMinDifficulty(min: number): void {
    if (min > this.maxDifficulty) {
      this.maxDifficulty = min;
    }
    this.minDifficulty = min;
    this.filterAcrobatics();
  }

  updateMaxDifficulty(max: number): void {
    if (max < this.minDifficulty) {
      this.minDifficulty = max;
    }
    this.maxDifficulty = max;
    this.filterAcrobatics();
  }

  updateQuery(query: string): void {
    this.query = query;
    this.filterAcrobatics();
  }

  filterAcrobatics(): void {
    this.currentPage = 0;
    this.filteredAcrobatics = this.availableAcrobatics.filter(acrobatic => {
      const isWithinDifficultyRange = acrobatic.difficulty >= this.minDifficulty && acrobatic.difficulty <= this.maxDifficulty;
      const doesMatchQuery = acrobatic.name.toLowerCase().includes(this.query.toLowerCase());
      return isWithinDifficultyRange && doesMatchQuery;
    });
    this.sortAcrobatics(this.currentSortBy);
  }

  changePage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.calculateShownAcrobatics();
  }

  calculateShownAcrobatics(): void {
    this.shownAcrobatics = this.sortedAcrobatics.slice(this.currentPage * this.pageSize, this.currentPage * this.pageSize + this.pageSize);
  }

  sortAcrobatics(sortBy: string): void {
    if (sortBy === 'name') {
      this.sortedAcrobatics = this.filteredAcrobatics.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'difficulty') {
      this.sortedAcrobatics = this.filteredAcrobatics.sort((a, b) => a.difficulty - b.difficulty);
    } else if (sortBy === 'eman') {
      this.sortedAcrobatics = this.filteredAcrobatics.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'ytluciffid') {
      this.sortedAcrobatics = this.filteredAcrobatics.sort((a, b) => b.difficulty - a.difficulty);
    }

    this.calculateShownAcrobatics();
  }

  sortMethod(sortBy: string): void {
    this.currentSortBy = sortBy;
    this.filterAcrobatics();
  }
}
