import { Injectable } from '@angular/core';


export interface Customer{
  custID: Number;
  custName: String;
  custStatus: String;

}


@Injectable({
  providedIn: 'root',
})
export class Customers {


}
