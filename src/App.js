import { useState, useEffect, useMemo, useRef } from "react";

const LOGO = 'data:image/png;base64,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UtHHbdk1PHpt1hYREWwohERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERf/Z';

const SKUS = [
  { id: "SKU-01", name: "Bondkaka" },
  { id: "SKU-02", name: "Hallongrotta" },
  { id: "SKU-03", name: "Kolakaka" },
  { id: "SKU-04", name: "Chokladsnitt" },
  { id: "SKU-05", name: "Amaretti kaka" },
  { id: "SKU-06", name: "Milano Stång" },
  { id: "SKU-07", name: "Cantuccini apelsin & chok." },
];
const CH = {
  dvh: { label: "DVH 150g", g: 150, nsv: 31.9, cogs: 26.5, price: 69 },
  b2b: { label: "B2B 400g", g: 400, nsv: 55, cogs: 45, price: 75 },
};
const STORES = [
  { id: "B01", name: "ICA Maxi Mölndal", fmt: "Maxi", chain: "ICA", prio: 2 },
  { id: "B02", name: "ICA Maxi Högsbo", fmt: "Maxi", chain: "ICA", prio: 1 },
  { id: "B03", name: "ICA Focus", fmt: "Kvantum", chain: "ICA", prio: 1 },
  { id: "B04", name: "ICA Hovås", fmt: "Kvantum", chain: "ICA", prio: 1 },
  { id: "B05", name: "ICA Kvantum Mölndal", fmt: "Kvantum", chain: "ICA", prio: 2 },
  { id: "B06", name: "ICA Åkeredshallen", fmt: "Supermarket", chain: "ICA", prio: 3 },
  { id: "B07", name: "ICA Nära Linné", fmt: "Nära", chain: "ICA", prio: 3 },
  { id: "B08", name: "ICA Hajen Varberg", fmt: "Supermarket", chain: "ICA", prio: 3 },
  { id: "B09", name: "ICA Kvantum Varberg", fmt: "Kvantum", chain: "ICA", prio: 2 },
  { id: "B10", name: "Hemköp Vasagatan", fmt: "Hemköp", chain: "Axfood", prio: 2 },
  { id: "B11", name: "ICA Kvantum Kungsbacka", fmt: "Kvantum", chain: "ICA", prio: 2 },
  { id: "B12", name: "ICA Kungsmässan", fmt: "Kvantum", chain: "ICA", prio: 2 },
  { id: "B13", name: "ICA Lerum Kvantum", fmt: "Kvantum", chain: "ICA", prio: 2 },
];
const B2B_CUST = [
  { id: "C01", name: "Convini" },
  { id: "C02", name: "Fruktbudet" },
  { id: "C03", name: "Mässor & Events" },
  { id: "C04", name: "Övriga B2B" },
];
const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);
const SHELF = 90;
const MIN_SHELF_PCT = 0.7;
const MAX_AGE_DELIVERY = Math.floor(SHELF * (1 - MIN_SHELF_PCT));
const KOLLI = 12;
// Prio 1: ICA Maxi Högsbo, ICA Focus, ICA Hovås — demo var 2:a vecka
// Prio 2: Övriga Kvantum + Hemköp — demo var 3:e vecka  
// Prio 3: Supermarket/Nära — demo var 4-6:e vecka
const DEMO_SCHEDULE = [
  { week:1,  day1:"Torsdag",  store1:"B02", day2:"Fredag",  store2:"B03", day3:"Lördag", store3:"B04" },
  { week:2,  day1:"Torsdag",  store1:"B05", day2:"Fredag",  store2:"B12", day3:"Lördag", store3:"B11" },
  { week:3,  day1:"Torsdag",  store1:"B02", day2:"Fredag",  store2:"B04", day3:"Lördag", store3:"B03" },
  { week:4,  day1:"Torsdag",  store1:"B13", day2:"Fredag",  store2:"B09", day3:"Lördag", store3:"B10" },
  { week:5,  day1:"Torsdag",  store1:"B02", day2:"Fredag",  store2:"B03", day3:"Lördag", store3:"B04" },
  { week:6,  day1:"Torsdag",  store1:"B01", day2:"Fredag",  store2:"B05", day3:"Lördag", store3:"B06" },
  { week:7,  day1:"Torsdag",  store1:"B02", day2:"Fredag",  store2:"B04", day3:"Lördag", store3:"B03" },
  { week:8,  day1:"Torsdag",  store1:"B12", day2:"Fredag",  store2:"B11", day3:"Lördag", store3:"B07" },
  { week:9,  day1:"Torsdag",  store1:"B02", day2:"Fredag",  store2:"B03", day3:"Lördag", store3:"B04" },
  { week:10, day1:"Torsdag",  store1:"B13", day2:"Fredag",  store2:"B09", day3:"Lördag", store3:"B10" },
  { week:11, day1:"Torsdag",  store1:"B02", day2:"Fredag",  store2:"B04", day3:"Lördag", store3:"B05" },
  { week:12, day1:"Torsdag",  store1:"B03", day2:"Fredag",  store2:"B01", day3:"Lördag", store3:"B08" },
];
const DEMO_GROUPS = { A: ["B02","B03","B04"], B: ["B01","B05","B09","B10","B11","B12","B13"], C: ["B06","B07","B08"] };
const DEMO_ROTATION = WEEKS.map(w => ({ week: w }));
const KS = { sales: "tt3-s", tasks: "tt3-t", orders: "tt3-o", fc: "tt3-f", demo: "tt3-d", promo: "tt3-p", bakery: "tt3-b", packaging: "tt3-pk" };

const BAKERY_INFO = { name: "Konditori Katarina", city: "Malmö", contact: "", phone: "", email: "", leadtime: 7, moq: 100 };
const PKG_INFO = { name: "Kartongbolaget", city: "Helsingborg", contact: "", phone: "", email: "", leadtime: 14, moq_150: 500, moq_400: 250 };
const INIT_TASKS = [
  { id:"T01", task:"Avtal legotillverkare (Konditori Katarina)", cat:"Prod", who:"Thea", due:"2026-05-15", p:"A", st:"Pågår" },
  { id:"T02", task:"Förpackningsdesign 7 sorter", cat:"Design", who:"Thea", due:"2026-05-01", p:"A", st:"Pågår" },
  { id:"T03", task:"Beställ förpackningar (150g+400g) — Kartongbolaget", cat:"Förp", who:"Thea", due:"2026-05-20", p:"A", st:"Ej påbörjad" },
  { id:"T04", task:"Boka 13 pilotbutiker", cat:"Sälj", who:"Thea", due:"2026-05-30", p:"A", st:"Pågår" },
  { id:"T05", task:"Avtal Polfärskt (logistik & distribution)", cat:"Logistik", who:"Thea", due:"2026-05-15", p:"A", st:"Ej påbörjad" },
  { id:"T06", task:"Starta demo i butik (tors/fre/lör)", cat:"Sälj", who:"Thea", due:"2026-06-01", p:"A", st:"Ej påbörjad" },
  { id:"T07", task:"Business case presentation ICA/Coop/Axfood", cat:"Sälj", who:"Thea", due:"2026-10-15", p:"A", st:"Ej påbörjad" },
  { id:"T08", task:"Säkra kapital 2027 (1,7-5 Mkr)", cat:"Finans", who:"Thea", due:"2026-10-30", p:"A", st:"Ej påbörjad" },
  { id:"T09", task:"Äkta Vara + Från Sverige certifiering", cat:"Cert", who:"Thea", due:"2026-06-01", p:"B", st:"Pågår" },
  { id:"T10", task:"Demo-material & POS-material", cat:"Marknad", who:"Thea", due:"2026-06-01", p:"B", st:"Ej påbörjad" },
  { id:"T11", task:"Listning ICA centralt", cat:"Sälj", who:"Thea", due:"2026-10-01", p:"B", st:"Ej påbörjad" },
  { id:"T12", task:"Listning Coop centralt", cat:"Sälj", who:"Thea", due:"2026-10-01", p:"B", st:"Ej påbörjad" },
  { id:"T13", task:"Listning Axfood centralt", cat:"Sälj", who:"Thea", due:"2026-10-01", p:"B", st:"Ej påbörjad" },
  { id:"T14", task:"EDI-setup Pagero/Inexchange", cat:"IT", who:"Thea", due:"2027-01-15", p:"C", st:"Ej påbörjad" },
  { id:"T15", task:"GS1 GLN-nummer + EAN/GTIN-koder", cat:"IT", who:"Thea", due:"2027-01-01", p:"C", st:"Ej påbörjad" },
];

function ld(k,f){try{const r=localStorage.getItem(k);return r?JSON.parse(r):f}catch{return f}}
function sv(k,d){try{localStorage.setItem(k,JSON.stringify(d))}catch{}}

// ── Supabase Client ──────────────────────────────────────────
// Byt ut dessa värden mot dina egna från Supabase > Settings > API
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || process.env?.REACT_APP_SUPABASE_URL || "FYLL_I_DIN_SUPABASE_URL";
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env?.REACT_APP_SUPABASE_ANON_KEY || "FYLL_I_DIN_ANON_KEY";

