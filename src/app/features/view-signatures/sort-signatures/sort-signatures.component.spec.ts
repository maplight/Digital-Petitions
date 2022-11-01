import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SortSignaturesComponent } from './sort-signatures.component';

describe('SortSignaturesComponent', () => {
  let component: SortSignaturesComponent;
  let fixture: ComponentFixture<SortSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortSignaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortSignaturesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show one mat-option element for each item received', () => {
    component.elements = [{ active: true, name: 'email', value: 'email' }];

    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('mat-option').length
    ).toEqual(1);
  });

  it('should show the name of filter recived from container component', () => {
    component.elements = [{ active: true, name: 'email', value: 'email' }];
    component.filterName = 'Filter Example';

    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('mat-label').textContent
    ).toEqual('Filter Example');
  });

  it('should emit a value selected in select element when it is clicked', () => {
    component.event.asObservable().subscribe((data) => {
      expect(data).toEqual('email');
    });
    component.elements = [{ active: true, name: 'email', value: 'email' }];
    component.filterName = 'Filter Example';

    fixture.detectChanges();
    fixture.debugElement
      .queryAll(By.css('mat-option'))[0]
      .triggerEventHandler('click');
  });
});
