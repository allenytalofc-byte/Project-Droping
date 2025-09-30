const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@postgres:5432/dropshipping',
});

async function importProducts(csvFile, supplierId) {
  const products = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFile)
      .pipe(csv())
      .on('data', (row) => {
        products.push({
          name: row.name || row.Nome,
          description: row.description || row.descricao,
          price: parseFloat(row.price || row.preco),
          sku: row.sku || row.codigo,
          stock_quantity: parseInt(row.stock || row.estoque || 0),
          category_id: row.category_id || null,
        });
      })
      .on('end', async () => {
        console.log(`📦 Lidos ${products.length} produtos do CSV`);
        
        let imported = 0;
        let errors = 0;

        for (const product of products) {
          try {
            await pool.query(
              `INSERT INTO products (supplier_id, category_id, name, slug, description, 
                                    sku, price, stock_quantity, images)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
               ON CONFLICT (sku) DO UPDATE SET
                 price = EXCLUDED.price,
                 stock_quantity = EXCLUDED.stock_quantity`,
              [
                supplierId,
                product.category_id,
                product.name,
                product.name.toLowerCase().replace(/\s+/g, '-'),
                product.description,
                product.sku,
                product.price,
                product.stock_quantity,
                '[]',
              ],
            );
            imported++;
          } catch (error) {
            console.error(`❌ Erro ao importar ${product.name}:`, error.message);
            errors++;
          }
        }

        console.log(`✅ Importados: ${imported}`);
        console.log(`❌ Erros: ${errors}`);
        
        await pool.end();
        resolve({ imported, errors });
      })
      .on('error', reject);
  });
}

// Usage: node import-csv.js <csv-file> <supplier-id>
const csvFile = process.argv[2] || '/data/products.csv';
const supplierId = process.argv[3];

if (!supplierId) {
  console.error('❌ Uso: node import-csv.js <arquivo.csv> <supplier-id>');
  process.exit(1);
}

console.log(`🚀 Iniciando importação de ${csvFile}...`);
importProducts(csvFile, supplierId)
  .then(() => {
    console.log('✅ Importação concluída');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro na importação:', error);
    process.exit(1);
  });
