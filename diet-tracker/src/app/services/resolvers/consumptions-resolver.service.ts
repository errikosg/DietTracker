import {  inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Consumptions } from 'src/app/models/Consumption';
import { ConsumptionService } from '../consumption/consumption.service';

export const ConsumptionsResolverService: ResolveFn<Consumptions> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  consumptionService:ConsumptionService = inject(ConsumptionService)
) : Observable<Consumptions> => consumptionService.getTodaysConsumptions()