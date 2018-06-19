import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../domain/customer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html'
})
export class CustomersListComponent implements OnInit {

  customers: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomersList();
    setTimeout(() => {
      const custom = new Customer;
      custom.age = 31;
      this.customerService.filter(custom).subscribe(
        result => {
          this.customers = result;
        },
        error => {
          console.log(error);
        }
      );
    }, 5000);
  }

  getCustomersList() {
    // Use snapshotChanges().map() to store the key
    const test = this.customerService.getCustomersList().subscribe(
      result => {
        this.customers = result;
      },
      error => {
        console.log(error);
      }
    );
  }
}
