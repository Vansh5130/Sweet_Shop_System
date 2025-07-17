document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addForm');
    const display = document.getElementById('sweetsDisplay');
  
    addForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Get input values safely
      const sweet = {
        id: document.getElementById('addId').value.trim(),
        name: document.getElementById('addName').value.trim(),
        category: document.getElementById('addCategory').value.trim(),
        price: Number(document.getElementById('addPrice').value),
        quantity: Number(document.getElementById('addQuantity').value),
      };
  
      try {
        const res = await fetch('/api/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sweet),
        });
  
        const result = await res.json();
  
        if (res.ok) {
          alert(result.message);
          addForm.reset();  // ✅ Clear the form
          fetchInventory(); // ✅ Refresh the list
        } else {
          alert(result.error);
        }
      } catch (err) {
        alert('Server error: ' + err.message);
      }
    });
  
    async function fetchInventory() {
      const res = await fetch('/api/inventory');
      const data = await res.json();
  
      display.innerHTML = data.length
        ? data.map(s => `
            <div><strong>${s.name}</strong> (${s.category}) - ₹${s.price} | Qty: ${s.quantity}</div>
          `).join('')
        : '<div>No sweets to show.</div>';
    }
    const deleteForm = document.getElementById('deleteForm');

deleteForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('deleteId').value.trim();

  if (!id) {
    alert('Please enter a Sweet ID to delete.');
    return;
  }

  try {
    const res = await fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    });

    const result = await res.json();

    if (res.ok) {
      alert(result.message);
      deleteForm.reset();
      fetchInventory();
    } else {
      alert(result.error);
    }
  } catch (err) {
    alert('Server error: ' + err.message);
  }
});

const searchInput = document.getElementById('searchInput');

searchInput?.addEventListener('input', async (e) => {
  const query = e.target.value.trim().toLowerCase();

  const res = await fetch('/api/inventory');
  const sweets = await res.json();

  const filtered = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(query) ||
    sweet.category.toLowerCase().includes(query) ||
    sweet.id.toString().includes(query)
  );

  display.innerHTML = filtered.length
    ? filtered.map(s => `
        <div><strong>${s.name}</strong> (${s.category}) - ₹${s.price} | Qty: ${s.quantity}</div>
      `).join('')
    : '<div>No sweets match your search.</div>';
});

const purchaseForm = document.getElementById('purchaseForm');

purchaseForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('purchaseId').value;
  const qty = Number(document.getElementById('purchaseQty').value);

  const res = await fetch('/api/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, quantity: qty })
  });

  const result = await res.json();
  if (res.ok) {
    alert(result.message);
    fetchInventory();  // Update the displayed sweets
    e.target.reset();
  } else {
    alert(result.error);
  }
});

const restockForm = document.getElementById('restockForm');

restockForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('restockId').value;
  const qty = Number(document.getElementById('restockQty').value);

  const res = await fetch('/api/restock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, quantity: qty })
  });

  const result = await res.json();
  if (res.ok) {
    alert(result.message);
    fetchInventory();
    e.target.reset();
  } else {
    alert(result.error);
  }
});

  
    fetchInventory(); // Load on start
  });
  