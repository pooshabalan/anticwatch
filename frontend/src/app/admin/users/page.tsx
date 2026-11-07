"use client";
import { useState } from "react";
import { Users as UsersIcon, ShieldAlert, BadgeCheck, Search, Filter } from "lucide-react";

export default function UsersManagement() {
  const initialUsers = [
    { id: "USR-092", name: "A. Rothschild", role: "Collector", trust: 98, spent: 1450000, status: "Active" },
    { id: "USR-144", name: "E. Chen", role: "Collector", trust: 85, spent: 240000, status: "Active" },
    { id: "USR-882", name: "Anonymous_49", role: "Bidder", trust: 42, spent: 0, status: "Flagged" },
    { id: "USR-001", name: "System Admin", role: "Admin", trust: 100, spent: 0, status: "Active" },
    { id: "USR-230", name: "J. Smith", role: "Bidder", trust: 72, spent: 45000, status: "Active" },
    { id: "USR-115", name: "UAE_Collector", role: "Collector", trust: 94, spent: 890000, status: "Active" }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    return u.name.toLowerCase().includes(query) || u.id.toLowerCase().includes(query) || u.role.toLowerCase().includes(query);
  });

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-4xl text-gold flex items-center gap-4">
            <UsersIcon className="text-gold" size={32} />
            Collector CRM
          </h1>
          <p className="text-parchment/60 mt-2 tracking-wide text-sm">Manage user roles, trust scoring, and KYC verifications.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-noir border border-muted/20 px-4 py-2 rounded-md flex items-center gap-3 focus-within:border-gold/50 transition-colors">
              <Search size={16} className="text-gold" />
              <input 
                type="text" 
                placeholder="Search Aliases, ID or Roles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-parchment focus:outline-none w-64" 
              />
           </div>
        </div>
      </div>

      <div className="bg-noir border border-muted/20 rounded-md overflow-hidden min-h-[400px]">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-muted/20 bg-muted/5 text-parchment/60 text-[10px] uppercase tracking-widest">
                  <th className="p-4 font-bold">Collector ID</th>
                  <th className="p-4 font-bold">Alias / Name</th>
                  <th className="p-4 font-bold">Role</th>
                  <th className="p-4 font-bold">Trust Score</th>
                  <th className="p-4 font-bold">Lifetime Value</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Action</th>
               </tr>
            </thead>
            <tbody>
               {filteredUsers.map((u, i) => (
                  <tr key={i} className="border-b border-muted/10 hover:bg-muted/5 transition-colors">
                     <td className="p-4 font-mono text-parchment/50 text-xs">{u.id}</td>
                     <td className="p-4 text-parchment font-medium flex items-center gap-2">
                        {u.name} {u.trust > 90 && <span title="Premium Verified"><BadgeCheck size={14} className="text-blue-400" /></span>}
                     </td>
                     <td className="p-4 text-parchment/70 text-sm">
                       <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold ${u.role === 'Admin' ? 'bg-gold/10 text-gold' : u.role === 'Collector' ? 'bg-blue-500/10 text-blue-400' : 'bg-muted/20 text-parchment/50'}`}>
                         {u.role}
                       </span>
                     </td>
                     <td className="p-4">
                        <div className="w-full bg-muted/20 rounded-full h-1.5 flex items-center">
                           <div className={`h-1.5 rounded-full ${u.trust > 80 ? 'bg-green-400' : u.trust > 50 ? 'bg-orange-400' : 'bg-red-500'}`} style={{width: `${u.trust}%`}}></div>
                        </div>
                        <span className="text-[10px] text-parchment/40 mt-1 block font-mono">{u.trust}/100</span>
                     </td>
                     <td className="p-4 font-mono text-gold text-sm">${u.spent.toLocaleString()}</td>
                     <td className="p-4">
                        <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold ${u.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'}`}>
                           {u.status}
                        </span>
                     </td>
                     <td className="p-4 flex gap-2 justify-end">
                        <button className="text-[10px] bg-muted/10 hover:bg-gold/20 hover:text-gold px-3 py-1 rounded uppercase tracking-widest text-parchment/70 transition-colors">Manage</button>
                     </td>
                  </tr>
               ))}
               {filteredUsers.length === 0 && (
                  <tr>
                     <td colSpan={7} className="p-8 text-center text-parchment/40 uppercase tracking-widest text-xs">
                        No matches found for &quot;{searchQuery}&quot;
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
