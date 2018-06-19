import { Component, OnInit, Input } from '@angular/core';

import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../domain/customer';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html'
})
export class CustomerDetailsComponent implements OnInit {

  @Input() customer: Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  updateActive(active: boolean) {
    this.customer.active = active;
    this.customerService.updateCustomer(this.customer);
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.customer);
  }

}
