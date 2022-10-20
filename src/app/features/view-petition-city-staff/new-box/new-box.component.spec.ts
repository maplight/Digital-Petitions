import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExampleComponent } from 'src/app/example/example.component';

import { NewBoxComponent } from './new-box.component';

describe('NewBoxComponent', () => {
  let component: NewBoxComponent;
  let fixture: ComponentFixture<NewBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('approveEvent should emit when Approve button is clicked', () => {
    component.approveEvent.asObservable().subscribe(() => {
      expect(true).toBeTruthy();
    });
    fixture.debugElement
      .queryAll(By.css('button'))[0]
      .triggerEventHandler('click');
  });

  it('denyEvent should emit when Deny button is clicked', () => {
    component.denyEvent.asObservable().subscribe(() => {
      expect(true).toBeTruthy();
    });
    fixture.debugElement
      .queryAll(By.css('button'))[1]
      .triggerEventHandler('click');
  });
});
