import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  @Input() hasJustViewed: boolean | any;
  @Input() title: string | any;
  @Input() isHidden: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