// Minimal Supabase-klient utan extern dependency
const sb = {
  _headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
  _authHeaders(token){ return {...this._headers, "Authorization": `Bearer ${token}`}; },
  async signIn(email, password){
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method:"POST", headers: this._headers,
      body: JSON.stringify({email, password})
    });
    return r.json();
  },
  async signOut(token){
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method:"POST", headers: this._authHeaders(token) });
  },
  async getUser(token){
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: this._authHeaders(token) });
    return r.json();
  },
  async select(table, token, filter=""){
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}&order=created_at.asc`, { headers: this._authHeaders(token) });
    return r.json();
  },
  async upsert(table, token, data){
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method:"POST", headers: {...this._authHeaders(token), "Prefer":"resolution=merge-duplicates"},
      body: JSON.stringify(data)
    });
    return r.status;
  },
  async update(table, token, filter, data){
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
      method:"PATCH", headers: this._authHeaders(token),
      body: JSON.stringify(data)
    });
    return r.status;
  },
  async insert(table, token, data){
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method:"POST", headers: this._authHeaders(token),
      body: JSON.stringify(data)
    });
    return r.json();
  },
  async del(table, token, filter){
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
      method:"DELETE", headers: this._authHeaders(token)
    });
    return r.status;
  }
};
function fmt(n){return Math.round(n).toLocaleString("sv-SE")}
function fk(n){return `${fmt(n)} kr`}
function fp(n){return `${(n*100).toFixed(1)}%`}

// ── UI Atoms ──
const C = {red:"#C41E1E",dark:"#2C2C2C",cream:"#F5F0EB",card:"#EDE8E0",navy:"#1E2761",green:"#2C5F2D",border:"#D0C8BE",muted:"#999"};

function Badge({children,bg=C.red}){return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:3,fontSize:10,fontWeight:700,letterSpacing:"0.04em",textTransform:"uppercase",background:bg,color:"#fff",whiteSpace:"nowrap"}}>{children}</span>}
function KpiCard({label,value,sub,accent=C.red}){return(
  <div style={{flex:"1 1 160px",minWidth:150,background:C.card,borderRadius:6,padding:"16px 18px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:accent}}/>
    <div style={{fontSize:10,letterSpacing:"0.11em",textTransform:"uppercase",color:C.red,marginBottom:4,fontFamily:"system-ui",fontWeight:700}}>{label}</div>
    <div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:C.dark,lineHeight:1.1}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:C.muted,marginTop:2,fontFamily:"system-ui"}}>{sub}</div>}
  </div>
)}
function MiniBar({value,max,color=C.red}){const p=max>0?Math.min(100,value/max*100):0;return<div style={{width:"100%",height:5,background:"#E8E2DA",borderRadius:3}}><div style={{width:`${p}%`,height:"100%",background:color,borderRadius:3,transition:"width 0.3s"}}/></div>}
function Card({children,style:s}){return<div style={{background:C.card,borderRadius:8,padding:20,...s}}>{children}</div>}
function Lbl({children}){return<div style={{fontSize:10,letterSpacing:"0.13em",textTransform:"uppercase",color:C.red,marginBottom:3,fontFamily:"system-ui",fontWeight:700}}>{children}</div>}
function Btn({children,onClick,ghost,style:s}){return<button onClick={onClick} style={{padding:"8px 16px",border:ghost?"1px solid "+C.border:"none",borderRadius:5,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"Georgia,serif",background:ghost?C.card:C.red,color:ghost?"#666":"#fff",transition:"all 0.15s",...s}}>{children}</button>}
function Inp({label,value,onChange,type="text",...r}){return(<div><div style={{fontSize:10,color:C.muted,marginBottom:2,fontFamily:"system-ui",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.04em"}}>{label}</div><input type={type} value={value} onChange={e=>onChange(e.target.value)} {...r} style={{width:"100%",padding:"7px 10px",borderRadius:5,border:"1px solid "+C.border,fontSize:13,fontFamily:"system-ui",boxSizing:"border-box",background:"#fff"}}/></div>)}
function Sel({label,value,onChange,opts}){return(<div><div style={{fontSize:10,color:C.muted,marginBottom:2,fontFamily:"system-ui",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.04em"}}>{label}</div><select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"7px 10px",borderRadius:5,border:"1px solid "+C.border,fontSize:13,fontFamily:"system-ui",background:"#fff"}}>{opts.map(o=>typeof o==="string"?<option key={o}>{o}</option>:<option key={o.v} value={o.v}>{o.l}</option>)}</select></div>)}
function ShelfTag({prodDate}){if(!prodDate)return null;const d=Math.floor((new Date()-new Date(prodDate))/864e5),rem=SHELF-d,pct=rem/SHELF,ok=pct>=MIN_SHELF_PCT;return<span style={{fontSize:10,fontFamily:"system-ui",padding:"2px 6px",borderRadius:3,background:ok?"#D4EDDA":pct>0.3?"#FFF3CD":"#FFE0E0",color:ok?"#155724":pct>0.3?"#856404":"#721C24",fontWeight:600}}>{rem}d ({Math.round(pct*100)}%){!ok&&rem>0?" under 70%":""}{rem<=0?" UTGÅNGEN":""}</span>}
function PageHead({title,sub}){return(<><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}><img src={LOGO} alt="" style={{height:26}}/><Lbl>{sub||title}</Lbl></div>{sub&&<h2 style={{fontSize:24,fontWeight:700,margin:"0 0 18px",color:C.dark}}>{title}</h2>}</>)}

// ═══════════════════════════════════════
// LOGIN — Supabase Auth
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !pass.trim()) { setErr("Fyll i e-post och lösenord."); return; }
    setLoading(true); setErr("");
    try {
      const data = await sb.signIn(email.trim(), pass);
      if (data.access_token) {
        localStorage.setItem("sb_token", data.access_token);
        localStorage.setItem("sb_user_id", data.user?.id||"");
        onLogin(data.access_token, data.user?.id||"");
      } else {
        setErr(data.error_description || data.msg || "Felaktiga uppgifter.");
      }
    } catch(e) { setErr("Anslutningsfel — kontrollera internet."); }
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh",background:"#F5F0EB",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif"}}>
      <div style={{width:"100%",maxWidth:400,background:"#FDFBF8",borderRadius:12,padding:"48px 40px",border:"1px solid #E8E2DA"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <img src={LOGO} alt="Theas Torteria" style={{width:160,display:"block",margin:"0 auto 14px"}}/>
        </div>
        <div style={{borderTop:"1px solid #E8E2DA",marginBottom:28}}/>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <div style={{fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:"#999",fontFamily:"system-ui",fontWeight:700,marginBottom:5}}>E-post</div>
            <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="din@epost.se"
              style={{width:"100%",padding:"11px 14px",borderRadius:6,border:"1.5px solid #D0C8BE",fontSize:14,fontFamily:"system-ui",boxSizing:"border-box",background:"#fff",outline:"none"}} autoFocus/>
          </div>
          <div>
            <div style={{fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:"#999",fontFamily:"system-ui",fontWeight:700,marginBottom:5}}>Lösenord</div>
            <div style={{position:"relative"}}>
              <input type={showPass?"text":"password"} value={pass} onChange={e=>{setPass(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="••••••••••"
                style={{width:"100%",padding:"11px 40px 11px 14px",borderRadius:6,border:"1.5px solid #D0C8BE",fontSize:14,fontFamily:"system-ui",boxSizing:"border-box",background:"#fff",outline:"none"}}/>
              <button onClick={()=>setShowPass(p=>!p)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:11,color:"#aaa",fontFamily:"system-ui"}}>{showPass?"Dölj":"Visa"}</button>
            </div>
          </div>
          {err&&<div style={{background:"#FFE8E8",border:"1px solid #F5C6C6",borderRadius:5,padding:"9px 12px",fontSize:12,color:"#C41E1E",fontFamily:"system-ui"}}>{err}</div>}
          <button onClick={handleLogin} disabled={loading}
            style={{padding:"13px",borderRadius:6,border:"none",cursor:"pointer",background:"#C41E1E",color:"#fff",fontSize:14,fontWeight:700,fontFamily:"Georgia,serif",marginTop:4,opacity:loading?0.7:1}}>
            {loading?"Loggar in...":"Logga in"}
          </button>
        </div>
        <div style={{marginTop:28,textAlign:"center",fontSize:10,color:"#ccc",fontFamily:"system-ui"}}>Theas Torteria · Internt system</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
export default function App(){
  const [token, setToken] = useState(()=>localStorage.getItem("sb_token")||"");
  const [userId, setUserId] = useState(()=>localStorage.getItem("sb_user_id")||"");
  const loggedIn = !!token;

  const handleLogin = (tok, uid) => { setToken(tok); setUserId(uid); };
  const handleLogout = async () => {
    await sb.signOut(token);
    localStorage.removeItem("sb_token"); localStorage.removeItem("sb_user_id");
    setToken(""); setUserId("");
  };

  const [sales,setSales]=useState(()=>ld(KS.sales,{}));
  const [tasks,setTasks]=useState(()=>ld(KS.tasks,INIT_TASKS));
  const [orders,setOrders]=useState(()=>ld(KS.orders,[]));
  const [fc,setFc]=useState(()=>ld(KS.fc,{}));
  const [demoNotes,setDemoNotes]=useState(()=>ld(KS.demo,{}));
  const [promos,setPromos]=useState(()=>ld(KS.promo,[]));
  const [bakeryOrders,setBakeryOrders]=useState(()=>ld(KS.bakery,[]));
  const [pkgOrders,setPkgOrders]=useState(()=>ld(KS.packaging,[]));
  const [bakeryInfo,setBakeryInfo]=useState(()=>ld("tt3-binfo",BAKERY_INFO));
  const [pkgInfo,setPkgInfo]=useState(()=>ld("tt3-pkinfo",PKG_INFO));
  const [cashflows,setCashflows]=useState(()=>ld("tt3-cf",[]));
  const [finSettings,setFinSettings]=useState(()=>ld("tt3-fin",{openingBalance:50000,forecastMonths:12,targetUpw:9,centralLaunchMonth:7}));
  const [ideas,setIdeas]=useState(()=>ld("tt3-ideas",[]));
  const [ideaInput,setIdeaInput]=useState("");
  const [ideaFilter,setIdeaFilter]=useState("Alla");
  const [aiMessages,setAiMessages]=useState([]);
  const [aiInput,setAiInput]=useState("");
  const [aiLoading,setAiLoading]=useState(false);
  const [aiInitDone,setAiInitDone]=useState(false);
  const [anthropicKey,setAnthropicKey]=useState(()=>localStorage.getItem("tt3-anthropic-key")||"");
  const [inventory,setInventory]=useState(()=>ld("tt3-inv",{kakLager:{},forpLager:{}}));
  const chatRef=useRef(null);
  const [tab,setTab]=useState("dashboard");
  const [ch,setCh]=useState("dvh");
  const [wk,setWk]=useState(1);
  const [loc,setLoc]=useState(STORES[0].id);
  const [b2bC,setB2bC]=useState(B2B_CUST[0].id);
  const [showF,setShowF]=useState(false);
  const fileRef=useRef(null);

  useEffect(()=>{sv(KS.sales,sales)},[sales]);
  useEffect(()=>{sv(KS.tasks,tasks)},[tasks]);
  useEffect(()=>{sv(KS.orders,orders)},[orders]);
  useEffect(()=>{sv(KS.fc,fc)},[fc]);
  useEffect(()=>{sv(KS.demo,demoNotes)},[demoNotes]);
  useEffect(()=>{sv(KS.promo,promos)},[promos]);
  useEffect(()=>{sv(KS.bakery,bakeryOrders)},[bakeryOrders]);
  useEffect(()=>{sv(KS.packaging,pkgOrders)},[pkgOrders]);
  useEffect(()=>{sv("tt3-binfo",bakeryInfo)},[bakeryInfo]);
  useEffect(()=>{sv("tt3-pkinfo",pkgInfo)},[pkgInfo]);
  useEffect(()=>{sv("tt3-fin",finSettings)},[finSettings]);
  useEffect(()=>{sv("tt3-ideas",ideas)},[ideas]);
  useEffect(()=>{sv("tt3-inv",inventory)},[inventory]);

  // Auto-sync: beräkna förpackningslager från förpackningsordrar (Kartongbolaget)
  // Summerar alla levererade + bekräftade ordrar per SKU (150g)
  useEffect(()=>{
    const forpFromOrders={};
    pkgOrders.forEach(o=>{
      if(["Levererad","Under transport","Bekräftad"].includes(o.status)){
        (o.items150||[]).forEach(it=>{
          forpFromOrders[`left_${it.skuId}`]=(forpFromOrders[`left_${it.skuId}`]||0)+(+it.qty||0);
        });
      }
    });
    // Merge with manual inventory — orders add to base, manual adjustments override
    setInventory(prev=>({
      ...prev,
      forpLager:{...forpFromOrders,...Object.fromEntries(
        Object.entries(prev.forpLager).filter(([k])=>!k.startsWith("left_")||!(k.replace("left_","") in Object.fromEntries(Object.keys(forpFromOrders).map(k2=>[k2.replace("left_",""),true]))))
      ), ...forpFromOrders}
    }));
  },[pkgOrders]);

  // Auto-sync: beräkna kaklager från bakery-ordrar (Konditori Katarina)
  useEffect(()=>{
    const kakFromOrders={};
    bakeryOrders.forEach(o=>{
      if(["Levererad","Redo för leverans","Bekräftad"].includes(o.status)){
        (o.items||[]).forEach(it=>{
          kakFromOrders[it.skuId]=(kakFromOrders[it.skuId]||0)+(+it.qty||0);
        });
      }
    });
    if(Object.keys(kakFromOrders).length>0){
      setInventory(prev=>({...prev,kakLager:{...prev.kakLager,...kakFromOrders}}));
    }
  },[bakeryOrders]);

  const gk=(c,w,l,s)=>`${c}-${w}-${l}-${s}`;
  const gv=(c,w,l,s)=>sales[gk(c,w,l,s)]||0;
  const sv2=(c,w,l,s,v)=>setSales(p=>({...p,[gk(c,w,l,s)]:parseInt(v)||0}));

  // ── Metrics ──
  const m=useMemo(()=>{
    const r={dvh:{tot:0,sku:{},store:{},wk:{}},b2b:{tot:0,sku:{},cust:{},wk:{}},combo:{}};
    SKUS.forEach(s=>{r.dvh.sku[s.id]=0;r.b2b.sku[s.id]=0;r.combo[s.id]=0});
    STORES.forEach(s=>{r.dvh.store[s.id]=0});
    B2B_CUST.forEach(c=>{r.b2b.cust[c.id]=0});
    WEEKS.forEach(w=>{r.dvh.wk[w]=0;r.b2b.wk[w]=0});
    WEEKS.forEach(w=>{
      STORES.forEach(st=>{SKUS.forEach(sk=>{const v=gv("dvh",w,st.id,sk.id);r.dvh.tot+=v;r.dvh.sku[sk.id]+=v;r.dvh.store[st.id]+=v;r.dvh.wk[w]+=v;r.combo[sk.id]+=v})});
      B2B_CUST.forEach(cu=>{SKUS.forEach(sk=>{const v=gv("b2b",w,cu.id,sk.id);r.b2b.tot+=v;r.b2b.sku[sk.id]+=v;r.b2b.cust[cu.id]+=v;r.b2b.wk[w]+=v;r.combo[sk.id]+=v})});
    });
    const aw=WEEKS.filter(w=>r.dvh.wk[w]>0).length;
    r.dvh.aw=aw;
    r.dvh.upw=aw>0?r.dvh.tot/(aw*STORES.length*SKUS.length):0;
    r.dvh.nsv=r.dvh.tot*CH.dvh.nsv;r.dvh.gross=r.dvh.tot*(CH.dvh.nsv-CH.dvh.cogs);
    r.b2b.nsv=r.b2b.tot*CH.b2b.nsv;r.b2b.gross=r.b2b.tot*(CH.b2b.nsv-CH.b2b.cogs);
    r.totU=r.dvh.tot+r.b2b.tot;r.totNSV=r.dvh.nsv+r.b2b.nsv;r.totG=r.dvh.gross+r.b2b.gross;
    const wg=[];for(let i=1;i<WEEKS.length;i++){const p=r.dvh.wk[WEEKS[i-1]];if(p>0)wg.push((r.dvh.wk[WEEKS[i]]-p)/p)}
    r.dvh.avgGr=wg.length>0?wg.reduce((a,b)=>a+b,0)/wg.length:0;
    r.dvh.mxW=Math.max(...Object.values(r.dvh.wk),1);
    r.dvh.mxSk=Math.max(...Object.values(r.dvh.sku),1);
    r.dvh.mxSt=Math.max(...Object.values(r.dvh.store),1);
    r.fcAvg={};SKUS.forEach(s=>{const l4=WEEKS.slice(-4);r.fcAvg[s.id]=Math.ceil(l4.reduce((sum,w)=>{let t=0;STORES.forEach(st=>{t+=gv("dvh",w,st.id,s.id)});B2B_CUST.forEach(cu=>{t+=gv("b2b",w,cu.id,s.id)});return sum+t},0)/4)});
    return r;
  },[sales]);

  const exportCSV=()=>{const rows=[["Key","Value"]];Object.entries(sales).forEach(([k,v])=>{if(v>0)rows.push([k,v])});const csv=rows.map(r=>r.join(",")).join("\n");const b=new Blob([csv],{type:"text/csv"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=`TT_export_${new Date().toISOString().slice(0,10)}.csv`;a.click();URL.revokeObjectURL(u)};
  const importCSV=(e)=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=(ev)=>{const lines=ev.target.result.split("\n").slice(1);const imp={...sales};lines.forEach(l=>{const[k,v]=l.split(",");if(k&&v)imp[k.trim()]=parseInt(v.trim())||0});setSales(imp)};r.readAsText(f);e.target.value=""};

  const TABS=[
    {id:"dashboard",label:"Dashboard"},
    {id:"tasks",label:"To Do"},
    {id:"input",label:"Rapportera"},
    {id:"demo",label:"Demo-schema"},
    {id:"forecast",label:"Forecast & Lager"},
    {id:"orders",label:"Ordrar"},
    {id:"bakery",label:"Inköp & Produktion"},
    {id:"packaging",label:"Förpackningsorder"},
    {id:"pitch",label:"Kedjepitch"},
    {id:"pilot",label:"Provförsäljning 2026"},
    {id:"promo",label:"Sälj & Promo & Kampanjer"},
    {id:"edi",label:"Kedjordrar (EDI)"},
    {id:"finance",label:"Kapital & Forecast"},
    {id:"ai",label:"AI-analys"},
    {id:"ideas",label:"Idéer"},
  ];

  if (!loggedIn) return <LoginScreen onLogin={handleLogin} />;
  return(
  <div style={{display:"flex",minHeight:"100vh",background:C.cream,fontFamily:"Georgia,serif"}}>
    {/* ── Sidebar ── */}
    <nav style={{width:210,minWidth:210,background:"#FDFBF8",borderRight:"1px solid #E8E2DA",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",overflow:"auto",flexShrink:0}}>
      <div style={{padding:"22px 18px 14px",borderBottom:"1px solid #E8E2DA"}}>
        <img src={LOGO} alt="Theas Torteria" style={{width:"100%",maxWidth:150,display:"block"}}/>
      </div>

      <div style={{flex:1,padding:"10px 8px",display:"flex",flexDirection:"column",gap:1}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setShowF(false)}} style={{
            display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:5,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"Georgia,serif",textAlign:"left",width:"100%",transition:"all 0.15s",
            background:tab===t.id?C.red:"transparent",color:tab===t.id?"#fff":"#777",
          }}>{t.label}</button>
        ))}
      </div>
      <div style={{padding:"10px 12px",borderTop:"1px solid #E8E2DA"}}>
        <button
          onClick={handleLogout}
          style={{width:"100%",padding:"7px",borderRadius:4,border:"1px solid #E8E2DA",background:"transparent",cursor:"pointer",fontSize:11,fontFamily:"system-ui",color:"#aaa",fontWeight:600}}
        >Logga ut</button>
      </div>
    </nav>

    {/* ── Main ── */}
    <main style={{flex:1,padding:"24px 28px",maxWidth:1020,overflow:"auto"}}>

    {/* ═══ DASHBOARD ═══ */}
    {tab==="dashboard"&&(<div>
      <PageHead title="Översikt." sub="Dashboard"/>

      {/* Rad 1 — KPI:er */}
      <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:14}}>
        <KpiCard label="Total försäljning" value={fmt(m.totU)+" st"} sub={`DVH ${fmt(m.dvh.tot)} · B2B ${fmt(m.b2b.tot)}`}/>
        <KpiCard label="Total NSV" value={fk(m.totNSV)} accent="#8B1A1E"/>
        <KpiCard label="Bruttovinst" value={fk(m.totG)} accent={C.green}/>
        <KpiCard label="UPW (DVH)" value={m.dvh.upw.toFixed(1)} sub={m.dvh.upw>=7?"✓ Över mål":"Mål: 7"} accent={m.dvh.upw>=7?C.green:C.red}/>
        <KpiCard label="V/V tillväxt" value={m.dvh.aw>1?fp(m.dvh.avgGr):"—"} accent={m.dvh.avgGr>0?C.green:"#B85042"}/>
        <KpiCard label="Aktiva ordrar" value={orders.filter(o=>o.status!=="Betald"&&o.status!=="Levererad").length+" st"} accent={C.navy}/>
      </div>

      {/* Veckotrend */}
      <Card style={{marginBottom:14}}>
        <Lbl>Veckotrend — DVH försäljning (12 veckor)</Lbl>
        <div style={{display:"flex",alignItems:"flex-end",gap:4,height:80,marginTop:10}}>
          {WEEKS.map(w=>{const v=m.dvh.wk[w]||0;const h=m.dvh.mxW>0?v/m.dvh.mxW*72:0;return(<div key={w} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <div style={{fontSize:7,color:"#aaa",fontFamily:"system-ui"}}>{v>0?v:""}</div>
            <div style={{width:"100%",height:h,minHeight:v>0?2:0,background:C.red,borderRadius:"2px 2px 0 0"}}/>
            <div style={{fontSize:7,color:"#bbb",fontFamily:"system-ui"}}>v{w}</div>
          </div>)})}
        </div>
      </Card>

      {/* Rad 2 — 3 kolumner */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
        {/* Top SKU */}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <Lbl>Top SKU</Lbl>
            <button onClick={()=>setTab("input")} style={{fontSize:9,fontFamily:"system-ui",color:C.red,fontWeight:700,background:"none",border:"none",cursor:"pointer"}}>Rapportera →</button>
          </div>
          {SKUS.slice().sort((a,b)=>(m.combo[b.id]||0)-(m.combo[a.id]||0)).slice(0,5).map(sk=>(<div key={sk.id} style={{marginBottom:5}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontFamily:"system-ui",marginBottom:2}}><span>{sk.name}</span><span style={{fontWeight:700}}>{fmt(m.combo[sk.id])}</span></div>
            <MiniBar value={m.combo[sk.id]} max={Math.max(...Object.values(m.combo),1)}/>
          </div>))}
        </Card>

        {/* Demo-status */}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <Lbl>Demo-status</Lbl>
            <button onClick={()=>setTab("demo")} style={{fontSize:9,fontFamily:"system-ui",color:C.red,fontWeight:700,background:"none",border:"none",cursor:"pointer"}}>Visa →</button>
          </div>
          {(()=>{
            const demoWeeks=WEEKS.filter(w=>demoNotes[`w${w}_store`]);
            const totalSold=WEEKS.reduce((s,w)=>s+parseInt(demoNotes[`w${w}_sold`]||0),0);
            const totalSamples=WEEKS.reduce((s,w)=>s+parseInt(demoNotes[`w${w}_samples`]||0),0);
            const avgConv=totalSamples>0?Math.round(totalSold/totalSamples*100):0;
            const bestWeek=WEEKS.filter(w=>parseInt(demoNotes[`w${w}_samples`]||0)>0).sort((a,b)=>{
              const ca=parseInt(demoNotes[`w${a}_sold`]||0)/Math.max(parseInt(demoNotes[`w${a}_samples`]||1),1);
              const cb=parseInt(demoNotes[`w${b}_sold`]||0)/Math.max(parseInt(demoNotes[`w${b}_samples`]||1),1);
              return cb-ca;
            })[0];
            return(<div style={{display:"flex",flexDirection:"column",gap:6}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:"system-ui"}}><span style={{color:"#888"}}>Demo-veckor</span><b>{demoWeeks.length}/{WEEKS.length}</b></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:"system-ui"}}><span style={{color:"#888"}}>Totalt sålda</span><b>{totalSold} st</b></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:"system-ui"}}><span style={{color:"#888"}}>Smakprov</span><b>{totalSamples} st</b></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:"system-ui"}}><span style={{color:"#888"}}>Snitt konvertering</span><b style={{color:avgConv>=20?C.green:avgConv>=10?"#B85042":C.red}}>{avgConv}%</b></div>
              {bestWeek&&<div style={{fontSize:10,fontFamily:"system-ui",color:"#aaa"}}>Bäst: v{bestWeek} ({demoNotes[`w${bestWeek}_store`]?STORES.find(s=>s.id===demoNotes[`w${bestWeek}_store`])?.name:"?"})</div>}
            </div>);
          })()}
        </Card>

        {/* To Do A-prio */}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <Lbl>To Do — Prio A</Lbl>
            <button onClick={()=>setTab("tasks")} style={{fontSize:9,fontFamily:"system-ui",color:C.red,fontWeight:700,background:"none",border:"none",cursor:"pointer"}}>Visa alla →</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {tasks.filter(t=>t.p==="A"&&t.st!=="Klar").slice(0,5).map(t=>(
              <div key={t.id} style={{display:"flex",alignItems:"flex-start",gap:6,padding:"5px 7px",background:C.cream,borderRadius:4}}>
                <div style={{width:7,height:7,borderRadius:2,marginTop:3,flexShrink:0,background:t.st==="Pågår"?"#FFC107":C.border}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,fontFamily:"system-ui",fontWeight:600,lineHeight:1.3}}>{t.task}</div>
                  <div style={{fontSize:9,color:"#bbb",fontFamily:"system-ui"}}>{t.due||"Inget datum"}</div>
                </div>
              </div>
            ))}
            {tasks.filter(t=>t.p==="A"&&t.st!=="Klar").length===0&&<div style={{fontSize:11,fontFamily:"system-ui",color:"#ccc"}}>Inga A-uppgifter kvar! 🎉</div>}
          </div>
        </Card>
      </div>

      {/* Rad 3 — Lager + Kampanjer + Ordrar */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>

        {/* Lagerstatus snabb */}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <Lbl>Lagerstatus</Lbl>
            <button onClick={()=>setTab("forecast")} style={{fontSize:9,fontFamily:"system-ui",color:C.red,fontWeight:700,background:"none",border:"none",cursor:"pointer"}}>Visa →</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {SKUS.slice(0,5).map(sk=>{
              const kakLager=parseInt(inventory.kakLager?.[sk.id]||0);
              const avg=m.fcAvg[sk.id]||0;
              const wl=avg>0?(kakLager/avg).toFixed(1):"—";
              const low=parseFloat(wl)<2&&wl!=="—";
              return(<div key={sk.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11,fontFamily:"system-ui",padding:"3px 0"}}>
                <span style={{color:low?C.red:"#555"}}>{sk.name}</span>
                <span style={{fontWeight:700,color:low?C.red:"#888"}}>{kakLager>0?`${kakLager} st`:"—"}{low&&" ⚠"}</span>
              </div>);
            })}
          </div>
        </Card>

        {/* Kommande kampanjer */}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <Lbl>Kommande kampanjer</Lbl>
            <button onClick={()=>setTab("promo")} style={{fontSize:9,fontFamily:"system-ui",color:C.red,fontWeight:700,background:"none",border:"none",cursor:"pointer"}}>Visa →</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {promos.filter(p=>p.deadline&&p.status!=="Klar").sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,4).map((p,i)=>{
              const today=new Date().toISOString().slice(0,10);
              const daysLeft=Math.ceil((new Date(p.deadline)-new Date(today))/864e5);
              return(<div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,fontFamily:"system-ui",padding:"3px 0",borderBottom:"1px solid #E8E2DA"}}>
                <span style={{color:daysLeft<=7?C.red:"#555",fontWeight:daysLeft<=7?700:400}}>{p.name||p.id}</span>
                <span style={{color:daysLeft<=7?C.red:"#888",fontWeight:700}}>{daysLeft}d</span>
              </div>);
            })}
            {promos.filter(p=>p.deadline&&p.status!=="Klar").length===0&&<div style={{fontSize:11,fontFamily:"system-ui",color:"#ccc"}}>Inga kampanjer planerade.</div>}
          </div>
        </Card>

        {/* Senaste ordrar */}
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <Lbl>Senaste ordrar</Lbl>
            <button onClick={()=>setTab("orders")} style={{fontSize:9,fontFamily:"system-ui",color:C.red,fontWeight:700,background:"none",border:"none",cursor:"pointer"}}>Visa →</button>
          </div>
          {orders.length===0&&<div style={{fontSize:11,fontFamily:"system-ui",color:"#ccc"}}>Inga ordrar ännu.</div>}
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {orders.slice(0,4).map((o,i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"center",fontSize:11,fontFamily:"system-ui",padding:"3px 0",borderBottom:"1px solid #E8E2DA"}}>
                <span style={{fontWeight:700,color:C.red,minWidth:45,fontSize:10}}>{o.id}</span>
                <span style={{flex:1,fontSize:10}}>{o.customer}</span>
                <span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:o.status==="Levererad"||o.status==="Betald"?"#D4EDDA":"#FFF3CD"}}>{o.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Export */}
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
        <Btn ghost onClick={exportCSV}>Exportera CSV</Btn>
        <Btn ghost onClick={()=>fileRef.current?.click()}>Importera CSV</Btn>
        <input ref={fileRef} type="file" accept=".csv" onChange={importCSV} style={{display:"none"}}/>
      </div>
    </div>)}

    {/* ═══ INPUT ═══ */}
    {tab==="input"&&(<div>
      <PageHead title="Registrera försäljning." sub="Veckorapportering"/>
      <div style={{display:"flex",gap:5,marginBottom:14}}>
        {[{id:"dvh",l:"DVH 150g"},{id:"b2b",l:"B2B 400g"}].map(c=>(<button key={c.id} onClick={()=>setCh(c.id)} style={{padding:"7px 16px",borderRadius:5,border:"1px solid "+C.border,cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"Georgia,serif",background:ch===c.id?C.red:"#fff",color:ch===c.id?"#fff":"#999"}}>{c.l}</button>))}
      </div>
      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
        <Sel label="Vecka" value={wk} onChange={v=>setWk(+v)} opts={WEEKS.map(w=>({v:w,l:`Vecka ${w}`}))}/>
        {ch==="dvh"?<Sel label="Butik" value={loc} onChange={setLoc} opts={STORES.map(s=>({v:s.id,l:s.name}))}/>:<div style={{display:"flex",gap:8,flex:1}}><Sel label="Kund" value={b2bC} onChange={setB2bC} opts={B2B_CUST.map(c=>({v:c.id,l:c.name}))}/>{b2bC==="C04"&&<Inp label="Företagsnamn (Övriga B2B)" value={sales[`b2b_comment_${b2bC}`]||""} onChange={v=>setSales(p=>({...p,[`b2b_comment_${b2bC}`]:v}))}/>}</div>}
      </div>
      <Card style={{marginBottom:12}}>
        <div style={{display:"grid",gap:8}}>
          {SKUS.map(sk=>{const lc=ch==="dvh"?loc:b2bC;const v=gv(ch,wk,lc,sk.id);return(
            <div key={sk.id} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 12px",background:C.cream,borderRadius:5}}>
              <span style={{flex:1,fontSize:13,fontFamily:"system-ui"}}>{sk.name}</span>
              <span style={{fontSize:10,color:"#bbb",fontFamily:"system-ui"}}>{CH[ch].g}g</span>
              <input type="number" min="0" value={v||""} placeholder="0" onChange={e=>sv2(ch,wk,lc,sk.id,e.target.value)} style={{width:70,padding:"6px 8px",borderRadius:5,border:"2px solid "+C.border,fontSize:16,fontWeight:700,fontFamily:"Georgia,serif",textAlign:"center",color:C.red,background:"#fff"}}/>
              <span style={{fontSize:10,color:"#bbb",fontFamily:"system-ui",width:55}}>{Math.ceil((v||0)/KOLLI)} kolli</span>
            </div>
          )})}
        </div>
        <div style={{marginTop:12,padding:"10px 12px",background:C.dark,borderRadius:5,display:"flex",justifyContent:"space-between",color:C.cream,alignItems:"center"}}>
          <span style={{fontSize:11,fontFamily:"system-ui"}}>Denna vecka / {ch==="dvh"?STORES.find(s=>s.id===loc)?.name:B2B_CUST.find(c=>c.id===b2bC)?.name}</span>
          <span style={{fontSize:18,fontWeight:700}}>{SKUS.reduce((s,sk)=>s+gv(ch,wk,ch==="dvh"?loc:b2bC,sk.id),0)} st <span style={{fontSize:11,fontWeight:400,color:"#999"}}>({Math.ceil(SKUS.reduce((s,sk)=>s+gv(ch,wk,ch==="dvh"?loc:b2bC,sk.id),0)/KOLLI)} kolli)</span></span>
        </div>
      </Card>

      {/* Summering — alla veckor */}
      <Card>
        <Lbl>Summering — alla registrerade veckor ({ch==="dvh"?"DVH 150g":"B2B 400g"})</Lbl>
        <div style={{overflowX:"auto",marginTop:8}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"system-ui"}}>
            <thead>
              <tr style={{borderBottom:"2px solid "+C.red}}>
                <th style={{textAlign:"left",padding:"5px 8px",fontSize:9,textTransform:"uppercase",fontWeight:700}}>{ch==="dvh"?"Butik":"Kund"}</th>
                {SKUS.map(sk=><th key={sk.id} style={{textAlign:"center",padding:"5px 6px",fontSize:9,textTransform:"uppercase",fontWeight:700}}>{sk.name.split(" ")[0]}</th>)}
                <th style={{textAlign:"right",padding:"5px 8px",fontSize:9,textTransform:"uppercase",fontWeight:700}}>Totalt</th>
              </tr>
            </thead>
            <tbody>
              {(ch==="dvh"?STORES:B2B_CUST).map(loc2=>{
                const locId=ch==="dvh"?loc2.id:loc2.id;
                const rowTot=SKUS.reduce((s,sk)=>s+WEEKS.reduce((ws,w)=>ws+gv(ch,w,locId,sk.id),0),0);
                if(rowTot===0)return null;
                return(
                  <tr key={locId} style={{borderBottom:"1px solid #E8E2DA"}}>
                    <td style={{padding:"5px 8px",fontWeight:600,fontSize:11}}>{ch==="dvh"?loc2.name:loc2.name}</td>
                    {SKUS.map(sk=>{
                      const tot=WEEKS.reduce((ws,w)=>ws+gv(ch,w,locId,sk.id),0);
                      return<td key={sk.id} style={{padding:"5px 6px",textAlign:"center",color:tot>0?C.dark:"#ddd"}}>{tot>0?tot:"—"}</td>;
                    })}
                    <td style={{padding:"5px 8px",textAlign:"right",fontWeight:700,color:C.red}}>{rowTot}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{borderTop:"2px solid "+C.red,background:C.card}}>
                <td style={{padding:"6px 8px",fontWeight:700,fontSize:11}}>TOTALT</td>
                {SKUS.map(sk=>{
                  const tot=(ch==="dvh"?STORES:B2B_CUST).reduce((s,l2)=>s+WEEKS.reduce((ws,w)=>ws+gv(ch,w,l2.id,sk.id),0),0);
                  return<td key={sk.id} style={{padding:"6px 6px",textAlign:"center",fontWeight:700,color:C.red}}>{tot>0?tot:"—"}</td>;
                })}
                <td style={{padding:"6px 8px",textAlign:"right",fontWeight:700,color:C.red,fontSize:13}}>
                  {(ch==="dvh"?STORES:B2B_CUST).reduce((s,l2)=>s+SKUS.reduce((ss,sk)=>ss+WEEKS.reduce((ws,w)=>ws+gv(ch,w,l2.id,sk.id),0),0),0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>)}

    {/* ═══ DEMO SCHEMA ═══ */}
    {tab==="demo"&&(<div>
      <PageHead title="Demo-schema." sub="Demo"/>
      <p style={{fontFamily:"system-ui",fontSize:12,color:C.muted,margin:"0 0 14px",lineHeight:1.5}}>
        1 butik per vecka · Torsdag, fredag & lördag · Rapportera smakprov & köp för att beräkna konvertering.
      </p>

      {/* Veckoschema med konverteringsrapportering */}
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
        {WEEKS.map(w=>{
          const storeId=demoNotes[`w${w}_store`]||"";
          const store=STORES.find(s=>s.id===storeId);
          const samples=parseInt(demoNotes[`w${w}_samples`]||0);
          const sold=parseInt(demoNotes[`w${w}_sold`]||0);
          const conv=samples>0?Math.round(sold/samples*100):0;
          const prioColor=(p)=>p===1?C.red:p===2?C.navy:"#888";
          return(
            <div key={w} style={{background:C.card,borderRadius:6,padding:"12px 14px",border:"1px solid #E8E2DA"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:C.red,minWidth:32}}>v{w}</div>
                <select value={storeId} onChange={e=>setDemoNotes(p=>({...p,[`w${w}_store`]:e.target.value}))} style={{padding:"5px 8px",borderRadius:4,border:"1px solid #E8E2DA",fontSize:12,fontFamily:"system-ui",background:"#fff",flex:"1 1 180px"}}>
                  <option value="">— Välj butik —</option>
                  {STORES.map(s=><option key={s.id} value={s.id}>{s.name} ({s.fmt})</option>)}
                </select>
                {store&&<span style={{fontSize:10,fontFamily:"system-ui",fontWeight:700,color:prioColor(store.prio),whiteSpace:"nowrap"}}>Prio {store.prio}</span>}

                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                  <div style={{fontSize:10,fontFamily:"system-ui",color:"#888"}}>
                    Smakprov:
                    <input type="number" min="0" value={demoNotes[`w${w}_samples`]||""} placeholder="0" onChange={e=>setDemoNotes(p=>({...p,[`w${w}_samples`]:e.target.value}))} style={{width:55,marginLeft:4,padding:"3px 6px",borderRadius:3,border:"1px solid #E8E2DA",fontSize:11,textAlign:"center"}}/>
                  </div>
                  <div style={{fontSize:10,fontFamily:"system-ui",color:"#888"}}>
                    Sålda förp:
                    <input type="number" min="0" value={demoNotes[`w${w}_sold`]||""} placeholder="0" onChange={e=>setDemoNotes(p=>({...p,[`w${w}_sold`]:e.target.value}))} style={{width:55,marginLeft:4,padding:"3px 6px",borderRadius:3,border:"1px solid #E8E2DA",fontSize:11,textAlign:"center"}}/>
                  </div>
                  {samples>0&&(
                    <div style={{padding:"3px 10px",borderRadius:12,background:conv>=20?"#D4EDDA":conv>=10?"#FFF3CD":"#FFE0E0",fontSize:11,fontFamily:"system-ui",fontWeight:700,color:conv>=20?"#155724":conv>=10?"#856404":"#721C24"}}>
                      {conv}% konv.
                    </div>
                  )}
                </div>
                <input value={demoNotes[`w${w}_note`]||""} onChange={e=>setDemoNotes(p=>({...p,[`w${w}_note`]:e.target.value}))} placeholder="Anteckning..." style={{flex:"1 1 140px",padding:"4px 8px",borderRadius:4,border:"1px solid #E8E2DA",fontSize:11,fontFamily:"system-ui"}}/>
              </div>

              {/* SKU-rapportering per dag */}
              {storeId&&<div style={{marginTop:10,borderTop:"1px solid #E8E2DA",paddingTop:10}}>
                <div style={{fontSize:9,fontFamily:"system-ui",fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Sålda per SKU denna vecka</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {SKUS.map(sk=>{
                    const skuVal=demoNotes[`w${w}_sku_${sk.id}`]||"";
                    return(
                      <div key={sk.id} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 8px",background:"#fff",borderRadius:4,border:"1px solid #E8E2DA"}}>
                        <span style={{fontSize:10,fontFamily:"system-ui"}}>{sk.name}</span>
                        <input type="number" min="0" value={skuVal} placeholder="0" onChange={e=>setDemoNotes(p=>({...p,[`w${w}_sku_${sk.id}`]:e.target.value}))} style={{width:40,border:"1px solid #E8E2DA",borderRadius:3,fontSize:11,padding:"2px 4px",textAlign:"center",fontWeight:700,color:C.red}}/>
                      </div>
                    );
                  })}
                </div>
              </div>}
            </div>
          );
        })}
      </div>

      {/* Konverteringsöversikt */}
      <Card style={{marginBottom:14}}>
        <Lbl>Konverteringsöversikt</Lbl>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:8}}>
          {WEEKS.filter(w=>parseInt(demoNotes[`w${w}_samples`]||0)>0).map(w=>{
            const storeId=demoNotes[`w${w}_store`]||"";
            const store=STORES.find(s=>s.id===storeId);
            const samples=parseInt(demoNotes[`w${w}_samples`]||0);
            const sold=parseInt(demoNotes[`w${w}_sold`]||0);
            const conv=samples>0?Math.round(sold/samples*100):0;
            return(
              <div key={w} style={{background:C.cream,borderRadius:5,padding:"8px 12px",minWidth:120,textAlign:"center"}}>
                <div style={{fontSize:9,fontFamily:"system-ui",color:"#aaa",marginBottom:2}}>v{w} — {store?.name?.split(" ").slice(-1)[0]||"?"}</div>
                <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:conv>=20?C.green:conv>=10?"#B85042":C.red}}>{conv}%</div>
                <div style={{fontSize:9,fontFamily:"system-ui",color:"#bbb"}}>{sold}/{samples} köp/prov</div>
              </div>
            );
          })}
          {WEEKS.filter(w=>parseInt(demoNotes[`w${w}_samples`]||0)>0).length===0&&<div style={{fontSize:11,fontFamily:"system-ui",color:"#ccc"}}>Inga demo-veckor rapporterade ännu.</div>}
        </div>
      </Card>

      {/* Bästa butiker ranking */}
      <Card>
        <Lbl>Butiker — flest sålda förpackningar totalt</Lbl>
        <div style={{display:"flex",flexDirection:"column",gap:4,marginTop:8}}>
          {STORES.map(st=>{
            const total=WEEKS.reduce((sum,w)=>{
              if(demoNotes[`w${w}_store`]===st.id)return sum+parseInt(demoNotes[`w${w}_sold`]||0);
              return sum;
            },0);
            return{store:st,total};
          }).filter(x=>x.total>0).sort((a,b)=>b.total-a.total).map((x,i)=>(
            <div key={x.store.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 10px",background:C.cream,borderRadius:4}}>
              <span style={{fontFamily:"Georgia,serif",fontWeight:700,color:C.red,minWidth:20}}>{i+1}</span>
              <span style={{flex:1,fontSize:12,fontFamily:"system-ui",fontWeight:600}}>{x.store.name}</span>
              <span style={{fontSize:13,fontWeight:700,color:C.dark}}>{x.total} st</span>
            </div>
          ))}
          {STORES.every(st=>WEEKS.every(w=>demoNotes[`w${w}_store`]!==st.id||!demoNotes[`w${w}_sold`]))&&<div style={{fontSize:11,fontFamily:"system-ui",color:"#ccc"}}>Ingen försäljningsdata ännu.</div>}
        </div>
      </Card>

      <Card style={{marginTop:14}}>
        <Lbl>Demo-tips</Lbl>
        <div style={{fontFamily:"system-ui",fontSize:12,color:"#666",lineHeight:1.7,marginTop:6}}>
          <b>Dagar & tider:</b> Torsdag & fredag eftermiddag/kväll, lördag förmiddag. <span style={{color:"#B85042"}}>OBS: dubbelkolla med butikerna.</span><br/>
          <b>Intro-erbjudande:</b> Oklart om detta är rätt strategi — utvärderas under piloten.<br/>
          <b>Placering:</b> Be om gondolände eller kassanära — inte inne i hyllan.<br/>
          <b>Mätning:</b> Räkna smakprov och köp direkt i appen ovan. Konvertering = köp / utdelade prov × 100. Bra nivå: 15-25%.<br/>
          <b>Kostnad:</b> ~3 000-3 500 kr/dag extern demopersonal. Thea själv = gratis + bäst.
        </div>
      </Card>
    </div>)}

    {/* ═══ FORECAST ═══ */}
    {tab==="forecast"&&(<div>
      <PageHead title="Forecast & Lagerstatus." sub="Forecast & Lager"/>

      {/* KPI-rad */}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
        {[
          {l:"Hållbarhet",v:`${SHELF}d`,c:C.red},
          {l:"Min. vid leverans till butik",v:"70% kvar",s:`Max ${MAX_AGE_DELIVERY}d gammal`,c:"#B85042"},
          {l:"Kolli",v:`${KOLLI} förp/kolli`,c:C.navy},
          {l:"Ledtid Konditoriet",v:`${bakeryInfo.leadtime||7}d`,c:C.green},
          {l:"Ledtid Polfärskt",v:"14d",c:"#888"},
        ].map((x,i)=>(
          <div key={i} style={{flex:"1 1 120px",background:C.card,borderRadius:6,padding:"10px 14px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:x.c}}/>
            <div style={{fontSize:8,letterSpacing:"0.1em",textTransform:"uppercase",color:x.c,fontFamily:"system-ui",fontWeight:700,marginBottom:2}}>{x.l}</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,color:C.dark}}>{x.v}</div>
            {x.s&&<div style={{fontSize:9,color:"#999",fontFamily:"system-ui"}}>{x.s}</div>}
          </div>
        ))}
      </div>

      {/* Leveranskedja-kalkylator */}
      <Card style={{marginBottom:14}}>
        <Lbl>Leveranskedja & due dates</Lbl>
        <p style={{fontFamily:"system-ui",fontSize:11,color:"#aaa",margin:"4px 0 10px"}}>Ange produktionsdatum → appen beräknar alla due dates automatiskt.</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end",marginBottom:10}}>
          <Inp label="Produktionsdatum (Konditoriet klart)" type="date" value={fc.shelfDate||""} onChange={v=>setFc(p=>({...p,shelfDate:v}))}/>
          <Inp label="Batch-nr / referens" value={fc.batchNr||""} onChange={v=>setFc(p=>({...p,batchNr:v}))}/>
        </div>
        {fc.shelfDate&&(()=>{
          const prod=new Date(fc.shelfDate);
          const lagKonditori=parseInt(fc.lagKonditori||7);
          const lagPolfarskt=parseInt(fc.lagPolfarskt||14);
          const expiry=new Date(prod.getTime()+SHELF*864e5);
          const latestToLogistik=new Date(prod.getTime()+(SHELF-lagPolfarskt-7)*864e5);
          const latestToButik=new Date(prod.getTime()+MAX_AGE_DELIVERY*864e5);
          const skickFranKonditori=new Date(prod.getTime()+lagKonditori*864e5);
          const fmt=d=>d.toISOString().slice(0,10);
          const today=new Date();
          const daysToExpiry=Math.ceil((expiry-today)/864e5);
          return(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:8,marginBottom:10}}>
                {[
                  {step:"1",label:"Produktionsklar",date:fmt(prod),color:C.navy,desc:"Konditoriet klart"},
                  {step:"2",label:"Skicka från konditoriet",date:fmt(skickFranKonditori),color:C.navy,desc:`+${lagKonditori}d lager hos konditoriet`},
                  {step:"3",label:"Senast till Polfärskt",date:fmt(latestToLogistik),color:"#B85042",desc:`Polfärskt behöver ${lagPolfarskt}d hantering`},
                  {step:"4",label:"Senast i butik",date:fmt(latestToButik),color:C.red,desc:"70% hållbarhet kvar"},
                  {step:"5",label:"Utgångsdatum",date:fmt(expiry),color:"#888",desc:`${daysToExpiry}d kvar idag`},
                ].map(s=>(
                  <div key={s.step} style={{background:C.cream,borderRadius:5,padding:"10px 12px",borderLeft:"3px solid "+s.color}}>
                    <div style={{fontSize:9,fontFamily:"system-ui",fontWeight:700,color:s.color,textTransform:"uppercase",marginBottom:2}}>Steg {s.step}</div>
                    <div style={{fontSize:11,fontFamily:"system-ui",fontWeight:700,marginBottom:2}}>{s.label}</div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:14,fontWeight:700,color:s.color}}>{s.date}</div>
                    <div style={{fontSize:9,color:"#aaa",fontFamily:"system-ui"}}>{s.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <div style={{flex:"1 1 120px"}}>
                  <div style={{fontSize:9,color:"#aaa",fontFamily:"system-ui",fontWeight:700,marginBottom:3}}>Lager hos konditoriet (dagar)</div>
                  <input type="number" value={fc.lagKonditori||7} onChange={e=>setFc(p=>({...p,lagKonditori:e.target.value}))} style={{width:60,padding:"5px 8px",borderRadius:4,border:"1px solid "+C.border,fontSize:12}}/>
                </div>
                <div style={{flex:"1 1 120px"}}>
                  <div style={{fontSize:9,color:"#aaa",fontFamily:"system-ui",fontWeight:700,marginBottom:3}}>Polfärskt hanteringstid (dagar)</div>
                  <input type="number" value={fc.lagPolfarskt||14} onChange={e=>setFc(p=>({...p,lagPolfarskt:e.target.value}))} style={{width:60,padding:"5px 8px",borderRadius:4,border:"1px solid "+C.border,fontSize:12}}/>
                </div>
                <div style={{flex:1,alignSelf:"flex-end"}}>
                  <ShelfTag prodDate={fc.shelfDate}/>
                  {fc.batchNr&&<span style={{marginLeft:8,fontSize:10,fontFamily:"system-ui",color:"#888"}}>Batch: <b>{fc.batchNr}</b></span>}
                </div>
              </div>
            </div>
          );
        })()}
      </Card>

      {/* Lagerstatus */}
      <Card style={{marginBottom:14}}>
        <Lbl>Lagerstatus — automatiskt från ordrar</Lbl>
        <div style={{background:"#EEF2FF",border:"1px solid #c7d2fe",borderRadius:5,padding:"8px 12px",marginBottom:10,fontFamily:"system-ui",fontSize:11,color:"#444"}}>
          <b>Förpackningar (150g)</b> syncar automatiskt från förpackningsordrar med status <i>Bekräftad, Under transport eller Levererad</i>.<br/>
          <b>Kaklager</b> syncar automatiskt från produktionsordrar till Konditori Katarina med status <i>Bekräftad, Redo för leverans eller Levererad</i>.<br/>
          Du kan också justera manuellt nedan om något inte stämmer.
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {SKUS.map(sk=>{
            const forpSent=parseInt(inventory.forpLager?.[`sent_${sk.id}`]||0);
            const forpLeft=parseInt(inventory.forpLager?.[`left_${sk.id}`]||0);
            const kakLager=parseInt(inventory.kakLager?.[sk.id]||0);
            const lowForp=forpLeft<200;
            const lowKak=kakLager<400;
            return(
              <div key={sk.id} style={{flex:"1 1 160px",background:lowForp||lowKak?"#FFF0F0":C.cream,borderRadius:6,padding:"10px 12px",border:"1px solid "+(lowForp||lowKak?C.red:C.border)}}>
                <div style={{fontSize:11,fontFamily:"system-ui",fontWeight:700,marginBottom:6,color:lowForp||lowKak?C.red:C.dark}}>{sk.name}</div>
                <div style={{fontSize:9,color:"#aaa",fontFamily:"system-ui",marginBottom:2}}>Förpackningar kvar (150g)</div>
                <input type="number" min="0" value={forpLeft||""} placeholder="0" onChange={e=>setInventory(p=>({...p,forpLager:{...p.forpLager,[`left_${sk.id}`]:e.target.value}}))} style={{width:"100%",padding:"4px 6px",borderRadius:3,border:"1px solid "+(lowForp?C.red:C.border),fontSize:12,fontWeight:700,textAlign:"center",color:lowForp?C.red:C.dark,marginBottom:4}}/>
                <div style={{fontSize:9,color:"#aaa",fontFamily:"system-ui",marginBottom:2}}>Kakor lager (förp á 150g)</div>
                <input type="number" min="0" value={kakLager||""} placeholder="0" onChange={e=>setInventory(p=>({...p,kakLager:{...p.kakLager,[sk.id]:e.target.value}}))} style={{width:"100%",padding:"4px 6px",borderRadius:3,border:"1px solid "+(lowKak?C.red:C.border),fontSize:12,fontWeight:700,textAlign:"center",color:lowKak?C.red:C.dark}}/>
                {(lowForp||lowKak)&&<div style={{marginTop:4,fontSize:9,color:C.red,fontFamily:"system-ui",fontWeight:700}}>⚠ Lågt lager</div>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Beställningsrekommendation */}
      <Card>
        <Lbl>Beställningsrekommendation — 150g & 400g</Lbl>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"system-ui"}}>
          <thead><tr style={{borderBottom:"2px solid "+C.red}}>
            {["SKU","Snitt/v","Kak-lager","Veckor kvar","Best. 6v (150g)","Best. 6v (400g)","Kolli 150g","Kolli 400g"].map(h=><th key={h} style={{textAlign:"left",padding:"6px 6px",fontWeight:700,fontSize:9,textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>{SKUS.map(sk=>{
            const avg=m.fcAvg[sk.id]||0;
            const kakLager=parseInt(inventory.kakLager?.[sk.id]||0);
            const wl=avg>0?(kakLager/avg).toFixed(1):"—";
            const oq150=Math.max(400,avg*6);
            const oq400=Math.max(100,Math.ceil(avg*0.3*6));
            return(
              <tr key={sk.id} style={{borderBottom:"1px solid #E8E2DA",background:parseFloat(wl)<2&&wl!=="—"?"#FFF0F0":"transparent"}}>
                <td style={{padding:"6px",fontWeight:600}}>{sk.name}</td>
                <td style={{padding:"6px"}}>{avg}</td>
                <td style={{padding:"6px",fontWeight:700,color:parseFloat(wl)<2?C.red:C.dark}}>{kakLager}</td>
                <td style={{padding:"6px",color:parseFloat(wl)<2?C.red:C.dark,fontWeight:parseFloat(wl)<2?700:400}}>{wl}</td>
                <td style={{padding:"6px",fontWeight:700,color:C.red}}>{oq150>0?oq150:"—"}</td>
                <td style={{padding:"6px",fontWeight:700,color:C.navy}}>{oq400>0?oq400:"—"}</td>
                <td style={{padding:"6px",color:"#888"}}>{Math.ceil(oq150/KOLLI)}</td>
                <td style={{padding:"6px",color:"#888"}}>{Math.ceil(oq400/KOLLI)}</td>
              </tr>);
          })}</tbody>
        </table></div>
      </Card>
    </div>)}

    {/* ═══ ORDERS ═══ */}
    {tab==="orders"&&(<div>
      <PageHead title="Orderhantering." sub="Ordrar"/>
      <Btn onClick={()=>setShowF(!showF)} style={{marginBottom:16}}>+ Ny order</Btn>
      {showF&&<Card style={{marginBottom:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,fontFamily:"system-ui",fontSize:12}}>
          <Inp label="Kund" value={showF?.customer||""} onChange={v=>setShowF(p=>({...p,customer:v}))}/>
          <Sel label="Kanal" value={showF?.channel||"dvh"} onChange={v=>setShowF(p=>({...p,channel:v}))} opts={[{v:"dvh",l:"DVH 150g"},{v:"b2b",l:"B2B 400g"}]}/>
          <Sel label="SKU" value={showF?.sku||SKUS[0].name} onChange={v=>setShowF(p=>({...p,sku:v}))} opts={SKUS.map(s=>s.name)}/>
          <Inp label="Antal (st)" type="number" value={showF?.qty||""} onChange={v=>setShowF(p=>({...p,qty:+v}))}/>
          <Inp label="Pris/st (kr)" type="number" value={showF?.price||"31.9"} onChange={v=>setShowF(p=>({...p,price:+v}))}/>
          <Inp label="Due date" type="date" value={showF?.dueDate||""} onChange={v=>setShowF(p=>({...p,dueDate:v}))}/>
          <Inp label="Leveransdag" type="date" value={showF?.deliveryDate||""} onChange={v=>setShowF(p=>({...p,deliveryDate:v}))}/>
          <Inp label="Prod.datum (hållbarhet)" type="date" value={showF?.prodDate||""} onChange={v=>setShowF(p=>({...p,prodDate:v}))}/>
          <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
            <Btn onClick={()=>{if(showF?.customer&&showF?.qty){setOrders(p=>[{...showF,id:`ORD-${String(p.length+1).padStart(3,"0")}`,createdAt:new Date().toISOString().slice(0,10),status:"Ny"},...p]);setShowF(false)}}}>Spara</Btn>
            <Btn ghost onClick={()=>setShowF(false)}>Avbryt</Btn>
          </div>
        </div>
      </Card>}
      {orders.length>0&&<Card style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"system-ui"}}>
        <thead><tr style={{borderBottom:"2px solid "+C.red}}>
          {["ID","Kund","Kanal","SKU","Antal","Kolli","Tot kr","Due","Leverans","Hållb.","Status"].map(h=><th key={h} style={{textAlign:"left",padding:"6px 5px",fontWeight:700,fontSize:9,textTransform:"uppercase"}}>{h}</th>)}
        </tr></thead>
        <tbody>{orders.map((o,i)=>(<tr key={i} style={{borderBottom:"1px solid #E8E2DA"}}>
          <td style={{padding:"6px 5px",fontWeight:600}}>{o.id}</td>
          <td style={{padding:"6px 5px"}}>{o.customer}</td>
          <td style={{padding:"6px 5px"}}><Badge bg={o.channel==="dvh"?C.red:C.navy}>{o.channel==="dvh"?"150g":"400g"}</Badge></td>
          <td style={{padding:"6px 5px"}}>{o.sku}</td>
          <td style={{padding:"6px 5px",fontWeight:700}}>{o.qty}</td>
          <td style={{padding:"6px 5px"}}>{Math.ceil((o.qty||0)/KOLLI)}</td>
          <td style={{padding:"6px 5px",fontWeight:700,color:C.red}}>{fk((o.qty||0)*(o.price||0))}</td>
          <td style={{padding:"6px 5px"}}><input type="date" value={o.dueDate||""} onChange={e=>{const u=[...orders];u[i]={...u[i],dueDate:e.target.value};setOrders(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px"}}/></td>
          <td style={{padding:"6px 5px"}}><input type="date" value={o.deliveryDate||""} onChange={e=>{const u=[...orders];u[i]={...u[i],deliveryDate:e.target.value};setOrders(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px"}}/></td>
          <td style={{padding:"6px 5px"}}>{o.prodDate?<ShelfTag prodDate={o.prodDate}/>:<span style={{color:"#ccc",fontSize:9}}>—</span>}</td>
          <td style={{padding:"6px 5px"}}><select value={o.status} onChange={e=>{const u=[...orders];u[i]={...u[i],status:e.target.value};setOrders(u)}} style={{padding:"2px 5px",borderRadius:3,border:"1px solid "+C.border,fontSize:10,background:o.status==="Levererad"?"#D4EDDA":o.status==="Betald"?"#D4EDDA":o.status==="Fakturerad"?"#FFF3CD":"#fff"}}>{["Ny","Bekräftad","Fakturerad","Levererad","Betald"].map(s=><option key={s}>{s}</option>)}</select></td>
        </tr>))}</tbody>
      </table></Card>}
      {orders.length===0&&!showF&&<Card style={{textAlign:"center",color:"#bbb",fontFamily:"system-ui",padding:36}}>Inga ordrar ännu.</Card>}
    </div>)}

    {/* ═══ SÄLJ & PROMO ═══ */}
    {tab==="promo"&&(<div>
      <PageHead title="Sälj & Promo & Kampanjer." sub="Sälj & Promo & Kampanjer"/>
      <p style={{fontFamily:"system-ui",fontSize:12,color:C.muted,margin:"0 0 14px",lineHeight:1.6}}>
        Planera kampanjer, sätt due dates och följ upp resultat. ICA kräver 12 veckor ledtid. Budget: 10% av NSV.
      </p>

      {/* Kampanjplanering */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <Lbl>Kampanjplanering</Lbl>
        <Btn onClick={()=>setPromos(p=>[...p,{id:`K-${String(p.length+1).padStart(2,"0")}`,name:"",chain:"ICA",type:"Intro",start:"",end:"",deadline:"",budget:"",result:"",hitrate:"",status:"Planerad",notes:""}])}>+ Ny kampanj</Btn>
      </div>

      {promos.length>0&&<Card style={{overflowX:"auto",marginBottom:14}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"system-ui"}}>
          <thead><tr style={{borderBottom:"2px solid "+C.red}}>
            {["ID","Kampanjnamn","Kedja","Typ","Due date →","Start","Slut","Budget (kr)","Utfall (kr)","Hitrate %","Status","Ant.",""].map(h=>(
              <th key={h} style={{textAlign:"left",padding:"6px 5px",fontWeight:700,fontSize:9,textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{promos.map((p,i)=>{
            const today=new Date().toISOString().slice(0,10);
            const isOverdue=p.deadline&&p.deadline<today&&p.status!=="Klar"&&p.status!=="Aktiv";
            return(<tr key={i} style={{borderBottom:"1px solid #E8E2DA",background:isOverdue?"#FFF0F0":"transparent"}}>
              <td style={{padding:"5px",fontWeight:700,color:C.red,fontSize:10}}>{p.id}</td>
              <td style={{padding:"5px",minWidth:120}}><input value={p.name} onChange={e=>{const u=[...promos];u[i]={...u[i],name:e.target.value};setPromos(u)}} style={{border:"none",background:"transparent",fontSize:11,width:"100%",fontWeight:600}} placeholder="Kampanjnamn..."/></td>
              <td style={{padding:"5px"}}><select value={p.chain} onChange={e=>{const u=[...promos];u[i]={...u[i],chain:e.target.value};setPromos(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px"}}>{["ICA","Coop","Axfood","Alla"].map(c=><option key={c}>{c}</option>)}</select></td>
              <td style={{padding:"5px"}}><select value={p.type} onChange={e=>{const u=[...promos];u[i]={...u[i],type:e.target.value};setPromos(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px"}}>{["Intro","TPR","Demo","Gondolände","Annons","Mässor","Övrigt"].map(t=><option key={t}>{t}</option>)}</select></td>
              <td style={{padding:"5px"}}><input type="date" value={p.deadline||""} onChange={e=>{const u=[...promos];u[i]={...u[i],deadline:e.target.value};setPromos(u)}} style={{border:"1px solid "+(isOverdue?C.red:C.border),borderRadius:3,fontSize:10,padding:"2px 4px"}}/></td>
              <td style={{padding:"5px"}}><input type="date" value={p.start||""} onChange={e=>{const u=[...promos];u[i]={...u[i],start:e.target.value};setPromos(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px"}}/></td>
              <td style={{padding:"5px"}}><input type="date" value={p.end||""} onChange={e=>{const u=[...promos];u[i]={...u[i],end:e.target.value};setPromos(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px"}}/></td>
              <td style={{padding:"5px"}}><input type="number" value={p.budget||""} onChange={e=>{const u=[...promos];u[i]={...u[i],budget:e.target.value};setPromos(u)}} placeholder="0" style={{width:65,border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px",textAlign:"right"}}/></td>
              <td style={{padding:"5px"}}><input type="number" value={p.result||""} onChange={e=>{const u=[...promos];u[i]={...u[i],result:e.target.value};setPromos(u)}} placeholder="—" style={{width:65,border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px",textAlign:"right",color:p.result&&+p.result>=(+p.budget||0)?C.green:C.red}}/></td>
              <td style={{padding:"5px"}}>
                <div style={{display:"flex",gap:2,alignItems:"center"}}>
                  <input type="number" value={p.pitched||""} onChange={e=>{const u=[...promos];u[i]={...u[i],pitched:e.target.value};setPromos(u)}} placeholder="Tot" title="Antal pitchade" style={{width:35,border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 3px",textAlign:"center"}}/>
                  <span style={{fontSize:9,color:"#bbb"}}>/</span>
                  <input type="number" value={p.yesses||""} onChange={e=>{const u=[...promos];u[i]={...u[i],yesses:e.target.value};setPromos(u)}} placeholder="Ja" title="Antal ja" style={{width:30,border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 3px",textAlign:"center"}}/>
                  {p.pitched>0&&<span style={{fontSize:10,fontWeight:700,color:Math.round((+p.yesses||0)/(+p.pitched)*100)>=50?C.green:C.red}}>{Math.round((+p.yesses||0)/(+p.pitched)*100)}%</span>}
                </div>
              </td>
              <td style={{padding:"5px"}}><select value={p.status} onChange={e=>{const u=[...promos];u[i]={...u[i],status:e.target.value};setPromos(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px",background:p.status==="Aktiv"?"#D4EDDA":p.status==="Klar"?"#e8f5e9":p.status==="Godkänd"?"#FFF3CD":"#fff"}}>{["Planerad","Ansökt","Godkänd","Aktiv","Klar"].map(s=><option key={s}>{s}</option>)}</select></td>
              <td style={{padding:"5px"}}><input value={p.notes||""} onChange={e=>{const u=[...promos];u[i]={...u[i],notes:e.target.value};setPromos(u)}} style={{border:"none",background:"transparent",fontSize:10,width:70}} placeholder="Ant..."/></td>
              <td style={{padding:"5px"}}><input value={p.eval||""} onChange={e=>{const u=[...promos];u[i]={...u[i],eval:e.target.value};setPromos(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,width:100,padding:"2px 4px"}} placeholder="Vad gick bra/dåligt?"/></td>
              <td style={{padding:"5px"}}><button onClick={()=>setPromos(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#ddd",fontSize:14}}>×</button></td>
            </tr>);
          })}</tbody>
        </table>
      </Card>}

      {/* Hitrate förklaring */}
      <div style={{background:"#EEF2FF",border:"1px solid #c7d2fe",borderRadius:5,padding:"10px 14px",marginBottom:14,fontFamily:"system-ui",fontSize:11,color:"#444"}}>
        <b style={{color:C.navy}}>💡 Hitrate</b> = andel som säger ja när du pitchar. Fyll i <b>Pitchade</b> (hur många du frågat) och <b>Ja</b> (hur många som accepterade) — procenten beräknas automatiskt. Exempel: du pitchar 5 butikschefer om gondolände, 3 säger ja → hitrate 60%.
      </div>
      {/* Kommande due dates */}
      {promos.filter(p=>p.deadline&&p.status!=="Klar").length>0&&<Card style={{marginBottom:14}}>
        <Lbl>Kommande due dates</Lbl>
        <div style={{display:"flex",flexDirection:"column",gap:4,marginTop:8}}>
          {promos.filter(p=>p.deadline&&p.status!=="Klar").sort((a,b)=>a.deadline.localeCompare(b.deadline)).map((p,i)=>{
            const today=new Date().toISOString().slice(0,10);
            const daysLeft=Math.ceil((new Date(p.deadline)-new Date(today))/864e5);
            const urgent=daysLeft<=7;
            return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",background:urgent?"#FFF0F0":C.cream,borderRadius:4,borderLeft:"3px solid "+(urgent?C.red:"#bbb")}}>
                <span style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,color:urgent?C.red:"#888",minWidth:45}}>{daysLeft}d</span>
                <span style={{flex:1,fontSize:12,fontFamily:"system-ui",fontWeight:600}}>{p.name||p.id}</span>
                <Badge bg={p.chain==="ICA"?C.red:p.chain==="Coop"?"#5B4A9E":C.navy}>{p.chain}</Badge>
                <span style={{fontSize:10,fontFamily:"system-ui",color:"#999"}}>{p.deadline}</span>
              </div>
            );
          })}
        </div>
      </Card>}

      <Card>
        <Lbl>Kampanjtyper & ledtider</Lbl>
        <div style={{fontFamily:"system-ui",fontSize:12,color:"#666",lineHeight:1.8,marginTop:8}}>
          <b>ICA ledtid:</b> 12 veckor före kampanjstart — ansök tidigt!<br/>
          <b>Coop/Axfood ledtid:</b> 8-10 veckor.<br/>
          <b>TPR (Temporary Price Reduction):</b> Kedjan sänker hyllpris, du ger kampanjbidrag. Vanligast.<br/>
          <b>Gondolände:</b> ~2-5k/vecka/butik för extra placering.<br/>
          <b>Demo-blitz:</b> Intensiv demo 20-50 butiker under 2 veckor. Budget ~60-100k.<br/>
          <b>Budget-tumregel:</b> 10% av NSV till trade marketing. År 1 central: ~500k.
        </div>
      </Card>
    </div>)}

    {/* ═══ TASKS ═══ */}
    {tab==="tasks"&&(<div>
      <PageHead title="To Do." sub="To Do"/>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <Btn onClick={()=>{const newTask={id:`T${Date.now()}`,task:"Ny uppgift...",cat:"Sälj",who:"Thea",due:"",p:"A",st:"Ej påbörjad"};setTasks(p=>[newTask,...p])}}>+ Uppgift</Btn>
        <div style={{display:"flex",gap:8,fontFamily:"system-ui",fontSize:11,color:"#999"}}>
          <span>A: {tasks.filter(t=>t.p==="A"&&t.st!=="Klar").length} st</span>
          <span>B: {tasks.filter(t=>t.p==="B"&&t.st!=="Klar").length} st</span>
          <span>C: {tasks.filter(t=>t.p==="C"&&t.st!=="Klar").length} st</span>
          <span style={{color:"#aaa"}}>Klara: {tasks.filter(t=>t.st==="Klar").length}</span>
        </div>
      </div>

      {["A","B","C"].map(prio=>{
        const prioCfg={A:{color:C.red,label:"A — Högsta prioritet",desc:"Måste göras nu"},B:{color:"#B85042",label:"B — Viktig",desc:"Gör snart"},C:{color:"#888",label:"C — Lägre prioritet",desc:"När tid finns"}};
        const cfg=prioCfg[prio];
        const prioTasks=tasks.filter(t=>t.p===prio&&t.st!=="Klar");
        const doneTasks=tasks.filter(t=>t.p===prio&&t.st==="Klar");
        return(
          <div key={prio} style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",background:cfg.color,borderRadius:"6px 6px 0 0"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,color:"#fff"}}>{prio}</div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#fff",fontFamily:"system-ui"}}>{cfg.label}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.7)",fontFamily:"system-ui"}}>{cfg.desc}</div>
              </div>
              <div style={{marginLeft:"auto",fontSize:10,fontFamily:"system-ui",color:"rgba(255,255,255,0.8)"}}>{prioTasks.length} aktiva</div>
              <button onClick={()=>{const newTask={id:`T${Date.now()}`,task:"Ny uppgift...",cat:"Sälj",who:"Thea",due:"",p:prio,st:"Ej påbörjad"};setTasks(prev=>[newTask,...prev])}} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:4,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer",padding:"4px 10px"}}>+</button>
            </div>
            <div style={{background:C.card,borderRadius:"0 0 6px 6px",padding:8,display:"flex",flexDirection:"column",gap:4}}>
              {prioTasks.length===0&&<div style={{fontSize:11,fontFamily:"system-ui",color:"#ccc",padding:"8px 6px"}}>Inga uppgifter i prio {prio}.</div>}
              {prioTasks.map((t)=>(
                <div key={t.id} style={{background:"#fff",borderRadius:4,padding:"8px 10px",display:"flex",alignItems:"center",gap:8,border:"1px solid #E8E2DA"}}>
                  <button onClick={()=>{const idx=tasks.findIndex(x=>x.id===t.id);const u=[...tasks];const nx=t.st==="Ej påbörjad"?"Pågår":t.st==="Pågår"?"Klar":"Ej påbörjad";u[idx]={...t,st:nx};setTasks(u)}} style={{
                    width:20,height:20,borderRadius:3,border:"2px solid "+(t.st==="Klar"?C.green:cfg.color),cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,
                    background:t.st==="Klar"?C.green:t.st==="Pågår"?"#FFF3CD":"#fff",color:t.st==="Klar"?"#fff":cfg.color,
                  }}>{t.st==="Klar"?"✓":t.st==="Pågår"?"~":""}</button>
                  <input value={t.task} onChange={e=>{const idx=tasks.findIndex(x=>x.id===t.id);const u=[...tasks];u[idx]={...t,task:e.target.value};setTasks(u)}} style={{flex:1,border:"none",fontSize:12,fontFamily:"system-ui",fontWeight:600,outline:"none",background:"transparent"}}/>
                  <select value={t.cat} onChange={e=>{const idx=tasks.findIndex(x=>x.id===t.id);const u=[...tasks];u[idx]={...t,cat:e.target.value};setTasks(u)}} style={{fontSize:10,border:"1px solid #E8E2DA",borderRadius:3,padding:"2px 4px",fontFamily:"system-ui"}}>
                    {["Sälj","Prod","Marknad","Design","Cert","Finans","Logistik","IT","Övrigt"].map(c=><option key={c}>{c}</option>)}
                  </select>
                  <input type="date" value={t.due||""} onChange={e=>{const idx=tasks.findIndex(x=>x.id===t.id);const u=[...tasks];u[idx]={...t,due:e.target.value};setTasks(u)}} style={{fontSize:10,border:"1px solid #E8E2DA",borderRadius:3,padding:"2px 4px"}}/>
                  <button onClick={()=>setTasks(p=>p.filter(x=>x.id!==t.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#ddd",fontSize:14,padding:"0 2px"}}>×</button>
                </div>
              ))}
              {doneTasks.length>0&&<div style={{marginTop:4,paddingTop:4,borderTop:"1px dashed #E8E2DA"}}>
                <div style={{fontSize:9,fontFamily:"system-ui",color:"#bbb",marginBottom:3}}>KLARA ({doneTasks.length})</div>
                {doneTasks.map(t=>(
                  <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 6px",opacity:0.45}}>
                    <button onClick={()=>{const idx=tasks.findIndex(x=>x.id===t.id);const u=[...tasks];u[idx]={...t,st:"Ej påbörjad"};setTasks(u)}} style={{width:18,height:18,borderRadius:3,border:"2px solid "+C.green,cursor:"pointer",background:C.green,color:"#fff",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>✓</button>
                    <span style={{fontSize:11,fontFamily:"system-ui",textDecoration:"line-through",color:"#aaa"}}>{t.task}</span>
                    <button onClick={()=>setTasks(p=>p.filter(x=>x.id!==t.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#ddd",fontSize:12,marginLeft:"auto"}}>×</button>
                  </div>
                ))}
              </div>}
            </div>
          </div>
        );
      })}
    </div>)}

    {/* ═══ EDI GUIDE ═══ */}
    {tab==="edi"&&(<div>
      <PageHead title="Kedjordrar (EDI)." sub="Ordrar från ICA · Coop · Axfood"/>
      <Card style={{marginBottom:16}}>
        <Lbl>Vad är EDI?</Lbl>
        <div style={{fontFamily:"system-ui",fontSize:12,color:"#555",lineHeight:1.8,marginTop:6}}>
          EDI (Electronic Data Interchange) är standarden för att ta emot ordrar och skicka fakturor elektroniskt till ICA, Coop och Axfood. <b>Obligatoriskt vid central listning.</b> Kedjorna skickar beställningar automatiskt — du behöver inte ringa eller maila.
        </div>
      </Card>
      <Card style={{marginBottom:16}}>
        <Lbl>Flödet</Lbl>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:10}}>
          {[
            {step:"1",title:"ORDERS",desc:"Kedjan skickar beställning",dir:"Kedja → Dig"},
            {step:"2",title:"ORDRSP",desc:"Du bekräftar ordern",dir:"Dig → Kedja"},
            {step:"3",title:"DESADV",desc:"Du skickar leveransavisering",dir:"Dig → Kedja"},
            {step:"4",title:"INVOIC",desc:"Du skickar faktura",dir:"Dig → Kedja"},
          ].map(s=>(
            <div key={s.step} style={{background:C.cream,borderRadius:6,padding:14,textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:700,color:C.red,fontFamily:"Georgia,serif"}}>{s.step}</div>
              <div style={{fontSize:12,fontWeight:700,marginTop:4}}>{s.title}</div>
              <div style={{fontSize:10,color:"#888",marginTop:2}}>{s.desc}</div>
              <div style={{fontSize:9,color:C.red,marginTop:4,fontWeight:600}}>{s.dir}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{marginBottom:16}}>
        <Lbl>Rekommenderade EDI-leverantörer</Lbl>
        <div style={{overflowX:"auto",marginTop:8}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:"system-ui"}}>
            <thead><tr style={{borderBottom:"2px solid "+C.red}}>
              {["Leverantör","Kostnad/mån","Kedjor","Integration","Kommentar"].map(h=><th key={h} style={{textAlign:"left",padding:"6px 8px",fontWeight:700,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[
                ["Pagero","500-1500 kr","Alla","API (JSON/XML)","Vanligast i Sverige. Bra API-docs."],
                ["Inexchange","800-2000 kr","Alla","API + portal","Stark på Axfood."],
                ["Crediflow","600-1200 kr","Alla","API","Budget-alternativ."],
                ["Fortnox EDI","Inkl. i Fortnox+","Alla","Fortnox-native","Enklast om ni redan kör Fortnox."],
              ].map((r,i)=>(<tr key={i} style={{borderBottom:"1px solid #E8E2DA"}}>
                {r.map((c,j)=><td key={j} style={{padding:"8px 8px",fontWeight:j===0?600:400}}>{c}</td>)}
              </tr>))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{marginBottom:16}}>
        <Lbl>Koppling till denna plattform</Lbl>
        <div style={{fontFamily:"system-ui",fontSize:12,color:"#555",lineHeight:1.8,marginTop:6}}>
          <b>Fas 1 (nu):</b> Standalone app med manuell orderregistrering. Ordrar har samma fält som EDI (kund, SKU, antal, kolli, due date, leveransdag).<br/><br/>
          <b>Fas 2 (vid listning, Q1 2027):</b> Koppla en EDI-provider (Pagero/Fortnox) via API. Flödet:<br/>
          1. Kedjans order (EDIFACT) → Pagero → JSON webhook → vår app skapar order automatiskt<br/>
          2. Du bekräftar i appen → appen skickar ORDRSP via Pagero<br/>
          3. Vid leverans: appen genererar DESADV + INVOIC automatiskt<br/><br/>
          <b>Tekniskt:</b> Supabase edge function tar emot webhook, skapar order i databasen. React-appen visar den i realtid. Utvecklingstid: ~2-3 veckor.<br/><br/>
          <b>Kostnad:</b> EDI-provider ~1000 kr/mån + Supabase ~free tier. Eventuellt Fortnox-integration för fakturering (~500 kr/mån).
        </div>
      </Card>
      <Card>
        <Lbl>Checklista EDI-setup</Lbl>
        <div style={{display:"grid",gap:6,marginTop:8}}>
          {[
            "GLN-nummer (Global Location Number) — ansök via GS1 Sweden (~2000 kr/år)",
            "EAN/GTIN-koder för alla 7 SKU:er (150g + 400g = 14 koder) — via GS1",
            "Välj EDI-provider (Pagero rekommenderas)",
            "Testa EDI-flöde med kedjorna (ICA kräver test innan go-live)",
            "Koppla till Fortnox/affärssystem för fakturering",
            "Koppla till denna plattform via webhook/API",
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"6px 10px",background:C.cream,borderRadius:4,fontSize:12,fontFamily:"system-ui"}}>
              <span style={{color:C.red,fontWeight:700,fontSize:14,marginTop:-1}}>{ i+1 }.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>)}

    {/* ═══ PITCH ═══ */}
    {tab==="pitch"&&(<div>
      <PageHead title="Business case ICA · Coop · Axfood." sub="Kedjepresentation"/>
      <p style={{fontFamily:"system-ui",fontSize:12,color:C.muted,margin:"0 0 18px",lineHeight:1.5}}>Auto-genererade metrics från din data. Presentationsklart för listningsförhandling oktober 2026.</p>
      
      <Card style={{marginBottom:14}}>
        <Lbl>1. Sell-through & velocity</Lbl>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10,marginTop:10}}>
          {[
            {l:"UPW",v:m.dvh.upw.toFixed(1),s:"Mål ≥7",ok:m.dvh.upw>=7},
            {l:"Total DVH units",v:fmt(m.dvh.tot),s:"12 veckor pilot"},
            {l:"Total B2B units",v:fmt(m.b2b.tot),s:"Convini, Fruktbudet m.fl."},
            {l:"V/V tillväxt",v:m.dvh.aw>1?fp(m.dvh.avgGr):"—",s:"Positiv = starkt",ok:m.dvh.avgGr>0},
          ].map((x,i)=>(<div key={i} style={{background:C.cream,borderRadius:5,padding:"12px 14px"}}>
            <div style={{fontSize:10,fontFamily:"system-ui",color:"#aaa",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:3}}>{x.l}</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:700,color:x.ok===true?C.green:x.ok===false?C.red:C.dark}}>{x.v}</div>
            {x.s&&<div style={{fontSize:10,fontFamily:"system-ui",color:"#bbb",marginTop:1}}>{x.s}</div>}
          </div>))}
        </div>
      </Card>
      <Card style={{marginBottom:14}}>
        <Lbl>2. Ekonomi</Lbl>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10,marginTop:10}}>
          {[
            {l:"Konsumentpris",v:"69 kr",s:"150g premium"},
            {l:"DVH-marginal",v:"30%",s:"Standard"},
            {l:"NSV/enhet",v:"31,90 kr",s:"Efter kedja + logistik"},
            {l:"Proj. nationell årsvolym",v:m.dvh.upw>0?fmt(Math.round(m.dvh.upw*500*5*52)):"—",s:"500 butiker × 5 SKU × UPW × 52v"},
          ].map((x,i)=>(<div key={i} style={{background:C.cream,borderRadius:5,padding:"12px 14px"}}>
            <div style={{fontSize:10,fontFamily:"system-ui",color:"#aaa",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:3}}>{x.l}</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:700,color:C.dark}}>{x.v}</div>
            {x.s&&<div style={{fontSize:10,fontFamily:"system-ui",color:"#bbb",marginTop:1}}>{x.s}</div>}
          </div>))}
        </div>
      </Card>
      <Card style={{marginBottom:14}}>
        <Lbl>3. Kategoriargument</Lbl>
        <div style={{display:"grid",gap:6,marginTop:8,fontFamily:"system-ui",fontSize:12}}>
          {[
            ["Kategorins storlek","1,5-2,5 mdr kr","Nielsen"],
            ["Producerat i Sverige","Svensk hantverkstradition & lokala råvaror","Ursprung & autenticitet"],
            ["Clean label: 6 ingredienser","vs 15-24 hos konkurrenter","Konsumenttrend"],
            ["Äkta Vara + Från Sverige","Certifiering pågår","Trovärdighet"],
            ["Hållbarhet 90d, ingen kylkedja","Låg logistikkostnad","Operativt"],
            ["460 kr/kg premium-segment","Hög NSV per hyllmeter","Lönsamhet"],
          ].map(([a,v,s],i)=>(
            <div key={i} style={{display:"flex",padding:"8px 12px",background:C.cream,borderRadius:5,gap:12,alignItems:"center"}}>
              <div style={{flex:1,fontWeight:600}}>{a}</div>
              <div style={{flex:1,color:C.red,fontWeight:700}}>{v}</div>
              <div style={{flex:0.4,color:"#bbb",fontSize:10}}>{s}</div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{background:C.dark,borderRadius:8,padding:22,color:C.cream}}>
        <div style={{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:C.red,fontFamily:"system-ui",fontWeight:700,marginBottom:4}}>4. Skalbarhet</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:700,marginBottom:16}}>Från 10 butiker till 1 125.</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:"system-ui"}}>
          <thead><tr style={{borderBottom:"2px solid "+C.red}}>
            {["År","Fas","Butiker","SKU","Volym","NSV"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 10px",color:C.red,fontSize:10,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              ["2026","Pilot","10","7",`${fmt(m.totU)} (nu)`,fk(m.totNSV)],
              ["2027","Central","500","3","156 000","5 Mkr"],
              ["2028","Nationellt","850","5-7","530 000","17 Mkr"],
              ["2029","Full dist.","1 125","7","1 228 500","45 Mkr"],
            ].map((r,i)=>(<tr key={i} style={{borderBottom:"1px solid #444"}}>
              {r.map((c,j)=><td key={j} style={{padding:"10px 10px",fontWeight:j===0?700:400,color:j===0?C.red:"#ddd",fontSize:j===0?15:12}}>{c}</td>)}
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>)}

    {/* ═══ PROVFÖRSÄLJNING 2026 ═══ */}
    {tab==="pilot"&&(<div>
      <PageHead title="Provförsäljning 2026." sub="Pilot — 12 veckor"/>

      {/* KPI-kort */}
      <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:14}}>
        {[
          {l:"Period",v:"12 veckor",s:"Göteborg"},
          {l:"Butiker",v:"13 st",s:"ICA + Axfood"},
          {l:"SKU:er",v:"7 sorter",s:"150g · DVH"},
          {l:"Mål presentation",v:"Okt 2026",s:"ICA · Coop · Axfood"},
          {l:"Aktuell UPW",v:m.dvh.upw.toFixed(1),s:m.dvh.upw>=7?"✓ Över mål":"Mål: 7",accent:m.dvh.upw>=7?C.green:C.red},
          {l:"Total pilot-försäljning",v:fmt(m.dvh.tot)+" st",s:fk(m.dvh.nsv)},
        ].map((x,i)=><KpiCard key={i} label={x.l} value={x.v} sub={x.s} accent={x.accent||C.red}/>)}
      </div>

      {/* Löpande SKU-data */}
      <Card style={{marginBottom:14}}>
        <Lbl>Löpande SKU-prestanda — pilot</Lbl>
        <div style={{overflowX:"auto",marginTop:8}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"system-ui"}}>
            <thead><tr style={{borderBottom:"2px solid "+C.red}}>
              {["SKU","Tot. DVH","Tot. B2B","Totalt","Andel %","UPW (dvh)","Status"].map(h=>(
                <th key={h} style={{textAlign:"left",padding:"6px 8px",fontWeight:700,fontSize:9,textTransform:"uppercase"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {SKUS.slice().sort((a,b)=>(m.combo[b.id]||0)-(m.combo[a.id]||0)).map(sk=>{
                const dvh=m.dvh.sku[sk.id]||0;
                const b2b=m.b2b.sku[sk.id]||0;
                const tot=m.combo[sk.id]||0;
                const share=m.totU>0?Math.round(tot/m.totU*100):0;
                const upw=m.dvh.aw>0&&STORES.length>0?(dvh/(m.dvh.aw*STORES.length)).toFixed(1):0;
                const strong=parseFloat(upw)>=7;
                return(
                  <tr key={sk.id} style={{borderBottom:"1px solid #E8E2DA"}}>
                    <td style={{padding:"7px 8px",fontWeight:600}}>{sk.name}</td>
                    <td style={{padding:"7px 8px"}}>{fmt(dvh)}</td>
                    <td style={{padding:"7px 8px",color:C.navy}}>{fmt(b2b)}</td>
                    <td style={{padding:"7px 8px",fontWeight:700}}>{fmt(tot)}</td>
                    <td style={{padding:"7px 8px"}}>{share}%</td>
                    <td style={{padding:"7px 8px",fontWeight:700,color:strong?C.green:C.red}}>{upw}</td>
                    <td style={{padding:"7px 8px"}}>
                      <span style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:strong?"#D4EDDA":parseFloat(upw)>=4?"#FFF3CD":"#FFE0E0",fontWeight:600,color:strong?"#155724":parseFloat(upw)>=4?"#856404":"#721C24"}}>
                        {strong?"Stark":parseFloat(upw)>=4?"OK":"Svag"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:10,padding:"8px 12px",background:C.cream,borderRadius:5,fontSize:11,fontFamily:"system-ui",color:"#666"}}>
          <b>UPW-mål för kedjepresentation: 7+</b> — SKU:er under 4 bör utvärderas innan central listning.
        </div>
      </Card>

      {/* Butiker */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        <Card>
          <Lbl>13 butiker i piloten</Lbl>
          <div style={{display:"grid",gap:4,marginTop:8}}>
            {STORES.map(s=>{
              const total=m.dvh.store[s.id]||0;
              const prioColor=s.prio===1?C.red:s.prio===2?C.navy:"#888";
              return(<div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",background:C.cream,borderRadius:4}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:prioColor,flexShrink:0}}/>
                <span style={{flex:1,fontSize:11,fontFamily:"system-ui"}}>{s.name}</span>
                <span style={{fontSize:10,color:"#bbb"}}>{s.fmt}</span>
                {total>0&&<span style={{fontWeight:700,color:C.red,fontSize:11}}>{fmt(total)}</span>}
              </div>);
            })}
          </div>
        </Card>
        <Card>
          <Lbl>7 SKU:er</Lbl>
          <div style={{display:"grid",gap:4,marginTop:8}}>
            {SKUS.map((s,i)=>{
              const tot=m.combo[s.id]||0;
              return(<div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 10px",background:C.cream,borderRadius:4}}>
                <span style={{color:C.red,fontWeight:700,fontSize:13,fontFamily:"Georgia,serif",minWidth:18}}>{i+1}</span>
                <span style={{flex:1,fontSize:11,fontFamily:"system-ui",fontWeight:600}}>{s.name}</span>
                <span style={{fontSize:10,color:"#bbb"}}>150g · 69 kr</span>
                {tot>0&&<span style={{fontWeight:700,color:C.navy,fontSize:11}}>{fmt(tot)} st</span>}
              </div>);
            })}
          </div>
        </Card>
      </div>

      {/* Mål för kedjepresentation */}
      <Card>
        <Lbl>Vad behöver vi visa i oktober?</Lbl>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8,fontFamily:"system-ui",fontSize:12}}>
          {[
            {label:"UPW ≥ 7",done:m.dvh.upw>=7,current:`${m.dvh.upw.toFixed(1)} nu`},
            {label:"Positiv V/V-tillväxt",done:m.dvh.avgGr>0,current:m.dvh.aw>1?fp(m.dvh.avgGr):"Ej nog data"},
            {label:"Minst 3 starka SKU:er (UPW≥7)",done:SKUS.filter(sk=>{const upw=m.dvh.aw>0?((m.dvh.sku[sk.id]||0)/(m.dvh.aw*STORES.length)):0;return upw>=7;}).length>=3,current:`${SKUS.filter(sk=>{const upw=m.dvh.aw>0?((m.dvh.sku[sk.id]||0)/(m.dvh.aw*STORES.length)):0;return upw>=7;}).length} st nu`},
            {label:"Positiv bruttomarginal",done:m.totG>0,current:fk(m.totG)},
          ].map((x,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:x.done?"#D4EDDA":"#FFF0F0",borderRadius:5}}>
              <span style={{fontSize:16}}>{x.done?"✓":"○"}</span>
              <div>
                <div style={{fontWeight:600,color:x.done?C.green:C.red}}>{x.label}</div>
                <div style={{fontSize:10,color:"#888"}}>{x.current}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>)}


    {/* ═══ KONDITORI KATARINA ═══ */}
    {tab==="bakery"&&(<div>
      <PageHead title="Inköp & Produktion." sub="Konditori Katarina, Malmö"/>

      {/* Leverantörskort */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        <Card>
          <Lbl>Leverantörsinformation</Lbl>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
            <Inp label="Kontaktperson" value={bakeryInfo.contact} onChange={v=>setBakeryInfo(p=>({...p,contact:v}))}/>
            <Inp label="Telefon" value={bakeryInfo.phone} onChange={v=>setBakeryInfo(p=>({...p,phone:v}))}/>
            <Inp label="E-post" value={bakeryInfo.email} onChange={v=>setBakeryInfo(p=>({...p,email:v}))}/>
            <Inp label="Ledtid (dagar)" type="number" value={bakeryInfo.leadtime} onChange={v=>setBakeryInfo(p=>({...p,leadtime:+v}))}/>
            <Inp label="MOQ per sort (st)" type="number" value={bakeryInfo.moq} onChange={v=>setBakeryInfo(p=>({...p,moq:+v}))}/>
          </div>
        </Card>
        <Card>
          <Lbl>Forecast — rekommenderad produktionsorder</Lbl>
          <p style={{fontFamily:"system-ui",fontSize:11,color:"#888",margin:"4px 0 10px",lineHeight:1.5}}>Baserat på snitt senaste 4 veckorna. Täcker {bakeryInfo.leadtime||7} dagars ledtid + 3 veckors buffert.</p>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {SKUS.map(sk=>{
              const avg=m.fcAvg[sk.id]||0;
              const weeks=Math.ceil(bakeryInfo.leadtime/7)+3;
              const qty=Math.max(bakeryInfo.moq||100, Math.ceil(avg*weeks));
              const kg150=(qty*0.15).toFixed(1);
              const kolli150=Math.ceil(qty/KOLLI);
              return(
                <div key={sk.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",background:C.cream,borderRadius:5}}>
                  <span style={{flex:1,fontSize:12,fontFamily:"system-ui",fontWeight:600}}>{sk.name}</span>
                  <span style={{fontSize:10,color:"#888",fontFamily:"system-ui"}}>{avg} st/v snitt</span>
                  <span style={{fontWeight:700,color:C.red,fontSize:13,minWidth:60,textAlign:"right"}}>{qty} st</span>
                  <span style={{fontSize:10,color:"#bbb",fontFamily:"system-ui",minWidth:50}}>{kg150} kg</span>
                  <span style={{fontSize:10,color:"#bbb",fontFamily:"system-ui",minWidth:50}}>{kolli150} kolli</span>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:10,padding:"8px 12px",background:C.dark,borderRadius:5,display:"flex",justifyContent:"space-between",color:C.cream,fontSize:11,fontFamily:"system-ui"}}>
            <span>Total kg råvara (est.)</span>
            <span style={{fontWeight:700}}>{(SKUS.reduce((s,sk)=>s+Math.max(bakeryInfo.moq||100,Math.ceil((m.fcAvg[sk.id]||0)*(Math.ceil((bakeryInfo.leadtime||7)/7)+3))),0)*0.15).toFixed(1)} kg</span>
          </div>
        </Card>
      </div>

      {/* Orderlogg */}
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <Lbl>Produktionsordrar till Konditori Katarina</Lbl>
          <Btn ghost onClick={()=>{
            const mailText=`Till: ${bakeryInfo.email||"[epost konditoriet]"}\nÄmne: Produktionsorder Theas Torteria\n\nHej ${bakeryInfo.contact||""}!\n\nVi önskar beställa följande för nästa produktion:\n\n${SKUS.map(sk=>{const avg=m.fcAvg[sk.id]||0;const qty=Math.max(bakeryInfo.moq||100,Math.ceil(avg*(Math.ceil((bakeryInfo.leadtime||7)/7)+3)));return `${sk.name}: ${qty} st (${(qty*0.15).toFixed(1)} kg)`;}).join("\n")}\n\nTotal ca: ${(SKUS.reduce((s,sk)=>s+Math.max(bakeryInfo.moq||100,Math.ceil((m.fcAvg[sk.id]||0)*(Math.ceil((bakeryInfo.leadtime||7)/7)+3))),0)*0.15).toFixed(1)} kg\n\nLedtid: ${bakeryInfo.leadtime||7} dagar\nLevereras till: [adress]\n\nMvh,\nThea Arcari\nTheas Torteria`;
            navigator.clipboard.writeText(mailText).then(()=>alert("Mail kopierat till urklipp!")).catch(()=>alert(mailText));
          }}>📧 Generera mail</Btn>
          <Btn onClick={()=>setBakeryOrders(p=>[{
            id:`BAK-${String(p.length+1).padStart(3,"0")}`,
            orderDate:new Date().toISOString().slice(0,10),
            deliveryDate:"",prodDate:"",
            items:SKUS.map(sk=>({skuId:sk.id,name:sk.name,qty:Math.max(bakeryInfo.moq||100,Math.ceil((m.fcAvg[sk.id]||0)*(Math.ceil((bakeryInfo.leadtime||7)/7)+3)))})),
            status:"Skickad",notes:""
          },...p])}>+ Ny produktionsorder</Btn>
        </div>
        {bakeryOrders.length===0&&<div style={{textAlign:"center",color:"#ccc",fontFamily:"system-ui",fontSize:12,padding:24}}>Inga produktionsordrar ännu. Klicka på knappen för att skapa en baserat på din forecast.</div>}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {bakeryOrders.map((o,i)=>(
            <div key={i} style={{background:C.cream,borderRadius:6,padding:"12px 14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontWeight:700,color:C.red,fontFamily:"Georgia,serif",fontSize:14}}>{o.id}</span>
                <select value={o.status} onChange={e=>{const u=[...bakeryOrders];u[i]={...u[i],status:e.target.value};setBakeryOrders(u)}} style={{padding:"3px 8px",borderRadius:4,border:"1px solid "+C.border,fontSize:11,fontFamily:"system-ui",background:o.status==="Levererad"?"#D4EDDA":o.status==="Bekräftad"?"#FFF3CD":"#fff"}}>
                  {["Skickad","Bekräftad","Under produktion","Redo för leverans","Levererad"].map(s=><option key={s}>{s}</option>)}
                </select>
                <div style={{display:"flex",gap:8,flex:1,justifyContent:"flex-end"}}>
                  <div style={{fontSize:10,fontFamily:"system-ui",color:"#888"}}>Orderdat: <input type="date" value={o.orderDate||""} onChange={e=>{const u=[...bakeryOrders];u[i]={...u[i],orderDate:e.target.value};setBakeryOrders(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px"}}/></div>
                  <div style={{fontSize:10,fontFamily:"system-ui",color:"#888"}}>Leverans: <input type="date" value={o.deliveryDate||""} onChange={e=>{const u=[...bakeryOrders];u[i]={...u[i],deliveryDate:e.target.value};setBakeryOrders(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px"}}/></div>
                  <div style={{fontSize:10,fontFamily:"system-ui",color:"#888"}}>Prod.dat: <input type="date" value={o.prodDate||""} onChange={e=>{const u=[...bakeryOrders];u[i]={...u[i],prodDate:e.target.value};setBakeryOrders(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px"}}/>{o.prodDate&&<ShelfTag prodDate={o.prodDate}/>}</div>
                </div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                {o.items.map((it,j)=>(
                  <div key={j} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 8px",background:"#fff",borderRadius:4,border:"1px solid "+C.border}}>
                    <span style={{fontSize:11,fontFamily:"system-ui"}}>{it.name}</span>
                    <input type="number" min="0" value={it.qty} onChange={e=>{const u=[...bakeryOrders];u[i].items[j].qty=parseInt(e.target.value)||0;setBakeryOrders(u)}} style={{width:55,border:"1px solid "+C.border,borderRadius:3,fontSize:11,padding:"2px 4px",textAlign:"center",fontWeight:700,color:C.red}}/>
                    <span style={{fontSize:9,color:"#bbb",fontFamily:"system-ui"}}>{(it.qty*0.15).toFixed(1)}kg</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input value={o.notes||""} onChange={e=>{const u=[...bakeryOrders];u[i]={...u[i],notes:e.target.value};setBakeryOrders(u)}} placeholder="Anteckningar till konditoriet..." style={{flex:1,padding:"5px 8px",borderRadius:4,border:"1px solid "+C.border,fontSize:11,fontFamily:"system-ui"}}/>
                <span style={{fontSize:10,color:"#bbb",fontFamily:"system-ui"}}>Total: <b style={{color:C.dark}}>{o.items.reduce((s,it)=>s+it.qty,0)} st · {(o.items.reduce((s,it)=>s+it.qty,0)*0.15).toFixed(1)} kg</b></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>)}

    {/* ═══ FÖRPACKNINGAR ═══ */}
    {tab==="packaging"&&(<div>
      <PageHead title="Förpackningsorder." sub="Kartongbolaget, Helsingborg"/>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        <Card>
          <Lbl>Leverantörsinformation</Lbl>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
            <Inp label="Kontaktperson" value={pkgInfo.contact} onChange={v=>setPkgInfo(p=>({...p,contact:v}))}/>
            <Inp label="Telefon" value={pkgInfo.phone} onChange={v=>setPkgInfo(p=>({...p,phone:v}))}/>
            <Inp label="E-post" value={pkgInfo.email} onChange={v=>setPkgInfo(p=>({...p,email:v}))}/>
            <Inp label="Ledtid (dagar)" type="number" value={pkgInfo.leadtime} onChange={v=>setPkgInfo(p=>({...p,leadtime:+v}))}/>
            <Inp label="MOQ 150g (st)" type="number" value={pkgInfo.moq_150} onChange={v=>setPkgInfo(p=>({...p,moq_150:+v}))}/>
            <Inp label="MOQ 400g (st)" type="number" value={pkgInfo.moq_400} onChange={v=>setPkgInfo(p=>({...p,moq_400:+v}))}/>
          </div>
        </Card>
        <Card>
          <Lbl>Förpackningsbehov — nästa beställning</Lbl>
          <p style={{fontFamily:"system-ui",fontSize:11,color:"#888",margin:"4px 0 10px",lineHeight:1.5}}>Baserat på forecast. Förpackningarna ska levereras till Konditori Katarina i Malmö.</p>
          <div style={{marginBottom:8}}>
            <div style={{fontSize:10,fontFamily:"system-ui",fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>150g — DVH</div>
            {SKUS.map(sk=>{
              const avg=m.fcAvg[sk.id]||0;
              const weeks=Math.ceil((pkgInfo.leadtime||14)/7)+4;
              const qty=Math.max(pkgInfo.moq_150||500,Math.ceil(avg*weeks));
              return(
                <div key={sk.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",background:C.cream,borderRadius:4,marginBottom:4}}>
                  <span style={{flex:1,fontSize:11,fontFamily:"system-ui"}}>{sk.name}</span>
                  <span style={{fontWeight:700,color:C.red,fontSize:12}}>{qty} st</span>
                  <span style={{fontSize:9,color:"#bbb",fontFamily:"system-ui"}}>{Math.ceil(qty/KOLLI)} kolli</span>
                </div>
              );
            })}
          </div>
          <div style={{borderTop:"1px solid "+C.border,paddingTop:8}}>
            <div style={{fontSize:10,fontFamily:"system-ui",fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>400g — B2B</div>
            {SKUS.map(sk=>{
              const avg=m.fcAvg[sk.id]||0;
              const qty=Math.max(pkgInfo.moq_400||250,Math.ceil(avg*2));
              return(
                <div key={sk.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",background:C.cream,borderRadius:4,marginBottom:4}}>
                  <span style={{flex:1,fontSize:11,fontFamily:"system-ui"}}>{sk.name}</span>
                  <span style={{fontWeight:700,color:C.navy,fontSize:12}}>{qty} st</span>
                  <span style={{fontSize:9,color:"#bbb",fontFamily:"system-ui"}}>{Math.ceil(qty/KOLLI)} kolli</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Orderlogg förpackningar */}
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <Lbl>Förpackningsordrar</Lbl>
          <Btn ghost onClick={()=>{
            const mailText=`Till: ${pkgInfo.email||"[epost kartongbolaget]"}\nÄmne: Förpackningsorder Theas Torteria\n\nHej ${pkgInfo.contact||""}!\n\nVi önskar beställa förpackningsmaterial:\n\n150g förpackningar:\n${SKUS.map(sk=>{const qty=Math.max(pkgInfo.moq_150||500,Math.ceil((m.fcAvg[sk.id]||0)*(Math.ceil((pkgInfo.leadtime||14)/7)+4)));return `${sk.name}: ${qty} st`;}).join("\n")}\n\n400g förpackningar:\n${SKUS.map(sk=>{const qty=Math.max(pkgInfo.moq_400||250,Math.ceil((m.fcAvg[sk.id]||0)*2));return `${sk.name}: ${qty} st`;}).join("\n")}\n\nLevereras till: Konditori Katarina, Malmö\nLedtid: ${pkgInfo.leadtime||14} dagar\n\nMvh,\nThea Arcari\nTheas Torteria`;
            navigator.clipboard.writeText(mailText).then(()=>alert("Mail kopierat till urklipp!")).catch(()=>alert(mailText));
          }}>📧 Generera mail</Btn>
          <Btn onClick={()=>setPkgOrders(p=>[{
            id:`PKG-${String(p.length+1).padStart(3,"0")}`,
            orderDate:new Date().toISOString().slice(0,10),
            deliveryDate:"",deliveryTo:"Konditori Katarina, Malmö",
            items150:SKUS.map(sk=>({skuId:sk.id,name:sk.name,qty:Math.max(pkgInfo.moq_150||500,Math.ceil((m.fcAvg[sk.id]||0)*(Math.ceil((pkgInfo.leadtime||14)/7)+4)))})),
            items400:SKUS.map(sk=>({skuId:sk.id,name:sk.name,qty:Math.max(pkgInfo.moq_400||250,Math.ceil((m.fcAvg[sk.id]||0)*2))})),
            status:"Beställd",notes:""
          },...p])}>+ Ny förpackningsorder</Btn>
        </div>
        {pkgOrders.length===0&&<div style={{textAlign:"center",color:"#ccc",fontFamily:"system-ui",fontSize:12,padding:24}}>Inga förpackningsordrar ännu.</div>}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {pkgOrders.map((o,i)=>(
            <div key={i} style={{background:C.cream,borderRadius:6,padding:"12px 14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
                <span style={{fontWeight:700,color:C.red,fontFamily:"Georgia,serif",fontSize:14}}>{o.id}</span>
                <select value={o.status} onChange={e=>{const u=[...pkgOrders];u[i]={...u[i],status:e.target.value};setPkgOrders(u)}} style={{padding:"3px 8px",borderRadius:4,border:"1px solid "+C.border,fontSize:11,fontFamily:"system-ui",background:o.status==="Levererad"?"#D4EDDA":o.status==="Under transport"?"#FFF3CD":"#fff"}}>
                  {["Beställd","Bekräftad","Under produktion","Under transport","Levererad"].map(s=><option key={s}>{s}</option>)}
                </select>
                <div style={{fontSize:10,fontFamily:"system-ui",color:"#888",display:"flex",gap:10,flex:1,justifyContent:"flex-end",flexWrap:"wrap"}}>
                  <span>Beställt: <input type="date" value={o.orderDate||""} onChange={e=>{const u=[...pkgOrders];u[i]={...u[i],orderDate:e.target.value};setPkgOrders(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px"}}/></span>
                  <span>Leverans: <input type="date" value={o.deliveryDate||""} onChange={e=>{const u=[...pkgOrders];u[i]={...u[i],deliveryDate:e.target.value};setPkgOrders(u)}} style={{border:"1px solid "+C.border,borderRadius:3,fontSize:10,padding:"2px 4px"}}/></span>
                </div>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,padding:"6px 10px",background:"#fff",borderRadius:4,border:"1px solid "+C.border}}>
                <span style={{fontSize:10,fontFamily:"system-ui",color:"#888"}}>Levereras till:</span>
                <input value={o.deliveryTo||""} onChange={e=>{const u=[...pkgOrders];u[i]={...u[i],deliveryTo:e.target.value};setPkgOrders(u)}} style={{flex:1,border:"none",fontSize:11,fontFamily:"system-ui",fontWeight:600,outline:"none"}}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}}>
                <div>
                  <div style={{fontSize:9,fontFamily:"system-ui",fontWeight:700,color:C.red,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>150g förpackningar</div>
                  {o.items150.map((it,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <span style={{flex:1,fontSize:10,fontFamily:"system-ui"}}>{it.name}</span>
                      <input type="number" min="0" value={it.qty} onChange={e=>{const u=[...pkgOrders];u[i].items150[j].qty=parseInt(e.target.value)||0;setPkgOrders(u)}} style={{width:60,border:"1px solid "+C.border,borderRadius:3,fontSize:11,padding:"2px 4px",textAlign:"center",fontWeight:700,color:C.red}}/>
                      <span style={{fontSize:9,color:"#bbb",fontFamily:"system-ui",minWidth:40}}>{Math.ceil(it.qty/KOLLI)} kol.</span>
                    </div>
                  ))}
                  <div style={{fontSize:10,fontFamily:"system-ui",color:"#888",marginTop:4,fontWeight:600}}>Total: {o.items150.reduce((s,it)=>s+it.qty,0)} st</div>
                </div>
                <div>
                  <div style={{fontSize:9,fontFamily:"system-ui",fontWeight:700,color:C.navy,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>400g förpackningar</div>
                  {o.items400.map((it,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <span style={{flex:1,fontSize:10,fontFamily:"system-ui"}}>{it.name}</span>
                      <input type="number" min="0" value={it.qty} onChange={e=>{const u=[...pkgOrders];u[i].items400[j].qty=parseInt(e.target.value)||0;setPkgOrders(u)}} style={{width:60,border:"1px solid "+C.border,borderRadius:3,fontSize:11,padding:"2px 4px",textAlign:"center",fontWeight:700,color:C.navy}}/>
                      <span style={{fontSize:9,color:"#bbb",fontFamily:"system-ui",minWidth:40}}>{Math.ceil(it.qty/KOLLI)} kol.</span>
                    </div>
                  ))}
                  <div style={{fontSize:10,fontFamily:"system-ui",color:"#888",marginTop:4,fontWeight:600}}>Total: {o.items400.reduce((s,it)=>s+it.qty,0)} st</div>
                </div>
              </div>
              <input value={o.notes||""} onChange={e=>{const u=[...pkgOrders];u[i]={...u[i],notes:e.target.value};setPkgOrders(u)}} placeholder="Anteckningar..." style={{width:"100%",padding:"5px 8px",borderRadius:4,border:"1px solid "+C.border,fontSize:11,fontFamily:"system-ui"}}/>
            </div>
          ))}
        </div>
      </Card>
    </div>)}

    {/* ═══ KAPITAL & FORECAST ═══ */}
    {tab==="finance"&&(<div>
      <PageHead title="Kapital & Resultat." sub="Kapital & Forecast"/>

      {/* Kassaflöde-förklaring */}
      <div style={{background:"#EEF2FF",border:"1px solid #c7d2fe",borderRadius:6,padding:"12px 14px",marginBottom:14,fontFamily:"system-ui",fontSize:12}}>
        <div style={{fontWeight:700,color:C.navy,marginBottom:6}}>💡 Kassaflöde & kapitalbehov</div>
        <div style={{color:"#444",lineHeight:1.7}}>
          <b>Organiskt kassaflöde</b> = vad du genererar från försäljning minus kostnader.<br/>
          <b>Kundfordringar</b> = ICA/Coop/Axfood betalar 30-60 dagar efter leverans — du måste förfinansiera detta.<br/>
          <b>Externt kapital</b> = investerare eller lån du tar in för att täcka underskott + driva tillväxt.
        </div>
      </div>

      {/* Scenarioväxlare */}
      {(()=>{
        const [scenario,setScenario]=useState("v7");
        const YEARS=["2026","2027","2028","2029","2030"];

        // Data från excel
        const DATA={
          nsv:    {v7:[232232,4402200,16919760,44864820,60000000], v16:[232232,3540900,16919760,44864820,60000000]},
          cogs:   {v7:[192920,3312000,9971520,21498750,26250000],  v16:[192920,2664000,9971520,21498750,26250000]},
          fixed:  [1723318,2069832,4060420,8305299,12000000],
          extcap: [1700000,3000000,2000000,10000000,5000000],
          kundfod:[0,1500000,1000000,3000000,6000000],
        };

        const nsv  = scenario==="v7"?DATA.nsv.v7:DATA.nsv.v16;
        const cogs = scenario==="v7"?DATA.cogs.v7:DATA.cogs.v16;
        const gross = nsv.map((n,i)=>n-cogs[i]);
        const result = gross.map((g,i)=>g-DATA.fixed[i]);
        const underskott = result.map(r=>r<0?-r:0);
        const totMin = underskott.map((u,i)=>u+DATA.kundfod[i]);
        const tackUnd = DATA.extcap.map((e,i)=>Math.min(e,totMin[i]));
        const tillTillv = DATA.extcap.map((e,i)=>e-tackUnd[i]);
        const kassa = DATA.extcap.map((e,i,arr)=>{
          let k=0;
          for(let j=0;j<=i;j++) k+=arr[j]+result[j];
          return k;
        });

        const prioColor=(val,green,red)=>val>=green?C.green:val<=red?C.red:"#B85042";

        return(<div>
          {/* Scenarioknappar */}
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            {[{id:"v7",l:"2027 Lansering V7 (rekommenderat)"},{id:"v16",l:"2027 Lansering V16"}].map(s=>(
              <button key={s.id} onClick={()=>setScenario(s.id)} style={{padding:"7px 16px",borderRadius:5,border:"1px solid "+C.border,cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"Georgia,serif",background:scenario===s.id?C.red:"#fff",color:scenario===s.id?"#fff":"#999"}}>{s.l}</button>
            ))}
          </div>

          {/* RESULTATRÄKNING */}
          <Card style={{marginBottom:14}}>
            <Lbl>Resultaträkning</Lbl>
            <div style={{overflowX:"auto",marginTop:8}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"system-ui"}}>
                <thead><tr style={{borderBottom:"2px solid "+C.red}}>
                  <th style={{textAlign:"left",padding:"6px 8px",fontSize:9,textTransform:"uppercase",fontWeight:700}}>Post</th>
                  {YEARS.map(y=><th key={y} style={{textAlign:"right",padding:"6px 8px",fontSize:9,textTransform:"uppercase",fontWeight:700}}>{y}</th>)}
                </tr></thead>
                <tbody>
                  <tr style={{borderBottom:"1px solid #E8E2DA"}}>
                    <td style={{padding:"6px 8px",color:"#555"}}>Total NSV (kr)</td>
                    {nsv.map((v,i)=><td key={i} style={{padding:"6px 8px",textAlign:"right"}}>{fk(v)}</td>)}
                  </tr>
                  <tr style={{borderBottom:"1px solid #E8E2DA"}}>
                    <td style={{padding:"6px 8px",color:"#555"}}>Total COGS (kr)</td>
                    {cogs.map((v,i)=><td key={i} style={{padding:"6px 8px",textAlign:"right",color:"#888"}}>{fk(v)}</td>)}
                  </tr>
                  <tr style={{borderBottom:"2px solid "+C.navy,background:"#EEF2FF"}}>
                    <td style={{padding:"7px 8px",fontWeight:700,color:C.navy}}>Bruttovinst (kr)</td>
                    {gross.map((v,i)=><td key={i} style={{padding:"7px 8px",textAlign:"right",fontWeight:700,color:v>0?C.navy:C.red}}>{fk(v)}</td>)}
                  </tr>
                  <tr style={{borderBottom:"1px solid #E8E2DA"}}>
                    <td style={{padding:"6px 8px",color:"#555"}}>Bruttomarginal</td>
                    {gross.map((v,i)=><td key={i} style={{padding:"6px 8px",textAlign:"right",color:nsv[i]>0&&v/nsv[i]>=0.3?C.green:"#888"}}>{nsv[i]>0?fp(v/nsv[i]):"—"}</td>)}
                  </tr>
                  <tr style={{borderBottom:"1px solid #E8E2DA"}}>
                    <td style={{padding:"6px 8px",color:"#555"}}>Fasta kostnader (kr)</td>
                    {DATA.fixed.map((v,i)=><td key={i} style={{padding:"6px 8px",textAlign:"right",color:"#888"}}>{fk(v)}</td>)}
                  </tr>
                  <tr style={{background:C.dark}}>
                    <td style={{padding:"8px 8px",fontWeight:700,color:"#fff"}}>Rörelseresultat (kr)</td>
                    {result.map((v,i)=><td key={i} style={{padding:"8px 8px",textAlign:"right",fontWeight:700,color:v>=0?"#4ade80":"#fca5a5",fontSize:13}}>{fk(v)}</td>)}
                  </tr>
                  <tr style={{borderBottom:"1px solid #E8E2DA",background:C.cream}}>
                    <td style={{padding:"6px 8px",color:"#555"}}>Rörelsemarginal</td>
                    {result.map((v,i)=><td key={i} style={{padding:"6px 8px",textAlign:"right",fontWeight:600,color:v>=0?C.green:C.red}}>{nsv[i]>0?fp(v/nsv[i]):"—"}</td>)}
                  </tr>
                  <tr>
                    <td style={{padding:"6px 8px",fontStyle:"italic",color:"#888"}}>Vinst / förlust</td>
                    {result.map((v,i)=><td key={i} style={{padding:"6px 8px",textAlign:"center"}}>
                      <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:v>=0?"#D4EDDA":"#FFE0E0",fontWeight:700,color:v>=0?C.green:C.red}}>{v>=0?"VINST ✓":"Förlust"}</span>
                    </td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* KAPITALANALYS */}
          <Card style={{marginBottom:14}}>
            <Lbl>Kapitalbehov & kassaflöde</Lbl>
            <div style={{overflowX:"auto",marginTop:8}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"system-ui"}}>
                <thead><tr style={{borderBottom:"2px solid "+C.red}}>
                  <th style={{textAlign:"left",padding:"6px 8px",fontSize:9,textTransform:"uppercase",fontWeight:700}}>Post</th>
                  {YEARS.map(y=><th key={y} style={{textAlign:"right",padding:"6px 8px",fontSize:9,textTransform:"uppercase",fontWeight:700}}>{y}</th>)}
                </tr></thead>
                <tbody>
                  <tr style={{borderBottom:"1px solid #E8E2DA",background:"#FFE0E0"}}>
                    <td style={{padding:"6px 8px",color:C.red,fontWeight:600}}>Rörelseunderskott att täcka</td>
                    {underskott.map((v,i)=><td key={i} style={{padding:"6px 8px",textAlign:"right",fontWeight:700,color:v>0?C.red:C.green}}>{v>0?fk(v):"—"}</td>)}
                  </tr>
                  <tr style={{borderBottom:"1px solid #E8E2DA",background:"#FFF3CD"}}>
                    <td style={{padding:"6px 8px",color:"#856404",fontWeight:600}}>⚠ Kundfordringar att finansiera</td>
                    {DATA.kundfod.map((v,i)=><td key={i} style={{padding:"6px 8px",textAlign:"right",color:v>0?"#856404":"#aaa",fontWeight:v>0?700:400}}>{v>0?fk(v):"—"}</td>)}
                  </tr>
                  <tr style={{borderBottom:"2px solid "+C.dark,background:C.dark}}>
                    <td style={{padding:"7px 8px",fontWeight:700,color:"#fff"}}>Totalt minimibehov</td>
                    {totMin.map((v,i)=><td key={i} style={{padding:"7px 8px",textAlign:"right",fontWeight:700,color:"#fff"}}>{v>0?fk(v):"—"}</td>)}
                  </tr>
                  <tr style={{borderBottom:"1px solid #E8E2DA",background:"#D4EDDA"}}>
                    <td style={{padding:"7px 8px",fontWeight:700,color:C.green}}>Rekommenderat externt kapital</td>
                    {DATA.extcap.map((v,i)=><td key={i} style={{padding:"7px 8px",textAlign:"right",fontWeight:700,color:C.green,fontSize:13}}>{fk(v)}</td>)}
                  </tr>
                  <tr style={{borderBottom:"1px solid #E8E2DA"}}>
                    <td style={{padding:"5px 8px",color:"#555",fontSize:10}}>→ Täcker underskott & kundfordringar</td>
                    {tackUnd.map((v,i)=><td key={i} style={{padding:"5px 8px",textAlign:"right",color:"#888"}}>{fk(v)}</td>)}
                  </tr>
                  <tr style={{borderBottom:"2px solid "+C.navy,background:"#D4EDDA"}}>
                    <td style={{padding:"5px 8px",color:C.green,fontSize:10,fontWeight:600}}>→ Fritt till tillväxt & rörelsekapital</td>
                    {tillTillv.map((v,i)=><td key={i} style={{padding:"5px 8px",textAlign:"right",fontWeight:700,color:C.green}}>{v>0?fk(v):"—"}</td>)}
                  </tr>
                  <tr style={{background:C.navy}}>
                    <td style={{padding:"8px 8px",fontWeight:700,color:"#fff"}}>Kassa efter år (ackumulerat)</td>
                    {kassa.map((v,i)=><td key={i} style={{padding:"8px 8px",textAlign:"right",fontWeight:700,color:v>=0?"#4ade80":"#fca5a5",fontSize:13}}>{fk(v)}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* KAPITALPLAN */}
          <Card>
            <Lbl>Kapitalplan — varför dessa belopp?</Lbl>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:8}}>
              {[
                {year:"2026 — 1,7 Mkr",bg:"#D4EDDA",fc:C.green,text:"Täcker hela budgeten: lön (360k), sociala avgifter (180k), lokalhyra (138k), SOME (160k), förpackningar, produktion, engångskostnader. Rörelseunderskott ~1,7 Mkr. Extra ~200k = buffert."},
                {year:"2027 — 3 Mkr",bg:"#FFE0E0",fc:C.red,text:"Underskott ~980k (V7) / ~1,2 Mkr (V16) måste täckas. Kundfordringar ~1,5 Mkr. Resten = kampanjkapital, säljteam, lager. KRITISKT: pengarna måste finnas INNAN lansering."},
                {year:"2028 — 2 Mkr",bg:"#FFF3CD",fc:"#856404",text:"Du är lönsam (+2,9 Mkr) men kundfordringar ~1 Mkr kan vara utestående. Extra kapital accelererar skalning till 850 butiker och ger buffert om tillväxten går långsammare."},
                {year:"2029 — 5-10 Mkr",bg:"#EEF2FF",fc:C.navy,text:"Nordenexpansion + ev. semiautomatiserad produktion (3-8 Mkr). Kundfordringar ~6 Mkr utestående. Nettovinst ~15 Mkr täcker driften men inte investeringarna. Ev. checkkrediter hos bank."},
                {year:"2030 — 5 Mkr",bg:"#D4EDDA",fc:C.green,text:"Nordic scale — lokal expertis, marknadsföring i nya länder. Vid det laget är verksamheten kraftigt lönsam och kan delvis självfinansiera expansion."},
                {year:"⚠ Kundfordrings-fällan",bg:"#FFE0E0",fc:C.red,text:"ICA/Coop/Axfood betalar 30-60 dagar efter leverans. Du måste ha betalat produktion & förpackningar INNAN du får betalt. Ju snabbare du växer, desto mer kapital binds. Planera för detta redan nu!"},
              ].map((x,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"10px 12px",background:x.bg,borderRadius:5}}>
                  <div style={{fontWeight:700,fontSize:11,fontFamily:"system-ui",color:x.fc,minWidth:140,flexShrink:0}}>{x.year}</div>
                  <div style={{fontSize:11,fontFamily:"system-ui",color:"#333",lineHeight:1.6}}>{x.text}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>);
      })()}
    </div>)}

    {/* ═══ AI-ANALYS ═══ */}
    {tab==="ai"&&(()=>{
      const autoAnalysisDone=aiInitDone;
      const setAutoAnalysisDone=setAiInitDone;

      // Bygg kontextsammanfattning av all data
      const buildContext=()=>{
        const totalUnits=m.totU;
        const dvhUnits=m.dvh.tot;
        const b2bUnits=m.b2b.tot;
        const nsv=m.totNSV;
        const upw=m.dvh.upw.toFixed(1);
        const growth=m.dvh.aw>1?(m.dvh.avgGr*100).toFixed(1):"Ej nog data";
        const topSku=SKUS.slice().sort((a,b)=>(m.combo[b.id]||0)-(m.combo[a.id]||0))[0]?.name||"–";
        const bottomSku=SKUS.slice().sort((a,b)=>(m.combo[a.id]||0)-(m.combo[b.id]||0))[0]?.name||"–";
        const topStore=STORES.slice().sort((a,b)=>(m.dvh.store[b.id]||0)-(m.dvh.store[a.id]||0))[0]?.name||"–";
        const openOrders=orders.filter(o=>o.status!=="Betald"&&o.status!=="Levererad").length;
        const openTasks=tasks.filter(t=>t.st!=="Klar").length;
        const p1Tasks=tasks.filter(t=>t.st!=="Klar"&&t.p===1).map(t=>t.task).slice(0,3).join(", ");
        const skuBreakdown=SKUS.map(sk=>`${sk.name}: ${m.combo[sk.id]||0} st`).join(", ");
        const storeBreakdown=STORES.map(st=>`${st.name}: ${m.dvh.store[st.id]||0} st`).join(", ");

        return `Du är affärsrådgivare för Theas Torteria, ett premium kakvarumärke som bygger från bageri mot dagligvaruhandel i Sverige.

