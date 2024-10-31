import { TestBed } from '@angular/core/testing';

import { CartItemServicesService } from './cart-item-services.service';

describe('CartItemServicesService', () => {
  let service: CartItemServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartItemServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
