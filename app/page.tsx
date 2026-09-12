'use client';

import { useState } from 'react';

const bases = ['Espresso Latte', 'Cold Brew Nitro', 'Americano', 'Chai Latte', 'Matcha Latte', 'Cloud Macchiato'];
const temps = ['Iced', 'Hot'];
const milks = ['Oat Milk', 'Almond Milk', 'Whole Milk', 'Coconut Milk', 'Breve (Half & Half)'];
const syrups = [
  'Vanilla', 
  'Salted Caramel', 
  'Hazelnut', 
  'White Chocolate Mocha', 
  'Brown Sugar', 
  'Caramel', 
  'Pistachio', 
  'Banana',
  'No Syrup'
];
const coldFoams = [
  'Vanilla Sweet Cream Cold Foam', 
  'Salted Caramel Cold Foam', 
  'Banana Cold Foam', 
  'Chocolate Cream Cold Foam', 
  'Brown Sugar Cold Foam',
  'No Cold Foam'
];
const toppings = [
  'Cinnamon Powder', 
  'Chocolate Shavings', 
  'Caramel Drizzle', 
  'Chocolate Drizzle', 
  'Flaky Sea Salt Sprinkles',
  'No Topping'
];

interface CoffeeRecipe {
  temp: string;
  base: string;
  milk: string;
  syrup: string;
  coldFoam: string;
  topping: string;
}

