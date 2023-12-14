import { HttpInterceptorFn } from '@angular/common/http';

export const apiFoodInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes('auth')) {
    return next(req);
  }

  console.log(sessionStorage.getItem('token'));
  const token = sessionStorage.getItem('token');
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(newReq);
};
