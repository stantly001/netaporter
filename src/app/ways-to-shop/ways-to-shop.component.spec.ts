import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaysToShopComponent } from './ways-to-shop.component';

describe('WaysToShopComponent', () => {
  let component: WaysToShopComponent;
  let fixture: ComponentFixture<WaysToShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaysToShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaysToShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
