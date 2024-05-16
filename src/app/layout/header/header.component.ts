import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _title :string;
  constructor() {
    this._title = 'Chicker';
  }
  get title():string{
    return this._title;
  }
}
