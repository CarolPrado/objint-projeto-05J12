import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
@Injectable()
export class ResponseService {
    
	constructor(
        private _alertCtrl: AlertController
    ) {
        
    }

    public trataResponse(response: any, descricao: string, corpo?: string): any {

		console.log(descricao);
		if (corpo) console.log('REQUEST', JSON.stringify(corpo), corpo)
		console.log('RESPONSE', response)
    	return response.result;
    }
    
    sendAlert(titulo: any, txt?: any) {
		this._alertCtrl.create({
			title: titulo,
			buttons: [
				{
					text: 'OK'
				}
			]
		}).present()
		// this._loader.hideLoader()
	}
}
    