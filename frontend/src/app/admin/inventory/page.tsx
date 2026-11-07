"use client";
import { useEffect, useState } from 'react';
import { Trash2, Plus, X } from 'lucide-react';

export default function AdminInventory() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    brand: '', model: '', year: '', decade: '1970s', complication: 'None', material: 'Stainless Steel', price: '', image: '/hero-watch.png'
  });

  const fetchWatches = () => {
    setLoading(true);
    fetch('/api/watches')
      .then(res => res.json())
      .then(data => { setWatches(data); setLoading(false); });
  };

  useEffect(() => { fetchWatches(); }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      year: parseInt(formData.year) || new Date().getFullYear(),
      price: formData.price.includes('$') ? formData.price : `$${Number(formData.price).toLocaleString()}`
    };
    
    await fetch('/api/watches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData)
    });
    
    setIsAdding(false);
    setFormData({ brand: '', model: '', year: '', decade: '1970s', complication: 'None', material: 'Stainless Steel', price: '', image: '/hero-watch.png' });
    fetchWatches();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this timepiece?')) {
      await fetch(`/api/watches?id=${id}`, { method: 'DELETE' });
      fetchWatches();
    }
  };

  if (loading) return <div className="text-gold font-serif p-8">Loading Vault...</div>;

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="flex justify-between items-end mb-8">
        <h1 className="font-serif text-4xl text-gold">Vault Inventory</h1>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-gold text-noir px-6 py-2 uppercase tracking-widest text-xs font-bold hover:bg-parchment transition-colors">
          <Plus size={16} /> Add Timepiece
        </button>
      </div>

      <div className="bg-noir border border-muted/20 rounded-md overflow-hidden relative shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/5 border-b border-muted/20 text-parchment/60 text-xs uppercase tracking-widest">
              <th className="p-4 font-normal">Reference Image</th>
              <th className="p-4 font-normal">Brand</th>
              <th className="p-4 font-normal">Model</th>
              <th className="p-4 font-normal">Year</th>
              <th className="p-4 font-normal">Price</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watches.map((w: any) => (
              <tr key={w.id} className="border-b border-muted/10 hover:bg-muted/5 transition-colors">
                <td className="p-4">
                  <img src={w.image} alt={w.model} className="h-12 w-12 object-cover rounded-sm opacity-80" />
                </td>
                <td className="p-4 text-parchment font-medium">{w.brand}</td>
                <td className="p-4 text-parchment/80">{w.model}</td>
                <td className="p-4 text-parchment/60">{w.year}</td>
                <td className="p-4 text-gold font-medium">{w.price}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(w.id)} className="text-red-500 hover:text-red-400 p-2 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Timepiece Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-noir/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-gold/30 rounded-md w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 text-parchment/50 hover:text-gold"><X size={24} /></button>
            <div className="p-8">
              <h2 className="font-serif text-3xl text-gold mb-6 border-b border-muted/20 pb-4">New Acquisition</h2>
              
              <form onSubmit={handleAddSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-parchment/60 mb-2">Brand</label>
                    <input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-noir border border-muted/20 p-3 text-parchment focus:outline-none focus:border-gold/50" placeholder="e.g. Rolex" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-parchment/60 mb-2">Model</label>
                    <input required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full bg-noir border border-muted/20 p-3 text-parchment focus:outline-none focus:border-gold/50" placeholder="e.g. Submariner Ref. 5513" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-parchment/60 mb-2">Year</label>
                    <input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-noir border border-muted/20 p-3 text-parchment focus:outline-none focus:border-gold/50" placeholder="e.g. 1980" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-parchment/60 mb-2">Price (USD)</label>
                    <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-noir border border-muted/20 p-3 text-parchment focus:outline-none focus:border-gold/50" placeholder="e.g. 24000" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-parchment/60 mb-2">Decade</label>
                    <select value={formData.decade} onChange={e => setFormData({...formData, decade: e.target.value})} className="w-full bg-noir border border-muted/20 p-3 text-parchment focus:outline-none focus:border-gold/50 appearance-none">
                      {['1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-parchment/60 mb-2">Image URL</label>
                    <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-noir border border-muted/20 p-3 text-parchment focus:outline-none focus:border-gold/50" placeholder="/hero-watch.png" />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="bg-gold text-noir px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-parchment transition-colors">
                    Add to Vault
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
