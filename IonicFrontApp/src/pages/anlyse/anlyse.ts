import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  {Api} from        '../../providers/api/api';
import { Storage } from '@ionic/storage';
declare var google;
/**
 * Generated class for the AnlysePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anlyse',
  templateUrl: 'anlyse.html',

})

export class AnlysePage {
idPatient:number=0;
Estimate:number=0;
Status:any=[];
 main2dArray: (string|number)[][] = []


    drawChart() {
  
this.main2dArray.push(["l","j"]);

for (var i =0 ; i <= this.Status.length - 1; i++) {

this.main2dArray.push([i+1,this.Status[i].Status.Estimate]);


}
console.log(this.main2dArray);

       

      var data = google.visualization.arrayToDataTable(this.main2dArray);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'top' },
vAxis: { 
         ticks: [{v:10, f:'10%'},{v:20, f:'20%'},{v:30, f:'30%'},{v:40, f:'40%'},{v:50, f:'50%'},{v:60, f:'60%'},{v:70, f:'70%'},{v:80, f:'80%'},{v:90, f:'90%'},{v:100, f:'100%'}]
},
hAxis: { 
            format: '0'
}

        };
        var LineChart = new google.visualization.LineChart(document.getElementById('chart'));

LineChart.draw(data, options);

    
       }
  ngOnInit() {

  }
  constructor(public navCtrl: NavController,public storage:Storage, public navParams: NavParams, public api :Api) {
  }
 
ionViewWillEnter  ()
{      }
  ionViewDidLoad() {
 this.storage.get("userP").then((resulst) => {
    
       
 
  	var d = new Date();
var mm = d.getMonth() + 1;
var dd = d.getDate();
var yy = d.getFullYear();
var myDateString = yy + '-' + mm + '-' + dd; //(US)

     this.api.Login("GetStatistique",myDateString,resulst.id).subscribe(
  result=> {
    console.log(result);
    if(result.length!=0){
  this.Estimate=result[0].Status.Estimate
 this. Status=result;
}
}); 
      });

    
}


}