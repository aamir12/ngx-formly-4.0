import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return forkJoin([this.getUser(), this.getFields()]);
  }

  getUser() {
    return this.http.get<{ firstName: string, lastName: string }>('assets/json-powered/user.json');
  }

  getFields() {
    return this.http.get<FormlyFieldConfig[]>('assets/json-powered/user-form.json');
  }

  getColors() {
    return this.http.get<{ label: string; value: string }[]>('assets/json-powered/colors.json');
  }

  getCompanies() {
    return this.http.get<{ label: string; value: string }[]>('assets/json-powered/companies.json');
  }

  getCompanyItems(companyId: string) {
    const items = [
      {
        id:'1',
        name: 'item1',
        companyId: '1'
      },
      {
        id:'2',
        name: 'item2',
        companyId: '1'
      },
      {
        id:'3',
        name: 'item3',
        companyId: '2'
      },
      {
        id:'4',
        name: 'item4',
        companyId: '2'
      },
      {
        id:'5',
        name: 'item5',
        companyId: '3'
      },
      {
        id:'6',
        name: 'item6',
        companyId: '3'
      },
    ];

    const companyItems = items.filter(item => item.companyId === companyId);
    return of(companyItems);
  }
}
