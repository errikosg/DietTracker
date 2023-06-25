import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(
    private http: HttpClient
  ) { }

  getMacroGoals(): Observable<MacroGoals> {
    return this.http.get<MacroGoals>(this.url, this.httpOptions)
  }

  createMacroGoals(macros: MacroGoals): Observable<MacroGoals> {
    return this.http.post<MacroGoals>(this.url, macros, this.httpOptions)
  }

  updateMacroGoals(macros: {[key:string]: string}): Observable<MacroGoals> {
    return this.http.patch<MacroGoals>(this.url, macros, this.httpOptions)
  }

  deleteMacroGoals(): Observable<MacroGoals> {
    return this.http.delete<MacroGoals>(this.url, this.httpOptions)
  }
}
