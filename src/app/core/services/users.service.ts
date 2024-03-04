import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = `${environment.apiUrl}/api`;

    constructor(private http: HttpClient) { }
    getUsers(params?: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/users`, { params: params });
    }

    getByIdUers(id: any) {
        return this.http.get(`${this.apiUrl}/user/${id}`);
    }

    usersCreate(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/user`, payload);
    }

    removeUser(id: number) {
        return this.http.delete(`${this.apiUrl}/user/${id}`);
    }
    userUpdate(_id: string, payload: any) {
        const url = `${this.apiUrl}/user/${_id}`;
        return this.http.put(url, payload);
    }
    dashborad(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/dashboard`);
    }

    getManageUser(type: String): Observable<any> {
        const params:any = {
            type
        }
        return this.http.get<any>(`${this.apiUrl}/manage`, { params: params });
    }
    storeAndUpdateManageUser(data: any, type: String,id?:String): Observable<any> {
        const params:any = {
            type
        }
        if(id){
            return this.http.put<any>(`${this.apiUrl}/manage/${id}`, data, { params });
        }
        return this.http.post<any>(`${this.apiUrl}/manage`, data, { params });
    }
    getByIdManageUser(type: String, id: any): Observable<any> {
        const params:any = {
            type
        }
        return this.http.get<any>(`${this.apiUrl}/manage/${id}`, { params: params });
    }
    deleteManageUser(type: String, id: String): Observable<any> {
        const params:any = {
            type
        }
        return this.http.delete<any>(`${this.apiUrl}/manage/${id}`, { params: params });
    }
    multipleUsersDelete(ids: any) {
        return this.http.post<any>(`${this.apiUrl}/multipleUserDelete`, ids);
    }

    getUserTableColumn(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/user-table-column`);
    }
    updateUserTableColumn(data: any) {
        return this.http.post<any>(`${this.apiUrl}/user-table-column-update`, data);
    }


    generatePdf(content: string, fileName: string): void {
        const printWindow:any= window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>${fileName}</title>
              <style>
                /* Add your styles here if needed */
              </style>
            </head>
            <body>${content}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
}
