import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Customer{
  custId: number;
  custName: String;
  custStatus: String;

}


@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private apiurl="http://localhost:8080/customers";

  private http = inject(HttpClient);

  getCustomers():Observable<Customer[]>{
      return this.http.get <Customer[]>(this.apiurl);
  }

   addCustomer(customer: Customer):Observable<Customer>{
     return this.http.post<Customer>(this.apiurl,customer)
  }

  deleteCustomer(custId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiurl}/${custId}`)
  }

}
