import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuizCardComponent } from './my-quiz-card.component';

describe('MyQuizCardComponent', () => {
  let component: MyQuizCardComponent;
  let fixture: ComponentFixture<MyQuizCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuizCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuizCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
