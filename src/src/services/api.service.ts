import { Http, RequestOptions, Headers} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { ResponseService } from './response.service'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

	private _apiPath: string

	constructor(
		private _http: Http,
        private _responseSrvc: ResponseService,
        private httpOptions: RequestOptions
    ) {

		// this._apiPath = 'http://localhost:3000'
		this._apiPath = 'http://192.168.43.44:3000'
		
        let headers = new Headers(
            {
                'Content-Type': 'application/json',
				'Authorization': 'Basic Q0FQVFVSQTo0a2xPZllrUQ=='
			}
		)
        this.httpOptions = new RequestOptions({headers});
    }

    public getUmidade(): Observable<any> {
		let url = `${this._apiPath}/umidade`
		return this._http.get(url, this.httpOptions).map(resp => {
			return this._responseSrvc.trataResponse(resp.json(), 'GET umidade', url)
		})
    }
    
    public acionaRele(): Observable<any> {
		let url = `${this._apiPath}/irrigacao`
		return this._http.get(url).map(resp => {
			return this._responseSrvc.trataResponse(resp.json(), 'Aciona rele', url)
		})
	}
}