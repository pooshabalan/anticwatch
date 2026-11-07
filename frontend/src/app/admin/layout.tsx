"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-noir flex">
      {/* Sidebar */}
      <aside className="w-64 bg-noir border-r border-muted/10 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-muted/10">
          <h2 className="font-serif text-2xl text-gold tracking-widest">TEH. Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${pathname === '/admin' ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'text-parchment/60 hover:text-parchment hover:bg-muted/10 border-l-2 border-transparent'}`}
          >
            <LayoutDashboard size={18} />
            <span className="font-medium text-xs tracking-widest uppercase">Dashboard</span>
          </Link>
          
          <Link 
            href="/admin/inventory" 
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${pathname.startsWith('/admin/inventory') ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'text-parchment/60 hover:text-parchment hover:bg-muted/10 border-l-2 border-transparent'}`}
          >
            <Package size={18} />
            <span className="font-medium text-xs tracking-widest uppercase">Inventory</span>
          </Link>

          <Link 
            href="/admin/auctions" 
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${pathname.startsWith('/admin/auctions') ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'text-parchment/60 hover:text-parchment hover:bg-muted/10 border-l-2 border-transparent'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M14 22L2 10V2H10L22 14C22.6 14.6 22.6 15.6 22 16.2L16.2 22C15.6 22.6 14.6 22.6 14 22Z"></path><circle cx="6" cy="6" r="1.5"></circle></svg>
            <span className="font-medium text-xs tracking-widest uppercase">Auctions & Bids</span>
          </Link>

          <Link 
            href="/admin/users" 
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${pathname.startsWith('/admin/users') ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'text-parchment/60 hover:text-parchment hover:bg-muted/10 border-l-2 border-transparent'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21V19C23 16.7909 21.2091 15 19 15H17"></path><path d="M16 11.13C16.8604 10.4283 17.4062 9.35128 17.4062 8.1639C17.4062 5.92212 15.5458 4.10444 13.2505 4.10444"></path></svg>
            <span className="font-medium text-xs tracking-widest uppercase">Users & Roles</span>
          </Link>

          <Link 
            href="/admin/transactions" 
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${pathname.startsWith('/admin/transactions') ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'text-parchment/60 hover:text-parchment hover:bg-muted/10 border-l-2 border-transparent'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            <span className="font-medium text-xs tracking-widest uppercase">Transactions</span>
          </Link>

          <div className="my-2 border-t border-muted/10"></div>

          <Link 
            href="/admin/intelligence" 
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${pathname.startsWith('/admin/intelligence') ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'text-parchment/60 hover:text-parchment hover:bg-muted/10 border-l-2 border-transparent'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93"></path><circle cx="12" cy="12" r="4"></circle></svg>
            <span className="font-medium text-xs tracking-widest uppercase text-gold/90 font-bold">Mkt Intelligence</span>
          </Link>

          <Link 
            href="/admin/cms" 
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${pathname.startsWith('/admin/cms') ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'text-parchment/60 hover:text-parchment hover:bg-muted/10 border-l-2 border-transparent'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M22 19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H16L22 9V19Z"></path><path d="M14 3V10H21"></path></svg>
            <span className="font-medium text-xs tracking-widest uppercase">Content (CMS)</span>
          </Link>

          <Link 
            href="/admin/analytics" 
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${pathname.startsWith('/admin/analytics') ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'text-parchment/60 hover:text-parchment hover:bg-muted/10 border-l-2 border-transparent'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z"></path><path d="M3 13L10 10L14 14L21 9"></path></svg>
            <span className="font-medium text-xs tracking-widest uppercase">Analytics</span>
          </Link>

          <Link 
            href="/admin/settings" 
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${pathname.startsWith('/admin/settings') ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'text-parchment/60 hover:text-parchment hover:bg-muted/10 border-l-2 border-transparent'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span className="font-medium text-xs tracking-widest uppercase">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-muted/10">
          <Link href="/" className="flex items-center gap-3 p-3 rounded-md text-parchment/60 hover:text-gold transition-colors">
            <ArrowLeft size={18} />
            <span className="font-medium text-sm tracking-widest uppercase">Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#0a0a0a] min-h-screen">
        {children}
      </main>
    </div>
  );
}
