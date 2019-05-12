import { TestBed, inject } from '@angular/core/testing';

import { TransportDataService } from './transport-data.service';

describe('TransportDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportDataService]
    });
  });

  it('should be created', inject([TransportDataService], (service: TransportDataService) => {
    expect(service).toBeTruthy();
  }));
});
