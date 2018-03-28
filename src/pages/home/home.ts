import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http/src/module';
import { key } from '../../app/tmdb';
import { HttpParams } from '@angular/common/http/src/params';

export interface Movie {
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
  overview: string;

}

const film: Movie[] = [
  { title: 'Seigneurs des Anneaux',  release_date: '2010', poster_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/1rF04Kk1eunZHk9OHPFwv8hllRF.jpg',vote_average: "9",overview:"Il était une fois" },
  { title: 'Zootopie', release_date: '2017', poster_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/7pESsPdnttINTOxJAmfOOk9URO5.jpg',vote_average: "9",overview:"Il était une fois" },
  { title: 'Thor',  release_date: '2018', poster_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/pNLGDvsJyTRdjVUJdc4iy6BQYK5.jpg',vote_average: "9",overview:"Il était une fois" }
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  result: Observable<Movie[]>;
  picture: string;
  resultempty : boolean;
  detailspage : any;



  constructor(public navCtrl: NavController,public http:HttpClient) {
    this.resultempty = true;
    this.detailspage = DetailsPage;
    this.result = Observable.of([]);
  }

  onClear(ev: any) {
    this.result = Observable.of([]);
    return;
  }

  fetchResults(query: string):Observable<Movie[]>{
    query = query.trim();
    return this.http.get<Movie[]>("https://api.themoviedb.org/3/search/movie?api_key="+key+"&language=fr-FR&query="+query+"&page=1&include_adult=false").pluck('results');
  }

  getItems(ev: any) {

    this.onClear(ev);
    let val = ev.target.value;
    
    if (val && val.trim() != '') {
      this.result = this.fetchResults(val);
    }
    else {
      return this.onClear(ev);
    }
    
  }

 
}
