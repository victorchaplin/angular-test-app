import { Component, OnInit, Input } from '@angular/core';
import { ICustomer } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  private _customers: ICustomer[] = []
  
  get customers(): ICustomer[] {
    return this._customers
  }

  @Input()
  set customers(customers: ICustomer[]) {
    if(customers) {
      this.filteredCustomers = this._customers = customers
      this.calculateOrders()
    }
  }

  filteredCustomers: ICustomer[] = []
  customersOrderTotal: number
  currencyCode: string = 'USD'

  constructor() { }

  ngOnInit() {
    
  }

  calculateOrders() {
    this.customersOrderTotal = 0;
    this.filteredCustomers.forEach((cust: ICustomer) => {
        this.customersOrderTotal += cust.orderTotal;
    });
  }

  filter(data: string) {
    if (data) {
        this.filteredCustomers = this.customers.filter((cust: ICustomer) => {
            return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                   cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                   cust.orderTotal.toString().indexOf(data) > -1;
        });
    } else {
        this.filteredCustomers = this.customers;
    }

    this.calculateOrders();
}

  sort(prop: string) {
    // a sorter service will handle sorting
  }

}
