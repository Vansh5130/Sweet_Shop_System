class SweetShop {
    constructor() {
      this.inventory = [];
    }
  
    addSweet(sweet) {
      const exists = this.inventory.find(item => item.id === sweet.id);
      if (exists) {
        throw new Error('Sweet with this ID already exists.');
      }
      this.inventory.push(sweet);
    }
  
    getInventory() {
      return this.inventory;
    }

    deleteSweet(id) {
      const index = this.inventory.findIndex(sweet => sweet.id === id);
    
      if (index === -1) {
        throw new Error('Sweet not found.');
      }
    
      this.inventory.splice(index, 1);
    }

    searchByName(name) {
      return this.inventory.filter(sweet => 
        sweet.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    
    searchById(id) {
      return this.inventory.filter(sweet => sweet.id === id);
    }
    
    searchByCategory(category) {
      return this.inventory.filter(sweet =>
        sweet.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    purchaseSweet(id, quantity) {
      const sweet = this.inventory.find(item => item.id === id);
      if (!sweet) throw new Error('Sweet not found.');
      if (sweet.quantity < quantity) throw new Error('Not enough stock.');
      sweet.quantity -= quantity;
    }
    
    restockSweet(id, quantity) {
      const sweet = this.inventory.find(item => item.id === id);
      if (!sweet) throw new Error('Sweet not found.');
      sweet.quantity += quantity;
    }
    
    
  }
  
  module.exports = SweetShop;
  