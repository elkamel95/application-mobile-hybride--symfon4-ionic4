import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TextToSpeech } from '@ionic-native/text-to-speech/';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BackgroundMode } from '@ionic-native/background-mode';
 import { EmailComposer } from '@ionic-native/email-composer';
import { SMS } from '@ionic-native/sms';
import { NativeAudio } from '@ionic-native/native-audio';
import { SuiviPage } from '../pages/suivi/suivi';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CalendarModule } from 'ionic3-calendar-en';
import { MedicamentUpdatePage } from '../pages/medicament-update/medicament-update';
import  {HttpClientModule}from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { Api } from '../providers/api/api';
import { Medicament } from '../Entity/Medicament';
import { Patient } from '../Entity/patient';
import { Suiveur } from '../Entity/suiveur';
import { Utilisateur } from '../Entity/Utilisateur';
import { Autostart } from '@ionic-native/autostart';
import { login } from '../Entity/Login';
import { IonicStorageModule } from '@ionic/storage';
import { Alarme } from '../Entity/Alarme';
import { Comprime } from '../Entity/Comprime';
import { Images } from '../Entity/Images';
import {IndexPage} from '../pages/index';
import { MessageServiceProvider } from '../providers/api/MessageServiceProvider/MessageServiceProvider';
import { NotificationsPage } from '../pages/notifications/notifications';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuProvider } from '../providers/menu/menu';
import {SettingsPage} from "../pages/settings/settings";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import {LocalWeatherPage} from "../pages/local-weather/local-weather";
import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";
import {GereMedicamentPage} from'../pages/gere-medicament/gere-medicament'
import { EmailProvider } from '../providers/email/email';
import {MedicamentPatientPage} from'../pages/medicament-patient/medicament-patient'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import  {GerePatientPage} from '../pages/gere-patient/gere-patient';
import { ArchivePage } from '../pages/archive/archive';
import {DetectionPage} from "../pages/detection/detection";
import {AnlysePage} from "../pages/anlyse/anlyse";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MedicamentUpdatePage,
    NotificationsPage,
    IndexPage,
    TabsPage,
    LocalWeatherPage,
    TripsPage,
    TripDetailPage,
    SearchLocationPage,
    RegisterPage,
    LoginPage,
    CheckoutTripPage,
    SettingsPage,
    GereMedicamentPage,
    SuiviPage,
    MedicamentPatientPage,
    GerePatientPage,ArchivePage,
    DetectionPage,
    AnlysePage,
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    IonicModule.forRoot(MyApp),HttpClientModule,FormsModule,
        IonicStorageModule.forRoot(),
        NgxQRCodeModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MedicamentUpdatePage,
    NotificationsPage,
    IndexPage,
ArchivePage,
    TabsPage,
      LocalWeatherPage,
    TripsPage,
    TripDetailPage,
    SearchLocationPage,
    RegisterPage,
    LoginPage,
    CheckoutTripPage,
    SettingsPage,
    GereMedicamentPage,
    SuiviPage,
    MedicamentPatientPage,
    GerePatientPage,
    DetectionPage,
    AnlysePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},TextToSpeech,
    Api,
    MessageServiceProvider,
    Medicament,
    Alarme,
    Comprime,
    Images,
    Utilisateur,
    Suiveur,
    Patient,
    MenuProvider,
    ActivityService,
    TripService,
    WeatherProvider,
  BackgroundMode,
  EmailComposer,
  login,
  Autostart,
    EmailProvider,
    NativeAudio,
    BarcodeScanner
  ]
})
export class AppModule {}
