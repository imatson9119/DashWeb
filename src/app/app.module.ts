import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, ImageDialog } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutocompleteComponent,
    ImageDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatExpansionModule,
    FormsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    OverlayscrollbarsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
