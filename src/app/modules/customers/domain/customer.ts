import * as firebase from 'firebase';

export class Customer {
  id: string;
  key: string;
  name: string;
  age: number;
  active = true;

  public getFilter(query: firebase.firestore.Query): firebase.firestore.Query {
    if (this.age) {
      query = query.where('age', '==', this.age);
    }
    if (this.name) {
      query = query.where('name', '==', this.name);
    }
    return query;
  }
}
