import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Acrobatic, acrobatics } from '../acrobatics.component';

@Component({
  selector: 'app-single-acrobatic-page',
  templateUrl: './single-acrobatic-page.component.html',
  styleUrls: ['./single-acrobatic-page.component.scss'],
})
export class SingleAcrobaticPageComponent {
  acrobatic: Acrobatic;

  constructor(private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.acrobatic = acrobatics.find(acrobatic => acrobatic.id === id)!;
  }
}
