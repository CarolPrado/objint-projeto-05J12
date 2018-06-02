import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { ResponseService } from "./response.service";

@Injectable()
export class PlantaService {

	constructor(
		private _apiSrvc: ApiService,
		private _responseSrvc: ResponseService
	) {

    }

    public getUmidade(): Promise<any> {
		return new Promise((resolve, reject) => {
			this._apiSrvc.getUmidade().subscribe(data => {
				if (data) {
					resolve(data)
				}
			}, (err) => {
				console.log(err)
				this._responseSrvc.sendAlert('Ocorreu um erro ao realizar a operação, verifique sua conexão com a internet e tente novamente')
				reject()
			})
		})
    }
    
    public acionaRele(): Promise<any> {
		return new Promise((resolve, reject) => {
			this._apiSrvc.acionaRele().subscribe(data => {
				if (data) {
					resolve(data)
				}
			}, (err) => {
				console.log(err)
				this._responseSrvc.sendAlert('Ocorreu um erro ao realizar a operação, verifique sua conexão com a internet e tente novamente')
				reject()
			})
		})
	}
}