import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { faHouse, faBook, faAppleWhole, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
  toggled: boolean = false;

  faHouse = faHouse; faBook=faBook; faFood=faAppleWhole;
  faBars=faBars; faX=faX;

  constructor(
    private macroGoalService: MacroGoalService,
    private observer: BreakpointObserver
  ){}

  ngOnInit(): void {
    this.macroGoalService.getMacroGoals().subscribe();
  }

  ngAfterViewInit(): void {
    this.observer.observe(["(max-width: 850px)"]).subscribe((res) => {
      if (res.matches) {
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
}
