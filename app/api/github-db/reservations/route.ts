// api/github-db/reservations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { githubDB } from '../../../../db/github-db';

export async function GET() {
  try {
    const reservations = await githubDB.getReservations();
    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Rezervasyonlar alınamadı:', error);
    return NextResponse.json(
      { error: 'Rezervasyonlar alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, customerEmail, reservationDate, partySize, notes } = body;

    if (!customerName || !customerPhone || !reservationDate || !partySize) {
      return NextResponse.json(
        { error: 'CustomerName, customerPhone, reservationDate ve partySize gerekli' },
        { status: 400 }
      );
    }

    const reservation = await githubDB.addReservation({
      customerName,
      customerPhone,
      customerEmail,
      reservationDate,
      partySize: parseInt(partySize),
      status: 'pending',
      notes
    });

    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    console.error('Rezervasyon eklenemedi:', error);
    return NextResponse.json(
      { error: 'Rezervasyon eklenemedi' },
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

    const reservation = await githubDB.updateReservationStatus(id, status);
    
    if (!reservation) {
      return NextResponse.json(
        { error: 'Rezervasyon bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ reservation });
  } catch (error) {
    console.error('Rezervasyon güncellenemedi:', error);
    return NextResponse.json(
      { error: 'Rezervasyon güncellenemedi' },
      { status: 500 }
    );
  }
}