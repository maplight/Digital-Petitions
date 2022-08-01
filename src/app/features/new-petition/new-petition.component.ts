import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dp-new-petition',
  templateUrl: './new-petition.component.html',
})
export class NewPetitionComponent implements OnInit {
  typePetition: string = '';
  types: string[] = ['Candidate', 'Issue'];
  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {}

  submit() {
    if (this.typePetition === 'Issue') {
      this._router.navigate(['issue'], { relativeTo: this._route });
    }
  }
}
