import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../../constants';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
constructor(private http: HttpClient) { }

  registerUser(formData: any){
    return this.http.post(environment.apiBaseUrl + '/signup', formData, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });    
  }

  loginUser(formData: any){
    return this.http.post(environment.apiBaseUrl + '/signin', formData, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });    
  }
  
  isLoggedIn(){
    return this.getToken() != null? true: false;
  }

  deleteKey(){
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(){
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem(TOKEN_KEY);
  }
  return null;
  }

  saveToken(token: string){
    localStorage.setItem(TOKEN_KEY, token);
  }
}
