import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { key } from '../../app/tmdb';

export interface Movie {
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
  overview: string;

}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  result: Observable<Movie[]>;
  detailspage : any;

  constructor(public navCtrl: NavController,public http:HttpClient) {
    this.detailspage = DetailsPage;
    this.result = Observable.of([]);
  }

  onClear(ev: any) {
    this.result = Observable.of([]);
  }

  fetchResults(query: string):Observable<Movie[]>{
    return this.http.get<Movie[]>("https://api.themoviedb.org/3/search/movie", {
      params: {
        query: query.trim(),
        api_key: key,
        language: 'fr-FR',
        include_adult: 'false'
      }
    }).pluck('results');
  }

  getItems(ev: any) {

    let val = ev.target.value;
    
    if (val && val.trim() != '') {
      this.result = this.fetchResults(val);
    }
    else {
      return this.onClear(ev);
    }
    
  }

 
}
