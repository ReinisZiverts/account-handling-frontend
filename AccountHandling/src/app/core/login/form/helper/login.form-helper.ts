import {LoginForm} from '../login.form';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export class LoginFormHelper {

  static createForm(): FormGroup<LoginForm> {
    return new FormGroup<LoginForm>({
      username: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
    })
  }

}
