"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, MapPin, Zap, ChevronRight, Activity, Users, 
  Clock, Wifi, Car, Coffee, Shield, Star, HelpCircle, 
  Phone, MessageCircle, Send, CheckCircle, X 
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
            <img src="/ovalbox-logo.png" alt="Oval Box Logo" className="h-10 w-auto group-hover:rotate-6 transition-all" />
            <h1 className="text-xl font-black italic tracking-tighter uppercase">Oval Box Arena</h1>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <a href="#sports" className="hover:text-arena-green">Sports</a>
            <a href="#gallery" className="hover:text-arena-green">Arena</a>
            <a href="#reviews" className="hover:text-arena-green">Verdict</a>
          </div>
          <a href="#contact" className="bg-arena-green text-black px-8 py-2.5 rounded-full font-black text-xs tracking-widest">BOOK NOW</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-64 pb-32 px-6 text-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-7xl md:text-[11rem] font-black mb-8 italic tracking-tighter uppercase leading-[0.85]">PLAY <br /> <span className="text-arena-green">WITHOUT</span> <br /> <span className="opacity-10">LIMITS</span></h2>
          <motion.div key={displayRating} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center items-center gap-2 mb-8 bg-zinc-900/50 w-fit mx-auto px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
            <div className="flex text-arena-green">{[1, 2, 3, 4, 5].map((s) => (<Star key={s} size={14} fill={displayRating >= s ? "#10b981" : "transparent"} />))}</div>
            <span className="text-xs font-black uppercase tracking-widest">{displayRating}/5 Rating</span>
          </motion.div>
          <a href="#gallery" className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-arena-green transition-colors uppercase italic tracking-tighter">Explore the Arena <ChevronRight /></a>
        </motion.div>
      </section>

      {/* SPORTS SECTION */}
      <section id="sports" className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { title: "Pickleball", icon: Activity, desc: "3 Premium outdoor courts with professional surfaces." },
          { title: "Football / Cricket", icon: Trophy, desc: "15,000 SQFT of FIFA Pro certified turf." },
          { title: "3x3 Basketball", icon: Users, desc: "Convertible pro courts for street-style ball." }
        ].map((sport, i) => (
          <div key={i} className="bg-zinc-900/30 p-12 rounded-[50px] border border-white/5">
            <sport.icon className="text-arena-green mb-8" size={56} />
            <h3 className="text-3xl font-black italic mb-4 uppercase leading-none">{sport.title}</h3>
            <p className="text-gray-500 text-lg leading-relaxed font-bold italic tracking-tight">{sport.desc}</p>
          </div>
        ))}
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GalleryCard src="/gallery/cricket-pitch.jpg" title="Floodlight Cricket" sport="CRICKET" />
          <GalleryCard src="/gallery/drone-aerial-oval.jpg" title="15,000 SQFT Arena" sport="AERIAL VIEW" />
          <GalleryCard src="/gallery/blue-futsal-court.jpg" title="Pro Futsal Court" sport="FOOTBALL" />
          <GalleryCard src="/gallery/pickleball-courts-aerial.jpg" title="3 Pro Pickleball Courts" sport="PICKLEBALL" />
          <GalleryCard src="/gallery/drone-side-view.jpg" title="The Oval Box Hub" sport="AERIAL VIEW" />
          <GalleryCard src="/gallery/pickleball-daytime.jpg" title="Daytime Intensity" sport="PICKLEBALL" />
        </div>
      </section>

      {/* VERDICT SECTION */}
      <section id="reviews" className="py-40 px-6 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">The Player <br /><span className="text-arena-green italic underline underline-offset-8 decoration-white/10">Verdict</span></h2>
            <div className="space-y-6">
              {[ { label: "Turf Quality", val: "98%" }, { label: "Lighting", val: "95%" }, { label: "Service", val: "92%" } ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2 font-black uppercase text-xs tracking-widest text-gray-500 italic"><span>{item.label}</span><span className="text-arena-green">{item.val}</span></div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: item.val }} transition={{ duration: 1.5 }} className="h-full bg-arena-green" /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-zinc-900/50 p-12 rounded-[60px] border border-white/10 text-center">
            {hasRated ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}><CheckCircle size={60} className="text-arena-green mx-auto mb-6" /><h3 className="text-3xl font-black italic uppercase mb-2">Verdict Saved</h3></motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-black italic mb-8 uppercase text-arena-green">Rate Performance</h3>
                <div className="flex justify-center gap-3 mb-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setUserRating(star)}>
                      <Star size={48} fill={(hoverRating || userRating) >= star ? "#10b981" : "transparent"} className={(hoverRating || userRating) >= star ? "text-arena-green" : "text-gray-700"} />
                    </button>
                  ))}
                </div>
                <button onClick={submitRating} disabled={userRating === 0} className="bg-arena-green text-black px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Submit Verdict</button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-40 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div>
            <h2 className="text-7xl font-black italic uppercase mb-10 leading-[0.9]">READY TO <br /><span className="text-arena-green italic underline decoration-white/10 underline-offset-8 text-6xl">DOMINATE?</span></h2>
            <div className="space-y-8">
              <a href={`tel:${PHONE_1}`} className="block text-3xl font-black italic tracking-tighter hover:text-arena-green">+91 {PHONE_1}</a>
              <a href={`tel:${PHONE_2}`} className="block text-3xl font-black italic tracking-tighter hover:text-arena-green">+91 {PHONE_2}</a>
            </div>
          </div>
          <div className="bg-zinc-900/40 p-12 rounded-[60px] border border-white/5">
            {status === "SUCCESS" ? ( <div className="text-center py-20"><CheckCircle size={80} className="text-arena-green mx-auto mb-6"/><h3 className="text-3xl font-black italic uppercase">Inquiry Sent!</h3></div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <input required name="name" placeholder="Full Name" className="w-full bg-black/50 border border-white/5 p-5 rounded-2xl focus:border-arena-green outline-none font-bold uppercase tracking-widest text-[10px]" />
                <input required name="phone" placeholder="Mobile Number" className="w-full bg-black/50 border border-white/5 p-5 rounded-2xl focus:border-arena-green outline-none font-bold uppercase tracking-widest text-[10px]" />
                <textarea required name="message" rows={4} placeholder="Requirement..." className="w-full bg-black/50 border border-white/5 p-5 rounded-2xl focus:border-arena-green outline-none font-bold uppercase tracking-widest text-[10px]" />
                <button type="submit" className="w-full bg-arena-green text-black py-6 rounded-2xl font-black uppercase tracking-widest text-xs">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-[10px] font-black tracking-[0.5em] text-gray-800 uppercase italic border-t border-white/5">
        © 2026 OVAL BOX ARENA • BENGALURU
      </footer>

      <AnimatePresence>
        {showWA && (
          <motion.a initial={{ scale: 0 }} animate={{ scale: 1 }} href={`https://wa.me/91${WHATSAPP_NUMBER}`} target="_blank" className="fixed bottom-8 right-8 z-[100] bg-[#25D366] p-5 rounded-full shadow-xl">
            <MessageCircle size={32} fill="white" className="text-white" />
          </motion.a>
        )}
      </AnimatePresence>

    </main>
  );
}