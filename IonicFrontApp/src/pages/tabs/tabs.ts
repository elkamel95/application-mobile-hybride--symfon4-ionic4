import { Component } from '@angular/core';

import { IndexPage } from '../index/index';
import { HomePage } from '../home/home';
import { MedicamentUpdatePage } from '../medicament-update/medicament-update';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = IndexPage;
  tab2Root = HomePage;
  tab3Root = MedicamentUpdatePage;

  constructor() {

  }
}
