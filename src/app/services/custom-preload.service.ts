import { Injectable } from '@angular/core';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomPreloadService {
  
  preload(route: Route, load: () => {}) {
    
  }
}
