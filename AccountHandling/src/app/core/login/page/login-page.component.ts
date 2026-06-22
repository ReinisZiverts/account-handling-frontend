import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LoginFormHelper} from '../form/helper/login.form-helper';
import {LoginForm} from '../form/login.form';
import {MatButton} from '@angular/material/button';
import {AuthorizationService} from '../../service/authorization.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../service/toast.service';
import {ToastTypeEnum} from '../../enum/toast-type.enum';

@Component({
  selector: 'name',
  templateUrl: 'login-page.component.html',
  styleUrl: 'login-page.component.scss',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatCardFooter,
    MatButton
  ],
})
export class LoginPageComponent {

  protected loginForm: FormGroup<LoginForm> = LoginFormHelper.createForm()
  private readonly authorizationService: AuthorizationService = inject(AuthorizationService);
  private readonly router: Router = inject(Router);
  private readonly toastService: ToastService = inject(ToastService);

  protected login() {
    this.authorizationService.login(this.loginForm.getRawValue())
      .subscribe({
        next: async () => {
          await this.router.navigateByUrl("/");
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this.toastService.open(
            "Account not found or wrong password.",
            "Close",
            ToastTypeEnum.ERROR
          )
        }
      });
  }

}
