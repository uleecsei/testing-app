import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyResultsCardComponent } from './my-results-card.component';

describe('MyResultsCardComponent', () => {
  let component: MyResultsCardComponent;
  let fixture: ComponentFixture<MyResultsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyResultsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyResultsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
