import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeStyleComponent } from './alternative-style.component';

describe('AlternativeStyleComponent', () => {
  let component: AlternativeStyleComponent;
  let fixture: ComponentFixture<AlternativeStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
