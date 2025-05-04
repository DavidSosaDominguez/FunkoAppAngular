import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInErrorComponent } from './log-in-error.component';

describe('LogInErrorComponent', () => {
  let component: LogInErrorComponent;
  let fixture: ComponentFixture<LogInErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
