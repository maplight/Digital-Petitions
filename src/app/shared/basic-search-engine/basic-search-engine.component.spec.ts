import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSearchEngineComponent } from './basic-search-engine.component';

describe('BasicSearchEngineComponent', () => {
  let component: BasicSearchEngineComponent;
  let fixture: ComponentFixture<BasicSearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicSearchEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
