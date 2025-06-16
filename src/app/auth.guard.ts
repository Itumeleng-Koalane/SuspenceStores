import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RegisterService } from './Shared/services/register.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authRegService = inject(RegisterService);
  const router = inject(Router)

  if(authRegService.isLoggedIn())
  {
    return true;
  }
  else
  {
    router.navigateByUrl('user/login-screen');
    return false;
  }
};
