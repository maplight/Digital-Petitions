import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { ResultSignPetitionRoutingModule } from './result-sign-petition-routing.module';

import { ResultSignPetitionComponent } from './result-sign-petition.component';

describe('ResultSignPetitionComponent', () => {
  let component: ResultSignPetitionComponent;
  let fixture: ComponentFixture<ResultSignPetitionComponent>;
  const activatedRoute = new ActivatedRouteStub();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultSignPetitionComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        MatButtonModule,
        ResultSignPetitionRoutingModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultSignPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('must show the title received as a parameter in the route', () => {

    activatedRoute.setParamMap({ title: 'Example title' });
    fixture.detectChanges();
    const elements = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(elements[2].textContent).toEqual(' Example title ');
  });
});
