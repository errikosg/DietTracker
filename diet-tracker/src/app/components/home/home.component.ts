import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { faHouse, faBook, faAppleWhole,faPencil, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;
  toggled: boolean = false;
  subscription: Subscription

  faHouse = faHouse; faBook=faBook; faFood=faAppleWhole; faPencil=faPencil;
  faBars=faBars; faX=faX;

  constructor(
    private macroGoalService: MacroGoalService,
    private observer: BreakpointObserver
  ){}

  ngOnInit(): void {
    this.macroGoalService.getMacroGoals().subscribe();
  }

  ngAfterViewInit(): void {
    this.subscription = this.observer.observe(["(max-width: 850px)"]).subscribe((res) => {
      if (res && res.matches) {
        this.drawer.mode = 'over'
        this.drawer.close()
      }
      else{
        this.drawer.mode = 'side'
        this.drawer.close()
      }
    })
  }

  onToggle() {
    this.drawer.toggle()
  }

  onOpenedChanged() {
    this.toggled = !this.toggled
  }

  getIcon() {
    if(this.toggled) return faX;
    else return faBars;
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe()
  }
}
