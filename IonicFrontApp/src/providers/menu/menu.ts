import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HomePage} from '../../pages/home/home';

import {IndexPage} from '../../pages/index/index';
import {ArchivePage} from '../../pages/archive/archive';
import {GereMedicamentPage} from'../../pages/gere-medicament/gere-medicament'

import {NotificationsPage} from '../../pages/notifications/notifications';
import {MedicamentUpdatePage} from '../../pages/medicament-update/medicament-update';
import {RegisterPage} from '../../pages/register/register';
import  {GerePatientPage} from '../../pages/gere-patient/gere-patient';

@Injectable()
export class MenuProvider {

  constructor(public http: HttpClient) { }

 public   getSideMenus() {
    return [{
      title: 'Acceuil', component: IndexPage
    },
  {
      title: 'Gére Medicament', component: GereMedicamentPage

  },
    {
      title: 'Gére Archive', component: ArchivePage

  },
    {
      title: 'Gére Patient', component: GerePatientPage

  },
   {
      title: 'Inserer nouveau médicament', component: HomePage

  }
    ];
  }
  }
