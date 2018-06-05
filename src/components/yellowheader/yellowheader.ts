import { Component, Input } from '@angular/core';

/**
 * Generated class for the YellowheaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'yellowheader',
  templateUrl: 'yellowheader.html'
})
export class YellowheaderComponent {
  @Input() name: string;
  text: string;

  constructor() {
    console.log('Hello YellowheaderComponent Component');
    this.text = 'Hello World';
  }

}
