import { TestBed, inject } from '@angular/core/testing';

import { MetroService } from './metro.service';

describe('MetroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetroService]
    });
  });

  it('should be created', inject([MetroService], (service: MetroService) => {
    expect(service).toBeTruthy();
  }));
});
