import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'webtest';
 constructor() {

 }

  ngOnInit(): void {
      this.requestNotificationPermission();
    }
  requestNotificationPermission() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('User granted permission for notifications');
        } else {
          console.log('User denied permission for notifications');
        }
      });
    } else {
      console.log('Notifications or Service Workers are not supported in this browser');
    }
  }
  onClick() {

  }

  protected readonly alert = alert;
}
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly VAPID_PUBLIC_KEY = 'YOUR_PUBLIC_VAPID_KEY'; // Get this from your push provider (e.g., Firebase, Web Push)

  constructor(private swPush: SwPush) {}

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((subscription) => {
        console.log('User subscribed:', subscription);
        // Send subscription to backend to store
      })
      .catch((err) => console.error('Could not subscribe to notifications', err));
  }
}
