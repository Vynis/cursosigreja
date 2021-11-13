import { Component } from '@angular/core';

@Component({
  selector: 'ngx-blank-layout',
  styleUrls: ['./blank.layout.scss'],
  template: `
    <nb-layout >
      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class BlankLayoutComponent {}
