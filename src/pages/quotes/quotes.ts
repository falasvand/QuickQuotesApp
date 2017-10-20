import { Component, OnInit } from '@angular/core';
import {Quote} from '../../data/quote.interface';
import {NavParams, AlertController} from 'ionic-angular';
import {QuotesService} from '../../services/quotes';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

  quotesGroup: {category: string, quotes: Quote[], icon: string};

  constructor(private navParams: NavParams, private alertCtrl: AlertController, private quotesService: QuotesService) {}

  ngOnInit() {
    this.quotesGroup = this.navParams.data;
  }

  onAddToFavorites(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      message: 'Are you sure you want to add this quote to your favorites?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.quotesService.addQuote(selectedQuote);
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });

    alert.present();
  }

  onRemoveFromFavorites(selectedQuote: Quote) {
    this.quotesService.removeQuote(selectedQuote);
  }

  isFavorite(quote: Quote) {
    return this.quotesService.isQuoteFavorite(quote);
  }
}
