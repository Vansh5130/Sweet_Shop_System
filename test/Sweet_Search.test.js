const SweetShop = require('../source_code/Sweet_Shop');

describe('SweetShop - Search Functionality', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();

    // Preload some sweets
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 10 });
    shop.addSweet({ id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 20, quantity: 15 });
    shop.addSweet({ id: 3, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 30, quantity: 5 });
  });

  test('should find sweet by name (case-insensitive, partial match)', () => {
    const result = shop.searchByName('gulaB');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Gulab Jamun');
  });

  test('should find sweet by ID', () => {
    const result = shop.searchById(3);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Gajar Halwa');
  });

  test('should return empty array for non-matching ID', () => {
    const result = shop.searchById(999);
    expect(result).toEqual([]);
  });

  test('should find sweets by category (case-insensitive)', () => {
    const result = shop.searchByCategory('milk');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Gulab Jamun');
  });

  test('should return empty array for unmatched category', () => {
    const result = shop.searchByCategory('fruit-based');
    expect(result).toEqual([]);
  });
});
