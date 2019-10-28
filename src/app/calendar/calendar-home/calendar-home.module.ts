import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CalendarHomePage } from './calendar-home.page';

import { NgCalendarModule  } from 'ionic2-calendar';

const routes: Routes = [
  {
    path: '',
    component: CalendarHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCalendarModule
  ],
  declarations: [CalendarHomePage]
})
export class CalendarHomePageModule {}
