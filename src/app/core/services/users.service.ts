import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = `${environment.apiUrl}/api`;
    private dvUrl = 'https://cors-anywhere.herokuapp.com/https://api.displayvideo.com/v1';

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
        const printWindow: any = window.open('', '_blank');
         printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>${fileName}</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  overflow: auto;
                }
      
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                }
      
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                }
      
                th {
                  background-color: #f2f2f2;
                }
                
              </style>
            </head>
            <body>${content}</body>
          </html>
        `);
        printWindow.document.close();
              printWindow.onload = () => {
          printWindow.print();
        };
      }
      createUser(email: string, displayName: string, advertiserId: string): Observable<any> {
        const user = {
          email: email,
          displayName: displayName,
          assignedUserRoles: [
            {
              advertiserId: advertiserId,
              userRole: 'STANDARD'
            }
          ]
        };
        return this.http.post<any>(`${this.dvUrl}/users`, user);
      }
}
