import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(1000)
      ]),
      transition(':leave', [
        animate(1000, style({transform: 'translateY(100%)'}))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
