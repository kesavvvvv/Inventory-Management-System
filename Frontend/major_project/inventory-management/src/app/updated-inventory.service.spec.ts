import { TestBed } from '@angular/core/testing';

import { UpdatedInventoryService } from './updated-inventory.service';

describe('UpdatedInventoryService', () => {
  let service: UpdatedInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatedInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
