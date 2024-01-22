import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, map } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export function validatName(param: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return checking().pipe(
      map((res) => {
        if (param === 'username') {
          return res.login[param] === control.value
            ? { usernameExist: true }
            : null;
        } else if (param === 'email') {
          return res[param] === control.value ? { mailExist: true } : null;
        }
        return null;
      })
    );
  };
  function checking(): Observable<any> {
    return ajax
      .getJSON('https://jsonplaceholder.org/users/1')
      .pipe(delay(1000));
  }
}
