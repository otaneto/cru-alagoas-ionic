import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation(query) {
    return this.http.get(
      `http://nominatim.openstreetmap.org/search?q=${query}&format=json`
    );
  }
}
