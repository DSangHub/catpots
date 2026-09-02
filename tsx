import React, { useState, useEffect } from 'react';
import { MapPin, Globe, AlertTriangle, ShieldCheck, Car, CheckCircle } from 'lucide-react';

// Language Dictionary
const content = {
  en: {
    title: "California: Take Polluters Off The Streets",
    heroHeading: "Driving a POT? Turn Your Problem Vehicle Into Top Cash.",
    heroSub: "Failed Smog Inspection? Check Engine Light On? Expired Registration? CA Auto Dealers are paying Top Dollar under Clean Air initiatives.",
    potDef: "A 'POT' is a Polluter On The Streets. Stop burning money on repairs, gas, and registration penalties.",
    formTitle: "Find Your Nearest Participating Dealer",
    selectIssue: "What's wrong with your vehicle?",
    issue1: "Failed Smog Test",
    issue2: "Check Engine Light On",
    issue3: "Expired Registration / Heavy Fines",
    issue4: "Runs Rough / Poor Gas Mileage",
    foundingTitle: "Founding Dealer Partners",
    ctaBtn: "Get My Dealer Cash Offer",
    langName: "Español",
    locating: "Locating nearest California dealer...",
    locatedAt: "Matching dealers near"
  },
  es: {
    title: "California: Saque los Contaminantes de las Calles",
    heroHeading: "¿Conduce un 'POT'? Convierta su Vehículo Problema en Dinero.",
    heroSub: "¿Reprobó la inspección de Smog? ¿Luz de Check Engine encendida? ¿Registro vencido? Los concesionarios de CA pagan el máximo valor.",
    potDef: "Un 'POT' es un Vehículo Contaminante en las Calles. Deje de gastar dinero en reparaciones, gasolina y multas.",
    formTitle: "Encuentre su Concesionario Participante Más Cercano",
    selectIssue: "¿Cuál es el problema con su vehículo?",
    issue1: "Reprobó la prueba de Smog",
    issue2: "Luz de Check Engine encendida",
    issue3: "Registro Vencido / Multas",
    issue4: "Consumo Excesivo de Gasolina",
    foundingTitle: "SOCIOS FUNDADORES",
    ctaBtn: "Obtener Oferta de Concesionario",
    langName: "English",
    locating: "Buscando concesionario más cercano en CA...",
    locatedAt: "Buscando concesionarios cerca de"
  }
};

// Mock Founding Partners Data
const foundingPartners = [
  {
    name: "Valley Clean Auto Group",
    city: "Fresno, CA",
    url: "https://www.valleycleanauto.com",
    logoText: "VALLEY CLEAN AUTO"
  },
  {
    name: "Bay Area Eco Motors",
    city: "Oakland, CA",
    url: "https://www.bayareaecomotors.com",
    logoText: "BAY ECO MOTORS"
  }
];

export default function CatPotsLanding() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [location, setLocation] = useState<string | null>(null);
  const [loadingGeo, setLoadingGeo] = useState<boolean>(true);
  
  const t = content[lang];

  // Geolocation Setup
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocoding (Example using OpenStreetMap API)
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.county || "California";
            setLocation(`${city}, CA`);
          } catch {
            setLocation("California");
          } finally {
            setLoadingGeo(false);
          }
        },
        () => {
          setLocation("California");
          setLoadingGeo(false);
        }
      );
    } else {
      setLocation("California");
      setLoadingGeo(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar Navigation */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-green-500" />
          <span className="text-xl font-extrabold tracking-tight">CATPOTS<span className="text-green-500">.com</span></span>
        </div>
        
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="flex items-center space-x-1 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-sm font-semibold px-3 py-1.5 rounded-lg transition"
          >
            <Globe className="h-4 w-4 text-green-400" />
            <span>{t.langName}</span>
          </button>
          
          <a href="/dealer-register" className="hidden md:inline-block bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-4 py-2 rounded-lg transition">
            Dealer Portal Signup
          </a>
        </div>
      </nav>

      {/* Main Grid Layout (Content + Founding Partner Column) */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content & Lead Form (3 Columns wide) */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Hero Banner */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>California Clean Air Trade-In Initiative</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              {t.heroHeading}
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.heroSub}
            </p>

            <div className="p-4 bg-slate-50 border-l-4 border-green-500 rounded-r-lg text-sm text-slate-700">
              <strong>{t.potDef}</strong>
            </div>
          </div>

          {/* Lead Generation Form */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
            <div className="flex items-center space-x-2 text-sm text-green-700 font-bold mb-2">
              <MapPin className="h-4 w-4" />
              <span>{loadingGeo ? t.locating : `${t.locatedAt} ${location}`}</span>
            </div>
            
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{t.formTitle}</h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.selectIssue}</label>
                <select className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none">
                  <option>{t.issue1}</option>
                  <option>{t.issue2}</option>
                  <option>{t.issue3}</option>
                  <option>{t.issue4}</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Year / Make / Model (e.g. 2008 Honda Civic)" className="p-3 border border-slate-300 rounded-xl w-full" required />
                <input type="text" placeholder="ZIP Code" className="p-3 border border-slate-300 rounded-xl w-full" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="p-3 border border-slate-300 rounded-xl w-full" required />
                <input type="tel" placeholder="Phone Number" className="p-3 border border-slate-300 rounded-xl w-full" required />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white text-lg font-black py-4 rounded-xl shadow-md transition transform active:scale-95">
                {t.ctaBtn}
              </button>
            </form>
          </div>
        </main>

        {/* Founding Dealer Partner Column (1 Column wide) */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center space-x-2 mb-4 border-b border-slate-800 pb-3">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              <h3 className="font-extrabold text-xs tracking-wider uppercase text-slate-300">{t.foundingTitle}</h3>
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Official California Dealerships authorized to offer maximum trade-in value on non-compliant vehicles.
            </p>

            <div className="space-y-4">
              {foundingPartners.map((partner, idx) => (
                <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-green-500 transition">
                  <div className="text-xs font-bold text-green-400 mb-1">{partner.city}</div>
                  <div className="font-bold text-sm text-white mb-2">{partner.name}</div>
                  <a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-xs font-semibold text-slate-300 hover:text-white underline"
                  >
                    Visit Website &rarr;
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-400 mb-2">Are you a licensed CA Dealer?</p>
              <a href="/dealer-register" className="text-xs font-bold text-green-400 hover:underline">
                Become a Founding Partner ($250 Fee)
              </a>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
