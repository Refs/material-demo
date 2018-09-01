## The specification:
  1. we should unsubscribe the observable whenever the component destroy; 
  2. To every private property we should generate getter and setter like spring VO; In the class method we have to use the private property; 
## the key
  1. getter and setter in data bind
  2. subject and service
  3. state management
  4. config the ts path `../../../ar-shared/services` ==> `@appRoot/ar-shared/services`

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


## ::ng-deep versus ViewEncapsulation

> ::ng-deep works great in this case, but it may be deprecated in the future. 

The recommended way is to use `ViewEncapsulation`. In your component add the following encapsulation:

```ts
import { ViewEncapsulation } from '@angular/core';

@Component({
    ....
    encapsulation: ViewEncapsulation.None
})
```

Then your css will work and override the styles with your custom styles.

```scss
.mat-sidenav-backdrop.mat-sidenav-shown{
    background-color: transparent !important;
}
```


## config the default state `mat-sidenav` and `mat-expansion-panel`

### control the sideNav

1. control the opening and closing of the sideNav

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

### control the overlay of the sidenav

> Because when we use the mat-sidenav in `side` mode. the minemap will raise bug that after the closing of the side nav, the map won't resize. So we have to use the `push` mode. in that mode we have a gray overlay, and there's not @input property of the mat-sidenav we can use to hide the overlay . so we have to control it via css;

```scss
// to make this style effective, we have to set encapsulation: ViewEncapsulation.none in the @component meta config;
.mat-sidenav-backdrop.mat-sidenav-shown{
    background-color: transparent !important;
}
```


2. the expanded state of the mat-expansion-panel should be based on router state; so we can implement via router state;

```html
<mat-expansion-panel *ngFor="let category of categoryList" (opened)="setActiveCategoryId(category.id)" [expanded]="rla.isActive">
 <mat-expansion-panel-header routerLinkActive="'active'" #rla="routerLinkActive" [routerLink]="['/butik', category.categoryId, category.slug]">{{ category.name }}</mat-expansion-panel-header>
 <p>test</p>
</mat-expansion-panel>

```



## control the Progress bar

we can code a global state variable, and the Progress bar subscribe the state. when we want the Progress bar we dispatch a 'ShowProgressBar' or dispatch a 'HideProgressBar' in the component;

## The material grid list

1. make the mat-grid-list's gutterSize be equal to its margin, then we can get the consistent experience.

```html
<mat-grid-list cols="1" rowHeight="500px" gutterSize="24px"></mat-grid-list>

```
```css
.mat-grid-list {
  margin: 24px;
}

.mat-card{
  align-self: flex-start;
  width: 100%;
  height: 100%;
}

```

2. make the mat-grid-list responsive

> You have to set the cols attribute of the mat-grid-list dynamically depending on the screen width. You'd have to decide on which width breakpoint will the mat-grid-list render the 1-column version.

```html
<mat-grid-list [cols]="breakpoint" rowHeight="2:0.5" (window:resize)="onResize($event)">
  <mat-grid-tile>1</mat-grid-tile>
  <mat-grid-tile>2</mat-grid-tile>
  <mat-grid-tile>3</mat-grid-tile>
  <mat-grid-tile>4</mat-grid-tile>
  <mat-grid-tile>5</mat-grid-tile>
  <mat-grid-tile>6</mat-grid-tile>
</mat-grid-list>
```

```ts
ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
}

onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
}
```

3. the window:resize not only add to the window, but also can be added to any element ;

> https://stackoverflow.com/questions/35527456/angular-window-resize-event

```html
<div (window:resize)="onResize($event)"
```
```ts
onResize(event) {
  event.target.innerWidth;
}

// or
@HostListener('window:resize', ['$event'])
onResize(event) {
  event.target.innerWidth;
}
```

4. utilize the flex-layout ObservableMedia to achieve the responsive layout

> You can workaround this by manually setting the number of grid columns in your own code. You can do it easily via flex-layout like this:

