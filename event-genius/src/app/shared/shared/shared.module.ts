// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../event/date-format.pipe'; // Update the path as necessary

@NgModule({
  declarations: [DateFormatPipe],
  imports: [CommonModule],
  exports: [DateFormatPipe] // Export the pipe here
})
export class SharedModule {}
