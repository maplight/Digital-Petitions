import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivePetitionsComponent } from './inactive-petitions.component';

describe('InactivePetitionsComponent', () => {
  let component: InactivePetitionsComponent;
  let fixture: ComponentFixture<InactivePetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactivePetitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivePetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
