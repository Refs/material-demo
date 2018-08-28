# Device platform project technical document

## Initial angular development environment

1. Config the .angular-cli.json to generate module that out of app folder;

warning: after we change the `AppRoot` property value , we have to add the `--skip-import` suffix when we utilize the the cli to generate components, pipes..., or it will report an error `Use the skip-import option to skip importing components in NgModule`;

```bash
ng g component app/components/nav --skip-import

```

> after we generated the component ,we have to manually import it to a NgModule;

2. Integrate the jquery

```bash
# install jquery
npm install -s jquery
# install @types/jquery
npm install --save-dev @types/jquery
```

```js
// in .angular-cli.json 中
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
],

```

```js
// in tsconfig.app.json
"compilerOptions": {
    "types": [
      "jquery"
    ]
  },

```

3. Integrate jquery plugin

* Install the jquery plugin

```bash
npm install jquery-modal -s
```

* Import the plugin logic in globally environment

```js
// .angular-cli.json 中
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/jquery-modal/jquery.modal.min.js"
],

```

* Config the plugin declaration types

```js
// in src/typing.d.ts 中

interface JQuery {
  modal(options?:any, callback?:Function):any;
}
```

* Import the plugin style in the spec component or in the global style.css

```css
/* in app.component.css 中 */
@import "~jquery-modal/jquery.modal.min.css";

```

4. integrate the external sources via `script` tag

```bash
# install the jquery via npm
npm install jquery -s

# copy the jquery.js file to the asset/ directory
# on the processing of building angular , the asset/ directory will be straightly copied to the outPath; so the relative path between the index.html and files in the asset/ will be maintained;

src/
  +-- assets/
      + -- js/
      + -- jquery.js
# the jquery.js will be imported by the script tag which we will dynamically generated in the life cycle of 'NgAfterViewInit'
```

```ts
// app.component.ts
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

import * as $ from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {
    private elementRef: ElementRef
  }

  ngOnInit() {
    $(document).ready(function(){
      alert('hello');
    })
  }

  ngAfterViewInit() {
    var jquery = document.createElement('script');
    jquery.type = 'text/javascript';
    jquery.src = './assets/js/jquery.js'
    this.elementRef.nativeElement.appendChild(jquery);
  }

}

```

```html
<!-- app.component.html -->
<button type="button" id= "buttonClickMe"> ClickMe </button>

```

5 . use the `new (<any>window).MapThingy()`

* `Type assertions` are a way to tell the compiler “trust me, I know what I’m doing.”:
  + the first type: (<any>window)
  + the second type: ( window as any )
* Another way to do the same thing is using Square bracket syntax
  + window['Stripe'].card  as (<any>window).Stripe.card
* in this case we can use (<any>window).$('btn')

> https://github.com/angular/angular-cli/issues/6250
> https://stackoverflow.com/questions/40494369/anywindow-somelibrary-somemethodarg1-arg2

6. integrate the minemap in our angular project








## Init the material

## Init the routing

## utilize resources which we already have

1. import the fly theme.css as global styles

```css
/* in style.css */
@import "~@angular/material/prebuilt-themes/indigo-pink.css";

/* import the fly theme css */
@import url(./assets/css/theme.css);
```

## debug environment config

### Scss inspect

* angular-cli serve config
   + --extract-css (aliases: -ec)
   + --sourcemaps (aliases: -sm, sourcemaps)
   + --open (aliases: -o) default value: false
* config npm script
  + "debug": "ng serve -sm -ec -o"

* But in @angular/cli1.7.4 we could find `Source map not working for SCSS files` (issues/9099)


