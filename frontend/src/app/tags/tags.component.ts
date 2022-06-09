import { Component, Input, OnInit } from '@angular/core';

export interface Tag {
  id: number;
  name: string;
}

export const tags: Tag[] = [
  { id: 1, name: 'Voimaharjoittelu' },
  { id: 2, name: 'Akrobatia' },
  { id: 3, name: 'Nopeus' },
  { id: 4, name: 'Kestävyys' },
  { id: 5, name: 'Henkinen' },
];

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input()
  tags!: Tag[];
}
