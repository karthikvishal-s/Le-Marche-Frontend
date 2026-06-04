import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Customer{
  custID: Number;
  custName: String;
  custStatus: String;

}


@Injectable({
  providedIn: 'root',
})
export class Customers {

  private apiurl="http://localhost:8080/customers";

  private http = inject(HttpClient);

  public getCustomers():Observable<Customer[]>{
      return this.http.get <Customer[]>(this.apiurl);
  }


}
