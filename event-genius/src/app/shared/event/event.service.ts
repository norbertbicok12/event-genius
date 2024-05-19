import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private firestore: AngularFirestore) { }

  createEvent(event: any) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
      console.error('User UID is undefined. Cannot create event.');
      return Promise.reject('User UID is undefined. Cannot create event.');
    }
    return this.firestore.collection('events').add({
      title: event.title,
      description: event.description,
      place: event.place,
      date: event.date,
      user_email: user.email
    });
  }

  getEvents() {
    return this.firestore.collection('events').get();
  }

  

  updateEvent(eventId: string, event: any) {
    return this.firestore.collection('events').doc(eventId).update(event);
  }

  getUsersEvents(email: string) {
    return this.firestore.collection('events', ref => ref.where('user_email', '==' , email)).get();
  }

  searchEvents(search: string) {
    return this.firestore.collection('events', ref => ref.where('title', '==', search)).snapshotChanges();
  }

  deleteEvent(eventTitle: string) {
    return this.firestore.collection('events', ref => ref.where('title', '==', eventTitle))
    .get().toPromise()
    .then(querySnapshot => {
      if (querySnapshot) {
        // Use a batch to delete all matching documents
        const batch = this.firestore.firestore.batch();
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      }
      return null; // Add this line to return a value in all code paths
    });
  }
}
