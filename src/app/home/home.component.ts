import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {google} from "google-maps";
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
declare var google : google;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public alerts: any[];
  public timestamp;
  public map;
  public marker;
  constructor(private http: HttpClient,public dialog: MatDialog) { }

  ngOnInit(): void {
    /*this.http.get('https://us-central1-dash-66822.cloudfunctions.net/pingLocation?plateNumber=' + "CKJ4091" + "&latitude=" + "55" + "&longitude=" + "56").subscribe(data => {
      console.log(data);
    });*/
    
    this.http.get('https://us-central1-dash-66822.cloudfunctions.net/getAlerts').subscribe((data: any) => {
      this.alerts = data.alerts;
      console.log(data.alerts);
    });

    this.initMap();
    let date = new Date();
    this.timestamp = date.getTime();
    
  }
  toggleTray(){
    document.getElementById("side-panel").classList.toggle('collapsed');
    document.getElementById("searchbar").classList.toggle('collapsed');
    document.getElementById("arrow").classList.toggle('collapsed-arrow')
  }
  getAddress(event) {
    //Latitude: event.geometry.viewport.Za.uf.i
    //Longitude: event.geometry.viewport.Va.i
    console.log(event);
    console.log(event.geometry.viewport.Za.i);
    var x = (event.geometry.viewport.Za.i + event.geometry.viewport.Za.j) / 2;
    var y = (event.geometry.viewport.Va.i + event.geometry.viewport.Va.j) / 2;
    this.goTo(x,y);
    
  }
  getTime(t:number) : string{
    if(!this.timestamp || !t){
      return "";
    }
    let time = this.timestamp-t;
    time /= 1000; // seconds
    if(time < 60){
      return Math.round(time) + "s";
    }
    else{
      time /= 60; // mins
      if(time < 60){
        return Math.round(time) + "m";
      }
      else{
        time /= 60; // hrs
        if(time < 24){
          return Math.round(time) + "h";
        }
        else{
          time /= 24; // days
          if(time < 365){
            return Math.round(time) + "d";
          }
          else{
            time /= 365; // years
            return Math.round(time) + "y";
          }
        }
      }
    }
  }
  goTo(latitude, longitude){
    let offset = 0;
    if(!document.getElementById('side-panel').classList.contains('collapsed')){
      offset = -.27;
    }
    if(this.marker){
      this.marker.setMap(null);
      this.marker = {};
    }
    this.map.setCenter({lat: latitude, lng: longitude+offset});
    this.map.setZoom(10);
    this.marker = new google.maps.Marker({position: {lat: latitude,lng: longitude}, map: this.map});
  }
  initMap() {
    // The location of Uluru
    var cstat = {lat: 30.615546, lng: -96.341178};
    // The map, centered at Uluru
    this.map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: cstat,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
    // The marker, positioned at Uluru
    //var marker = new google.maps.Marker({position: cstat, map: this.map});
  
  }
  openImage() {
    this.dialog.open(ImageDialog);
  }
  
}

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.html',
})
export class ImageDialog {}