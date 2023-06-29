import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MacroGoals } from 'src/app/models/MacroGoals';

@Injectable({
  providedIn: 'root'
})
export class MacroGoalService {
  private serverURL: string = "http://localhost:3001/diet-tracker-api"
  private url = `${this.serverURL}/macro-goals`
  private httpOptions = {
    headers : new HttpHeaders ({
      'Content-type': 'application/json; charset=UTF-8'
    }),
  }
  macroGoals$ = new BehaviorSubject<MacroGoals>(null);

  constructor(
    private http: HttpClient
  ) { }

  getMacroGoals(): Observable<MacroGoals> {
    return this.http.get<MacroGoals>(this.url, this.httpOptions)
    .pipe(map(macros => {
      this.macroGoals$.next(macros);
      return macros;
    }))
  }

  createMacroGoals(macros: MacroGoals): Observable<MacroGoals> {
    return this.http.post<MacroGoals>(this.url, macros, this.httpOptions)
    .pipe(map(macros => {
      this.macroGoals$.next(macros);
      return macros;
    }))
  }

  updateMacroGoals(macros: {[key:string]: string}): Observable<MacroGoals> {
    return this.http.patch<MacroGoals>(this.url, macros, this.httpOptions)
    .pipe(map(macros => {
      this.macroGoals$.next(macros);
      return macros;
    }))
  }

  deleteMacroGoals(): Observable<string> {
    return this.http.delete<string>(this.url, this.httpOptions)
    .pipe(map(res => {
      this.macroGoals$.next(null);
      return res;
    }))
  }
}
