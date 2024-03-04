import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 30.2672;
  lng: number = -97.7431;
  isFullWidth = false;

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 11,
      center: [this.lng, this.lat]
    });

    this.map.on('load', () => {
      // Your existing map initialization code here
    });
  }

  toggleWidth() {
    this.isFullWidth = !this.isFullWidth;
    const width = this.isFullWidth ? '100%' : '50%';
    document.getElementById('map')!.style.width = width;
    if (this.map) {
      this.map.resize();
    }
  }
}
