import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Apne paas actual path update kar lijiye ga agar zaroorat ho
import { CATEGORIES } from '../Components/Data';
import { ALL_TOOLS } from '../Components/Data';

const attackTypes = ["DDoS", "SQLi", "BruteForce", "XSS", "Malware"];
const ips = ["192.168.1.1", "10.0.0.5", "45.77.12.1", "103.22.1.9"];
const countries = ["USA", "CHN", "RUS", "IND", "PRK"];

const UserLayout = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fake stats states
  const [fakeLogs, setFakeLogs] = useState([]);
  const [fakeProgress, setFakeProgress] = useState(0);

  // useEffect for fake background activity
  useEffect(() => {
    // Fake Log Generator
    const logInterval = setInterval(() => {
      const newLog = `> ${attackTypes[Math.floor(Math.random()*attackTypes.length)]} DETECTED FROM ${ips[Math.floor(Math.random()*ips.length)]} [${countries[Math.floor(Math.random()*countries.length)]}]`;
      setFakeLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 1500);

    // Fake Progress Bar
    const progressInterval = setInterval(() => {
      setFakeProgress(prev => (prev >= 100 ? 0 : prev + Math.random() * 10));
    }, 500);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  // Filter Logic for actual data
  const displayedData = useMemo(() => {
    if (searchQuery) {
      return ALL_TOOLS.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return ALL_TOOLS.filter(tool => tool.category === activeCategory);
  }, [activeCategory, searchQuery]);

  // Framer Motion Variants
  const winVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const hackerGreen = "text-[#00ff41]";
  const glowBorder = "border border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.3)]";

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-2 md:p-4 relative overflow-hidden selection:bg-[#00ff41] selection:text-black">
      
      {/* =========================================
          PRANX STYLE FAKE BACKGROUND ANIMATIONS
          ========================================= */}
      <div className="absolute inset-0 z-0 matrix-rain opacity-[0.05] pointer-events-none"></div>
      <div className="absolute inset-0 z-0 opacity-[0.03] radar-sweep pointer-events-none"></div>

      {/* =========================================
          MAIN HUD / UI CONTENT
          ========================================= */}
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-3 min-h-[calc(100vh-2rem)] lg:h-[calc(100vh-2rem)]">
        
        {/* --- TOP BAR --- */}
        <header className={`col-span-12 flex items-center justify-between p-3 bg-black/80 backdrop-blur-sm ${glowBorder} rounded-sm shrink-0`}>
          <div className="flex items-center gap-3">
            <span className="animate-pulse text-red-500 text-xl">●</span>
            <h1 className="text-lg md:text-2xl font-black tracking-widest text-white">
              OSINT<span className={hackerGreen}>_FRAMEWORK</span> <span className="hidden sm:inline text-xs text-slate-500">[V3.0_ROOT_ACCESS]</span>
            </h1>
          </div>
          <div className="text-[10px] md:text-xs font-bold text-right">
            STATUS: <span className="animate-pulse text-white">UPLINK_ESTABLISHED</span><br className="hidden md:block"/>
            <span className="hidden md:inline">TARGET: </span><span className="text-cyan-400 hidden md:inline">GLOBAL_NET_SCAN</span>
          </div>
        </header>

        {/* --- LEFT SIDEBAR (Categories + Map) --- */}
        {/* Mobile: Order 2 (Below Search), Desktop: Order 1 */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-3 overflow-hidden order-2 lg:order-1 shrink-0 lg:h-full">
          
          {/* Categories Navigation (Horizontal on mobile, Vertical on desktop) */}
          <motion.div variants={winVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className={`p-3 md:p-4 bg-black/80 ${glowBorder} flex-none lg:flex-1 overflow-hidden flex flex-col`}>
            <h2 className="text-xs md:text-sm font-black tracking-wider text-slate-400 mb-2 md:mb-4 border-l-4 border-[#00ff41] pl-2 uppercase">
              Directories
            </h2>
            {/* Flex-row on mobile for horizontal scrolling */}
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto custom-scrollbar pb-2 lg:pb-0">
              {CATEGORIES.map((category) => (
                <button 
                  key={category}
                  onClick={() => { setActiveCategory(category); setSearchQuery(''); }}
                  className={`text-left px-3 py-2 md:py-2.5 rounded-sm text-[10px] md:text-xs font-bold tracking-wider transition-all border whitespace-nowrap lg:whitespace-normal
                    ${activeCategory === category && !searchQuery 
                      ? 'bg-[#00ff41]/20 border-[#00ff41] text-white shadow-[0_0_10px_rgba(0,255,65,0.4)]' 
                      : 'border-transparent text-[#00a32a] hover:bg-black/40 hover:text-[#00ff41]'
                    }`}
                >
                  <span className={`${hackerGreen} opacity-60 mr-1 md:mr-2`}>#</span> 
                  {category.toUpperCase()}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Fake Visual 1: World Attack Map (Hidden on very small screens to save space) */}
          <motion.div variants={winVariants} initial="hidden" animate="visible" className={`hidden sm:block flex-1 min-h-[120px] lg:min-h-[150px] p-3 bg-black/80 ${glowBorder} relative overflow-hidden`}>
            <div className="text-xs font-bold text-slate-500 mb-2 border-b border-[#00ff41]/30 pb-1">LIVE_ATTACK_MAP</div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" alt="map" className="absolute inset-0 opacity-10 h-full w-full object-cover filter invert" />
            <div className="absolute top-1/4 left-1/4 w-[2px] h-[2px] bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-2/3 w-[2px] h-[2px] bg-red-500 rounded-full animate-ping delay-500"></div>
            <div className="absolute h-[1px] bg-red-500 w-1/2 top-1/2 left-1/4 origin-left -rotate-12 animate-pulse"></div>
            <div className="absolute bottom-2 left-2 text-[10px] text-red-400 font-bold">WARNING: DDoS Cluster-9 Active</div>
          </motion.div>
        </aside>

        {/* --- CENTER AREA (Actual Data + Search) --- */}
        {/* Mobile: Order 1 (Top priority), Desktop: Order 2 */}
        <main className="col-span-12 lg:col-span-6 flex flex-col gap-3 order-1 lg:order-2 h-[55vh] lg:h-full overflow-hidden">
          
          {/* Search Terminal Input (Flexbox used to fix overlap issues) */}
          <motion.div variants={winVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className={`flex items-center bg-black/80 border-2 border-[#1a1a1a] hover:border-[#00ff41] focus-within:border-[#00ff41] transition-all rounded-sm ${glowBorder} group`}>
            <span className={`pl-3 pr-2 py-3 md:py-4 ${hackerGreen} font-black text-xs md:text-sm whitespace-nowrap`}>
              root@core:~#
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query database..." 
              className={`flex-1 bg-transparent text-white pr-3 py-3 md:py-4 focus:outline-none font-mono text-xs md:text-sm placeholder-gray-600 w-full`}
            />
          </motion.div> 

          {/* Actual OSINT Tools Results */}
          <motion.div variants={winVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className={`flex-1 bg-black/90 ${glowBorder} p-3 md:p-4 overflow-y-auto custom-scrollbar relative rounded-sm h-full`}>
            <div className="flex justify-between items-center mb-4 md:mb-5 border-b border-[#00ff41]/30 pb-2">
              <span className="text-white font-black text-[10px] md:text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shrink-0"></span>
                <span className="truncate">{searchQuery ? `QUERY_RESULTS` : `DIR: ${activeCategory.toUpperCase()}`}</span>
              </span>
              <span className="text-[10px] md:text-xs text-slate-500 whitespace-nowrap ml-2">REC: {displayedData.length}</span>
            </div>
            
            <AnimatePresence mode="popLayout">
              {displayedData.length > 0 ? (
                displayedData.map((tool, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={index} 
                    className={`group border border-[#1a1a1a] hover:border-[#00ff41] bg-black p-3 md:p-4 mb-3 transition-all relative overflow-hidden rounded-sm hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]`}
                  >
                    <div className="absolute top-0 left-[-100%] w-full h-[1px] bg-[#00ff41] shadow-[0_0_10px_#00ff41] group-hover:animate-scan-card z-20"></div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 relative z-10 pl-1 md:pl-2">
                      <div className="border-l-2 border-[#1a1a1a] group-hover:border-[#00ff41] pl-2 md:pl-3 transition-colors flex-1">
                        <h3 className="text-sm md:text-lg font-black text-white group-hover:text-cyan-400 transition-colors tracking-wide">
                          {tool.name.toUpperCase()}
                        </h3>
                        <p className="text-slate-400 text-[10px] md:text-xs mt-1 lowercase leading-relaxed line-clamp-2 font-sans pr-2 md:pr-4">
                          {tool.desc}
                        </p>
                      </div>
                      
                      <a 
                        href={tool.url !== "#" ? tool.url : null} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-[9px] md:text-[10px] px-4 py-2 md:px-5 md:py-3 font-bold tracking-widest border transition-all whitespace-nowrap self-start sm:self-center text-center ${
                          tool.url !== "#" 
                          ? 'border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] cursor-pointer' 
                          : 'border-red-900 text-red-600 cursor-not-allowed'
                        }`}
                      >
                        {tool.url !== "#" ? 'EXECUTE' : 'LOCKED'}
                      </a>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-6 md:p-10 text-center text-red-500 border border-red-900/30 bg-red-950/10 rounded-sm">
                  <span className="block text-3xl md:text-4xl mb-2 md:mb-3">⚠️</span>
                  <span className="text-xs md:text-sm">NO INTELLIGENCE MATCHES FOUND</span>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>

        {/* --- RIGHT PANEL (Fake Visuals + Logs) --- */}
        {/* Mobile: Order 3 (Bottom), Desktop: Order 3 */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 order-3 shrink-0 lg:h-full overflow-hidden">
          
          <motion.div variants={winVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className={`flex-1 bg-black/80 ${glowBorder} p-3 overflow-hidden rounded-sm relative h-[150px] lg:h-auto`}>
            <div className="text-[10px] md:text-xs font-bold text-red-500 mb-2 border-b border-red-900/50 pb-1 flex justify-between">
              <span>LIVE_INTERCEPT_LOGS</span>
              <span className="animate-pulse">REC...</span>
            </div>
            <div className="text-[9px] md:text-[10px] text-red-400 space-y-1.5 overflow-hidden h-[calc(100%-30px)]">
              <AnimatePresence>
                {fakeLogs.map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }} className="whitespace-nowrap truncate font-mono">
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/50 shadow-[0_0_10px_red] animate-[scan_3s_linear_infinite]"></div>
          </motion.div>

          <motion.div variants={winVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }} className={`flex-1 lg:flex-none lg:h-[180px] bg-black/80 ${glowBorder} p-3 rounded-sm`}>
            <div className="text-[10px] md:text-xs font-bold text-cyan-500 mb-3 border-b border-cyan-900 pb-1">DECRYPTION_CORE</div>
            <div className="space-y-2 md:space-y-3 text-[9px] md:text-[10px]">
              <div>
                <div className="flex justify-between mb-1 text-cyan-600"><span>KERNEL_OVERRIDE</span><span className="text-cyan-400">{Math.floor(fakeProgress)}%</span></div>
                <div className="w-full h-1 md:h-1.5 bg-cyan-950 border border-cyan-900"><div className="h-full bg-cyan-500 transition-all duration-300" style={{width: `${fakeProgress}%`}}></div></div>
              </div>
              <div className="flex justify-between text-cyan-700"><span>CPU_LOAD</span><span className="text-white animate-pulse">87% HEAVY</span></div>
              <div className="flex justify-between text-cyan-700"><span>NET_TRAFFIC</span><span className="text-red-400">SPIKE</span></div>
              <div className="flex justify-between text-cyan-700"><span>CIPHER_KEY</span><span className="text-cyan-400 font-mono">0x{Math.random().toString(16).substring(2, 8).toUpperCase()}</span></div>
            </div>
          </motion.div>
        </aside>

      </div>

      {/* =========================================
          CUSTOM CSS FOR BACKGROUND ANIMATIONS
          ========================================= */}
      <style dangerouslySetInnerHTML={{__html: `
        .matrix-rain {
          background-image: linear-gradient(180deg, rgba(0, 255, 65, 0.1) 0%, transparent 100%);
          background-size: 100% 1000px;
          animation: matrixRain 20s linear infinite;
        }
        @keyframes matrixRain { 0% { background-position: 0 0; } 100% { background-position: 0 1000px; } }

        .radar-sweep {
          background: conic-gradient(from 0deg, transparent 70%, rgba(34, 211, 238, 0.1) 80%, rgba(34, 211, 238, 0.3) 100%);
          border-radius: 50%;
          width: 200vw; height: 200vw;
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: spin 15s linear infinite;
        }
        @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

        @keyframes scanCard { 0% { left: -100%; top: 0; } 100% { left: 100%; top: 0; } }
        .group-hover\\:animate-scan-card { animation: scanCard 1.5s linear infinite; }
        
        .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00ff41; box-shadow: 0 0 10px #00ff41; }
      `}} />
    </div>
  );
};

export default UserLayout;