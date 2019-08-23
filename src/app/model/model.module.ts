import { NgModule } from "@angular/core";
//import { StaticDataSource } from "./static.datasource";
//import { Model } from "./repository.model";
import { HttpClientModule } from "@angular/common/http";
import { RestDataSource, REST_URL } from "./rest.datasource";
import { RestUserDataSource } from './rest.user.datasource';

@NgModule({
    imports: [HttpClientModule],
    providers: [/*Model,*/ RestDataSource,RestUserDataSource,
        { provide: REST_URL, useValue: `http://localhost:8080/api` }]
})
export class ModelModule { }
