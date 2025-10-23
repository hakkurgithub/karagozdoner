import { db } from '../db/drizzle'
import { products, orders, orderItems, users, reservations } from '../db/schema'
import { eq, and, desc, asc } from 'drizzle-orm'

// Ürün yönetimi fonksiyonları
export async function getAllProducts() {
  try {
    const data = await db
      .select()
      .from(products)
      .where(eq(products.isActive, 1))
      .orderBy(asc(products.category), asc(products.name))
    
    return data;
  } catch (error) {
    console.error("Database Error: Failed to fetch all products.", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    throw new Error(
      process.env.NODE_ENV === 'development' 
        ? `Failed to fetch products: ${error instanceof Error ? error.message : String(error)}`
        : 'Failed to fetch products. Please try again later.'
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
  price: string // numeric tipinde string olarak
  category?: string
  image?: string
}) {
  const result = await db
    .insert(products)
    .values(productData)
    .returning()
  
  return result[0]
}

export async function updateProduct(id: number, productData: Partial<{
  name: string
  description: string
  price: string // numeric tipinde string olarak
  category: string
  image: string
  isActive: number
}>) {
  const result = await db
    .update(products)
    .set(productData)
    .where(eq(products.id, id))
    .returning()
  
  return result[0] || null
}

// Sipariş yönetimi fonksiyonları
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
  // Toplam tutarı hesapla
  const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  
  // Siparişi oluştur
  const orderResult = await db
    .insert(orders)
    .values({
      ...orderData,
      total
    })
    .returning()
  
  const order = orderResult[0]
  
  // Sipariş kalemlerini ekle
  const orderItemsData = items.map(item => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.unitPrice, // schema'da price olarak tanımlı
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
  
  // Sipariş kalemlerini getir
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
    console.error(`Database Error: Failed to fetch orders for user ${userId}.`, error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      userId,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    throw new Error(
      process.env.NODE_ENV === 'development' 
        ? `Failed to fetch user orders: ${error instanceof Error ? error.message : String(error)}`
        : 'Failed to fetch your orders. Please try again later.'
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
    // Detaylı error logging
    console.error("Database Error: Failed to fetch all orders.", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined
    });
    
    // Environment variable kontrolü
    if (!process.env.POSTGRES_URL || process.env.POSTGRES_URL === "Vercel projenizden aldığınız veritabanı bağlantı adresi") {
      console.error("❌ POSTGRES_URL environment variable is missing or not configured properly");
      console.error("💡 Please set POSTGRES_URL in your .env.local file with a valid Vercel Postgres connection string");
    }
    
    // Production'da friendly error, development'ta gerçek error
    throw new Error(
      process.env.NODE_ENV === 'development' 
        ? `Database connection failed: ${error instanceof Error ? error.message : String(error)}`
        : 'Failed to fetch orders. Please check your database connection.'
    );
  }
}

// Rezervasyon fonksiyonları
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

// Kullanıcı fonksiyonları
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

// Yardımcı fonksiyonlar
export function formatPrice(priceInCents: number): string {
  return `${(priceInCents / 100).toFixed(2)} ₺`
}

export function priceToLira(priceInCents: number): number {
  return priceInCents / 100
}

export function lirahToCents(priceInLira: number): number {
  return Math.round(priceInLira * 100)
}