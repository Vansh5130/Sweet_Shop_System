const express = require('express');
const path = require('path');
const SweetShop = require('./source_code/Sweet_Shop'); // ← Adjusted path

const app = express();
const port = 3000;
const shop = new SweetShop();

app.use(express.json()); // ✅ Replaces body-parser
app.use(express.static('.')); // Serve HTML, CSS, JS from root

// Optional health route
app.get('/', (req, res) => {
  res.send('Sweet Shop API is running!');
});

// API: Add sweet
app.post('/api/add', (req, res) => {
  try {
    shop.addSweet(req.body);
    res.status(200).json({ message: 'Sweet added successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API: Get inventory
app.get('/api/inventory', (req, res) => {
  res.json(shop.getInventory());
});

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  try {
    shop.deleteSweet(id);
    res.status(200).json({ message: 'Sweet deleted successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/purchase', (req, res) => {
    const { id, quantity } = req.body;
    try {
      shop.purchaseSweet(id, quantity);
      res.status(200).json({ message: 'Purchase successful.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post('/api/restock', (req, res) => {
    const { id, quantity } = req.body;
    try {
      shop.restockSweet(id, quantity);
      res.status(200).json({ message: 'Sweet restocked successfully.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
    

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
