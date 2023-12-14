import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../models/menu-admin';

@Injectable({
  providedIn: 'root'
})
export class MenusDbService {
  private menus: Menu[] = [
    { 
      id: 1,
      categoryAppetizer: {
        id: 1,
        name: 'Caesar Salad',
        description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese.',
        image: 'https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI.jpg',
        price: 9.99,
        category: 'appetizer',
        attributes: ['vegetarian'],
        visible: false
      }, 
      categoryFirst: {
        id: 2,
        name: 'Grilled Salmon',
        description: 'Grilled salmon fillet served with lemon butter sauce.',
        image: 'https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg',
        price: 18.99,
        category: 'first',
        attributes: ['lactose'],
        visible: true
      }, 
      categorySecond: {
        id: 4,
        name: 'BBQ Chicken Pizza',
        description: 'Pizza topped with BBQ chicken, red onions, and cilantro.',
        image: 'https://thecozycook.com/wp-content/uploads/2019/08/BBQ-Chicken-Pizza-.jpg',
        price: 16.99,
        category: 'second',
        attributes: [],
        visible: false
      }, 
      categoryDessert: {
        id: 5,
        name: 'Chocolate Fondue',
        description: 'Rich chocolate fondue served with strawberries and marshmallows.',
        image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
        price: 12.99,
        category: 'dessert',
        attributes: ['nuts'],
        visible: false
      }, 
      visible: true 
    },
    { 
      id: 2,
      categoryAppetizer: {
        id: 1,
        name: 'Caesar Salad',
        description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese.',
        image: 'https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI.jpg',
        price: 9.99,
        category: 'appetizer',
        attributes: ['vegetarian'],
        visible: false
      }, 
      categoryFirst: {
        id: 2,
        name: 'Grilled Salmon',
        description: 'Grilled salmon fillet served with lemon butter sauce.',
        image: 'https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg',
        price: 18.99,
        category: 'first',
        attributes: ['lactose'],
        visible: true
      }, 
      categorySecond: {
        id: 6,
        name: 'Shrimp Scampi',
        description: 'Shrimp sautéed in garlic and white wine sauce, served over linguine.',
        image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
        price: 20.99,
        category: 'second',
        attributes: [],
        visible: false
      }, 
      categoryDessert: {
        id: 5,
        name: 'Chocolate Fondue',
        description: 'Rich chocolate fondue served with strawberries and marshmallows.',
        image: 'https://th.bing.com/th/id/OIP._txd9Hwain8m1-so-mkBhwAAAA?rs=1&pid=ImgDetMain',
        price: 12.99,
        category: 'dessert',
        attributes: ['nuts'],
        visible: false
      }, 
      visible: true 
    },

  ];
  private menusSubject = new BehaviorSubject<Menu[]>(this.menus);
  private lastId = this.menus.length > 0 ? Math.max(...this.menus.map((menu) => menu.id)) : 0;

  getMenus() {
    return this.menusSubject.asObservable();
  }

  getTotalMenus(): number {
    return this.menus.length;
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