```ts

@ViewChild('grid')
private grid: MdGridList;

constructor(private media: ObservableMedia) { }

ngAfterViewInit() {
  // ObservableMedia does not fire on init so you have to manually update the grid first.
  this.updateGrid();
	this.media.subscribe(change => { this.updateGrid(); });
}

updateGrid(): void {
	if (this.media.isActive('xl')) { this.grid.cols = 5; }
	else if (this.media.isActive('lg')) { this.grid.cols = 4; }
	else if (this.media.isActive('md')) { this.grid.cols = 3; }
	else if (this.media.isActive('sm')) { this.grid.cols = 2; }
	else if (this.media.isActive('xs')) { this.grid.cols = 1; }
}

```


## flex-layout

> https://github.com/angular/flex-layout/wiki/NPM-Installs


```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-flex2',
  templateUrl: './flex2.component.html',
  styleUrls: ['./flex2.component.css']
})
export class Flex2Component implements OnInit, OnDestroy {
  public content: string;
  public watcher: Subscription;
  activeMediaQuery = '';
  
  constructor(
    public media: ObservableMedia
  ) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? ` '${change.mqAlias}' = (${change.mediaQuery}) ` : ''; 
      if( change.mgAlias === 'xs' ) {
        this.loadMobileContent()
      } else if( change.mgAlias ==== 'lg' ) {
        this.loadDesktopContent();
      } else if (change.mgAlias === 'md') {
        this.loadMediumContent();
      } else if ()
    })
  }

  ngOnInit() {}

  isMobile() {
    return false;
  }

  invisibleOnDesktop () {
    return true
  }

  ngOnDestroy() {
    this.watcher.unSubscription();
  }

  loadMobileContent() {
    this.content = 'MOBILE CONTENT';
  }

  loadDesktopContent() {
    this.content = 'DESKTOP CONTENT'
  }

  loadMediumContent() {
    this.content = 'MEDIUM CONTENT'
  }
}

```

> conclusion

```ts
export class EchartsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('grid') public grid: MatGridList;

  public watcher: Subscription;

  constructor(
    public media: ObservableMedia
  ) {
  }

  ngAfterViewInit() {
    this.updateContent();
    this.watcher = this.media
      .subscribe((change: MediaChange) => {
        console.log(change.mqAlias);
        this.updateContent();
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  updateContent(): void {
    if (this.media.isActive('xs')) {
      this.loadXsContent();
    } else if ( this.media.isActive('sm') ) {
      this.loadSmContent();
    } else if ( this.media.isActive('md') ) {
      this.loadMdContent();
    } else if ( this.media.isActive('lg') ) {
      this.loadLgContent();
    } else if ( this.media.isActive('xl') ) {
      this.loadXlContent();
    }
  }
  loadLgContent() {
    this.grid.cols = 3;
  }
  loadXlContent() {
    this.grid.cols = 3;
  }
  loadMdContent() {
    this.grid.cols = 2;
  }
  loadSmContent() {
    this.grid.cols = 1;
  }
  loadXsContent() {
    this.grid.cols = 1;
  }
}

// When we encounter `ExpressionChangedAfterItHasBeenCheckedError` we should code like below
ngAfterViewInit() {
  setTimeout(() => {
    this.updateContent();
  });
  this.watcher = this.media
    .subscribe((change: MediaChange) => {
      console.log(change.mqAlias);
      setTimeout(() => {
        this.updateContent();
      }) ;
    });
}

```

> 这些 loadLgContent, loadXlContent 都是 人为封装的， 类似于 ngOnInit() ngAfterViewInit() 都是控制组件在不同时期表现形式的接口； 自己封装的这些都是 控制接口而已；

> 自响应的方式 有两个，一个是 window:resize 本例中 用于控制 sideNav ， 一个是上述的接口； 

## scrollBar

1. To add the scrollBar to the app.component.html, Then wrap all the elements and component via `<perfect-scrollbar>`.
  * In this situation we have to fix the the header, so it won't fly when we scroll;