export default function Home() {
  const [recipe, setRecipe] = useState<CoffeeRecipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [brewProgress, setBrewProgress] = useState(0); 

  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const generateCoffee = () => {
    setIsGenerating(true);
    setRecipe(null);
    setBrewProgress(0);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setBrewProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        const selectedBase = getRandomItem(bases);
        const selectedTemp = selectedBase.toLowerCase().includes('cold brew') 
          ? 'Iced' 
          : getRandomItem(temps);

        const selectedMilk = getRandomItem(milks);
        const selectedSyrup = getRandomItem(syrups);
        const selectedColdFoam = selectedTemp === 'Iced' ? getRandomItem(coldFoams) : 'No Cold Foam';
        const selectedTopping = getRandomItem(toppings);

        setRecipe({
          temp: selectedTemp,
          base: selectedBase,
          milk: selectedMilk,
          syrup: selectedSyrup,
          coldFoam: selectedColdFoam,
          topping: selectedTopping
        });
        setIsGenerating(false);
      }
    }, 30); 
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center p-3 sm:p-6 text-[#241C15] font-sans selection:bg-[#F2E3E3] overflow-x-hidden">
      
      {/* Full-screen cafe background with soft whitewash */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#FDFBF7]">
        <img 
          src="/cafe-bg.jpg" 
          alt="Cafe Background" 
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes jetStream {
          0%, 100% { stroke-width: 3px; transform: scaleX(0.95); stroke: #70482B; }
          50% { stroke-width: 5px; transform: scaleX(1.1); stroke: #B6865D; }
        }
        @keyframes steamWisp {
          0% { transform: translateY(0px) scaleX(0.9); opacity: 0; }
          30% { opacity: 0.4; }
          100% { transform: translateY(-25px) scaleX(1.3); opacity: 0; }
        }
        .stream-line {
          animation: jetStream 0.12s infinite ease-in-out;
          transform-origin: 100px 45px;
        }
        .steam-path {
          animation: steamWisp 1.8s infinite ease-in-out;
          transform-origin: center bottom;
        }
      `}} />

      {/* FRAME CONTAINER: Buffer framing the UI station */}
      <div className="w-full max-w-[420px] sm:max-w-[428px] bg-[#FAF5EE]/90 backdrop-blur-md border border-[#DFCFC4] rounded-[32px] p-5 sm:p-7 shadow-[0_20px_50px_rgba(74,48,36,0.28)] relative z-10 flex flex-col items-center my-auto">
        
        {/* Subtle corner rivets */}
        <div className="absolute top-3.5 left-3.5 w-1.5 h-1.5 rounded-full border border-[#CBB8AB] bg-[#F4EDE4]" />
        <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full border border-[#CBB8AB] bg-[#F4EDE4]" />
        <div className="absolute bottom-3.5 left-3.5 w-1.5 h-1.5 rounded-full border border-[#CBB8AB] bg-[#F4EDE4]" />
        <div className="absolute bottom-3.5 right-3.5 w-1.5 h-1.5 rounded-full border border-[#CBB8AB] bg-[#F4EDE4]" />

        {/* Header */}
        <header className="text-center space-y-1 mb-3.5 w-full">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 bg-[#EFE2D8] border border-[#D8C4B8] rounded-full shadow-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E5D52]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#865750] font-bold">
              Espresso Bar Station
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E5D52]" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-[28px] font-serif italic font-medium tracking-tight text-[#7D4646] leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Indecisive Caffeinist
            </h1>
            <p className="text-[9px] font-sans uppercase tracking-[0.24em] text-[#9A7A7A] mt-0.5 font-bold">
              
            </p>
          </div>
        </header>

        {/* DISPLAY WINDOW (360px x 540px) */}
        <div className="w-[360px] h-[540px] flex flex-col items-center justify-center relative bg-gradient-to-b from-[#FCFAF7] to-[#F7F3EC] border border-[#EAE2D5] rounded-2xl p-5 overflow-hidden shadow-[0_12px_30px_rgba(45,30,18,0.06),inset_0_1px_2px_rgba(255,255,255,0.8)] transition-all duration-300">
          
          {/* EXTRACTION ANIMATION */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center h-full w-full relative select-none">
              <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible filter drop-shadow-[0_8px_16px_rgba(45,30,18,0.08)]">
                <path d="M90,85 Q85,75 92,65 T88,45" stroke="#D8BEBE" strokeWidth="1.5" strokeLinecap="round" fill="none" className="steam-path" style={{ animationDelay: '0s' }} />
                <path d="M102,85 Q106,73 98,63 T104,45" stroke="#D8BEBE" strokeWidth="1.5" strokeLinecap="round" fill="none" className="steam-path" style={{ animationDelay: '0.5s' }} />
                <path d="M112,85 Q108,76 114,66 T110,48" stroke="#D8BEBE" strokeWidth="1.5" strokeLinecap="round" fill="none" className="steam-path" style={{ animationDelay: '0.2s' }} />

                {/* Machine group head mount */}
                <rect x="50" y="20" width="100" height="12" rx="3" fill="#F4E8E8" stroke="#DFCDCD" strokeWidth="1" />
                <rect x="64" y="32" width="72" height="14" rx="1" fill="#D9B7B7" stroke="#C79F9F" strokeWidth="1" />
                <rect x="76" y="46" width="48" height="8" rx="2" fill="#8C5858" />
                
                {/* Portafilter handle with rose accent ferrule */}
                <path d="M124,36 L175,32 C178,32 180,34 180,36 L178,42 C178,44 175,46 172,46 L124,42 Z" fill="#4A2E2E" stroke="#381F1F" strokeWidth="1" />
                <rect x="124" y="36" width="6" height="6" fill="#D9B7B7" rx="0.5" />
                <rect x="97" y="54" width="6" height="4" rx="1" fill="#4A2E2E" />

                <line x1="100" y1="58" x2="100" y2="135" stroke="#70482B" strokeWidth="4" strokeLinecap="round" className="stream-line" />

                {/* Glass cup with soft pink tint and rose rim */}
                <path d="M75,100 L79,138 C80,146 87,152 95,152 H105 C113,152 120,146 121,138 L125,100 Z" fill="rgba(255, 238, 238, 0.45)" stroke="#C8A5A5" strokeWidth="2.5" />
                <path d="M123,110 C133,110 137,118 137,124 C137,130 132,136 122,136" stroke="#C8A5A5" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                <g clipPath="url(#cupClip)">
                  <rect x="60" y={152 - (brewProgress * 0.52)} width="80" height="60" fill="#3D2218" />
                  <rect x="60" y={152 - (brewProgress * 0.52)} width="80" height="6" fill="url(#cremaGradient)" />
                </g>

                <clipPath id="cupClip">
                  <path d="M76,102 L80,138 C81,145 87,150 95,150 H105 C113,150 119,145 120,138 L124,102 Z" />
                </clipPath>

                <defs>
                  <linearGradient id="cremaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E2B687" />
                    <stop offset="100%" stopColor="#C6925B" />
                  </linearGradient>
                </defs>
                <line x1="45" y1="158" x2="155" y2="158" stroke="#E2CDCD" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
              </svg>

              <div className="text-center mt-2 space-y-1">
                <p className="text-xs font-mono font-bold tracking-widest uppercase text-[#8B4F4F] animate-pulse">
                  Extracting...
                </p>
                <p className="text-[10px] text-[#A68282] font-mono font-medium tracking-wide">
                  Yield: {(brewProgress * 0.44).toFixed(1)}g / 100%
                </p>
              </div>
            </div>
          )}

          {/* VINTAGE GUEST CHECK */}
          {!isGenerating && recipe && (
            <div className="w-full h-full bg-[#F5EBEB] border border-[#E3CECE] rounded-lg p-5 font-mono text-[#3B2525] relative flex flex-col justify-between overflow-hidden shadow-[0_22px_45px_-8px_rgba(74,46,46,0.18),0_8px_18px_-6px_rgba(74,46,46,0.12)] ring-1 ring-white/60">
              
              {/* Top Staples */}
              <div className="absolute top-0 left-0 right-0 flex justify-center space-x-12 opacity-40 pt-1.5 z-20 select-none">
                <div className="w-6 h-[2.5px] bg-[#2B1B1B] rounded-sm shadow-[0_1px_1px_rgba(255,255,255,0.6)]" />
                <div className="w-6 h-[2.5px] bg-[#2B1B1B] rounded-sm shadow-[0_1px_1px_rgba(255,255,255,0.6)]" />
              </div>

              <div className="space-y-3 pt-1.5 flex flex-col h-[82%]">
                <div className="text-center">
                  <h2 className="text-2xl font-serif font-black tracking-wider text-[#4A2E2E] uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                    Guest Check
                  </h2>
                </div>

                {/* Metadata Table */}
                <div className="grid grid-cols-5 border border-[#8B4F4F]/35 divide-x divide-[#8B4F4F]/35 text-[8px] text-[#8C6B6B] font-sans uppercase bg-white/50 shadow-inner rounded-sm overflow-hidden">
                  <div className="flex flex-col justify-between p-1 h-8">
                    <span>Date</span>
                    <span className="font-mono text-[9px] text-[#4A2E2E] font-bold">07/13</span>
                  </div>
                  <div className="flex flex-col justify-between p-1 h-8">
                    <span>Table</span>
                    <span className="font-mono text-[9px] text-[#4A2E2E] font-bold">01</span>
                  </div>
                  <div className="flex flex-col justify-between p-1 h-8">
                    <span>Guests</span>
                    <span className="font-mono text-[9px] text-[#4A2E2E] font-bold">1</span>
                  </div>
                  <div className="flex flex-col justify-between p-1 h-8">
                    <span>Server</span>
                    <span className="font-mono text-[9px] text-[#4A2E2E] font-bold">Barista</span>
                  </div>
                  <div className="bg-[#EAD0D0] text-red-700 font-bold text-[11px] flex items-center justify-center font-mono tracking-wider shadow-inner">
                    902001
                  </div>
                </div>

                <div className="text-[7px] text-[#8C6B6B]/80 font-bold tracking-widest text-center border-b border-[#8B4F4F]/25 pb-1 uppercase font-sans">
                  Appt - Soup/Sal - Entree - Veg/Pot - Dessert - Bev
                </div>

                {/* Darker Clay-Rose Lined Notepad */}
                <div className="relative flex-1 bg-[#E8D5D5] border border-[#8B4F4F]/30 rounded-md p-0.5 overflow-hidden select-none shadow-[inset_0_2px_4px_rgba(74,46,46,0.06)]">
                  <div className="absolute left-[12%] top-0 bottom-0 w-[1.5px] bg-red-400/40 z-10" />
                  <div className="absolute right-[22%] top-0 bottom-0 w-[1px] bg-[#8B4F4F]/25 z-10" />
                  <div className="absolute right-[6%] top-0 bottom-0 w-[1px] bg-[#8B4F4F]/25 z-10" />

                  <div className="space-y-0 h-full relative z-20">
                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">1</span>
                      <span className="flex-1 pl-3 text-[16px] font-serif font-black text-[#3D1F1F] truncate leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                        {recipe.temp} {recipe.base}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[11px] font-bold text-[#4A2E2E] mr-2">0.00</span>
                    </div>

                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">2</span>
                      <span className="flex-1 pl-3 text-[14px] font-sans font-extrabold text-[#4A2E2E] truncate leading-none">
                        {recipe.milk}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">INCL</span>
                    </div>

                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">3</span>
                      <span className="flex-1 pl-3 text-[14px] font-sans font-extrabold text-[#4A2E2E] truncate leading-none">
                        {recipe.syrup !== 'No Syrup' ? recipe.syrup : 'Plain (No Syrup)'}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">
                        {recipe.syrup !== 'No Syrup' ? 'INCL' : ''}
                      </span>
                    </div>

                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">4</span>
                      <span className="flex-1 pl-3 text-[14px] font-sans font-extrabold text-[#4A2E2E] truncate leading-none">
                        {recipe.coldFoam !== 'No Cold Foam' ? recipe.coldFoam : 'Plain Top'}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">
                        {recipe.coldFoam !== 'No Cold Foam' ? 'INCL' : ''}
                      </span>
                    </div>

                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">5</span>
                      <span className="flex-1 pl-3 text-[14px] font-sans font-extrabold text-[#4A2E2E] truncate leading-none">
                        {recipe.topping !== 'No Topping' ? recipe.topping : 'No Toppings'}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">
                        {recipe.topping !== 'No Topping' ? 'INCL' : ''}
                      </span>
                    </div>

                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] opacity-40 font-sans">6</span>
                      <span className="flex-1 pl-3" />
                      <span className="w-[16%] mr-2" />
                    </div>

                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center justify-end">
                      <span className="font-sans text-[9px] font-bold text-[#8C6B6B] mr-4 uppercase tracking-wide">Tax</span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">0.00</span>
                    </div>

                    <div className="h-[29px] flex items-center justify-end">
                      <span className="font-serif text-[12px] font-black text-[#3D1F1F] mr-4 uppercase tracking-wide">Total</span>
                      <span className="w-[16%] text-center font-mono text-[13px] font-black text-[#3D1F1F] mr-2">0.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforation line */}
              <div className="relative flex items-center justify-center my-1.5 select-none">
                <div className="absolute -left-5 w-2 h-3.5 bg-[#FCFAF7] rounded-r-full shadow-inner border-y border-r border-[#E3CECE]" />
                <div className="w-full border-t-2 border-dashed border-[#8B4F4F]/35" />
                <div className="absolute -right-5 w-2 h-3.5 bg-[#FCFAF7] rounded-l-full shadow-inner border-y border-l border-[#E3CECE]" />
              </div>

              {/* Guest Receipt Stub */}
              <div className="space-y-1 pl-1 select-none h-[15%] flex flex-col justify-end">
                <div className="flex justify-between items-center text-[8px] text-[#8C6B6B] uppercase font-sans font-bold">
                  <span>Guest Receipt</span>
                  <span className="text-[6.5px] font-normal lowercase opacity-60 font-sans">royalpaper.com</span>
                </div>
                
                <div className="grid grid-cols-5 border border-[#8B4F4F]/35 divide-x divide-[#8B4F4F]/35 text-[7px] text-[#8C6B6B] font-sans uppercase text-center bg-white/40 shadow-inner">
                  <div className="py-0.5">Date</div>
                  <div className="py-0.5">Amount</div>
                  <div className="py-0.5">Guests</div>
                  <div className="py-0.5">Server</div>
                  <div className="text-red-700 font-bold bg-[#EAD0D0] text-[8px] flex items-center justify-center font-mono shadow-inner">
                    902001
                  </div>
                </div>

                <div className="grid grid-cols-5 border border-t-0 border-[#8B4F4F]/35 divide-x divide-[#8B4F4F]/35 text-[8.5px] text-[#4A2E2E] font-sans uppercase text-center font-bold bg-white/10">
                  <div className="py-0.5">07/13</div>
                  <div className="py-0.5">$0.00</div>
                  <div className="py-0.5">1</div>
                  <div className="py-0.5">Barista</div>
                  <div className="bg-[#EAD0D0]/30" />
                </div>
              </div>
            </div>
          )}

          {/* INITIAL IDLE VIEW */}
          {!isGenerating && !recipe && (
            <div className="space-y-4 text-center max-w-[220px] mx-auto py-12">
              <div className="text-2xl text-[#A68282]/40 font-serif">—</div>
              <p className="text-base font-serif font-bold text-[#2D1E12]">What should I drink today?</p>
              <p className="text-xs text-[#A68282] font-light leading-relaxed">
                Click below for a perfectly curated beverage when you're feeling indecisive.
              </p>
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <footer className="w-full text-center space-y-2 pt-3.5 sm:pt-4">
          <button
            onClick={generateCoffee}
            disabled={isGenerating}
            className="w-full max-w-[220px] mx-auto bg-[#4A2E2E] hover:bg-[#5C3A3A] active:bg-[#3D2828] text-[#FDFBF7] font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-[0.2em] transition-all duration-200 disabled:opacity-40 shadow-[0_8px_20px_-4px_rgba(74,46,46,0.25)] hover:shadow-[0_12px_24px_-4px_rgba(74,46,46,0.32)] hover:-translate-y-0.5 active:translate-y-0.5 block"
          >
            {recipe ? 'New Ticket' : 'Curate Order'}
          </button>
          
          {recipe && (
            <button
              onClick={() => setRecipe(null)}
              className="text-[9px] text-[#A68282] hover:text-[#4A2E2E] uppercase tracking-widest font-bold block mx-auto transition-colors duration-200"
            >
              Trash Check
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}