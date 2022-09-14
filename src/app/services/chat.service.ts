import { HttpClient } from '@angular/common/http';
import { observable, Observable, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';
import {io,Socket} from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://z-store-api-zaa.herokuapp.com';
  socket:any
  constructor(private http: HttpClient) {
      this.socket = io(this.baseUrl)

    }
listen(eventName:any){
  return new Observable((Subscriber)=>{
    this.socket.on(eventName,(data:any)=>{
      Subscriber.next(data)
    })

  })
}
emit(eventName:any,data:any){
  this.socket.emit(eventName,data)
}

initChat(Data:any){
  return this.http.post(`${this.baseUrl}/initChat`,Data);
}
getChat(id:any){
  return this.http.get(`${this.baseUrl}/getChat/${id}`);
}
getMessage(id:any){
  return this.http.get(`${this.baseUrl}/getMessage/${id}`);
}
}
