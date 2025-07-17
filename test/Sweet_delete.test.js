// tests/Sweet_Delete.test.js
const SweetShop = require('../source_code/Sweet_Shop');

describe('SweetShop - Delete Sweet', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({
      name: 'Ladoo',
      category: 'Gram',
      price: 15,
      quantity: 10
    });
  });

  test('should delete a sweet by ID', () => {
    const idToDelete = shop.getInventory()[0].id;

    shop.deleteSweet(idToDelete);
    const inventory = shop.getInventory();
    expect(inventory).toHaveLength(0);
  });

  test('should throw an error if sweet with ID does not exist', () => {
    expect(() => {
      shop.deleteSweet('999'); // ID not present
    }).toThrow('Sweet not found.');
  });
});
