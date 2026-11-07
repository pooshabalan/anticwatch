"use client";
import { useState } from "react";
import { FileText, Edit3, X, Save } from "lucide-react";

export default function CMS() {
  const [articles, setArticles] = useState([
    { id: 1, title: "Why Vintage Daytonas Hold Their Value", status: "Published", date: "Oct 18, 2026" },
    { id: 2, title: "The Story Behind the Nautilus", status: "Published", date: "Oct 12, 2026" },
    { id: 3, title: "Evolution of the Perpetual Calendar", status: "Draft", date: "-" }
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: "", status: "Draft" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title) return;
    
    const article = {
      id: Date.now(),
      title: newArticle.title,
      status: newArticle.status,
      date: newArticle.status === "Published" ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "-"
    };

    setArticles([article, ...articles]);
    setNewArticle({ title: "", status: "Draft" });
    setShowEditor(false);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-4xl text-gold flex items-center gap-4">
            <FileText className="text-gold" size={32} />
            Editorial CMS
          </h1>
          <p className="text-parchment/60 mt-2 tracking-wide text-sm">Control the narrative. Manage articles, histories, and aesthetic banners.</p>
        </div>
        <button 
          onClick={() => setShowEditor(true)}
          className="bg-gold text-noir px-6 py-3 rounded uppercase tracking-widest text-xs font-bold hover:bg-gold/80 flex items-center gap-2 transition-all"
        >
          <Edit3 size={16}/> New Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {articles.map((art) => (
            <div key={art.id} className="bg-noir border border-muted/20 p-5 rounded-md hover:border-gold/30 transition-colors cursor-pointer group flex flex-col justify-between min-h-[160px]">
               <div>
                  <div className="flex justify-between items-start mb-4">
                     <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded font-bold ${art.status === 'Published' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                        {art.status}
                     </span>
                  </div>
                  <h3 className="font-serif text-xl text-parchment group-hover:text-gold transition-colors">{art.title}</h3>
               </div>
               <p className="text-parchment/40 text-xs mt-4 uppercase tracking-widest font-mono">{art.date}</p>
            </div>
         ))}
      </div>

      {showEditor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-noir border border-gold/30 rounded-md w-full max-w-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowEditor(false)} className="absolute top-4 right-4 text-parchment/40 hover:text-gold transition-colors">
              <X size={20} />
            </button>
            <div className="p-6 border-b border-muted/10">
               <h2 className="font-serif text-2xl text-gold">Compose Editorial</h2>
               <p className="text-parchment/50 text-xs mt-1 uppercase tracking-widest">Draft new premium content for the platform.</p>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
               <div>
                  <label className="text-parchment/70 text-[10px] uppercase tracking-widest font-bold mb-2 block">Headline / Title</label>
                  <input 
                     required
                     type="text" 
                     value={newArticle.title}
                     onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                     className="w-full bg-muted/10 border border-muted/30 rounded p-3 text-parchment text-lg font-serif focus:border-gold focus:outline-none transition-colors"
                     placeholder="e.g. History of the Tourbillon Escapement"
                  />
               </div>
               
               <div>
                  <label className="text-parchment/70 text-[10px] uppercase tracking-widest font-bold mb-2 block">Content Draft</label>
                  <textarea 
                     className="w-full bg-muted/10 border border-muted/30 rounded p-3 text-parchment text-sm focus:border-gold focus:outline-none transition-colors min-h-[150px] font-mono resize-none"
                     placeholder="// Start composing text, use markdown syntax..."
                  />
               </div>

               <div className="flex justify-between items-center pt-4 border-t border-muted/10">
                  <div className="flex gap-4 items-center">
                     <label className="text-parchment/70 text-[10px] uppercase tracking-widest font-bold">Status</label>
                     <select 
                        value={newArticle.status}
                        onChange={(e) => setNewArticle({...newArticle, status: e.target.value})}
                        className="bg-muted/10 border border-muted/20 text-parchment rounded px-3 py-1 text-sm focus:outline-none focus:border-gold"
                     >
                        <option value="Draft">Draft (Hidden)</option>
                        <option value="Published">Published (Live)</option>
                     </select>
                  </div>
                  <button 
                     type="submit"
                     className="bg-gold text-noir px-6 py-2 rounded uppercase tracking-widest text-xs font-bold hover:bg-gold/80 transition-colors flex items-center gap-2"
                  >
                     <Save size={14}/> Save Editorial
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
