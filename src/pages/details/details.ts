import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Movie } from '../home/home'

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  TheFilm : Movie;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.TheFilm = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
