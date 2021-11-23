import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-acrobatic-page',
  templateUrl: './single-acrobatic-page.component.html',
  styleUrls: ['./single-acrobatic-page.component.scss'],
})
export class SingleAcrobaticPageComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  }
}
