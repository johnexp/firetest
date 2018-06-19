import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Customer } from '../domain/customer';
import { QueryFn } from 'angularfire2/database/interfaces';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable()
export class CustomerService {

  private dbPath = 'customers';
  private customerDoc: AngularFirestoreDocument<Customer>;
  private customersCollection: AngularFirestoreCollection<Customer>;
  customerFilter: Customer = new Customer;

  constructor(private afs: AngularFirestore) {
    this.customersCollection = afs.collection<Customer>(this.dbPath, ref => {
      const query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      return this.customerFilter.getFilter(query);
    });
    this.customerDoc = this.customersCollection.doc<Customer>(this.dbPath);
  }

  createCustomer(customer: Customer): void {
    this.customersCollection.add(Object.assign({}, customer));
  }

  updateCustomer(customer: Customer): void {
    this.customerDoc.update(customer).catch(error => this.handleError(error));
  }

  getCustomersList(): Observable<Customer[]> {
    return this.customersCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Customer;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  filter(customer: Customer): Observable<Customer[]> {
    this.customerFilter = customer || new Customer;
    this.customersCollection = this.afs.collection<Customer>(this.dbPath, ref => {
      const query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      return this.customerFilter.getFilter(query);
    });
    return this.getCustomersList();
  }

  deleteCustomer(customer): void {
    this.customerDoc = this.afs.doc(`${this.dbPath}/${customer.id}`);
    this.customerDoc.delete();
  }

  private handleError(error) {
    console.log(error);
  }
}
