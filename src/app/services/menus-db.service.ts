import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusDbService {
  private menus: Menu[] = [
    { id: 1, categoryAppetizer: 1, categoryFirst: 2, categorySecond: 4, categoryDessert: 5, visible: true },
    { id: 2, categoryAppetizer: 9, categoryFirst: 3, categorySecond: 6, categoryDessert: 8, visible: true }
  ];
  private menusSubject = new BehaviorSubject<Menu[]>(this.menus);
  private lastId = this.menus.length > 0 ? Math.max(...this.menus.map((menu) => menu.id)) : 0;

  getMenus() {
    return this.menusSubject.asObservable();
  }

  addMenu(menu: Menu) {
    menu.id = ++this.lastId;
    this.menus.push(menu);
    this.menusSubject.next([...this.menus]);
  }

  updateMenu(updatedMenu: Menu) {
    const index = this.menus.findIndex((menu) => menu.id === updatedMenu.id);
    if (index !== -1) {
      this.menus[index] = { ...updatedMenu };
      this.menusSubject.next([...this.menus]);
    }
  }

  deleteMenu(menuId: number) {
    this.menus = this.menus.filter((menu) => menu.id !== menuId);
    this.menusSubject.next([...this.menus]);
  }
}


interface Menu {
  id: number;
  categoryAppetizer: number;
  categoryFirst: number;
  categorySecond: number;
  categoryDessert: number;
  visible: boolean;
}
