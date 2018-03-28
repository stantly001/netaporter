import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdsComponent } from './product-ads.component';

describe('ProductAdsComponent', () => {
  let component: ProductAdsComponent;
  let fixture: ComponentFixture<ProductAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
