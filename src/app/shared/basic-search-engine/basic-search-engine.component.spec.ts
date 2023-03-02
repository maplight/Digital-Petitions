import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BasicSearchEngineComponent } from './basic-search-engine.component';

describe('BasicSearchEngineComponent', () => {
  let component: BasicSearchEngineComponent;
  let fixture: ComponentFixture<BasicSearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicSearchEngineComponent],
      imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit form value when search button is clicked and form is valid', () => {
    component.event.subscribe((data: any) => {
      expect(data).toEqual('search');
    });
    component.formGroup.setValue({ keyword: 'search' });
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click');
  });
});
