import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {ToastTypeEnum} from '../enum/toast-type.enum';

@Injectable({providedIn: 'root'})
export class ToastService {

  private readonly toast: MatSnackBar = inject(MatSnackBar);

  open(
    messageText: string,
    buttonText: string,
    type: ToastTypeEnum
  ): void {
    const config: MatSnackBarConfig = {
      duration: 10_000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: [type]
    };

    this.toast.open(messageText, buttonText, config);
  }
}
