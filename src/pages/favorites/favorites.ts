import {Component} from '@angular/core';
import {Quote} from '../../data/quote.interface';
import {QuotesService} from '../../services/quotes';
import { LoadingController, ModalController } from 'ionic-angular';
import {QuotePage} from "../quote/quote";
import {SettingsService} from "../../services/settings";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favoriteQuotes: Quote[];

  constructor(private quotesService: QuotesService, 
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController, 
              private settingsService: SettingsService) {}

  ionViewWillEnter() {
    this.quotesService.loadFavQuotes()
      .then(
        (favQuotes: Quote[]) => {
          this.favoriteQuotes = favQuotes;
        }
      );
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss(
      (remove: boolean) => {
        if(remove) {
          this.onRemoveFromFavs(quote);
        }
      }
    );
  }

  onRemoveFromFavs(quote: Quote) {
    const loader = this.loadingCtrl.create({
      content: 'Please wait..',
      spinner: 'dots'
    });
    loader.present();
    this.quotesService.removeQuote(quote)
      .then(
        () => {
          this.quotesService.loadFavQuotes()
            .then(
              (favQuotes: Quote[]) => {
                loader.dismiss();
                this.favoriteQuotes = favQuotes;
              }
            )
            .catch(
              error => {
                loader.dismiss();
                console.log(error);
              }
            );
        }
      );
    
  }

  getBackground() {
    return this.settingsService.isAltBackground() ? 'altQuoteBg' : '';
  }
}
