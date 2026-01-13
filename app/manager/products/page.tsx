import { getAllProducts } from "@/lib/products";
import Link from "next/link";
// Bu satir build hatasini engeller
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let products = [];
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Urun hatasi:", error);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Urun Yonetimi</h1>
        <Link href="/manager" className="bg-gray-500 text-white px-4 py-2 rounded">Geri Don</Link>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-600">Urun listesi veritabanindan cekilecek.</p>
        {/* Tablo buraya gelecek */}
      </div>
    </div>
  );
}
