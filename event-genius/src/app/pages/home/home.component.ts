import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventService } from '../../shared/event/event.service';
import { Event } from '../../shared/event/event.model';
import { DateFormatPipe } from '../../shared/event/date-format.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  search: FormControl;
  events: Event[] = [];

  constructor(private eventService: EventService) {
    this.search = new FormControl('search');
  }

  ngOnInit() {
    const dateFormatPipe = new DateFormatPipe();
    this.eventService.getEvents().subscribe((querySnapshot) => {
      this.events = querySnapshot.docs.map((doc) => {
        const data: any = doc.data();
        return {
          title: data.title,
          description: data.description,
          place: data.place,
          date: dateFormatPipe.transform(data.date) as any, // Convert the transformed date to a Date object
          user_email: data.user_email,
        };
      });
      console.log(this.events);
    });
  }
}