2. To add the scrollBar outside of `<router-outlet></router-outlet>` so we can control all the children pages;
3. To add the scrollBar outside of a wrap elements or component like `<mat-sidenav></mat-sidenav>` 

> This way is very good;
```ts
<perfect-scrollbar style="width: 100%; max-height: calc( 100vh - 64px );" [config]="">
  <router-outlet></router-outlet>
</perfect-scrollbar>

```

```ts
<mat-sidenav #sideNav mode="side" opened="true">
  <perfect-scrollbar style="width: 100%; max-height: calc( 100vh - 64px );" [config]="">
    <mat-expansion-panel [expanded]="panel.routerFlag == currentModuleRouter" *ngFor="let panel of sideNavData">
      <mat-expansion-panel-header [expandedHeight]="'35px'" [collapsedHeight]=" '35px' ">
        <mat-panel-title>
          <mat-icon style="color: gray">{{panel.header.icon}}</mat-icon>
        </mat-panel-title>
        <mat-panel-description>
          {{panel.header.description}}
        </mat-panel-description>
      </mat-expansion-panel-header>
      <mat-list>
        <mat-list-item *ngFor="let list of panel.lists" routerLinkActive="active" [routerLink]="[list.link]">{{list.linkTitle}}</mat-list-item>
      </mat-list>
    </mat-expansion-panel>
  </perfect-scrollbar>
</mat-sidenav>
```

> if we want to add the scrollBar to the global, the app.component.html should :

```html
<router-outlet></router-outlet>

<!-- then we add the perfect-scrollbar outside of the router-outlet -->
```





## progressBar versus minemap resize && notification service; 

> We can create  a notification service , in the service we set up an Subject. in the component we instantiate the service , and invoke it's method to dispatch a notification.  

* When the sideNav close we dispatch a notification to notice the minemap resize;

* When the loading is complete we dispatch a notification to notice the process bar hide;

1. we can solve the minemap bug when the sidenav close. in the AfterViewChecked life circle; instead of using the subject service; 

```ts
ngAfterViewChecked() {
  this._map.resize();
}

resizeMap() {
  this._map.resize();
}

```


### subject 

1. Subjects can basically be used to push new changes to an observable and then they can also be used as an observer to subscribe to new changes . 

Subject can act as a bridge/proxy between the source Observable and many observers , making it possible for multiple observers to share the same Observable execution.

Subject can be used for sharing data between components.


```ts
// in the service

@Injectable()
export class UserService {
  // we should decorate the property be private, and give it a getter and setter method. this is the specification of  the `Object orientation` 
  // to achieve this we can use the `getter and setter plugin to do this`
  private _prop: string = foo;

 // this._prop is the default value; notice the asObservable() method;
  private _propChanged: BehaviorSubject<string> = new BehaviorSubject<string>(this._prop)
  public cast =  this.propChanged.asObservable();

  getProp(): string {
    return this._prop;
  }
  setProp(prop: string) :void {
    this._prop = prop;
    // to push a new value to an observable , we should use the `next()`
    this._propChanged.next(this._prop); 
  }
 
}

```

```ts
// in the component
@Component()
export class OneComponent implements OnInit, OnDestroy {
  public prop: string;
  private _subscription: Subscription;

  constructor( private userService: UserService ) {}

  ngOnInit() {
    // subscribe the new values
    this._subscription = this.userService.cast.subscribe((prop) => {
      this.prop = prop;
    });
  }

  changeProp() {
    // push the new values
    this.userService.setProp('bar');
  }

  // we should keep in mind that we should unsubscribe to observables whenever the component id going to be destroy;
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}

```

1. The name specification of custom module and the UI kit
2. The test of minemap or echarts or jquery plugin
3. collect important Ui component
4. 9/15 to test new project in jtcn 
5. train

6. ng alain 
  * extension echarts minemap
  * operation
  * Bug fix
  * high package

7. 将mock 与  api 作为一个对象的属性对象，然后将对象暴露出去； 

案例 分享

