import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyErrorComponent } from './buy-error.component';

describe('BuyErrorComponent', () => {
  let component: BuyErrorComponent;
  let fixture: ComponentFixture<BuyErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
