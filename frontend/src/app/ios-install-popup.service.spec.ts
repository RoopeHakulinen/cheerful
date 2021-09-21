import { inject, TestBed } from '@angular/core/testing';
import { IosInstallService } from './ios-install-popup.service';

describe('IosInstallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IosInstallService]
    });
  });

  it('should be created', inject([IosInstallService], (service: IosInstallService) => {
    expect(service).toBeTruthy();
  }));
});