AKTUELL FÖRSÄLJNINGSDATA (provförsäljning Göteborg, 16 veckor, 10 butiker):
- Total volym: ${totalUnits} st (DVH 150g: ${dvhUnits} st, B2B 400g: ${b2bUnits} st)
- Total NSV: ${Math.round(nsv)} kr
- UPW (units/vecka/SKU/butik): ${upw} (mål ≥7 för kedjepresentation)
- V/V tillväxt: ${growth}%
- Bästa SKU: ${topSku}
- Svagaste SKU: ${bottomSku}
- Bästa butik: ${topStore}

SKU-fördelning: ${skuBreakdown}
Butiksfördelning: ${storeBreakdown}

EKONOMI:
- Konsumentpris: 69 kr (150g DVH), 75 kr (400g B2B)
- NSV/enhet: 31,90 kr (DVH), 55 kr (B2B)
- COGS/enhet: 26,50 kr (DVH), 45 kr (B2B)
- Bruttovinst: ${Math.round(m.totG)} kr hittills

ORDRAR:
- Totalt antal ordrar: ${orders.length}
- Öppna ordrar: ${openOrders}

PROJEKT & TO-DO:
- Öppna uppgifter: ${openTasks}
- Högsta prio (P1): ${p1Tasks||"Inga"}

