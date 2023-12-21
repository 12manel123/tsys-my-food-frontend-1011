import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, tap } from 'rxjs';
import { Menu, MenuUserNew } from '../models/menu-admin';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenusDbService {
  
  
  private menus: Menu[] = [
    { id: 1, categoryAppetizer: 1, categoryFirst: 2, categorySecond: 4, categoryDessert: 5, visible: true },
    { id: 2, categoryAppetizer: 9, categoryFirst: 3, categorySecond: 6, categoryDessert: 8, visible: true },
    { id: 3, categoryAppetizer: 9, categoryFirst: 2, categorySecond: 6, categoryDessert: 8, visible: false },
    { id: 4, categoryAppetizer: 9, categoryFirst: 3, categorySecond: 4, categoryDessert: 8, visible: false }

  ];

  private url = environment.apiUrl + '/api/v1/menus';
  private url2 = environment.apiUrl + '/api/v1/menu';
  private menuVisibilityChanged = new Subject<number>();

  private menusSubject = new BehaviorSubject<Menu[]>(this.menus);
  private lastId = this.menus.length > 0 ? Math.max(...this.menus.map((menu) => menu.id)) : 0;
  
  constructor(private http: HttpClient) {}

  getMenus() {
    return this.menusSubject.asObservable();
  }

  getMenusFromApi(startIndex: number, endIndex: number) {
    return this.http.get<any[]>(this.url+"?page="+startIndex+"&size="+endIndex);
  }

  getTotalMenus(): number {
    return this.menus.length;
  }

  addMenu(menu: MenuUserNew) {
    return this.http.post(this.url2,menu, { headers: { 'Content-Type': 'application/json' } });

  }

  updateMenu(updatedMenu: Menu) {
    const index = this.menus.findIndex((menu) => menu.id === updatedMenu.id);
    if (index !== -1) {
      this.menus[index] = { ...updatedMenu };
      this.menusSubject.next([...this.menus]);
    }
  }

  deleteMenu(menuId: number) {
    return this.http.delete<any[]>(this.url2+"/"+menuId);
  }

  changeMenuVisibility(menuId: number): Observable<any> {
    return this.http.put(`${this.url2}/changeVisibility/${menuId}`, null)
      .pipe(
        tap(() => {
          this.menuVisibilityChanged.next(menuId);
        })
      );
  }

  changeDishVisibility(id: number) {
    throw new Error('Method not implemented.');
  }

  updateAppetizer(updatedAppetizer: MenuUserNew): Observable<any> {
    const appetizerId = updatedAppetizer.appetizer.id;
    const updatedName = prompt('Editar nombre', updatedAppetizer.appetizer.name);
  
    if (updatedName !== null && updatedName.trim() !== '') {
      const updatedAppetizerData = { name: updatedName.trim() };
      
      const url = `${this.url2}/${appetizerId}`;
      
      return this.http.put(url, updatedAppetizerData, { headers: { 'Content-Type': 'application/json' } });
    } else {
      return EMPTY;
    }
  }
  
  
}