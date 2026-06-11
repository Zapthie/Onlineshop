const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

async function checkProducts() {
  try {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    const db = client.db('web-shop');
    
    const count = await db.collection('products').countDocuments();
    console.log('Total products in database:', count);
    
    if (count > 0) {
      const products = await db.collection('products').find().limit(3).toArray();
      console.log('Sample products:');
      products.forEach(p => {
        console.log(`- ${p.title} (${p.image})`);
      });
    }
    
    await client.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkProducts();
