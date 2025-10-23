import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, getProductsByCategory } from '../../../lib/products'
import { Product } from '../../../db/schema'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let products
    
    if (category) {
      products = await getProductsByCategory(category)
    } else {
      products = await getAllProducts()
    }
    
    // Fiyatları formatla (zaten TL cinsinden, numeric tipinde string olarak gelir)
    const productsWithFormattedPrices = products.map((product: Product) => ({
      ...product,
      priceInLira: parseFloat(product.price as any), // String'den number'a çevir
      formattedPrice: `${parseFloat(product.price as any).toFixed(2)} ₺`
    }))
    
    return NextResponse.json({
      success: true,
      data: productsWithFormattedPrices
    })
    
  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ürünler alınırken bir hata oluştu' 
      },
      { status: 500 }
    )
  }
}