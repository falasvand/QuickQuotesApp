import {Quote} from '../data/quote.interface';
import { Storage } from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable()
export class QuotesService {

  private favoriteQuotes: Quote[] = [];

  constructor(private storage: Storage) {}

  isQuoteFavorite(quote: Quote) {
    return this.favoriteQuotes.find(
      (quoteElement: Quote) => {
        return quoteElement.id == quote.id;
      }
    );
  }

  addQuote(quote: Quote) {
    this.favoriteQuotes.push(quote);
    this.storage.set('favQuotes', this.favoriteQuotes)
      .then()
      .catch(
        error => {
          this.favoriteQuotes.splice(this.favoriteQuotes.indexOf(quote), 1);
        }
      );
  }

  loadFavQuotes() {
    return this.storage.get('favQuotes')
      .then(
        (favQuotes: Quote[]) => {
          this.favoriteQuotes = favQuotes != null ? favQuotes : [];
          return this.favoriteQuotes;
        }
      );
  }
  
  removeQuote(quote: Quote) {
    const position = this.favoriteQuotes.findIndex(
      (q: Quote) => {
        return q.id == quote.id;
      }
    )

    this.favoriteQuotes.splice(position, 1);
    return this.storage.set('favQuotes', this.favoriteQuotes);
  }

}
