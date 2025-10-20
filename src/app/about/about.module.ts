import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import { RouterModule, Routes } from '@angular/router';

// tells Angular what to load when the about path is specified in the browser
const ABOUT_ROUTES: Routes = [
  {
    // path is empty because we don't want the path to change when the about path is
    // specified in the browser
    path: '',
    component: AboutComponent
  }
];

@NgModule({
  // tells Angular what to load when the about path is specified in the browser
  imports: [
    RouterModule.forChild(ABOUT_ROUTES)
  ],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule {}
