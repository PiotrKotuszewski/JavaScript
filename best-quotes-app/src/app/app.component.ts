import { Component } from '@angular/core';
import {Quotation} from './models/quotation';
import {QUOTES} from './models/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string  = 'Najlepsze cytaty';
  quotes: Quotation[] = QUOTES;

  addVote(quotation: Quotation, value: number){
    quotation.votes += value;
  }

  bestQuotes(){
    return this.quotes.filter(q => q.votes > 0);
  }

  worstQuotes(){
    return this.quotes.filter(q => q.votes < 0);
  }

  onNewQuotation(quotation: Quotation){
    this.quotes.unshift(quotation);
  }
}
