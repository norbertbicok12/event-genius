import { Component } from '@angular/core';
import { EventService } from '../../shared/event/event.service';
import { Event } from '../../shared/event/event.model';
import { DateFormatPipe } from '../../shared/event/date-format.pipe';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent {

  events: Event[] = [];

  constructor(private eventService: EventService, private authService: AuthService) {
  }

  ngOnInit() {
    const dateFormatPipe = new DateFormatPipe();
    const email = this.authService.getUserEmail();
    this.eventService.getUsersEvents(email).subscribe((querySnapshot) => {
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

  onDelete(eventTitle: string) {
    this.eventService.deleteEvent(eventTitle);
  }

}
