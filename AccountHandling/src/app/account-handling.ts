import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MenuComponent} from './core/menu/component/menu.component';


@Component({
  selector: 'account-handling',
  templateUrl: './account-handling.html',
  imports: [
    MenuComponent,
    RouterOutlet
  ]
})
export class AccountHandling {

}