```bash
# Installed css-loader and exports-loader dependencies for @angular/cli
# i) navigate to "node_modules/@angular/cli"
# ii) do: npm install --save css-loader exports-loader
# iii) Modify the file "node_modules@angular\cli\models\webpack-configs\styles.js" contents, mine was in line 180

# Replace
 const commonLoaders = [
      { loader: 'raw-loader' },
  ];
# with
const commonLoaders = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: cssSourceMap,
                import: false,
            }
        }
    ];

# Also Replace
// load component css as raw strings
    const rules = baseRules.map(({ test, use }) => ({
        exclude: globalStylePaths, test, use: [
            ...commonLoaders,
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'embedded',
                    plugins: postcssPluginCreator,
                    sourceMap: cssSourceMap
                }
            },
            ...use
        ]
    }));
# With
// load component css as raw strings
    const rules = baseRules.map(({ test, use }) => ({
        exclude: globalStylePaths, test, use: [
                'exports-loader?module.exports.toString()',
                ...commonLoaders,
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'embedded',
                    plugins: postcssPluginCreator,
                    sourceMap: cssSourceMap
                }
            },
            ...use
        ]
    }));

```

### Inspect typescript in vscode

1. install `Debugger For Chrome` extension

2. config windows system environment variable of chrome , so we can launch it in the terminal;

3. launch chrome in inspect pattern in the terminal;

```bash
"chrome": "chrome --remote-debugging-port=9222",

```

4. add new npm script of node , so we can run the node server in terminal;

```bash
cd ~/Desktop/node_restfull/api/
npm run start
```

5. generate the launch.json file of the vscode inspector;

```json
// .vscode/launch.json
{
  "type": "chrome",
  "request": "attach",
  "name": "Attach to Chrome",
  "port": 9222,
  "url": "http://localhost:4200",
  "webRoot": "${workspaceFolder}",
  "sourceMaps": true,
  "skipFiles": [
    "${workspaceFolder}/**/node_modules/**/*.js",
  ]
}

```

### the separation environment between front-end and back-end

1.  we can utilize postman with session to request back-end . the postman is like a bridge we can  connect the front-end and back-end
  + when request , we have set correct header with appropriate data, so the java can response our postman request . so we can mock the same header and body in our angular code ;
  + when the java response , we could get the response in the postman ,  we couldn't get the response in the angular, but we can accept the response in our node serve. so we can mock the response in the our node serve.
2. when we angular want to post data to java, we intercept the data , and test the data in the postman . if the java serve accept that data , it will response the data to the postman,  that means our angular data format is correct.
3. angular couldn't accept the data responded by java, by it can accept the data responded by node, so we can put the data responded by java into my node.
4. finally our angular can request and get data from our node serve;


## Use the svg icons instead of images

> use <mat-icon></mat-icon> to import our custom svg;

```ts
// the component in which we will use the svg icons
// * we should import the HttpClientModule to our component module's , because we need it to register our custom icon to the MatIconRegistry provided by angular material;
import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent{
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "unicorn",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/unicorn_icon.svg")
    );
  }
}
```


## Init store routing



## Initial ngrx store


1. install dependencies

```bash
npm install -s @ngrx/store@5.2.0 @ngrx/effects@5.2.0 @ngrx/router-store@5.2.0 @ngrx/store-devtools@5.2.0 @ngrx/entity@5.2.0

```

2. install and config ngrx schematics

```bash
npm install --save-dev @ngrx/schematics@5.2.0

```
3. install ngx-store-freeze

> MetaReducer:  https://www.npmjs.com/package/ngrx-store-freeze 之所以去引入 MetaReducer 是为了使用 ngrx-store-freeze 插件，防止状态突变；
```ts
import { StoreModule, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment'; // Angular CLI environment

export interface State {
  // reducer interfaces
}

export const reducers: ActionReducerMap<State> = {
  // reducers
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze]: [];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
  ]
})
export class AppModule {}

```

### ngrx selector bug:

1. when we call this.store.pipe(select(fromStore.getLeftMenusState)), we just return a observable, the selector function won't be called until we subscribe it;

2. we can easy get a bug , if we code like below:

> The selector function returned by calling `createSelector` or `createFeatureSelector` initially has a memoized value of `null`. After a selector is invoked the first time its memoized value is stored in memory. If the selector is subsequently invoked with the same arguments it will return the memoized value. `If the selector is then invoked with different arguments it will recompute, and update its memoized value. Consider the following:`

