import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCoursePageRoutingModule } from './add-course-routing.module';

import { AddCoursePage } from './add-course.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCoursePageRoutingModule,ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers:[DatePipe],
  declarations: [AddCoursePage]
})
export class AddCoursePageModule {}
