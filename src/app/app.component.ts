import { Component } from '@angular/core';
import {Router,NavigationStart,NavigationEnd, RouterEvent, Event,NavigationCancel,NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { // title = 'AngularCrud';
 showLoadingIndicator =true;
  constructor(private _router: Router)
 {
   this._router.events.subscribe((RouterEvent: Event) =>{
     if(RouterEvent instanceof NavigationStart)
     {
       this.showLoadingIndicator=true;
     }
     if(RouterEvent instanceof NavigationEnd ||
      RouterEvent instanceof NavigationCancel||
      RouterEvent instanceof NavigationError)
     {
       this.showLoadingIndicator=false;
     }
   }
   );
 }
}
