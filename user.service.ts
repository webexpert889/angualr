import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APPCONFIG, AppConfig } from '../app.config';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(
        @Inject(APPCONFIG) private config: AppConfig,
        private http: HttpClient) { }

    addCustodian(user: User) {
        return this.http.post(`${this.config.apiEndpoint}/users/addCustodian`, user).pipe(map((res: any) => {
            return res;
        }));
    }

    uploadCustodianImage(user: any, id : any) {
        return this.http.post(`${this.config.apiEndpoint}/users/uploadCustodianImage/${id}`, user).pipe(map((res: any) => {
            return res;
        }));
    }

    getAll(withCounter = false) {
        if(withCounter){
            return this.http.get(`${this.config.apiEndpoint}/users/all/counter`).pipe(map((res: any) => {
                return res;
            }));
        } else {
            return this.http.get(`${this.config.apiEndpoint}/users`).pipe(map((res: any) => {
                return res;
            }));
        }
    }

    getAllWithFilters(formData : any, counter : boolean= false) {
        if(counter) {
            return this.http.post(`${this.config.apiEndpoint}/users/counter`,formData).pipe(map((res: any) => {
                return res;
            }));
        } else {
            return this.http.post(`${this.config.apiEndpoint}/users`,formData).pipe(map((res: any) => {
                return res;
            }));
        }
    }

}
