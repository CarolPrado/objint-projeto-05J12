import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { PlantaService } from '../../services/planta.service';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
    selector: 'page-index',
    templateUrl: 'index.html',
})
export class IndexPage {
    
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private _plantaService: PlantaService,
        private events: Events) {
        }
        
        ionViewDidLoad() {
            console.log('ionViewDidLoad IndexPage');
            this.events.publish('pagina-carregada')
        }

        
        
    }
    