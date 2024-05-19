import { DatePipe } from "@angular/common";
import { DateFormatPipe } from "./date-format.pipe";

export class Event {
    constructor(public title: string, public description: string, public place: string, public date: DateFormatPipe, public user_email: string) {
        // Constructor implementation goes here
    }
}