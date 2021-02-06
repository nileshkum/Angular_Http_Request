# Understanding Http Request
This Module covers below topics:
## CURD Operations
## Error Handling
## Using Service for Http Request
## Setting Headers
## Adding Query Parameters
## Interceptor

To do cross component data transfer , using subjects are good way but when we want to transfer data between single component. The good way is to return the data from sending service/component and subscribe in receiving end.

Tap operator: It simply allows us to execute some code without altering the response so we can do something  with response without disturbing subscribe function and the function we pass as argument to subscribe

Interceptors are basically used with Http request where if we want to add a common header to all our request, this will attach those first and then executes the call.
This need a method 'intercept' to be implement in its class with req of type HttpRequest and next of type HttpHandler arguments and we have to return next with req.

When can restrict this function to specific calls in its class .
We can not change the actual req, we have to create a local with clone method and change the headers and pass new req in next method.
We can add multiple interceptors, the sequence can be defined in app.module.ts


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
