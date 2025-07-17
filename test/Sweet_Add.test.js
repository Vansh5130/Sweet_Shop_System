const SweetShop = require('../source_code/Sweet_Shop');

describe('SweetShop - Add Sweet', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  test('should add a new sweet to the inventory', () => {
    const sweet = {
      id: 1001,
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };

    shop.addSweet(sweet);

    const inventory = shop.getInventory();
    expect(inventory).toContainEqual(sweet);
  });

  test('should throw an error if ID already exists', () => {
    const sweet = {
      id: 1001,
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };

    shop.addSweet(sweet);

    expect(() => {
      shop.addSweet(sweet);
    }).toThrow('Sweet with this ID already exists.');
  });
});
