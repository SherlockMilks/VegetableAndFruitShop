import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { Order } from '../model/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: Firestore) {}

  saveOrder(order: Order): Promise<void> {
    const orderCollection = collection(this.firestore, 'Orders');
    return addDoc(orderCollection, order as any).then(() => {});
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    const orderCollection = collection(this.firestore, 'Orders');
    const q = query(
      orderCollection,
      where('orderBy.id', '==', userId),
      orderBy('orderDate', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Order[]>;
  }
}
