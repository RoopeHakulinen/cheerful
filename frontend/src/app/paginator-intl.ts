import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {

  constructor(private translate: TranslateService) {
    this.translate.getTranslation(this.translate.currentLang).subscribe((translations) => this.updateTranslations(translations));
    this.translate.onLangChange.subscribe((event) => this.updateTranslations(event.translations));
  }

  updateTranslations(translations: any): void {
    this.itemsPerPageLabel = translations['PAGINATION']['ITEMS_PER_PAGE'];
    this.nextPageLabel = translations['PAGINATION']['NEXT_PAGE'];
    this.previousPageLabel = translations['PAGINATION']['PREVIOUS_PAGE'];
    this.firstPageLabel = translations['PAGINATION']['FIRST_PAGE'];
    this.lastPageLabel = translations['PAGINATION']['LAST_PAGE'];
    this.changes.next();
  }

  changes = new Subject<void>();

  firstPageLabel = '';
  itemsPerPageLabel = '';
  lastPageLabel = '';
  nextPageLabel = '';
  previousPageLabel = '';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translate.instant(`PAGINATION.PAGE_1_OF_1`);
    }
    const amountPages = Math.ceil(length / pageSize);
    return this.translate.instant(`PAGINATION.PAGE_N_OF_M`,{page: page + 1, numberOfPages: amountPages});
  }
}