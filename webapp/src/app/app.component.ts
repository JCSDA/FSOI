import {Component, enableProdMode, OnInit, ViewChild} from '@angular/core';
import {DisplayComponent} from './display/display.component';
import {ControlsComponent} from './controls/controls.component';
declare var Bokeh: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  @ViewChild(DisplayComponent, {static: false}) display: DisplayComponent;
  @ViewChild(ControlsComponent, {static: false}) controls: ControlsComponent;

  /**
   * The viewMode is bound to a CSS class that determines if the
   * controls and display components are open or collapsed.
   */
  viewMode = 'open';


  /**
   * Initialize this component
   */
  ngOnInit()
  {
    /* pass DisplayComponent and AppComponent references to the controls */
    ControlsComponent.singleton.setApp(this);
  }


  /**
   * Toggle between open and collapsed controls view modes
   */
  toggleViewMode()
  {
    /* if currently open, change to collapsed, and vice-versa */
    this.viewMode = (this.viewMode === 'open' ? 'collapsed' : 'open');
    setTimeout(this.display.recomputeGrid.bind(this.display), 1000);
  }
}
