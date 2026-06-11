const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

async function seedDatabase() {
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
  
  const db = client.db('online-shop');
  
  // Clear existing products
  await db.collection('products').deleteMany({});
  
  // Insert sample products
  const products = [
    {
      title: 'Wireless Keyboard',
      summary: 'Professional wireless keyboard for work and gaming',
      price: 79.99,
      description: 'High-quality wireless keyboard with excellent key travel and durability. Features quiet mechanical switches and long battery life.',
      image: '024f5b77-7c3c-4a88-8d03-82ab9f2678e2-keyboard.jpg'
    },
    {
      title: 'Mechanical Keyboard RGB',
      summary: 'Gaming keyboard with RGB lighting',
      price: 129.99,
      description: 'Premium mechanical keyboard with customizable RGB lighting. Perfect for gaming and professional work.',
      image: '133e45dc-9204-4930-8df9-5a0243be32bc-keyboard.jpg'
    },
    {
      title: 'Compact Keyboard',
      summary: 'Space-saving compact keyboard',
      price: 59.99,
      description: 'Portable compact keyboard ideal for travel and small workspaces. Lightweight and battery efficient.',
      image: '1c7f6b77-c3ca-4fbe-9dff-66b24e926aa4-keyboard.jpg'
    },
    {
      title: 'Trackpad Pro',
      summary: 'Precision trackpad for laptops',
      price: 89.99,
      description: 'High-precision trackpad with smooth glass surface. Compatible with all major operating systems.',
      image: '3e641b91-4a3b-4ab0-8181-19b019632fe0-trackpad.jpg'
    },
    {
      title: 'Wireless Trackpad',
      summary: 'Cordless trackpad for desktop',
      price: 69.99,
      description: 'Wireless trackpad with 2.4GHz connection. Responsive and accurate for daily computing tasks.',
      image: '485d6421-e298-40ef-8ba2-e93f7fb4dbe5-trackpad.jpg'
    },
    {
      title: 'Magic Trackpad',
      summary: 'Premium multi-touch trackpad',
      price: 99.99,
      description: 'Advanced multi-touch trackpad with gesture support. Sleek design and excellent responsiveness.',
      image: '6820e095-a21d-486e-9b97-29fd325d4b8b-trackpad.jpg'
    }
  ];
  
  const result = await db.collection('products').insertMany(products);
  
  console.log(`${result.insertedCount} products inserted successfully!`);
  
  await client.close();
}

seedDatabase().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
