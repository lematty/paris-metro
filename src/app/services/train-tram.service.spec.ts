import { TestBed, inject } from '@angular/core/testing';

import { TrainTramService } from './train-tram.service';

describe('TrainTramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainTramService]
    });
  });

  it('should be created', inject([TrainTramService], (service: TrainTramService) => {
    expect(service).toBeTruthy();
  }));
});
