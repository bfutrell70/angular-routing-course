import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  // occurs after ResolveEnd router event
  constructor() {
    console.log("In constructor");
  }

  // occurs after NavigationEnd router event, but before Scroll event
  ngOnInit(): void {
    console.log("On Init");
  }

}
