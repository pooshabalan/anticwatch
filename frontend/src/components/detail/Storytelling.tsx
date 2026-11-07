export function Storytelling({ brand, description }: { brand: string, description: string }) {
  return (
    <div className="max-w-4xl border-l border-gold/40 pl-6 md:pl-12 py-2">
      <h3 className="text-xs font-sans tracking-[0.3em] text-gold uppercase mb-6 opacity-80">Historical Significance</h3>
      <h4 className="text-2xl md:text-3xl font-serif text-parchment mb-8 leading-relaxed max-w-2xl">
        An immaculate piece of {brand} provenance, representing the paradigm of mechanical excellence.
      </h4>
      <p className="text-parchment/70 leading-loose font-light text-lg">
        {description}
      </p>
    </div>
  );
}
