import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AuthComponent} from './auth.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'auth', component: AuthComponent }
    ]),
    SharedModule
  ]
})
export class AuthModule { }
