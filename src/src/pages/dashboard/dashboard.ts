import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { PlantaService } from '../../services/planta.service';
import moment from 'moment';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {
    
    public status;
    public att;
    public irrigacao;
    
    public atividades: any[]

    public loader;
    
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private _plantaService: PlantaService,
        private events: Events,
        private _loadingCtrl: LoadingController) {
            
            this.atividades = [];
            
            this.events.subscribe('pagina-carregada', () => {
                this._plantaService.getUmidade().then((data) => {
                    console.log(data);
                    this.status = this.atualizaDashboard(data.umidade);
                    this.att = this.formataTimestamp(data.status.timestamp)
                    this.atividades = [];
                    for (let i in data.atividades) {
                        if (data.atividades[i].value == true) {
                            this.irrigacao = this.formataTimestamp(data.atividades[i].timestamp)
                            break;
                        }
                    }
                    for (let i=0; i<=5; i++) {
                        this.atividades.push(data.atividades[i])
                        if (this.atividades[i].value != true ) {
                            this.atividades[i].value = this.atualizaDashboard(this.atividades[i].value)
                        }
                        this.atividades[i].timestamp = this.formataTimestamp(this.atividades[i].timestamp)
                    }
                })
            })
        }
        
        ionViewDidLoad() {
            console.log('ionViewDidLoad DashboardPage');
            
        }
        
        getUmidade() {
            this._plantaService.getUmidade().then((data) => {
                console.log(data);
                this.status = this.atualizaDashboard(data.umidade);
                this.att = this.formataTimestamp(data.status.timestamp)
                this.atividades = [];
                for (let i in data.atividades) {
                    if (data.atividades[i].value == true) {
                        this.irrigacao = this.formataTimestamp(data.atividades[i].timestamp)
                        break;
                    }
                }
                for (let i=0; i<=5; i++) {
                    this.atividades.push(data.atividades[i])
                    if (this.atividades[i].value != true ) {
                        this.atividades[i].value = this.atualizaDashboard(this.atividades[i].value)
                    }
                    this.atividades[i].timestamp = this.formataTimestamp(this.atividades[i].timestamp)
                }
            })
        }
        
        formataTimestamp(timestamp) {
            timestamp = timestamp.replace(/\D/g, '')
            timestamp = timestamp.slice(0,14)
            return timestamp.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/, '$3/$2/$1 - $4:$5:$6')
        }
        
        acionaRele() {
            this.showLoader()
            this._plantaService.acionaRele().then((data) => {
                this.irrigacao = this.formataTimestamp(data.status.timestamp)
                this._plantaService.getUmidade().then((umidade) => {
                    this.status = this.atualizaDashboard(umidade.umidade);
                    this.att = this.formataTimestamp(data.status.timestamp)
                    this.atividades = [];
                    for (let i=0; i<=5; i++) {
                        this.atividades.push(data.atividades[i])
                        if (this.atividades[i].value != true) {
                            this.atividades[i].value = this.atualizaDashboard(this.atividades[i].value)
                        }
                        this.atividades[i].timestamp = this.formataTimestamp(this.atividades[i].timestamp)
                    }
                    this.loader.dismiss();
                })
            })
        }
        
        atualizaDashboard(umidade) {
            if (umidade < 600) {
                return 'Solo úmido'
            } else if (umidade >= 600 && umidade < 900) {
                return 'Moderado'
            } else if (umidade >= 900 && umidade < 1024) {
                return 'Solo seco'
            }
        }
        
        public showLoader(title?: any) {
            if (!title) {
                title = "Aguarde..."
            }
            this.loader = this._loadingCtrl.create({
                content: title
            })
            
            this.loader.present()
        }
        
    }
    