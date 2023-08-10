import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumptions } from 'src/app/models/Consumption';
import { ConsumptionItem } from 'src/app/models/ConsumptionItem';
import { Food } from 'src/app/models/Food';
import { Recipe } from 'src/app/models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
  private serverURL: string = "http://localhost:3001/diet-tracker-api"
  private url = `${this.serverURL}/consumptions`
  private httpOptions = {
    headers : new HttpHeaders ({
      'Content-type': 'application/json; charset=UTF-8'
    }),
  }

  constructor(
    private http: HttpClient
  ) { }

  getTodaysConsumptions(): Observable<Consumptions> {
    return this.http.get<Consumptions>(`${this.url}/today`, this.httpOptions);
  }

  getAllConsumptions(): Observable<Consumptions[]> {
    return this.http.get<Consumptions[]>(this.url, this.httpOptions);
  }

  addConsumptionItem(date: Date, item: ConsumptionItem): Observable<ConsumptionItem> {
    return this.http.post<ConsumptionItem>(this.url, {date,item}, this.httpOptions)
  }

  addMultipleConsumptionItems(date, items: ConsumptionItem[]): Observable<ConsumptionItem[]> {
    return this.http.post<ConsumptionItem[]>(`${this.url}/multi`, {date,items}, this.httpOptions)
  }

  deleteConsumptionItem(itemId: string, type:string, date: Date): Observable<string> {
    return this.http.request<string>('delete', `${this.url}/log/${itemId}`, {...this.httpOptions, body: {type,date}});
  }

  deleteDay(date: Date): Observable<string> {
    return this.http.request<string>('delete', `${this.url}/day`, {...this.httpOptions, body: {date}})
  }
}
