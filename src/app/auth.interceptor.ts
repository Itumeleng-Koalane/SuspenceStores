import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { RegisterService } from './Shared/services/register.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(RegisterService)

  if(authService.isLoggedIn()){
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization','Bearer ' + authService.getToken())
    });
    return next(clonedReq);
  }
  else
  {
    return next(req);
  }
};
