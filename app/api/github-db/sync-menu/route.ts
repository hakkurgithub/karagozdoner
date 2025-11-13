// api/github-db/sync-menu/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { githubDB } from '../../../../db/github-db';

export async function POST() {
  try {
    await githubDB.syncMenuToDatabase();
    return NextResponse.json({ 
      message: 'Menü başarıyla GitHub DB\'ye sync edildi' 
    });
  } catch (error) {
    console.error('Menü sync hatası:', error);
    return NextResponse.json(
      { error: 'Menü sync edilemedi' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await githubDB.getProducts();
    return NextResponse.json({ 
      message: `${products.length} ürün GitHub DB'de`,
      products 
    });
  } catch (error) {
    console.error('GitHub DB kontrol hatası:', error);
    return NextResponse.json(
      { error: 'GitHub DB kontrol edilemedi' },
      { status: 500 }
    );
  }
}