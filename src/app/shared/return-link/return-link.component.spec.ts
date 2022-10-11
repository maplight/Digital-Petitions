import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnLinkComponent } from './return-link.component';

describe('ReturnLinkComponent', () => {
  let component: ReturnLinkComponent;
  let fixture: ComponentFixture<ReturnLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the text received', () => {
    component.text = 'exampleText';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('p').textContent
    ).toEqual('exampleText');
  });
});
