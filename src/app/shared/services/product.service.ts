import { Injectable } from '@angular/core';
import { Firestore, collection, query, orderBy, collectionData, doc, deleteDoc, addDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../model/Item';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) {}


  getProducts(): Observable<Item[]> {
    const productsRef = collection(this.firestore, 'Products');
    const q = query(productsRef, orderBy('price'), orderBy('name'));
    return collectionData(q, { idField: 'id' }) as Observable<Item[]>;
  }

  getProductsWithLimit(limit:number): Observable<Item[]>{
    const productsRef = collection(this.firestore, 'Products');
    const q = query(productsRef, where('price', '<=', limit), orderBy('price'));
    return collectionData(q, { idField: 'id' }) as Observable<Item[]>;
  }

  getProductsWithName(name:string): Observable<Item[]>{
    const productsRef = collection(this.firestore, 'Products');
    const q = query(productsRef, where('name', '==', name), orderBy('name'));
    return collectionData(q, { idField: 'id' }) as Observable<Item[]>;
  }
  
  deleteProduct(id: string): Promise<void> {
    const productDocRef = doc(this.firestore, 'Products', id);
    return deleteDoc(productDocRef);
  }

  addProduct(product: Partial<Item>): Promise<any> {
  const productsRef = collection(this.firestore, 'Products');
  return addDoc(productsRef, product);
  }

  updateProduct(id: string, productData: Partial<Item>): Promise<void> {
  const productRef = doc(this.firestore, 'Products', id);
  return updateDoc(productRef, productData);
  }
}