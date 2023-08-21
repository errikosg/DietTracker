import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

export const MacroGoalResolver: ResolveFn<MacroGoals> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  macroGoalService:MacroGoalService = inject(MacroGoalService)
) : Observable<MacroGoals> => macroGoalService.getMacroGoals()
