const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

async function checkData() {
  try {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    const db = client.db('online-shop');
    
    const userCount = await db.collection('users').countDocuments();
    const orderCount = await db.collection('orders').countDocuments();
    const productCount = await db.collection('products').countDocuments();
    
    console.log('\n=== Database: online-shop ===');
    console.log(`Users: ${userCount}`);
    console.log(`Orders: ${orderCount}`);
    console.log(`Products: ${productCount}`);
    
    if (userCount > 0) {
      console.log('\nUser Accounts:');
      const users = await db.collection('users').find({}).toArray();
      users.forEach(u => {
        console.log(`  - Email: ${u.email}, Name: ${u.name}`);
      });
    }
    
    if (orderCount > 0) {
      console.log('\nOrders:');
      const orders = await db.collection('orders').find({}).toArray();
      orders.forEach(o => {
        console.log(`  - Order ID: ${o._id}, Status: ${o.status}, Date: ${o.date}`);
        console.log(`    Items: ${o.productData.length}, Total: $${o.productData.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
      });
    }
    
    await client.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkData();
