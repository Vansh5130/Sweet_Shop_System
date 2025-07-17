const SweetShop = require('../source_code/Sweet_Shop');

describe('SweetShop - Purchase Sweet', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ id: '101', name: 'Rasgulla', category: 'Syrup', price: 20, quantity: 10 });
  });

  test('should reduce quantity after purchase', () => {
    shop.purchaseSweet('101', 3);
    const item = shop.getInventory().find(s => s.id === '101');
    expect(item.quantity).toBe(7);
  });

  test('should throw error if sweet not found', () => {
    expect(() => {
      shop.purchaseSweet('999', 2);
    }).toThrow('Sweet not found.');
  });

  test('should throw error if not enough stock', () => {
    expect(() => {
      shop.purchaseSweet('101', 15);
    }).toThrow('Not enough stock.');
  });
});
