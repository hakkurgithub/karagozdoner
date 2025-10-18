import { NextRequest, NextResponse } from 'next/server'
import { createReservation, getAllReservations } from '../../../lib/products'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const reservations = await getAllReservations()
    
    return NextResponse.json({
      success: true,
      data: reservations
    })
    
  } catch (error) {
    console.error('Reservations GET Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Rezervasyonlar alınırken bir hata oluştu' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { customerName, customerPhone, customerEmail, reservationDate, partySize, notes } = body
    
    // Basit validasyon
    if (!customerName || !customerPhone || !reservationDate || !partySize) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ad, telefon, tarih ve kişi sayısı gereklidir' 
        },
        { status: 400 }
      )
    }
    
    // Rezervasyon tarihini Date objesine çevir
    const reservationDateTime = new Date(reservationDate)
    
    // Geçmiş tarih kontrolü
    if (reservationDateTime < new Date()) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rezervasyon tarihi geçmiş olamaz' 
        },
        { status: 400 }
      )
    }
    
    const reservation = await createReservation({
      customerName,
      customerPhone,
      customerEmail,
      reservationDate: reservationDateTime,
      partySize: parseInt(partySize),
      notes
    })
    
    return NextResponse.json({
      success: true,
      data: reservation,
      message: 'Rezervasyon başarıyla oluşturuldu'
    })
    
  } catch (error) {
    console.error('Reservations POST Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Rezervasyon oluşturulurken bir hata oluştu' 
      },
      { status: 500 }
    )
  }
}