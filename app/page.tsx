'use client';

import { useState } from 'react';

const bases = ['Espresso Latte', 'Cold Brew Nitro', 'Caffè Americano', 'Chai Wallah Latte', 'Ceremonial Matcha Latte', 'Cloud Macchiato'];
const temps = ['Iced', 'Hot'];
const milks = ['Oat Milk', 'Almond Milk', 'Organic Whole Milk', 'Coconut Milk', 'Breve (Half & Half)'];
const syrups = [
  'Madagascar Vanilla', 
  'Smoked Salted Caramel', 
  'Toasted Hazelnut', 
  'White Chocolate Mocha', 
  'Brown Sugar Cinnamon', 
  'Wild Lavender', 
  'Roasted Pistachio', 
  'No Syrup'
];
const coldFoams = [
  'Vanilla Sweet Cream Foam', 
  'Salted Caramel Cold Foam', 
  'Matcha Velvet Foam', 
  'Belgian Chocolate Foam', 
  'Brown Sugar Cold Foam',
  'No Cold Foam'
];
const toppings = [
  'Ceylon Cinnamon Dusting', 
  'Dark Cocoa Shavings', 
  'Caramel Ribbon Drizzle', 
  'Gourmet Chocolate Drizzle', 
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
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-8 text-[#241C15] font-sans selection:bg-[#F2E3E3] overflow-x-hidden bg-[#F6F0E8]">
      
      {/* SOFT PINK & TAN CAFE ILLUSTRATION BACKGROUND (Low saturation, atmospheric) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-55">
        <svg 
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Base Wall & Ceiling Tones */}
          <rect width="1440" height="900" fill="#F4EDE4" />
          <rect width="1440" height="110" fill="#E6DAD2" />
          <rect y="110" width="1440" height="16" fill="#D8C8BF" />

          {/* Large Cafe Window on Left */}
          <rect x="70" y="160" width="620" height="520" rx="6" fill="#EDE1D6" stroke="#D3C0B5" strokeWidth="6" />
          {/* Window Panes Grid */}
          <line x1="70" y1="330" x2="690" y2="330" stroke="#D3C0B5" strokeWidth="4" />
          <line x1="280" y1="160" x2="280" y2="680" stroke="#D3C0B5" strokeWidth="4" />
          <line x1="490" y1="160" x2="490" y2="680" stroke="#D3C0B5" strokeWidth="4" />
          
          {/* Soft City Silhouette behind Window */}
          <rect x="110" y="440" width="65" height="180" fill="#DFD2C7" opacity="0.6" />
          <rect x="190" y="380" width="80" height="240" fill="#DFD2C7" opacity="0.5" />
          <rect x="300" y="410" width="95" height="210" fill="#DFD2C7" opacity="0.7" />
          <rect x="420" y="360" width="60" height="260" fill="#DFD2C7" opacity="0.5" />
          <rect x="500" y="430" width="110" height="190" fill="#DFD2C7" opacity="0.6" />

          {/* Warm Sunlight Angle Beam */}
          <polygon points="70,160 520,160 880,900 180,900" fill="#FFF9F2" opacity="0.4" />

          {/* Hanging Pendant Lamps */}
          <line x1="220" y1="110" x2="220" y2="230" stroke="#B8A499" strokeWidth="2" />
          <rect x="213" y="230" width="14" height="28" rx="4" fill="#C99388" opacity="0.85" />
          <line x1="440" y1="110" x2="440" y2="210" stroke="#B8A499" strokeWidth="2" />
          <rect x="433" y="210" width="14" height="28" rx="4" fill="#C99388" opacity="0.85" />

          {/* Right Side Wall Art / Menu Chalkboard */}
          <rect x="1220" y="180" width="160" height="340" rx="4" fill="#6A514D" opacity="0.75" />
          <rect x="1232" y="195" width="136" height="310" fill="#584340" opacity="0.8" />
          <path d="M1250,230 Q1300,210 1350,230" stroke="#DFD2C7" strokeWidth="2" fill="none" opacity="0.6" />
          <line x1="1255" y1="260" x2="1345" y2="260" stroke="#DFD2C7" strokeWidth="1.5" opacity="0.5" />
          <line x1="1255" y1="285" x2="1330" y2="285" stroke="#DFD2C7" strokeWidth="1.5" opacity="0.5" />
          <line x1="1255" y1="310" x2="1340" y2="310" stroke="#DFD2C7" strokeWidth="1.5" opacity="0.5" />

          {/* Cafe Shelves on Right */}
          <rect x="880" y="240" width="310" height="12" rx="2" fill="#BAA498" />
          <rect x="880" y="340" width="310" height="12" rx="2" fill="#BAA498" />
          <rect x="880" y="440" width="310" height="12" rx="2" fill="#BAA498" />

          {/* Mugs, Jars, and Canisters on Shelves (Soft Pink & Tan Tones) */}
          <rect x="910" y="190" width="26" height="50" rx="3" fill="#D99B8F" opacity="0.8" />
          <rect x="945" y="205" width="32" height="35" rx="3" fill="#D6C4B8" />
          <rect x="990" y="198" width="38" height="42" rx="16" fill="#C5A898" />
          <rect x="1050" y="208" width="22" height="32" rx="2" fill="#D99B8F" opacity="0.8" />

          <rect x="905" y="300" width="24" height="40" rx="2" fill="#CBB6AA" />
          <rect x="940" y="305" width="28" height="35" rx="2" fill="#D99B8F" opacity="0.8" />
          <rect x="1020" y="295" width="48" height="45" rx="4" fill="#BA9E92" />
          <circle cx="1120" cy="318" r="14" fill="#C99388" opacity="0.85" />

          {/* Main Wooden Espresso Bar Counter */}
          <rect x="0" y="580" width="1440" height="18" fill="#B3988B" />
          <rect x="0" y="598" width="1440" height="240" fill="#6A534B" opacity="0.35" />

          {/* Bar Stools Lineup */}
          <g opacity="0.75">
            {[260, 420, 580, 860, 1020, 1180].map((x, i) => (
              <g key={i}>
                <ellipse cx={x} cy={660} rx="30" ry="8" fill="#C2897E" />
                <line x1={x - 16} y1={664} x2={x - 20} y2={840} stroke="#7D655C" strokeWidth="4" />
                <line x1={x + 16} y1={664} x2={x + 20} y2={840} stroke="#7D655C" strokeWidth="4" />
                <line x1={x} y1={664} x2={x} y2={840} stroke="#7D655C" strokeWidth="3" />
                <ellipse cx={x} cy={760} rx="18" ry="4" stroke="#7D655C" strokeWidth="2.5" fill="none" />
              </g>
            ))}
          </g>

          {/* Floor Tiles Perspective */}
          <line x1="0" y1="840" x2="1440" y2="840" stroke="#D3C0B5" strokeWidth="2" />
          <line x1="200" y1="840" x2="80" y2="900" stroke="#D3C0B5" strokeWidth="2" opacity="0.6" />
          <line x1="500" y1="840" x2="420" y2="900" stroke="#D3C0B5" strokeWidth="2" opacity="0.6" />
          <line x1="850" y1="840" x2="820" y2="900" stroke="#D3C0B5" strokeWidth="2" opacity="0.6" />
          <line x1="1200" y1="840" x2="1240" y2="900" stroke="#D3C0B5" strokeWidth="2" opacity="0.6" />
        </svg>
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

      {/* CENTRAL INTERACTIVE CARD CONTAINER */}
      <div className="w-full max-w-md bg-[#FAF5EE]/95 backdrop-blur-md border border-[#E3D4C7] rounded-[38px] p-6 sm:p-8 shadow-[0_24px_60px_rgba(74,48,36,0.14)] relative z-10 flex flex-col items-center">
        
        {/* Decorative Corner Rivets */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full border border-[#D1BCAC] bg-[#F4EDE4]" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full border border-[#D1BCAC] bg-[#F4EDE4]" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full border border-[#D1BCAC] bg-[#F4EDE4]" />
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full border border-[#D1BCAC] bg-[#F4EDE4]" />

        {/* HEADER SECTION (Overlapping bug resolved: Clean vertical flow) */}
        <header className="text-center space-y-2 mb-5 w-full">
          
          {/* Refined Station Tag Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#F0E4DA] border border-[#DFCAC0] rounded-full shadow-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A25F56]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-[#865750] font-bold">
              Espresso Bar Station
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A25F56]" />
          </div>

          {/* Redesigned Title with High-End Editorial Serif & Warm Rose-Mocha Color */}
          <div className="pt-1">
            <h1 className="text-3xl sm:text-[34px] font-serif font-black tracking-normal text-[#3A2424] leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Indecisive <span className="italic font-medium text-[#7D4646]">Caffeinist</span>
            </h1>
            <p className="text-[10px] font-sans uppercase tracking-[0.26em] text-[#9A7A7A] mt-1 font-semibold">
              Artisan Drink Curator
            </p>
          </div>
        </header>

        {/* DISPLAY WINDOW: Formatted to 2x3 ratio (360px by 540px) */}
        <div className="w-[360px] h-[540px] flex flex-col items-center justify-center relative bg-gradient-to-b from-[#FCFAF7] to-[#F7F3EC] border border-[#EAE2D5] rounded-2xl p-6 overflow-hidden shadow-[0_16px_40px_rgba(45,30,18,0.06),inset_0_1px_2px_rgba(255,255,255,0.8)] transition-all duration-300">
          
          {/* EXTRACTION ANIMATION */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center h-full w-full relative select-none">
              <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible filter drop-shadow-[0_8px_16px_rgba(45,30,18,0.08)]">
                <path d="M90,85 Q85,75 92,65 T88,45" stroke="#C4B2A2" strokeWidth="1.5" strokeLinecap="round" fill="none" className="steam-path" style={{ animationDelay: '0s' }} />
                <path d="M102,85 Q106,73 98,63 T104,45" stroke="#C4B2A2" strokeWidth="1.5" strokeLinecap="round" fill="none" className="steam-path" style={{ animationDelay: '0.5s' }} />
                <path d="M112,85 Q108,76 114,66 T110,48" stroke="#C4B2A2" strokeWidth="1.5" strokeLinecap="round" fill="none" className="steam-path" style={{ animationDelay: '0.2s' }} />

                <rect x="50" y="20" width="100" height="12" rx="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
                <rect x="64" y="32" width="72" height="14" fill="#94A3B8" />
                <rect x="76" y="46" width="48" height="8" rx="2" fill="#475569" />
                
                <path d="M124,36 L175,32 C178,32 180,34 180,36 L178,42 C178,44 175,46 172,46 L124,42 Z" fill="#5C3D24" stroke="#4A301C" strokeWidth="1" />
                <rect x="97" y="54" width="6" height="4" rx="1" fill="#1A130E" />

                <line x1="100" y1="58" x2="100" y2="135" stroke="#70482B" strokeWidth="4" strokeLinecap="round" className="stream-line" />

                <path d="M75,100 L79,138 C80,146 87,152 95,152 H105 C113,152 120,146 121,138 L125,100 Z" fill="rgba(255,255,255,0.35)" stroke="#94A3B8" strokeWidth="2.5" />
                <path d="M123,110 C133,110 137,118 137,124 C137,130 132,136 122,136" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                <g clipPath="url(#cupClip)">
                  <rect x="60" y={152 - (brewProgress * 0.52)} width="80" height="60" fill="#362213" />
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
                <line x1="45" y1="158" x2="155" y2="158" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
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
                
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-serif font-black tracking-wider text-[#4A2E2E] uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                    Guest Check
                  </h2>
                </div>

                {/* Upper Metadata Table */}
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
                  
                  {/* Guidelines */}
                  <div className="absolute left-[12%] top-0 bottom-0 w-[1.5px] bg-red-400/40 z-10" />
                  <div className="absolute right-[22%] top-0 bottom-0 w-[1px] bg-[#8B4F4F]/25 z-10" />
                  <div className="absolute right-[6%] top-0 bottom-0 w-[1px] bg-[#8B4F4F]/25 z-10" />

                  {/* Lined Rows */}
                  <div className="space-y-0 h-full relative z-20">
                    
                    {/* Line 1: Base */}
                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">1</span>
                      <span className="flex-1 pl-3 text-[16px] font-serif font-black text-[#3D1F1F] truncate leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                        {recipe.temp} {recipe.base}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[11px] font-bold text-[#4A2E2E] mr-2">0.00</span>
                    </div>

                    {/* Line 2: Milk */}
                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">2</span>
                      <span className="flex-1 pl-3 text-[14px] font-sans font-extrabold text-[#4A2E2E] truncate leading-none">
                        {recipe.milk}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">INCL</span>
                    </div>

                    {/* Line 3: Sweetener */}
                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">3</span>
                      <span className="flex-1 pl-3 text-[14px] font-sans font-extrabold text-[#4A2E2E] truncate leading-none">
                        {recipe.syrup !== 'No Syrup' ? recipe.syrup : 'Plain (No Syrup)'}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">
                        {recipe.syrup !== 'No Syrup' ? 'INCL' : ''}
                      </span>
                    </div>

                    {/* Line 4: Cold Foam */}
                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">4</span>
                      <span className="flex-1 pl-3 text-[14px] font-sans font-extrabold text-[#4A2E2E] truncate leading-none">
                        {recipe.coldFoam !== 'No Cold Foam' ? recipe.coldFoam : 'Plain Top'}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">
                        {recipe.coldFoam !== 'No Cold Foam' ? 'INCL' : ''}
                      </span>
                    </div>

                    {/* Line 5: Topping */}
                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] text-[#8C6B6B] font-sans font-bold">5</span>
                      <span className="flex-1 pl-3 text-[14px] font-sans font-extrabold text-[#4A2E2E] truncate leading-none">
                        {recipe.topping !== 'No Topping' ? recipe.topping : 'No Toppings'}
                      </span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">
                        {recipe.topping !== 'No Topping' ? 'INCL' : ''}
                      </span>
                    </div>

                    {/* Line 6: Blank */}
                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center">
                      <span className="w-[12%] text-center text-[10px] opacity-40 font-sans">6</span>
                      <span className="flex-1 pl-3" />
                      <span className="w-[16%] mr-2" />
                    </div>

                    {/* Line 7: Tax */}
                    <div className="h-[29px] border-b border-[#8B4F4F]/20 flex items-center justify-end">
                      <span className="font-sans text-[9px] font-bold text-[#8C6B6B] mr-4 uppercase tracking-wide">Tax</span>
                      <span className="w-[16%] text-center font-mono text-[10px] text-[#8C6B6B] mr-2">0.00</span>
                    </div>

                    {/* Line 8: Total */}
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
              <p className="text-base font-serif font-bold text-[#2D1E12]">Menu Paradox</p>
              <p className="text-xs text-[#A68282] font-light leading-relaxed">
                Click below to auto-curate a perfectly balanced daily caffeine composition.
              </p>
            </div>
          )}
        </div>

        {/* ACTION CONTROLS */}
        <footer className="w-full text-center space-y-3 pt-4">
          <button
            onClick={generateCoffee}
            disabled={isGenerating}
            className="w-full max-w-[240px] mx-auto bg-[#4A2E2E] hover:bg-[#5C3A3A] active:bg-[#3D2828] text-[#FDFBF7] font-bold py-4 px-8 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all duration-200 disabled:opacity-40 shadow-[0_10px_25px_-4px_rgba(74,46,46,0.25),0_4px_10px_-2px_rgba(74,46,46,0.15)] hover:shadow-[0_14px_30px_-4px_rgba(74,46,46,0.32)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_4px_12px_rgba(74,46,46,0.2)] block"
          >
            {recipe ? 'New Ticket' : 'Curate Order'}
          </button>
          
          {recipe && (
            <button
              onClick={() => setRecipe(null)}
              className="text-[10px] text-[#A68282] hover:text-[#4A2E2E] uppercase tracking-widest font-bold block mx-auto transition-colors duration-200"
            >
              Trash Check
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}