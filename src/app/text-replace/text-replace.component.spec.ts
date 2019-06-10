import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextReplaceComponent } from './text-replace.component';

describe('TextReplaceComponent', () => {
  let component: TextReplaceComponent;
  let fixture: ComponentFixture<TextReplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextReplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
