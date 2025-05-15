import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterBoxComponent } from './components/filter-box/filter-box.component';
import {ShoppingResumeComponent} from './components/shopping-resume/shopping-resume.component';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import {Device} from '@capacitor/device';
import {Platform} from '@ionic/angular';

jeepSqlite(window)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FilterBoxComponent, ShoppingResumeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  public isWeb = false;
  public load = false;

  constructor(private platform: Platform) {
  }

  ngOnInit() {
    this.platform.ready().then(async () => {
      const info = await Device.getInfo();

      this.isWeb = info.platform == 'web';
      this.load = true;
    })
  }
}
