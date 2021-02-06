import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


export class AuthInterceptorService implements HttpInterceptor {
  intercept(req:HttpRequest<any>, next:HttpHandler){
    // console.log('Request is on the way');
    const modifiedreq = req.clone({headers: req.headers.append('Auth','xyz') }); //to chaneg the request
    return next.handle(modifiedreq);
  }
}
