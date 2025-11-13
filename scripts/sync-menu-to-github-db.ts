// scripts/sync-menu-to-github-db.ts
import { githubDB } from '../db/github-db.js';

async function syncMenuToGitHubDB() {
  try {
    console.log('🔄 Menü GitHub DB\'ye sync ediliyor...');
    
    await githubDB.syncMenuToDatabase();
    
    const products = await githubDB.getProducts();
    console.log(`✅ ${products.length} ürün başarıyla GitHub DB'ye sync edildi`);
    
    // Kategorileri göster
    const categories = [...new Set(products.map(p => p.category))];
    console.log(`📂 Kategoriler: ${categories.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Sync hatası:', error);
    process.exit(1);
  }
}

// Script çalıştırıldığında
if (require.main === module) {
  syncMenuToGitHubDB()
    .then(() => {
      console.log('🎉 Sync tamamlandı!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Sync başarısız:', error);
      process.exit(1);
    });
}

export { syncMenuToGitHubDB };