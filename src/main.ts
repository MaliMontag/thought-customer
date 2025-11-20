import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'zone.js';
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { App } from './app/app';
// import {  } from './app/app.routes';

// bootstrapApplication(App, {
//   providers: [
//   ]
// }).catch(err => console.error(err));
