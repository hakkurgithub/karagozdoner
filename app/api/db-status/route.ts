import { NextResponse } from 'next/server'
import { testConnection, isDatabaseReady } from '../../../lib/db'

export async function GET() {
  const diagnosis = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: {
      configurationValid: isDatabaseReady,
      postgresUrlExists: !!process.env.POSTGRES_URL,
      postgresUrlLength: process.env.POSTGRES_URL?.length || 0,
      postgresUrlPreview: process.env.POSTGRES_URL?.substring(0, 30) + "..." || "NOT_SET"
    },
    connectionTest: null as boolean | null,
    recommendations: [] as string[]
  }

  // Test database connection
  try {
    diagnosis.connectionTest = await testConnection()
  } catch (error) {
    diagnosis.connectionTest = false
    console.error("Connection test failed:", error)
  }

  // Generate recommendations
  if (!diagnosis.database.configurationValid) {
    diagnosis.recommendations.push("Configure POSTGRES_URL in .env.local")
    diagnosis.recommendations.push("Use a valid Vercel Postgres connection string")
  }

  if (diagnosis.connectionTest === false) {
    diagnosis.recommendations.push("Check database server availability")
    diagnosis.recommendations.push("Verify connection string format and credentials")
    diagnosis.recommendations.push("Use POOLED connection string instead of direct connection")
  }

  return NextResponse.json(diagnosis, {
    status: diagnosis.connectionTest === true ? 200 : 500,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}