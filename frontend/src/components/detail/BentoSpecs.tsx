export function BentoSpecs({ specs }: { specs: any }) {
  const specItems = [
    { label: "Movement", value: specs.movement },
    { label: "Caliber", value: specs.caliber },
    { label: "Case Diameter", value: specs.caseDiameter },
    { label: "Case Material", value: specs.caseMaterial },
    { label: "Dial", value: specs.dialColor },
    { label: "Bracelet", value: specs.braceletMaterial },
    { label: "Condition", value: specs.condition },
    { label: "Box & Papers", value: specs.boxAndPapers },
  ];

  return (
    <div className="w-full">
      <h3 className="text-xs font-sans tracking-[0.3em] text-gold uppercase mb-8 border-b border-muted/30 pb-4 pr-12 inline-block">Technical Specifications</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {specItems.map((spec, i) => (
          <div key={i} className="bg-muted/10 border border-muted/20 p-6 rounded-sm hover:bg-muted/30 hover:border-gold/20 transition-all duration-300">
            <p className="text-[10px] text-parchment/40 uppercase tracking-widest mb-3 font-semibold">{spec.label}</p>
            <p className="text-sm md:text-base text-parchment/90 font-medium font-serif leading-snug">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
