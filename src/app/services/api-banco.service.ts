import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ApiBancoService {

  private apiUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  private authorId = 301;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'authorId': this.authorId
  });

  constructor(private http: HttpClient) { }

  crearProducto(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, datos, { headers: this.headers });
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}`, { headers: this.headers });
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/?id=${id}`, { headers: this.headers });
  }

  updateProducto(datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/?id=${datos?.id}`, datos, { headers: this.headers });
  }
}
