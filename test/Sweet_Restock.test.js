const SweetShop = require('../source_code/Sweet_Shop');

describe('SweetShop - Restock Sweet', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({
      id: 'S001',
      name: 'Rasgulla',
      category: 'Syrup-Based',
      price: 20,
      quantity: 10
    });
  });

  test('should increase quantity of existing sweet', () => {
    shop.restockSweet('S001', 15);
    const sweet = shop.getInventory().find(s => s.id === 'S001');
    expect(sweet.quantity).toBe(25);
  });

  test('should throw error for non-existent sweet', () => {
    expect(() => {
      shop.restockSweet('INVALID_ID', 10);
    }).toThrow('Sweet not found.');
  });
});
