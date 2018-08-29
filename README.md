## mat expansion panel

1. make the panel header configurable 

```ts
// expansion-panel-header.d.ts source code

export declare class MatExpansionPanelHeader implements OnDestroy {
    panel: MatExpansionPanel;
    private _element;
    private _focusMonitor;
    private _changeDetectorRef;
    private _parentChangeSubscription;
    constructor(panel: MatExpansionPanel, _element: ElementRef, _focusMonitor: FocusMonitor, _changeDetectorRef: ChangeDetectorRef);
    /** Height of the header while the panel is expanded. */
    expandedHeight: string;
    /** Height of the header while the panel is collapsed. */
    collapsedHeight: string;
    /** Toggles the expanded state of the panel. */
    _toggle(): void;
    /** Gets whether the panel is expanded. */
    _isExpanded(): boolean;
    /** Gets the expanded state string of the panel. */
    _getExpandedState(): string;
    /** Gets the panel id. */
    _getPanelId(): string;
    /** Gets whether the expand indicator should be shown. */
    _showToggle(): boolean;
    /** Handle keydown event calling to toggle() if appropriate. */
    _keydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
}

```

> we can see the MatExpansionPanelHeader accept two input arguments 'expandedHeight' and 'collapsedHeight' we can configured it by give these value by `expandedHeight='45px' or [expandedHeight]=" '45px' "`

```html
 <mat-expansion-panel>
    <mat-expansion-panel-header [expandedHeight]="'35px'" [collapsedHeight]=" '35px' ">
      This is the expansion title
    </mat-expansion-panel-header>

    <p>This is the primary content of the panel.</p>

    <mat-action-row>
      <button mat-button>Click me</button>
    </mat-action-row>
  </mat-expansion-panel>
```

1. make the panel header indicator configurable

```css
::ng-deep  .mat-expansion-indicator:after {
  /* the indicator is actually a block; we can control it's size with padding, and control the weight with border */
  padding: 2px !important;
  border-width: 0 1px 1px 0 !important;
}

```

## custom the material style

> in the app.component.scss , we can't set the style of `mat-expansion-panel-header` component , because of the style scoping restriction of angular; `Changes to styles elsewhere in the application don't affect the component's styles.`


1. > ::ng-deep, >>> and /deep/ are giving you an access to DOM elements, which are not in your component's HTML. For example, if you're using Angular Material, some elements are generated by Angular Material outside of your component's area (such as dialog) and you can't access these elements using the regular CSS way. If you want to change styles of that elements, you have to use one of that three things, for example:

```css
::ng-deep .mat-dialog {
  /* styles here */
}
```
2. Change default expansion panel arrow colour for angular material

```html
<md-expansion-panel>
  <md-expansion-panel-header class="specific-class">
    <md-panel-title>
      Personal data
    </md-panel-title>
    <md-panel-description>
      Type your name and age
    </md-panel-description>
  </md-expansion-panel-header>

  <md-form-field>
    <input mdInput placeholder="First name">
  </md-form-field>

  <md-form-field>
    <input mdInput placeholder="Age">
  </md-form-field>
</md-expansion-panel>
```

```ts
import {Component} from '@angular/core';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'expansion-overview-example',
  templateUrl: 'expansion-overview-example.html',
  styles: [`
    ::ng-deep .specific-class > .mat-expansion-indicator:after {
      color: white;
    }
  `],
})
export class ExpansionOverviewExample {}

```

> In order to style nested elements dynamically added by Angular Material component you need to use special selector ::ng-deep. That allows to work around view encapsulation.
> https://angular.io/guide/component-styles#view-encapsulation
> In order to override built-in component styles applied dynamically you need to increase CSS specificity for your selector. That's the reason for adding additional CSS class specific-class. If you gonna use selector ::ng-deep .mat-expansion-indicator:after expansion component will override it.

3. conclusion:

  * read the source code to look at the @input argument something as `expandedHeight` or `collapsedHeight`  we can set
  * as the usual, the template should be determined by the customer. the material then get the template by `ng-contend`, so we can custom ourself template when use material
  * look at the source code scss file , then we know how the style that is 
  * then we use the ::ng-deep to set the material component's style  

## config the default state `mat-sidenav` and `mat-expansion-panel`

```html
<mat-sidenav #sideNav mode="push" opened="true"  >
      <mat-expansion-panel expanded="true">
```

1. the opened state of mat-sidenav should be based on the @media screen

> https://stackoverflow.com/questions/40321032/material2-show-hide-md-sidenav-depending-on-media

```ts
// Inside of component class i've defined a reference to the sidenav and listening to the window resize events. Depending on the window.innerWith you can build your logic.

@ViewChild('sidenav') sidenav: MdSidenav

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.configureSideNav()
  }

  configureSideNav() {
    this.smallScreen = window.innerWidth < 501 ? true : false
    if (!this.smallScreen) {
      this.sidenav.mode = "side"
      this.sidenav.opened = true
    } else {
      this.sidenav.mode = 'over'
      this.sidenav.opened = false
    }
  }

```


2. the expanded state of the mat-expansion-panel should be based on router state; so we can implement via router state;

```html
<mat-expansion-panel *ngFor="let category of categoryList" (opened)="setActiveCategoryId(category.id)" [expanded]="rla.isActive">
 <mat-expansion-panel-header routerLinkActive="'active'" #rla="routerLinkActive" [routerLink]="['/butik', category.categoryId, category.slug]">{{ category.name }}</mat-expansion-panel-header>
 <p>test</p>
</mat-expansion-panel>

```

1. we can get the routerLinkActive reference via template variable
2. then we bind the rla.isActive the model in the controller
3. the data in the model can bind to each other with getter and setter
4. we bind the setter property of the controller to the expanded

## custom a attribute directive




