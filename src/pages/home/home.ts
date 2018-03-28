import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Title } from '@angular/platform-browser/src/browser/title';

export interface Movie {
  title: string;
  author: string;
  date: string;
  image: string;

}

const film: Movie[] = [
  { title: 'Seigneurs des Anneaux', author: 'Un auteur', date: '2010', image: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/1rF04Kk1eunZHk9OHPFwv8hllRF.jpg' },
  { title: 'Zootopie', author: 'Un auteur', date: '2017', image: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/7pESsPdnttINTOxJAmfOOk9URO5.jpg' },
  { title: 'Thor', author: 'Un auteur', date: '2018', image: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/pNLGDvsJyTRdjVUJdc4iy6BQYK5.jpg' }
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  result: Movie[];
  picture: string;
  resultempty : boolean;


  constructor(public navCtrl: NavController) {
    this.result = film;
    this.resultempty = false;
  }

  onClear(ev: any) {
    this.result = film;
    this.resultempty = false;
    return;
  }

  getItems(ev: any) {

    this.onClear(ev);
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.result = this.result.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else if (!val) {
      return this.onClear(ev);
    }
    else if(val.trim() == ''){
      this.resultempty = true;
      return;
    }
  }
}
