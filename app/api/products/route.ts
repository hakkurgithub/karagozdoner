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
    
    // Fiyatları lira cinsine çevir (frontend için)
    const productsWithFormattedPrices = products.map((product: Product) => ({
      ...product,
      priceInLira: product.price / 100,
      formattedPrice: `${(product.price / 100).toFixed(2)} ₺`
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