MÅL: Presentation för ICA, Coop och Axfood i oktober 2026. Central listning 2027 i hela Sverige.

Svara alltid på svenska. Var konkret, direkt och strategisk. Ge specifika siffror och rekommendationer baserade på datan ovan. Max 3-4 meningar per punkt. Använd korta stycken.`;
      };

      const sendMessage=async(msg)=>{
        if(!msg.trim()||aiLoading)return;
        const userMsg={role:"user",content:msg};
        const newHistory=[...aiMessages,userMsg];
        setAiMessages(newHistory);
        setAiInput("");
        setAiLoading(true);
        try{
          const resp=await fetch("https://api.anthropic.com/v1/messages",{
            method:"POST",
            headers:{"Content-Type":"application/json","x-api-key":anthropicKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
            body:JSON.stringify({
              model:"claude-opus-4-5",
              max_tokens:1000,
              system:buildContext(),
              messages:newHistory.map(m=>({role:m.role,content:m.content}))
            })
          });
          const data=await resp.json();
          if(data.error){setAiMessages(p=>[...p,{role:"assistant",content:`Fel: ${data.error.message}`}]);}
          else{const reply=data.content?.[0]?.text||"Kunde inte hämta svar.";setAiMessages(p=>[...p,{role:"assistant",content:reply}]);}
        }catch(e){
          setAiMessages(p=>[...p,{role:"assistant",content:"Fel vid anrop. Kontrollera din API-nyckel och anslutningen."}]);
        }
        setAiLoading(false);
        setTimeout(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight},100);
      };

      const runAutoAnalysis=async()=>{
        if(autoAnalysisDone||aiMessages.length>0)return;
        setAutoAnalysisDone(true);
        await sendMessage("Gör en komplett analys av min nuvarande data. Vad går bra, vad är svagt, och vad är mina tre viktigaste åtgärder just nu?");
      };

      // Auto-run analysis on first visit
      if(!aiInitDone && tab==="ai") { setTimeout(()=>runAutoAnalysis(),100); }

      const quickPrompts=[
        "Vilka SKU:er bör jag ta bort inför kedjepresentationen?",
        "Hur förbättrar jag min UPW snabbast?",
        "Vad ska jag prioritera de nästa 4 veckorna?",
        "Hur stark är mitt business case för ICA just nu?",
        "Vilka butiker presterar under förväntan?",
      ];

      return(<div>
        <PageHead title="AI-analys." sub="Realtidsanalys"/>
        <p style={{fontFamily:"system-ui",fontSize:12,color:C.muted,margin:"0 0 14px",lineHeight:1.5}}>
          Claude analyserar all din försäljningsdata, ordrar och uppgifter i realtid och ger konkreta rekommendationer.
        </p>

        {/* API Key setup */}
        {!anthropicKey&&<div style={{background:"#FFF3CD",border:"1px solid #ffc107",borderRadius:6,padding:"14px 16px",marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:"#856404",fontFamily:"system-ui",marginBottom:6}}>🔑 API-nyckel krävs</div>
          <div style={{fontSize:11,fontFamily:"system-ui",color:"#666",marginBottom:10,lineHeight:1.6}}>
            För att använda AI-analysen behöver du en gratis API-nyckel från Anthropic.<br/>
            1. Gå till <b>console.anthropic.com</b> → skapa konto<br/>
            2. Klicka <b>API Keys</b> → <b>Create Key</b><br/>
            3. Kopiera nyckeln (börjar med "sk-ant-...") och klistra in nedan
          </div>
          <div style={{display:"flex",gap:8}}>
            <input type="password" placeholder="sk-ant-api03-..." value={anthropicKey} onChange={e=>setAnthropicKey(e.target.value)} style={{flex:1,padding:"8px 12px",borderRadius:5,border:"1px solid #ffc107",fontSize:12,fontFamily:"system-ui"}}/>
            <Btn onClick={()=>{if(anthropicKey.startsWith("sk-")){localStorage.setItem("tt3-anthropic-key",anthropicKey);alert("Nyckel sparad!");}else{alert("Nyckeln verkar inte stämma, kontrollera att den börjar med sk-ant-");}}} style={{whiteSpace:"nowrap"}}>Spara nyckel</Btn>
          </div>
        </div>}
        {anthropicKey&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#D4EDDA",borderRadius:5,padding:"8px 12px",marginBottom:14}}>
          <span style={{fontSize:11,fontFamily:"system-ui",color:"#155724"}}>✓ API-nyckel sparad</span>
          <button onClick={()=>{localStorage.removeItem("tt3-anthropic-key");setAnthropicKey("");}} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:"#aaa",fontFamily:"system-ui"}}>Ta bort</button>
        </div>}

        {/* Snabbfrågor */}
        <Card style={{marginBottom:14}}>
          <Lbl>Snabbanalys</Lbl>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8}}>
            {quickPrompts.map((q,i)=>(
              <button key={i} onClick={()=>sendMessage(q)} disabled={aiLoading} style={{padding:"7px 12px",borderRadius:5,border:"1px solid "+C.border,background:C.cream,fontSize:11,fontFamily:"system-ui",cursor:"pointer",color:C.dark,fontWeight:600,transition:"all 0.15s"}}>
                {q}
              </button>
            ))}
          </div>
        </Card>

        {/* Chatfönster */}
        <Card style={{marginBottom:12}}>
          <Lbl>Konversation</Lbl>
          <div ref={chatRef} style={{height:340,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,marginTop:10,paddingRight:4}}>
            {aiMessages.length===0&&!aiLoading&&(
              <div style={{textAlign:"center",color:"#bbb",fontFamily:"system-ui",fontSize:12,padding:40}}>
                Startar analys av din data...
              </div>
            )}
            {aiMessages.map((msg,i)=>(
              <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start"}}>
                <div style={{
                  maxWidth:"82%",padding:"10px 14px",borderRadius:msg.role==="user"?"8px 8px 2px 8px":"8px 8px 8px 2px",
                  background:msg.role==="user"?C.red:C.card,
                  color:msg.role==="user"?"#fff":C.dark,
                  fontFamily:"system-ui",fontSize:12,lineHeight:1.6,
                  whiteSpace:"pre-wrap"
                }}>
                  {msg.role==="assistant"&&<div style={{fontSize:9,fontWeight:700,color:C.red,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4,fontFamily:"system-ui"}}>AI-analys</div>}
                  {msg.content}
                </div>
              </div>
            ))}
            {aiLoading&&(
              <div style={{display:"flex",justifyContent:"flex-start"}}>
                <div style={{padding:"10px 14px",borderRadius:"8px 8px 8px 2px",background:C.card,fontFamily:"system-ui",fontSize:12,color:"#aaa"}}>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:C.red,animation:"pulse 1s infinite"}}/>
                    <div style={{width:6,height:6,borderRadius:"50%",background:C.red,animation:"pulse 1s infinite 0.2s"}}/>
                    <div style={{width:6,height:6,borderRadius:"50%",background:C.red,animation:"pulse 1s infinite 0.4s"}}/>
                    <span style={{marginLeft:6}}>Analyserar din data...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Input */}
        <div style={{display:"flex",gap:8}}>
          <input
            value={aiInput}
            onChange={e=>setAiInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage(aiInput)}
            placeholder="Ställ en fråga om din data, strategi eller nästa steg..."
            disabled={aiLoading}
            style={{flex:1,padding:"11px 14px",borderRadius:6,border:"1.5px solid "+C.border,fontSize:13,fontFamily:"system-ui",background:"#fff",outline:"none"}}
          />
          <Btn onClick={()=>sendMessage(aiInput)} style={{padding:"11px 20px",opacity:aiLoading?0.5:1}}>Skicka</Btn>
          <Btn ghost onClick={()=>setAiMessages([])} style={{padding:"11px 14px"}}>Rensa</Btn>
        </div>

        <style>{`@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
      </div>);
    })()}

    {/* ═══ IDÉER ═══ */}
    {tab==="ideas"&&(()=>{
      const CATS=["Alla","Produkt","Förpackning","Marknad","Distribution","Övrigt"];
      const CATCOLORS={"Produkt":C.red,"Förpackning":C.navy,"Marknad":"#2C5F2D","Distribution":"#B85042","Övrigt":"#888"};
      const INIT_IDEAS=[
        {id:"I001",text:"Vill göra en snackbag — 7 sorters kakor i en påse",cat:"Produkt",date:"2026-04-10",status:"Ny"},
        {id:"I002",text:"Vill göra brownie till frysdisken",cat:"Produkt",date:"2026-04-12",status:"Ny"},
      ];

      const allIdeas=ideas.length>0?ideas:INIT_IDEAS;
      const filtered=ideaFilter==="Alla"?allIdeas:allIdeas.filter(i=>i.cat===ideaFilter);

      const addIdea=()=>{
        if(!ideaInput.trim())return;
        const newIdea={
          id:`I${String(allIdeas.length+1).padStart(3,"0")}`,
          text:ideaInput.trim(),
          cat:"Övrigt",
          date:new Date().toISOString().slice(0,10),
          status:"Ny"
        };
        setIdeas([newIdea,...(ideas.length>0?ideas:INIT_IDEAS)]);
        setIdeaInput("");
      };

      return(<div>
        <PageHead title="Idéer." sub="Idébank"/>
        <p style={{fontFamily:"system-ui",fontSize:12,color:C.muted,margin:"0 0 16px",lineHeight:1.5}}>
          Fånga idéer direkt — produkter, förpackningar, marknadsföring, distribution. Allt sparas och kan kategoriseras.
        </p>

        {/* Input */}
        <Card style={{marginBottom:14}}>
          <Lbl>Ny idé</Lbl>
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <input
              value={ideaInput}
              onChange={e=>setIdeaInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addIdea()}
              placeholder="Skriv din idé här... (Enter för att spara)"
              style={{flex:1,padding:"11px 14px",borderRadius:6,border:"1.5px solid "+C.border,fontSize:13,fontFamily:"system-ui",background:"#fff",outline:"none"}}
              autoFocus
            />
            <Btn onClick={addIdea} style={{padding:"11px 20px"}}>Spara</Btn>
          </div>
          <div style={{marginTop:10,display:"flex",gap:6,flexWrap:"wrap"}}>
            {["Snackbag","Fryst produkt","Ny smak","Ny kanal","Kampanjidé","Förpackning","Kollaboration"].map(hint=>(
              <button key={hint} onClick={()=>setIdeaInput(hint+" — ")} style={{padding:"4px 10px",borderRadius:4,border:"1px solid "+C.border,background:C.cream,fontSize:10,fontFamily:"system-ui",cursor:"pointer",color:"#666"}}>+ {hint}</button>
            ))}
          </div>
        </Card>

        {/* Filter + statistik */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setIdeaFilter(c)} style={{padding:"5px 12px",borderRadius:4,border:"1px solid "+C.border,fontSize:11,fontWeight:600,fontFamily:"system-ui",cursor:"pointer",background:ideaFilter===c?C.red:"#fff",color:ideaFilter===c?"#fff":"#888"}}>{c} {c==="Alla"?`(${allIdeas.length})`:`(${allIdeas.filter(i=>i.cat===c).length})`}</button>
            ))}
          </div>
          <div style={{fontSize:10,fontFamily:"system-ui",color:"#aaa"}}>{filtered.length} idéer visas</div>
        </div>

        {/* Idékort */}
        <div style={{display:"grid",gap:8}}>
          {filtered.length===0&&(
            <div style={{textAlign:"center",color:"#ccc",fontFamily:"system-ui",fontSize:12,padding:32,background:C.card,borderRadius:8}}>Inga idéer i den här kategorin ännu.</div>
          )}
          {filtered.map((idea,i)=>{
            const realIdx=(ideas.length>0?ideas:INIT_IDEAS).findIndex(x=>x.id===idea.id);
            const baseList=ideas.length>0?ideas:INIT_IDEAS;
            return(
              <div key={idea.id} style={{background:C.card,borderRadius:7,padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:12,borderLeft:"3px solid "+(CATCOLORS[idea.cat]||"#888")}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontFamily:"system-ui",fontWeight:600,color:C.dark,lineHeight:1.4,marginBottom:5}}>{idea.text}</div>
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <select value={idea.cat} onChange={e=>{const u=[...baseList];u[realIdx]={...u[realIdx],cat:e.target.value};setIdeas(u)}} style={{padding:"3px 7px",borderRadius:4,border:"1px solid "+C.border,fontSize:10,fontFamily:"system-ui",background:CATCOLORS[idea.cat]||"#888",color:"#fff",fontWeight:700}}>
                      {["Produkt","Förpackning","Marknad","Distribution","Övrigt"].map(c=><option key={c} style={{background:"#fff",color:C.dark}}>{c}</option>)}
                    </select>
                    <select value={idea.status} onChange={e=>{const u=[...baseList];u[realIdx]={...u[realIdx],status:e.target.value};setIdeas(u)}} style={{padding:"3px 7px",borderRadius:4,border:"1px solid "+C.border,fontSize:10,fontFamily:"system-ui",background:idea.status==="Klar"?"#D4EDDA":idea.status==="Pågår"?"#FFF3CD":"#fff",fontWeight:600}}>
                      {["Ny","Undersöker","Pågår","Parkerad","Klar"].map(s=><option key={s}>{s}</option>)}
                    </select>
                    <span style={{fontSize:9,color:"#bbb",fontFamily:"system-ui"}}>{idea.date}</span>
                  </div>
                </div>
                <button onClick={()=>{const u=[...baseList];u.splice(realIdx,1);setIdeas(u)}} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#ccc",padding:"0 2px",lineHeight:1}}>×</button>
              </div>
            );
          })}
        </div>
      </div>);
    })()}
    </main>
  </div>);
}
