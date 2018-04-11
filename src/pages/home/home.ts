import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { key } from '../../app/tmdb';
import { Shake } from '@ionic-native/shake';
import { Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

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
  resultTest : Movie;
  detailspage: any;
  shakeSubscription: Subscription;

  constructor(public shake:Shake, public platform:Platform,public navCtrl: NavController, public http: HttpClient, private alertCtrl: AlertController) {
    this.detailspage = DetailsPage;
    this.result = Observable.of([]);
  }

  onClear(ev: any) {
    this.result = Observable.of([]);
  }

  fetchResults(query: string): Observable<Movie[]> {
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

  private discoverMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: key,
        language: 'fr-FR',
        sort_by: 'popularity.desc',
        include_adult: 'false',
        include_video: 'false',
        page: '1',
        primary_release_year: '2018'
      }
    }).pluck('results');
  }

  private showRandomMovieAlert(movies: Movie[]): void {
    let movie = movies[Math.floor(Math.random() * movies.length)];
    if(!movie){
      return;
    }
    let alert = this.alertCtrl.create({
      title: movie.title,
      message: movie.overview,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(this.detailspage, movie)
          }

        }
      ]
    }).present();
  }

 ionViewDidEnter():void{
    this.shakeSubscription = Observable.fromPromise(this.platform.ready())
    .switchMap(() => this.shake.startWatch())
    .switchMap(() => this.discoverMovies())
    .subscribe(movies => this.showRandomMovieAlert(movies));
  }

  ionViewWillLeave():void{
    this.shakeSubscription.unsubscribe();
  }


}
