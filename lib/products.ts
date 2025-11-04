import { db } from '../db/drizzle'
import { products, orders, orderItems, users, reservations } from '../db/schema'
import { eq, and, desc, asc } from 'drizzle-orm'

// Termékkezelő funkciók
export async function getAllProducts() {
  try {
    const data = await db
      .select()
      .from(products)
      .where(eq(products.isActive, 1))
      .orderBy(asc(products.category), asc(products.name))
    
    return data;
  } catch (error) {
    // === DİL GÜNCELLEMESİ ===
    console.error("Adatbázis Hiba: Nem sikerült lekérni az összes terméket.", error);
    console.error("Hiba részletei:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    throw new Error(
      process.env.NODE_ENV === 'development' 
        ? `Nem sikerült lekérni a termékeket: ${error instanceof Error ? error.message : String(error)}`
        : 'Nem sikerült lekérni a termékeket. Kérjük, próbálja újra később.'
    );
  }
}

export async function getProductById(id: number) {
  const result = await db
    .select()
    .from(products)
    .where(and(eq(products.id, id), eq(products.isActive, 1)))
    .limit(1)
  
  return result[0] || null
}

export async function getProductsByCategory(category: string) {
  return await db
    .select()
    .from(products)
    .where(and(eq(products.category, category), eq(products.isActive, 1)))
    .orderBy(asc(products.name))
}

export async function createProduct(productData: {
  name: string
  description?: string
  price: string // Ár string-ként (pl. "4500")
  category?: string
  image?: string
}) {
  // === FİYAT DÖNÜŞÜMÜ DÜZELTMESİ (string -> number) ===
  const priceAsNumber = parseInt(productData.price, 10);
  
  const result = await db
    .insert(products)
    .values({
      ...productData,
      price: priceAsNumber // Itt már 'number' típusként
    })
    .returning()
  
  return result[0]
}

export async function updateProduct(id: number, productData: Partial<{
  name: string
  description: string
  price: string // Ár string-ként (pl. "4500")
  category: string
  image: string
  isActive: number
}>) {
  
  // === FİYAT DÖNÜŞÜMÜ DÜZELTMESİ (string -> number) ===
  // Kopyasını oluştur ve 'price' varsa dönüştür
  const dataToUpdate: any = { ...productData };
  if (productData.price) {
    dataToUpdate.price = parseInt(productData.price, 10);
  }

  const result = await db
    .update(products)
    .set(dataToUpdate) // A javított adatot küldjük
    .where(eq(products.id, id))
    .returning()
  
  return result[0] || null
}

// Rendeléskezelő funkciók
export async function createOrder(orderData: {
  userId: number
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  orderType?: string
  notes?: string
}, items: Array<{
  productId: number
  quantity: number
  unitPrice: number
  notes?: string
}>) {
  // Végösszeg kiszámítása
  const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  
  // Rendelés létrehozása
  const orderResult = await db
    .insert(orders)
    .values({
      ...orderData,
      total
    })
    .returning()
  
  const order = orderResult[0]
  
  // Rendelési tételek hozzáadása
  const orderItemsData = items.map(item => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.unitPrice, // a séma 'price'-ként definiálja
  }))
  
  await db.insert(orderItems).values(orderItemsData)
  
  return order
}

export async function getOrderById(id: number) {
  const orderResult = await db
    .select({
      id: orders.id,
      userId: orders.userId,
      customerName: orders.customerName,
      customerPhone: orders.customerPhone,
      status: orders.status,
      orderType: orders.orderType,
      total: orders.total,
      notes: orders.notes,
      createdAt: orders.createdAt
    })
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1)
  
  if (!orderResult[0]) return null
  
  // Rendelési tételek lekérése
  const items = await db
    .select({
      id: orderItems.id,
      productId: orderItems.productId,
      productName: products.name,
      quantity: orderItems.quantity,
      price: orderItems.price,
    })
    .from(orderItems)
    .leftJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, id))
  
  return {
    ...orderResult[0],
    items
  }
}

export async function updateOrderStatus(id: number, status: string) {
  const result = await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, id))
    .returning()
  
  return result[0] || null
}

export async function getOrdersByUser(userId: number) {
  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt))
}

