import { Injectable } from '@angular/core';
import { AnimationGroupMetadata } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: Array<any> = []
  notificationDate: Date = new Date(0);

  constructor() { }

  ngOnInit() {
  }
}