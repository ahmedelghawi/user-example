import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ey3Hfdhg5GNTgfvbnV4t66QFGN446hhhdgfy45.5df',
    }
  })
  return next(authReq);
};
