import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-petition-view',
  templateUrl: './petition-view.component.html',
})
export class PetitionViewComponent implements OnInit, OnChanges {
  @Input() data: ResponsePetition = {};

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}
}
