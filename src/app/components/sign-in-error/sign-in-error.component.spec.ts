import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInErrorComponent } from './sign-in-error.component';

describe('SignInErrorComponent', () => {
  let component: SignInErrorComponent;
  let fixture: ComponentFixture<SignInErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