> the `getSelectedLeftMenusEntities` selector has two argument which are the state pieces of leftMenus state and router state , that means every action fire, the fromReducers.getRouterState and getLeftMenus will fire; there is a situation  where the router state hasn't be initialed when `getSelectedLeftMenusEntities` selector be called , the state will be undefined  and `router.state` will be a error `there is no state property on undefined`,  so we have to make conditions when we code selectors;
```ts
export const getSelectedLeftMenusEntities = createSelector(
  fromReducers.getRouterState,
  getLeftMenus,
  (router, entities) => {
      // we will get the state is not a property of undefined , because when this selector be involved the router state hasn't be initialed;
      return router.state && entities;
    }
  }
);

```

```ts
export const getSelectedLeftMenusEntities = createSelector(
  fromReducers.getRouterState,
  getLeftMenus,
  (router, entities) => {
    if (router && entities) {
      return router && entities[395].childs;
    }
  }
);

```

3. use `let` instead of `const` in the selector function

## develop the appComponent

> the AppComponent is a router component , it have two view component NavComponent and SidenavComponent;


> warning : after we render the dom in the browser  `Angular component host element width and height are 0`, that means the host elements `<app-nav> and <app-sidenav>` height and width will be 0,  even though the child dom have height and width ; That's because the host element has the attribute `display: inline` by default.
> if we want host element's width to be supported by his child dom , we can set the host element's style by below method; But the angular team don't suggest to do this; utilize the :host selector to do this;

```css
/* sidenav.component.css */
:host {
  margin-top: 80px;
}

```

So we can utilize the host property of the @component() config object, to config the host element style. usually we add a class to the host element, then add style to the class, that's not elegant; we can the detail in the official document `https://angular.io/guide/component-styles`  --->  using the :host selector in component's css file ; he utilize

## store the cookie which we're going to  append to the url request header to the environment


## store reducers 中一个致命的 bug;

```ts
export function reducer(
  state: LeftMenusState = initialState,
  action: fromActions.LeftMenusAction
): LeftMenusState {
  switch (action.type) {
    case fromActions.LeftMenusActionType.LOAD_LEFT_MENUS:
      {
        return {
          ...state,
          loading: true
        };
      }

    case fromActions.LeftMenusActionType.LOAD_LEFT_MENUS_SUCCESS:
      {
        const topNavItemArray = action.payload;
        const entities = topNavItemArray.reduceRight(
          // tslint:disable-next-line:no-shadowed-variable
          (entities: {[id: number]: fromModels.TopNavItem}, topNavItem: fromModels.TopNavItem) => {
            return {
              ...entities,
              [topNavItem.id]: topNavItem
            };
          },
          {
            ...state.entities
          }
        );
        return {
          ...state,
          loading: false,
          loaded: true,
          entities: action.payload
        };
      }
    case fromActions.LeftMenusActionType.LOAD_LEFT_MENUS_FAIL:
      {
        return {
          ...state,
          loading: false,
          loaded: false
        };
      }
  }
  // this is a bug , if we don't return after @ngrx/store/init our states is still empty;
  return state;
}

```

> Bug description:
* after @ngrx/store/init Action the leftMenus is empty which should have value of leftMenus initial state; after LOAD_LEFT_MENUS leftMenus have the value of leftMenus initial state; after  LOAD_LEFT_MENUS_SUCCESS it has the value we strive from the backbend, but after ROUTER_NAVIGATION it'll be empty; the reason is that I didn't return the default state in the reducer function;

* to understand this bug , we should know the action flow in the store:
  + When we register the 'reducer functions' by `StoreModule.forRoot(reducers, { metaReducers })` that means every reducer's going to accept the action dispatched by the store. so when the @ngrx/store/init has been dispatched every reducer will listen to it;
  + After the @ngrx/store/init has been dispatched our leftMenus reducer will execute it , but there isn't a case that can match the Action, so it have to return the default state, if it hasn't a default state,it will return none; so we get a empty after @ngrx/store/init action;
  + So after the 'ROUTER_NAVIGATION' action , it will be empty; because it has no case to match the action and has nothing to return ;


1. Question1 : the procession order of effects versus reducer ?
> when we dispatch a 'LOAD_LEFT_MENUS' action the effects will intercept the action and executes some logic, then dispatch a new action to reducer; but the reducer can also listen to the 'LOAD_LEFT_MENUS' even though it has been intercepted by the effect； the evidence is if we don't return default state in the leftMenus reducer, after @ngrx/store/init it will be empty, but when we dispatch a 'LOAD_LEFT_MENUS' which will will be intercepted by the effect , we can still get a default state; this is because the leftMenus reducer has handled this action;

