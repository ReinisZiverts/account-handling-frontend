import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthorizationService} from '../service/authorization.service';

export const authorizationGuard : CanActivateFn = () => {

  const router: Router = inject(Router);
  const authorizationService = inject(AuthorizationService);

  const token = authorizationService.getAccessToken();

  if (!token) {
    return router.parseUrl("/login");
  }

  return true;

}
