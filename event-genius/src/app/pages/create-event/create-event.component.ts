import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../shared/event/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {

  createEvent: FormGroup;
  error: any;

  constructor(private eventService: EventService, private router: Router) { 

    this.createEvent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      place: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

  }
  
  onSubmit() {
    if (this.createEvent.valid) {
      this.eventService.createEvent(this.createEvent.value);
      this.router.navigate(['']);
    } else {
      this.error = 'Please fill out all the fields';
    }
  }
  

  onBack() {
    throw new Error('Method not implemented.');
  }

}
