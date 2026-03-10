"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, MapPin, Zap, ChevronRight, Activity, Users, 
  Star, Phone, MessageCircle, Send, CheckCircle, X 
} from 'lucide-react';

const GalleryCard = ({ src, title, sport }) => (
  <motion.div whileHover={{ scale: 1.03, y: -10 }} className="relative group rounded-[40px] overflow-hidden border border-white/5 cursor-pointer h-[450px]">
    <img src={src} alt={title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
    <div className="absolute bottom-0 left-0 p-10 z-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <span className="text-arena-green font-black text-xs uppercase tracking-[0.3em] mb-3 block">{sport}</span>
      <h4 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">{title}</h4>
    </div>
  </motion.div>
);

export default function Home() {
  const [showWA, setShowWA] = useState(false);
  const [status, setStatus] = useState("");
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [displayRating, setDisplayRating] = useState(4.9); 
  const [hasRated, setHasRated] = useState(false);

  const WHATSAPP_NUMBER = "9620000961";
  const PHONE_1 = "9483021975";
  const PHONE_2 = "9620000961";
  const FORMSPREE_ID = "xlgpjlqd"; 

  useEffect(() => {
    const timer = setTimeout(() => setShowWA(true), 2000);
    const savedRating = localStorage.getItem('ovalbox_rating');
    if (savedRating) {
      setHasRated(true);
      const newAvg = (4.9 + parseFloat(savedRating)) / 2;
      setDisplayRating(newAvg.toFixed(1));
    }
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    setStatus("SENDING...");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) { setStatus("SUCCESS"); form.reset(); } 
      else { setStatus("ERROR"); }
    } catch (error) { setStatus("ERROR"); }
  };

  const submitRating = () => {
    if (userRating === 0) return;
    localStorage.setItem('ovalbox_rating', userRating);
    setHasRated(true);
    const simulatedAverage = (4.9 + userRating) / 2;
    setDisplayRating(simulatedAverage.toFixed(1));
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-arena-green selection:text-black font-sans scroll-smooth">
      
      {/* LOGO LIGHTBOX */}
      <AnimatePresence>
        {isLogoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsLogoOpen(false)} className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out">
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src="/ovalbox-logo.png" className="max-w-full max-h-[80vh] object-contain drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
          <div onClick={() => setIsLogoOpen(true)} className="flex items-center gap-3 group cursor-pointer">
            <img 
              src="/ovalbox-logo.png" 
              alt="Logo" 
              className="h-8 w-auto group-hover:scale-110 transition-transform" 
              onError={(e) => { e.target.src = "/ovalbox-logo.PNG" }}
            />
            <h1 className="text-lg font-black italic tracking-tighter uppercase">Oval Box</h1>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <a href="#sports" className="hover:text-arena-green">Sports</a>
            <a href="#gallery" className="hover:text-arena-green">Arena</a>
            <a href="#reviews" className="hover:text-arena-green">Verdict</a>
          </div>
          <a href="#contact" className="bg-arena-green text-black px-8 py-2.5 rounded-full font-black text-xs tracking-widest">BOOK NOW</a>
        </div>
      </nav>

      {/* HERO SECTION WITH CENTERED LOGO */}
      <section className="pt-64 pb-32 px-6 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0,transparent_70%)] pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          
          {/* THE NEW LOGO POSITION */}
          <motion.img 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            src="/ovalbox-logo.png" 
            alt="Oval Box Arena Logo" 
            className="h-32 w-auto mx-auto mb-10 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)] cursor-pointer"
            onClick={() => setIsLogoOpen(true)}
            onError={(e) => { e.target.src = "/ovalbox-logo.PNG" }}
          />

          <h2 className="text-7xl md:text-[11rem] font-black mb-8 italic tracking-tighter uppercase leading-[0.85]">PLAY <br /> <span className="text-arena-green">WITHOUT</span> <br /> <span className="opacity-10">LIMITS</span></h2>
          
          <motion.div key={displayRating} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center items-center gap-2 mb-8 bg-zinc-900/50 w-fit mx-auto px-5 py-2.5 rounded-full border border-white/10">
            <div className="flex text-arena-green">{[1, 2, 3, 4, 5].map((s) => (<Star key={s} size={14} fill={displayRating >= s ? "#10b981" : "transparent"} />))}</div>
            <span className="text-xs font-black uppercase tracking-widest">{displayRating}/5 Rating</span>
          </motion.div>
          
          <a href="#gallery" className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-arena-green transition-colors uppercase italic tracking-tighter">Explore the Arena <ChevronRight /></a>
        </motion.div>
      </section>

      {/* ... (REMAINING SECTIONS: SPORTS, GALLERY, REVIEWS, CONTACT) ... */}
      {/* Note: Keep the rest of your sections exactly as they were in the previous full code block */}

    </main>
  );
}