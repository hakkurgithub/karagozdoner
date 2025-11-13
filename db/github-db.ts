// db/github-db.ts
import { Octokit } from '@octokit/rest';
import path from 'path';
import fs from 'fs';

export interface GitHubDatabase {
  products: Product[];
  orders: Order[];
  reservations: Reservation[];
  users: User[];
  settings: RestaurantSettings;
  lastUpdated: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number; // Ft cinsinden
  category: string;
  image?: string;
  isActive: number; // 1: aktív, 0: passzív
  createdAt: string;
}

export interface Order {
  id: number;
  userId: number;
  customerName?: string;
  customerPhone?: string;
  status: string;
  orderType: string;
  total: number; // Ft
  notes?: string;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number; // Ft
}

export interface Reservation {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  reservationDate: string;
  partySize: number;
  status: string;
  notes?: string;
  createdAt: string;
}

export interface User {
  id: number;
  name?: string;
  email: string;
  role: 'b2b' | 'manager';
  createdAt: string;
}

export interface RestaurantSettings {
  restaurantName: string;
  address: string;
  phone: string;
  email: string;
}

class GitHubDB {
  private dbPath = path.join(process.cwd(), 'db', 'github-db.json');
  private octokit?: Octokit;
  
  constructor() {
    // GitHub API kullanımı için token gerekli (opsiyonel)
    if (process.env.GITHUB_TOKEN) {
      this.octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
      });
    }
  }

  // Local JSON dosyasını oku
  async readDatabase(): Promise<GitHubDatabase> {
    try {
      if (fs.existsSync(this.dbPath)) {
        const data = fs.readFileSync(this.dbPath, 'utf8');
        return JSON.parse(data);
      }
      return this.getDefaultDatabase();
    } catch (error) {
      console.error('GitHub DB okuma hatası:', error);
      return this.getDefaultDatabase();
    }
  }

  // Local JSON dosyasına yaz
  async writeDatabase(data: GitHubDatabase): Promise<void> {
    try {
      data.lastUpdated = new Date().toISOString();
      fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('GitHub DB yazma hatası:', error);
      throw error;
    }
  }

  // Varsayılan veritabanı
  private getDefaultDatabase(): GitHubDatabase {
    return {
      products: [],
      orders: [],
      reservations: [],
      users: [
        {
          id: 1,
          name: "Admin",
          email: "admin@karagozdoner.com",
          role: "manager",
          createdAt: new Date().toISOString()
        }
      ],
      settings: {
        restaurantName: "Karagöz Döner",
        address: "Esztergom, Magyarország",
        phone: "+36 20 934 1537",
        email: "info@karagozdoner.com"
      },
      lastUpdated: new Date().toISOString()
    };
  }

  // CRUD İşlemleri

  // Ürünler
  async getProducts(): Promise<Product[]> {
    const db = await this.readDatabase();
    return db.products.filter(p => p.isActive === 1);
  }

  async addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const db = await this.readDatabase();
    const newProduct: Product = {
      ...product,
      id: Math.max(0, ...db.products.map(p => p.id)) + 1,
      createdAt: new Date().toISOString()
    };
    
    db.products.push(newProduct);
    await this.writeDatabase(db);
    return newProduct;
  }

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
    const db = await this.readDatabase();
    const index = db.products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    db.products[index] = { ...db.products[index], ...updates };
    await this.writeDatabase(db);
    return db.products[index];
  }

  async deleteProduct(id: number): Promise<boolean> {
    const db = await this.readDatabase();
    const index = db.products.findIndex(p => p.id === id);
    
    if (index === -1) return false;
    
    // Soft delete
    db.products[index].isActive = 0;
    await this.writeDatabase(db);
    return true;
  }

  // Siparişler
  async getOrders(): Promise<Order[]> {
    const db = await this.readDatabase();
    return db.orders;
  }

  async addOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const db = await this.readDatabase();
    const newOrder: Order = {
      ...order,
      id: Math.max(0, ...db.orders.map(o => o.id)) + 1,
      createdAt: new Date().toISOString()
    };
    
    db.orders.push(newOrder);
    await this.writeDatabase(db);
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | null> {
    const db = await this.readDatabase();
    const index = db.orders.findIndex(o => o.id === id);
    
    if (index === -1) return null;
    
    db.orders[index].status = status;
    await this.writeDatabase(db);
    return db.orders[index];
  }

  // Rezervasyonlar
  async getReservations(): Promise<Reservation[]> {
    const db = await this.readDatabase();
    return db.reservations;
  }

  async addReservation(reservation: Omit<Reservation, 'id' | 'createdAt'>): Promise<Reservation> {
    const db = await this.readDatabase();
    const newReservation: Reservation = {
      ...reservation,
      id: Math.max(0, ...db.reservations.map(r => r.id)) + 1,
      createdAt: new Date().toISOString()
    };
    
    db.reservations.push(newReservation);
    await this.writeDatabase(db);
    return newReservation;
  }

  async updateReservationStatus(id: number, status: string): Promise<Reservation | null> {
    const db = await this.readDatabase();
    const index = db.reservations.findIndex(r => r.id === id);
    
    if (index === -1) return null;
    
    db.reservations[index].status = status;
    await this.writeDatabase(db);
    return db.reservations[index];
  }

  // Ayarlar
  async getSettings(): Promise<RestaurantSettings> {
    const db = await this.readDatabase();
    return db.settings;
  }

  async updateSettings(settings: Partial<RestaurantSettings>): Promise<RestaurantSettings> {
    const db = await this.readDatabase();
    db.settings = { ...db.settings, ...settings };
    await this.writeDatabase(db);
    return db.settings;
  }

  // Menü verilerini GitHub DB'ye sync et
  async syncMenuToDatabase() {
    try {
      const { MENU_ITEMS } = await import('../lib/menuData');
      const db = await this.readDatabase();
      
      // Mevcut ürünleri temizle
      db.products = [];
      
      // Menü ürünlerini ekle
      for (const item of MENU_ITEMS) {
        db.products.push({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          image: item.image,
          isActive: 1,
          createdAt: new Date().toISOString()
        });
      }
      
      await this.writeDatabase(db);
      console.log(`✅ ${MENU_ITEMS.length} ürün GitHub DB'ye sync edildi`);
    } catch (error) {
      console.error('Menü sync hatası:', error);
    }
  }
}

export const githubDB = new GitHubDB();
export default githubDB;