```ts
// reducers
 case fromActions.LeftMenusActionType.LOAD_LEFT_MENUS:
      {
        return {
          ...state,A
          loading: true
        };
      }
```

```ts
loadLeftMenus$ = this.action$.ofType(fromActions.LeftMenusActionType.LOAD_LEFT_MENUS).pipe(
    switchMap(() => {
      return this.topServices
        .getTopNavItems()
        .pipe(
          map((leftMenus) => {
            return new fromActions.LoadLeftMenusSuccess(leftMenus);
          }),
          catchError(error => of(new fromActions.LoadLeftMenusFail(error)))
        );
    })
  );

```

> we should inspect it on the chrome DevTools to see the procession;

2. question 2 , If we dispatch an action on featureStore like `constructor(private store: Store<fromStore.ProductsState>) {};  this.store.dispatch(new fromStore.LoadPizzas()); `  does the reducer which didn't register on this store can listen the action ?


## Building and  Packing online


> when we have builded the spring project , we build and package it as a war. To suppose our war name is myWar , when we launch the tomcat we can access it via http://localhost:8080/add/wechat

1. we build our angular :

```bash
// the first url 'add' is the war name
// the second url is the folder in the add project root directory
// we can access the index.html via http://localhost:8080/add/wechat
ng build  --prod --base-href /add/wechat/ -d /add/wechat --output-path ./wechat/ --watch --extract-css --sourcemap
```

2. we can local both the `source file` and the files builded in WEB_INF directory , which will be copied to the target root directory
  * the first benefit is  we can access the index.html by http://localhost:8080/warname/angularoutpath
  * the second benefit is we can code the source files which have already been builded by the maven via SFTP

```bash
--output-path  --watch

```

3. set up an angular-cli client in the linux then auto build(compile the source files on the linux instead of local windows )

```bash
ng build  --prod --base-href /add/wechat/ -d /add/wechat --output-path ./wechat/ --watch --extract-css --sourcemap

```

> that means when we code the source file , the angular-cli in the linux will be auto build , then we refresh the browser, get the new file from tomcat; this process is like we debug the wechat server;


## 米花约影的前后端分离实现 

* spring 与 vue 的打包上线部署 闭环 测试
  （一会可以模拟下 angular 的打包）
* 跨域解决方案
  + spring uaas 切面处理
  + session 的会话保持
  + 浏览器 Option 请求的处理
  + 跨域 处理 （拦截器）
* 前后端分离模式
  + 前后端开发完全分离 前端只需利用 webpack serve 起来 
  + 后台只需
  + 两个之间没有任何中间转接
  + 对接的都是真实的，点对点的 json 数据

* 微信小程序 bug 排查 与 优化
  + Promise Promise 化
  + Iphone 闪烁 (h5 geolocation 的逻辑有问题)
  + mineMap 闪烁 minemap 的渲染机制有问题

* angular tomcat 环境下的打包线上闭环测试；
  + 杨丽 那边的一个权限管理系统

* 员工培训

* 下周重点在于 组内 人员培训；


1. 引 包 要尽量减少污染；jquery 与 minemap
2. 懒加载  就算 别的 刚开始打包是50k 我的时1000k 但刚开始我只加载20 k
3. 状态相应 前台数据库
4. flex 布局
5. 训练 angular cli

# 分离 开发 
 > 上线 

# 缓存 解决

cli 是一个工具 

## 接口服务器
## json-serve: mock服务器
## 专门的接口模块；


> 若想大家都接收，最快的方式是将底层，都封装为模块或指令，不用教他们原理是什么，而只需教他们如何去使用


It's a special kind of a View Node that sits inside a view and; What input data is used to create them . 

Angular doesn't use a View Container for static views and instead holds a reference to child views inside the node specific to the child component. 


Using the DomSanitizer to Embed YouTube Videos in Ionic 2 / Angular Applications
> https://www.youtube.com/watch?v=2JeKfQ2r2r8