export async function getUserOrders(userId: string) {
  try {
    const data = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        customerName: orders.customerName,
        customerPhone: orders.customerPhone,
        status: orders.status,
        orderType: orders.orderType,
        totalPrice: orders.total,
        notes: orders.notes,
        createdAt: orders.createdAt
      })
      .from(orders)
      .where(eq(orders.userId, parseInt(userId)))
      .orderBy(desc(orders.createdAt))
    
    return data;
  } catch (error) {
    // === DİL GÜNCELLEMESİ ===
    console.error(`Adatbázis Hiba: Nem sikerült lekérni a rendeléseket a ${userId} felhasználóhoz.`, error);
    console.error("Hiba részletei:", {
      message: error instanceof Error ? error.message : String(error),
      userId,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    throw new Error(
      process.env.NODE_ENV === 'development' 
        ? `Nem sikerült lekérni a felhasználói rendeléseket: ${error instanceof Error ? error.message : String(error)}`
        : 'Nem sikerült lekérni a rendeléseit. Kérjük, próbálja újra később.'
    );
  }
}

export async function getAllOrders() {
  try {
    const data = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        customerName: orders.customerName,
        customerPhone: orders.customerPhone,
        status: orders.status,
        orderType: orders.orderType,
        total: orders.total,
        createdAt: orders.createdAt,
        userName: users.name,
        userEmail: users.email
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .orderBy(desc(orders.createdAt))
    
    return data;
  } catch (error) {
    // Részletes hibanaplózás
    // === DİL GÜNCELLEMESİ ===
    console.error("Adatbázis Hiba: Nem sikerült lekérni az összes rendelést.", error);
    console.error("Hiba részletei:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined
    });
    
    // Környezeti változó ellenőrzése
    if (!process.env.POSTGRES_URL || process.env.POSTGRES_URL === "Vercel projenizden aldığınız veritabanı bağlantı adresi") {
      console.error("❌ A POSTGRES_URL környezeti változó hiányzik vagy nincs megfelelően beállítva");
      console.error("💡 Kérjük, állítsa be a POSTGRES_URL-t a .env.local fájlban egy érvényes Vercel Postgres kapcsolati karakterlánccal");
    }
    
    // Production-barát hiba, fejlesztéskor részletes hiba
    throw new Error(
      process.env.NODE_ENV === 'development' 
        ? `Adatbázis kapcsolati hiba: ${error instanceof Error ? error.message : String(error)}`
        : 'Nem sikerült lekérni a rendeléseket. Kérjük, ellenőrizze az adatbázis kapcsolatát.'
    );
  }
}

// Foglalási funkciók
export async function createReservation(reservationData: {
  customerName: string
  customerPhone: string
  customerEmail?: string
  reservationDate: Date
  partySize: number
  notes?: string
}) {
  const result = await db
    .insert(reservations)
    .values(reservationData)
    .returning()
  
  return result[0]
}

export async function getAllReservations() {
  return await db
    .select()
    .from(reservations)
    .orderBy(desc(reservations.reservationDate))
}

export async function updateReservationStatus(id: number, status: string) {
  const result = await db
    .update(reservations)
    .set({ status })
    .where(eq(reservations.id, id))
    .returning()
  
  return result[0] || null
}

// Felhasználói funkciók
export async function createUser(userData: {
  name?: string
  email: string
  role?: 'b2b' | 'manager'
}) {
  const result = await db
    .insert(users)
    .values(userData)
    .returning()
  
  return result[0]
}

export async function getUserByEmail(email: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  
  return result[0] || null
}

export async function getUserById(id: number) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
  
  return result[0] || null
}

// === YARDIMCI FONKSİYONLAR GÜNCELLENDİ (Ft için) ===
export function formatPrice(priceInForint: number): string {
  // Formázás Ft-ként (pl. "4 500 Ft")
  return `${priceInForint.toLocaleString('hu-HU')} Ft`
}

/* // A régi Kuruş/Lira logika elavult
export function priceToLira(priceInCents: number): number {
  return priceInCents / 100
}

export function lirahToCents(priceInLira: number): number {
  return Math.round(priceInLira * 100)
}
*/