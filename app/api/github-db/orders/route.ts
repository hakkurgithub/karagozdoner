// api/github-db/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { githubDB } from '../../../../db/github-db';

export async function GET() {
  try {
    const orders = await githubDB.getOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Siparişler alınamadı:', error);
    return NextResponse.json(
      { error: 'Siparişler alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, customerName, customerPhone, orderType, total, notes, items } = body;

    if (!total || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Total ve items gerekli' },
        { status: 400 }
      );
    }

    const order = await githubDB.addOrder({
      userId: userId || "u-001",
      customerName,
      customerPhone,
      status: 'pending',
      orderType: orderType || 'dine-in',
      total: parseInt(total),
      notes,
      items
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Sipariş eklenemedi:', error);
    return NextResponse.json(
      { error: 'Sipariş eklenemedi' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID ve status gerekli' },
        { status: 400 }
      );
    }

    const order = await githubDB.updateOrderStatus(id, status);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Sipariş bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Sipariş güncellenemedi:', error);
    return NextResponse.json(
      { error: 'Sipariş güncellenemedi' },
      { status: 500 }
    );
  }
}