import Image from "next/image";

export function HeroGallery({ image, alt }: { image: string, alt: string }) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-muted/20 border border-muted/50 overflow-hidden cursor-crosshair group rounded-sm">
        <Image 
          src={image} 
          alt={alt} 
          fill 
          priority
          className="object-cover object-center group-hover:scale-125 transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]" 
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-noir/80 to-transparent pointer-events-none" />
      </div>
      
      {/* Thumbnail Bar */}
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
        {[1, 2, 3].map((v) => (
          <div key={v} className="relative w-20 md:w-24 aspect-square shrink-0 bg-muted/20 border border-muted/50 cursor-pointer overflow-hidden rounded-sm hover:border-gold/50 transition-colors">
            <Image src={image} alt={`${alt} view ${v}`} fill className={`object-cover transition-opacity ${v === 1 ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
