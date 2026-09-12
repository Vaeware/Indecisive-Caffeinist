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
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-8 text-[#241C15] font-sans selection:bg-[#F2E3E3] overflow-x-hidden bg-[#D8C7BC]">
      
      {/* COFFEE SHOP BACKGROUND ILLUSTRATION (Faithful to reference image) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg 
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Main Cafe Walls & Ceiling */}
          <rect width="1440" height="900" fill="#DECBC2" />
          <rect width="1440" height="100" fill="#93756C" />
          <rect y="100" width="1440" height="24" fill="#755850" />

          {/* Large Panoramic Cafe Window */}
          <rect x="60" y="140" width="840" height="520" rx="4" fill="#EAD9CE" stroke="#684D46" strokeWidth="12" />
          
          {/* Window Panes and Frame Bars */}
          <line x1="60" y1="230" x2="900" y2="230" stroke="#684D46" strokeWidth="8" />
          <line x1="310" y1="140" x2="310" y2="660" stroke="#684D46" strokeWidth="8" />
          <line x1="680" y1="140" x2="680" y2="660" stroke="#684D46" strokeWidth="8" />

          {/* Warm Cityscape Skyline View Through Window */}
          <rect x="90" y="320" width="70" height="340" fill="#D3B8AA" />
          <rect x="180" y="270" width="95" height="390" fill="#CBB0A2" />
          <rect x="340" y="340" width="110" height="320" fill="#D3B8AA" />
          <rect x="470" y="290" width="75" height="370" fill="#C4A89A" />
          <rect x="560" y="360" width="90" height="300" fill="#CEB4A6" />
          <rect x="710" y="310" width="130" height="350" fill="#CBB0A2" />

          {/* Warm Sunlight Angle from Window */}
          <polygon points="60,140 680,140 1020,900 120,900" fill="#FDF3EB" opacity="0.25" />

          {/* Hanging Pendant Fixtures */}
          <line x1="280" y1="124" x2="280" y2="210" stroke="#523B35" strokeWidth="2.5" />
          <rect x="272" y="210" width="16" height="36" rx="4" fill="#C27A67" />
          <line x1="510" y1="124" x2="510" y2="230" stroke="#523B35" strokeWidth="2.5" />
          <rect x="502" y="230" width="16" height="36" rx="4" fill="#C27A67" />

          {/* Right Wall Artwork Poster Frame */}
          <rect x="1270" y="150" width="135" height="390" rx="3" fill="#FAF5F0" stroke="#5E433C" strokeWidth="8" />
          <rect x="1285" y="165" width="105" height="360" fill="#785952" />
          <path d="M1300,320 Q1337,250 1375,320" stroke="#F1DFD5" strokeWidth="3" fill="none" opacity="0.7" />
          <circle cx="1337" cy="240" r="18" fill="#D49A8D" opacity="0.8" />
          <line x1="1300" y1="360" x2="1375" y2="360" stroke="#F1DFD5" strokeWidth="2" opacity="0.6" />
          <line x1="1310" y1="380" x2="1365" y2="380" stroke="#F1DFD5" strokeWidth="2" opacity="0.6" />

          {/* Three Open Cafe Shelves */}
          <rect x="940" y="290" width="310" height="14" rx="2" fill="#75564E" />
          <rect x="940" y="390" width="310" height="14" rx="2" fill="#75564E" />
          <rect x="940" y="490" width="310" height="14" rx="2" fill="#75564E" />

          {/* Ceramic Bottles, Jars, and Cups (Muted Terracottas & Pinks) */}
          <rect x="965" y="235" width="28" height="55" rx="3" fill="#D08878" />
          <rect x="1005" y="250" width="34" height="40" rx="3" fill="#E4C8BA" />
          <path d="M1060,250 h26 v30 a8,8 0 0 1 -8,8 h-10 a8,8 0 0 1 -8,-8 z" fill="#BE7D6F" />
          <rect x="1115" y="230" width="32" height="60" rx="4" fill="#B38676" />
          <rect x="1170" y="248" width="26" height="42" rx="2" fill="#DFA99C" />

          <rect x="970" y="348" width="24" height="42" rx="2" fill="#A87568" />
          <rect x="1010" y="338" width="36" height="52" rx="3" fill="#D08878" />
          <circle cx="1080" cy="365" r="16" fill="#DEC0B3" />
          <rect x="1120" y="345" width="40" height="45" rx="3" fill="#BE7D6F" />
          <rect x="1185" y="352" width="22" height="38" rx="2" fill="#E4C8BA" />

          <rect x="960" y="445" width="48" height="45" rx="4" fill="#E4C8BA" />
          <rect x="1030" y="435" width="30" height="55" rx="2" fill="#D08878" />
          <rect x="1085" y="448" width="35" height="42" rx="3" fill="#9C6B5E" />
          <circle cx="1150" cy="465" r="14" fill="#DEC0B3" />

          {/* Potted Floor Plant (Far Left) */}
          <path d="M0,450 Q45,430 65,480 Q30,510 0,490 Z" fill="#886E65" />
          <path d="M10,510 Q70,490 85,550 Q40,580 5,550 Z" fill="#7A6058" />
          <rect x="0" y="690" width="55" height="70" rx="3" fill="#B27464" />

          {/* Main Service Bar Counter */}
          <rect x="230" y="550" width="700" height="18" fill="#8B6358" />
          <rect x="250" y="568" width="660" height="180" fill="#4B3530" />
          <rect x="930" y="590" width="510" height="16" fill="#8B6358" />
          <rect x="930" y="606" width="510" height="142" fill="#583F39" />

          {/* Espresso Machine Silhouette on Counter */}
          <rect x="360" y="420" width="95" height="130" rx="4" fill="#75564E" stroke="#5E433C" strokeWidth="4" />
          <rect x="380" y="510" width="55" height="20" fill="#A87568" />
          <rect x="475" y="450" width="50" height="100" rx="3" fill="#684D46" />

          {/* Foreground Bar Stools Lineup */}
          <g>
            {[780, 930, 1070, 1210, 1350].map((x, i) => (
              <g key={i}>
                <ellipse cx={x} cy={690} rx="34" ry="10" fill="#B36E5E" />
                <ellipse cx={x} cy={687} rx="34" ry="10" fill="#C88272" />
                <line x1={x - 18} y1={695} x2={x - 22} y2={870} stroke="#44302B" strokeWidth="5" />
                <line x1={x + 18} y1={695} x2={x + 22} y2={870} stroke="#44302B" strokeWidth="5" />
                <line x1={x} y1={697} x2={x} y2={870} stroke="#44302B" strokeWidth="4" />
                <ellipse cx={x} cy={790} rx="20" ry="5" stroke="#44302B" strokeWidth="3" fill="none" />
              </g>
            ))}
          </g>

          {/* Flooring Tiles */}
          <rect y="748" width="1440" height="152" fill="#BAA093" />
          <line x1="0" y1="748" x2="1440" y2="748" stroke="#8A6E63" strokeWidth="3" />
          <line x1="200" y1="748" x2="60" y2="900" stroke="#8A6E63" strokeWidth="2.5" opacity="0.6" />
          <line x1="560" y1="748" x2="450" y2="900" stroke="#8A6E63" strokeWidth="2.5" opacity="0.6" />
          <line x1="920" y1="748" x2="840" y2="900" stroke="#8A6E63" strokeWidth="2.5" opacity="0.6" />
          <line x1="1280" y1="748" x2="1230" y2="900" stroke="#8A6E63" strokeWidth="2.5" opacity="0.6" />
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

      {/* CENTRAL CARD CONTAINER */}
      <div className="w-full max-w-md bg-[#FAF5EE]/95 backdrop-blur-md border border-[#DFCFC4] rounded-[38px] p-6 sm:p-8 shadow-[0_24px_60px_rgba(74,48,36,0.22)] relative z-10 flex flex-col items-center">
        
        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full border border-[#CBB8AB] bg-[#F4EDE4]" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full border border-[#CBB8AB] bg-[#F4EDE4]" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full border border-[#CBB8AB] bg-[#F4EDE4]" />
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full border border-[#CBB8AB] bg-[#F4EDE4]" />

        {/* HEADER SECTION */}
        <header className="text-center space-y-1.5 mb-5 w-full">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-0.5 bg-[#EFE2D8] border border-[#D8C4B8] rounded-full shadow-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E5D52]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-[#865750] font-bold">
              Espresso Bar Station
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E5D52]" />
          </div>

          {/* UNIFIED MATCHING TITLE DESIGN (Both words in italic editorial serif) */}
          <div className="pt-1">
            <h1 className="text-3xl sm:text-[35px] font-serif italic font-medium tracking-tight text-[#7D4646] leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Indecisive Caffeinist
            </h1>
            <p className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#9A7A7A] mt-1 font-bold">
              Curated Daily Ritual
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