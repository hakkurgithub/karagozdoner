// api/github-db/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { githubDB } from '../../../../db/github-db';

export async function GET() {
  try {
    const products = await githubDB.getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Ürünler alınamadı:', error);
    return NextResponse.json(
      { error: 'Ürünler alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, category, image } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Name, price ve category gerekli' },
        { status: 400 }
      );
    }

    const product = await githubDB.addProduct({
      name,
      description,
      price: parseInt(price),
      category,
      image,
      isActive: 1
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Ürün eklenemedi:', error);
    return NextResponse.json(
      { error: 'Ürün eklenemedi' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Ürün ID gerekli' },
        { status: 400 }
      );
    }

    const product = await githubDB.updateProduct(id, updates);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Ürün güncellenemedi:', error);
    return NextResponse.json(
      { error: 'Ürün güncellenemedi' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Ürün ID gerekli' },
        { status: 400 }
      );
    }

    const success = await githubDB.deleteProduct(parseInt(id));
    
    if (!success) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Ürün silindi' });
  } catch (error) {
    console.error('Ürün silinemedi:', error);
    return NextResponse.json(
      { error: 'Ürün silinemedi' },
      { status: 500 }
    );
  }
}