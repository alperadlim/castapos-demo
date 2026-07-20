function q(name){return new URLSearchParams(window.location.search).get(name) || ''}
const CART_KEY='castaposCart';
const COMPARE_KEY='castaposCompareProducts';
const FAVORITES_KEY='castaposFavorites';

const REVIEW_DATA={
  default:{
    average:4.7,
    qa:[
      {q:"Teslimat ne kadar sürede yapılıyor?",a:"Ürün uygunluğuna göre teslimat planı destek ekibi tarafından 1-3 iş günü içinde organize edilir."},
      {q:"Kiralama süresi sonunda uzatma yapabiliyor muyum?",a:"Uygun stok bulunması halinde kiralama süresi uzatma talebi oluşturabilirsin."},
      {q:"Satın alma opsiyonu nasıl çalışıyor?",a:"Satın alma opsiyonu olan ürünlerde kira süreci sonrası kalan bedel üzerinden satın alma değerlendirmesi yapılabilir."}
    ],
    reviews:[
      {name:"Merve A.",rating:5,text:"Ürün beklediğimden sessiz çıktı. Kurulum ve teslimat süreci de sorunsuz ilerledi."},
      {name:"Emir T.",rating:4,text:"Ev kullanımı için yeterli. Kısa süreli ihtiyaçta satın almadan denemek çok mantıklı."},
      {name:"Seda K.",rating:5,text:"Kiralama deneyimi pratikti. Ürün temiz ve düzenli teslim edildi."},
      {name:"Koray B.",rating:3,text:"Genel olarak memnunum, ancak ürün detay açıklamaları biraz daha fazla olabilir."}
    ]
  }
};
function getReviewPack(id){return REVIEW_DATA[id] || REVIEW_DATA.default}
const HOME_TESTIMONIALS=[
  {productId:'walkingpad-r2-pro', rating:5, name:'Enes S.', date:'07 Mart 2026', text:'Evde uzun süre kullanmadan satın almak istemiyordum. 3 aylık kiralama benim için çok daha güvenli bir karar oldu.'},
  {productId:'wero-ai-bike', rating:5, name:'Selin K.', date:'04 Mart 2026', text:'Satın alma düşüncem vardı ama önce kiralamak çok mantıklı geldi. Ürünü deneyip karar vermek gerçekten rahatlatıcı.'},
  {productId:'voit-at1000', rating:4, name:'Halil M.', date:'27 Şubat 2026', text:'Kurulum ve teslimat düzenliydi. Ürünü deneyimledikten sonra hangi modele geçeceğime daha net karar verdim.'},
  {productId:'bissell-proheat', rating:5, name:'Cemre A.', date:'22 Şubat 2026', text:'Dönemsel ihtiyaç için satın almadan kullanmak büyük avantaj. Temizlik dönemlerinde gerçekten hayat kurtarıyor.'}
];
function starIcons(n){return '★'.repeat(n)+`<span class="empty">${'★'.repeat(5-n)}</span>`}
function heartIcon(active=false){
  return `<svg class="heart-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" fill="${active?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function highlightSummary(text){
  return text
    .replace(/(\d+[\.,]?\d*\s?km\/s)/gi,'<strong>$1</strong>')
    .replace(/(\d+[\.,]?\d*\s?HP)/gi,'<strong>$1</strong>')
    .replace(/(Bluetooth|Wi[- ]?Fi|katlanabilir|satın alma opsiyonu|sessiz motor|taşıma kapasitesi)/gi,'<strong>$1</strong>');
}

function expandedReviews(seed){
  const names=['Merve A.','Emir T.','Seda K.','Koray B.','İrem Y.','Fatih D.','Buse N.','Oğuz K.','Pelin S.','Can E.','Nisa U.','Volkan A.','Aslı G.','Mehmet P.','Zeynep Ç.','Tolga M.','Derya H.','Cem K.','Ece Y.','Murat L.','Sinem A.','Onur T.','Begüm E.'];
  const notes=[' Teslimat ekibi zamanında ulaştı.',' Fiyat/performans açısından tatmin edici buldum.',' İlk kez kiralama denedim ve süreç kolaydı.',' Açıklamalar biraz daha detaylı olabilir ama genel deneyim iyiydi.'];
  return Array.from({length:23},(_,i)=>({
    name:names[i],
    rating:[5,4,5,3,4][i%5],
    text:seed[i%seed.length].text + notes[i%notes.length]
  }));
}
function expandedQa(seed){
  const qs=['Teslimat kurulumu da kapsıyor mu?','Ürün teslimatı hafta sonu yapılabiliyor mu?','Kiralama süresi sonunda uzatma talebi nasıl açılır?','Satın alma opsiyonu aktif olduğunda nasıl ilerliyor?','Üründe arıza olursa teknik servis süreci nasıl işliyor?','Aynı üründen iki adet kiralayabilir miyim?','Kurulum için ekstra ücret çıkıyor mu?','Temizlik ve bakım ürün tesliminden önce yapılıyor mu?','İade günü geldiğinde kargo mu geliyor yoksa ekip mi alıyor?','Kurumsal kiralama için ayrı süreç var mı?','Stok biterse benzer model öneriliyor mu?','Aylık ödeme günü sabit mi?','Hasar durumunda nasıl işlem uygulanıyor?','Adres değişikliği teslimattan sonra yapılabilir mi?','Ürünü şehir dışına taşıyabilir miyim?','Kutu içeriğinde aksesuarlar dahil mi?','Faturayı dijital olarak alabiliyor muyum?','Erken iade yaparsam ne oluyor?','Ürün görseldekiyle birebir aynı mı geliyor?','Yedek parça veya aksesuar desteği var mı?','Teslimat saat aralığını ben seçebiliyor muyum?','Temassız teslimat seçeneği var mı?','Kiralama bitince tekrar aynı ürünü alabilir miyim?'];
  return Array.from({length:23},(_,i)=>({ q:qs[i], a:seed[i%seed.length].a }));
}
function initHeaderSearch(){
  document.querySelectorAll('.main-search').forEach(form=>{
    const input=form.querySelector('input[name="q"]');
    if(!input) return;
    let box=form.querySelector('.search-suggest-box');
    if(!box){ box=document.createElement('div'); box.className='search-suggest-box'; form.appendChild(box); }
    const close=()=>{ box.innerHTML=''; box.classList.remove('open'); };
    input.addEventListener('input',()=>{
      const q=input.value.trim().toLocaleLowerCase('tr-TR');
      if(!q){ close(); return; }
      const items=PRODUCTS.filter(p=>{
        const name=p.name.toLocaleLowerCase('tr-TR');
        const brand=p.brand.toLocaleLowerCase('tr-TR');
        return name.startsWith(q) || brand.startsWith(q) || name.includes(q);
      }).slice(0,5);
      if(!items.length){ close(); return; }
      box.innerHTML=items.map(p=>`<a class="search-suggest-item" href="urun-detay.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"><span>${p.name}</span></a>`).join('');
      box.classList.add('open');
    });
    input.addEventListener('focus',()=>{ if(input.value.trim()) input.dispatchEvent(new Event('input')); });
    document.addEventListener('click',e=>{ if(!form.contains(e.target)) close(); });
    form.addEventListener('submit',e=>{ e.preventDefault(); const q=input.value.trim(); if(q) location.href=`kategori.html?q=${encodeURIComponent(q)}`; });
  });
}


const TYPE_FILTERS={
  'Koşu Bantları':['Tüm ürünler','Katlanabilir','Sessiz motor','Satın alma opsiyonlu','Ev tipi'],
  'Yürüyüş Bantları':['Tüm ürünler','Katlanabilir','Ofis altı','Sessiz','Kumandalı'],
  'Bisiklet':['Tüm ürünler','Katlanabilir','Dikey','Şehir tipi','Akıllı bisiklet'],
  'Fitness':['Tüm ürünler','Stepper','Eliptik','Akıllı antrenman','Kardiyo'],
  'Ev Aletleri':['Tüm ürünler','Halı ve koltuk yıkama','Leke çıkarma','Buharlı temizlik','Zemin temizliği'],
  'Güzellik Teknolojileri':['Tüm ürünler','Saç bakım teknolojileri','Cilt bakım cihazları','Kişisel bakım cihazları'],
  'Elektronik':['Tüm ürünler','Oyun teknolojileri','Spor teknolojileri','Ev / Ofis teknolojileri'],
  'Premium':['Tüm ürünler','Koşu Bantları','Yürüyüş Bantları','Ev Aletleri'],
  'Spor Aletleri':['Tüm ürünler','Koşu','Yürüyüş','Bisiklet','Fitness'],
  'Yaz Sezonu':['Tüm ürünler','Bisiklet','Kompakt spor','Ev kullanımı']
};

function defaultPeriod(p){ return p.periods.includes(3) ? 3 : p.periods[0]; }
function monthlyPrice(p, period){
  const m=Number(period||defaultPeriod(p));
  if(m<=1) return Math.round(p.price*1.08);
  if(m===3) return p.price;
  if(m===6) return Math.round(p.price*.94);
  if(m>=9) return Math.round(p.price*.89);
  return p.price;
}
function dailyPrice(p, period){
  const m=Number(period||defaultPeriod(p));
  const total=monthlyPrice(p,m)*m;
  return Math.max(1, Math.round(total/(m*30)));
}
function ratingCount(p){ return Math.floor((p.price%900)+42); }
function cartItems(){ try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch(e){return []} }
function readJSON(key,fallback){ try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(e){return fallback} }
function writeJSON(key,value){ localStorage.setItem(key,JSON.stringify(value)); }
function normalizeFavoriteEntry(item){
  if(typeof item==='string'){
    const p=PRODUCTS.find(product=>product.id===item);
    return p?{id:item,period:defaultPeriod(p)}:null;
  }
  if(!item || typeof item!=='object' || !item.id) return null;
  const p=PRODUCTS.find(product=>product.id===item.id);
  if(!p) return null;
  const period=p.periods.includes(Number(item.period))?Number(item.period):defaultPeriod(p);
  return {id:item.id,period};
}
function favoriteItems(){
  const saved=readJSON(FAVORITES_KEY,null);
  if(Array.isArray(saved)){
    const normalized=saved.map(normalizeFavoriteEntry).filter(Boolean);
    const unique=[...new Map(normalized.map(item=>[item.id,item])).values()];
    if(JSON.stringify(saved)!==JSON.stringify(unique)) writeJSON(FAVORITES_KEY,unique);
    return unique;
  }
  const defaults=[{id:'walkingpad-r2-pro',period:3},{id:'wero-ai-bike',period:3}];
  writeJSON(FAVORITES_KEY,defaults);
  return defaults;
}
function saveFavoriteItems(items){
  const normalized=items.map(normalizeFavoriteEntry).filter(Boolean);
  writeJSON(FAVORITES_KEY,[...new Map(normalized.map(item=>[item.id,item])).values()]);
  updateFavoriteButtons();
  renderFavoritesPage();
}
function favoriteEntry(id){return favoriteItems().find(item=>item.id===id)}
function isFavorite(id){return Boolean(favoriteEntry(id))}
function toggleFavorite(id,period){
  const p=getProduct(id);
  const selectedPeriod=p.periods.includes(Number(period))?Number(period):defaultPeriod(p);
  const items=favoriteItems();
  const index=items.findIndex(item=>item.id===id);
  if(index<0){
    saveFavoriteItems([...items,{id,period:selectedPeriod}]);
    showToast(`Ürün ${selectedPeriod} aylık planla favorilerine eklendi.`);
    return;
  }
  if(items[index].period!==selectedPeriod){
    const updated=items.slice();
    updated[index]={id,period:selectedPeriod};
    saveFavoriteItems(updated);
    showToast(`Favori planı ${selectedPeriod} ay olarak güncellendi.`);
    return;
  }
  saveFavoriteItems(items.filter(item=>item.id!==id));
  showToast('Ürün favorilerinden çıkarıldı.');
}
function updateFavoriteButtons(){
  document.querySelectorAll('[data-favorite-id]').forEach(btn=>{
    const active=isFavorite(btn.dataset.favoriteId);
    btn.classList.toggle('active',active);
    btn.innerHTML=heartIcon(active);
    btn.setAttribute('aria-label',active?'Favorilerden çıkar veya planı güncelle':'Favorilere ekle');
  });
}
function renderFavoritesPage(){
  const root=document.querySelector('[data-favorites-grid]');
  if(!root) return;
  const items=favoriteItems().map(entry=>({entry,p:PRODUCTS.find(product=>product.id===entry.id)})).filter(item=>item.p);
  if(!items.length){
    root.innerHTML='<div class="empty-account-state favorites-empty"><span>♡</span><h2>Favori listen boş</h2><p>Ürün kartlarındaki kalp simgesini kullanarak favori listeni oluşturabilirsin.</p><a class="btn btn-primary" href="kategori.html">Ürünleri İncele</a></div>';
    return;
  }
  root.innerHTML=items.map(({entry,p})=>{
    const period=entry.period; const monthly=monthlyPrice(p,period); const daily=dailyPrice(p,period);
    const detailHref=`urun-detay.html?id=${p.id}&period=${period}`;
    return `<article class="favorite-product-card"><a class="favorite-image" href="${detailHref}"><img src="${p.image}" alt="${p.name}"></a><button type="button" class="favorite-remove-btn" data-favorite-remove="${p.id}" aria-label="Favoriden çıkar">×</button><div class="favorite-copy"><a class="favorite-brand-link" href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a><h2><a href="${detailHref}">${p.name}</a></h2><div class="favorite-period">${period} Aylık Plan</div><div class="favorite-price"><b>${formatPrice(monthly)}</b><span>/ Aylık</span><strong>${formatPrice(daily)}</strong><small>/ Günlük</small></div></div></article>`;
  }).join('');
}
function couponDiscountRate(){return readJSON('castaposCoupon',{}).code==='merhaba10' ? 0.10 : 0}
function applyCouponCode(code){
  const normalized=(code||'').trim().toLowerCase();
  if(normalized==='merhaba10'){
    writeJSON('castaposCoupon',{code:'merhaba10'});
    showToast('Kupon uygulandı: %10 indirim tanımlandı.');
    return true;
  }
  writeJSON('castaposCoupon',{});
  showToast('Kupon kodu geçerli değil.');
  return false;
}
function removeCoupon(){
  writeJSON('castaposCoupon',{});
  showToast('Kupon sepetten kaldırıldı.');
  renderCartDrawer();
  initCart();
}
function saveCart(items){ localStorage.setItem(CART_KEY,JSON.stringify(items)); updateCartCount(); }
function getCartQty(){ return cartItems().reduce((n,x)=>n+x.qty,0); }
function itemMode(it){ return it.mode || 'rent'; }
function itemTotal(it){
  const p=getProduct(it.id); const qty=it.qty || 1;
  if(itemMode(it)==='buy') return (p.buyPrice || p.price) * qty;
  return monthlyPrice(p, it.period || defaultPeriod(p)) * (it.period || defaultPeriod(p)) * qty;
}
function itemLabel(it){
  const p=getProduct(it.id);
  if(itemMode(it)==='buy') return `Satın alma · ${it.qty || 1} adet`;
  return `${it.period || defaultPeriod(p)} aylık kiralama · ${it.qty || 1} adet`;
}
function removeCart(index){
  const items=cartItems();
  items.splice(index,1);
  saveCart(items);
  renderCartDrawer();
  initCart();
}

function addCart(id,period,mode='rent'){
  const p=getProduct(id); const selectedMode=mode==='buy' && p.buyPrice ? 'buy' : 'rent';
  const per=selectedMode==='buy' ? 0 : Number(period||defaultPeriod(p));
  const items=cartItems();
  const found=items.find(x=>x.id===id && itemMode(x)===selectedMode && Number(x.period||0)===per);
  if(found) found.qty+=1; else items.push({id,period:per,mode:selectedMode,qty:1});
  saveCart(items);
  renderCartDrawer();
  openCartDrawer();
}

function updateCartCount(){
  const total=getCartQty();
  document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=`${total} Ürün`);
  document.querySelectorAll('.cart-action').forEach(el=>el.classList.toggle('has-items', total>0));
}

const COMPARE_HIDDEN_KEY='castaposCompareHidden';
function compareItems(){return readJSON(COMPARE_KEY,[])}
function saveCompareItems(items){writeJSON(COMPARE_KEY,items.slice(0,3));updateCompareUI()}
function setCompareHidden(hidden){try{hidden?sessionStorage.setItem(COMPARE_HIDDEN_KEY,'1'):sessionStorage.removeItem(COMPARE_HIDDEN_KEY)}catch(e){}}
function isCompareHidden(){try{return sessionStorage.getItem(COMPARE_HIDDEN_KEY)==='1'}catch(e){return false}}
function toggleCompare(id){
  setCompareHidden(false);
  const items=compareItems();
  const exists=items.includes(id);
  if(exists){saveCompareItems(items.filter(x=>x!==id));return}
  if(items.length>=3){showToast('En fazla 3 ürün karşılaştırabilirsin.');return}
  saveCompareItems([...items,id]);
}
function ensureCompareUI(){
  if(document.querySelector('[data-compare-bar]')) return;
  document.body.insertAdjacentHTML('beforeend',`<div class="compare-bar" data-compare-bar><div class="compare-bar-products" data-compare-products></div><div class="compare-bar-actions"><button type="button" class="compare-clear" data-compare-clear>Temizle</button><button type="button" class="compare-open" data-compare-open>Karşılaştır</button></div><button type="button" class="compare-hide" data-compare-hide aria-label="Karşılaştır alanını kapat">×</button></div><div class="compare-modal-backdrop" data-compare-modal><div class="compare-modal"><div class="compare-modal-head"><div><span>Ürün Karşılaştırma</span><h2>Seçtiğin ürünleri yan yana incele</h2></div><button type="button" data-compare-close>×</button></div><div class="compare-modal-body" data-compare-modal-body></div></div></div>`);
}
function isProductDetailPage(){
  const page=location.pathname.split('/').pop() || 'index.html';
  return page==='urun-detay.html';
}
function updateCompareUI(){
  if(!isProductDetailPage()) return;
  ensureCompareUI();
  const items=compareItems();
  const bar=document.querySelector('[data-compare-bar]');
  const list=document.querySelector('[data-compare-products]');
  const hidden=isCompareHidden();
  bar?.classList.toggle('show',items.length>0 && !hidden);
  if(list) list.innerHTML=items.map(id=>{const p=getProduct(id);return `<button type="button" class="compare-mini" data-compare-remove="${id}"><img src="${p.image}" alt="${p.name}"><span>${p.name}</span><b>×</b></button>`}).join('');
  document.querySelectorAll('[data-compare-toggle]').forEach(btn=>btn.classList.toggle('active',items.includes(btn.dataset.compareToggle)));
  const open=document.querySelector('[data-compare-open]'); if(open){open.disabled=items.length<2;open.textContent=items.length<2?`Karşılaştır (${items.length}/3)`:`Karşılaştır (${items.length})`}
}
function renderCompareModal(){
  const ids=compareItems();
  if(ids.length<2){showToast('Karşılaştırmak için en az 2 ürün seçmelisin.');return}
  const products=ids.map(getProduct);
  const specLabels=[...new Set(products.flatMap(p=>(p.specs||[]).map(spec=>spec.split(':')[0].trim())))];
  const getSpec=(p,label)=>{
    const found=(p.specs||[]).find(spec=>spec.split(':')[0].trim()===label);
    return found ? found.split(':').slice(1).join(':').trim() || found : '—';
  };
  const rows=[
    ['Aylık ödeme',p=>formatPrice(monthlyPrice(p,defaultPeriod(p)))],
    ['Günlük karşılığı',p=>formatPrice(dailyPrice(p,defaultPeriod(p)))],
    ['Kategori',p=>p.collection],
    ['Marka',p=>p.brand],
    ['Kiralama seçenekleri',p=>p.periods.map(x=>x+' Ay').join(' · ')],
    ['Satın alma opsiyonu',p=>p.buyPrice?'Var':'Yok'],
    ...specLabels.map(label=>[label,p=>getSpec(p,label)])
  ];
  const body=document.querySelector('[data-compare-modal-body]');
  body.innerHTML=`<div class="compare-table" style="--compare-count:${products.length}"><div class="compare-label"></div>${products.map(p=>`<div class="compare-product-head"><img src="${p.image}" alt="${p.name}"><a href="urun-detay.html?id=${p.id}">${p.name}</a></div>`).join('')}${rows.map(([label,getter])=>`<div class="compare-label">${label}</div>${products.map(p=>`<div class="compare-value">${getter(p)}</div>`).join('')}`).join('')}</div>`;
  document.querySelector('[data-compare-modal]')?.classList.add('open');
}
function initCompare(){if(!isProductDetailPage()) return;ensureCompareUI();updateCompareUI()}


function initMobileBottomNav(){
  if(document.querySelector('[data-mobile-bottom-nav]')) return;
  document.body.insertAdjacentHTML('beforeend', `<nav class="mobile-bottom-nav" data-mobile-bottom-nav>
    <a href="index.html"><span>⌂</span><b>Ana Sayfa</b></a>
    <button type="button" data-mobile-categories-toggle><span>☰</span><b>Kategoriler</b></button>
    <a href="sepet.html"><span>🛒</span><b>Sepetim</b></a>
    <a href="favorilerim.html"><span>♡</span><b>Favoriler</b></a>
    <a href="kullanici-bilgilerim.html"><span class="mobile-user-outline"></span><b>Hesabım</b></a>
  </nav>`);
  ensureMobileCategorySheet();
  document.querySelector('[data-mobile-categories-toggle]')?.addEventListener('click',()=>document.body.classList.add('mobile-categories-open'));
}
function ensureMobileCategorySheet(){
  if(document.querySelector('[data-mobile-category-sheet]')) return;
  const rows=NAV_CATEGORIES.map((cat,index)=>{
    const items=cat.groups
      .filter(group=>!group[0].toLocaleLowerCase('tr-TR').includes('marka'))
      .flatMap(group=>group[1])
      .filter(item=>!item.all);
    const uniqueItems=[...new Map(items.map(item=>[item.label,item])).values()];
    const links=uniqueItems.map(item=>`<a href="${item.href}">${item.label}</a>`).join('');
    return `<article class="mobile-category-row"><div class="mobile-category-main"><a href="${cat.href}">${cat.name}</a><button type="button" data-mobile-category-expand="${index}" aria-label="${cat.name} alt kategorilerini aç"><span aria-hidden="true"></span></button></div><div class="mobile-category-sub" data-mobile-category-sub="${index}"><div class="mobile-category-group">${links}</div></div></article>`;
  }).join('');
  document.body.insertAdjacentHTML('beforeend',`<div class="mobile-category-backdrop" data-mobile-category-sheet><aside class="mobile-category-sheet"><div class="mobile-category-sheet-head"><h2>Kategoriler</h2><button type="button" data-mobile-category-close>×</button></div><div class="mobile-category-list">${rows}</div></aside></div>`);
  const sheet=document.querySelector('[data-mobile-category-sheet]');
  sheet.querySelector('[data-mobile-category-close]')?.addEventListener('click',()=>document.body.classList.remove('mobile-categories-open'));
  sheet.addEventListener('click',e=>{if(e.target===sheet)document.body.classList.remove('mobile-categories-open')});
  sheet.querySelectorAll('[data-mobile-category-expand]').forEach(btn=>btn.addEventListener('click',()=>{
    const index=btn.dataset.mobileCategoryExpand;
    const sub=sheet.querySelector(`[data-mobile-category-sub="${index}"]`);
    const open=sub.classList.toggle('open');
    btn.classList.toggle('open',open);
  }));
}
function initMobileFilterToggle(){
  const sidebar=document.querySelector('[data-filter-sidebar]');
  const toolbar=document.querySelector('.category-listing-toolbar');
  if(!sidebar || !toolbar || toolbar.querySelector('[data-mobile-filter-btn]')) return;
  const btn=document.createElement('button');
  btn.type='button';
  btn.className='mobile-filter-toggle';
  btn.dataset.mobileFilterBtn='1';
  btn.textContent='Filtreler';
  toolbar.prepend(btn);
  const title=sidebar.querySelector('.filter-title');
  if(title && !title.querySelector('[data-mobile-filter-close]')){
    title.innerHTML='<span>Filtreler</span><button type="button" data-mobile-filter-close aria-label="Filtreleri kapat">×</button>';
  }
  let backdrop=document.querySelector('[data-mobile-filter-backdrop]');
  if(!backdrop){
    backdrop=document.createElement('button');
    backdrop.type='button';
    backdrop.className='mobile-filter-backdrop';
    backdrop.dataset.mobileFilterBackdrop='1';
    backdrop.setAttribute('aria-label','Filtreleri kapat');
    document.body.appendChild(backdrop);
  }
  const close=()=>document.body.classList.remove('mobile-filters-open');
  btn.addEventListener('click',()=>document.body.classList.add('mobile-filters-open'));
  sidebar.querySelector('[data-mobile-filter-close]')?.addEventListener('click',close);
  backdrop.addEventListener('click',close);
}

function initCommon(){
  const y=document.querySelector('[data-year]'); if(y) y.textContent=new Date().getFullYear();
  document.querySelectorAll('[data-mobile-toggle]').forEach(btn=>btn.addEventListener('click',()=>document.body.classList.toggle('mobile-open')));
  renderNavCategories(); ensureCartDrawer(); updateCartCount(); initAccountMenu(); initHeaderSearch(); initCompare();
  initMobileBottomNav();
  initMobileFilterToggle();
  document.querySelectorAll('input[inputmode="numeric"]:not([data-phone-input])').forEach(input=>input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(0, input.maxLength>0 ? input.maxLength : 20);}));
  document.addEventListener('click',e=>{
    const add=e.target.closest('[data-add-cart]');
    if(add){ e.preventDefault(); addCart(add.dataset.addCart, add.dataset.period, add.dataset.mode || 'rent'); return; }
    const rem=e.target.closest('[data-remove-cart]');
    if(rem){ e.preventDefault(); removeCart(Number(rem.dataset.removeCart)); return; }
    const favorite=e.target.closest('[data-favorite-id]');
    if(favorite){e.preventDefault();e.stopPropagation();const card=favorite.closest('[data-product-card]');const selectedPeriod=Number(favorite.dataset.favoritePeriod || card?.dataset.selectedPeriod || defaultPeriod(getProduct(favorite.dataset.favoriteId)));toggleFavorite(favorite.dataset.favoriteId,selectedPeriod);return;}
    const favoriteRemove=e.target.closest('[data-favorite-remove]');
    if(favoriteRemove){e.preventDefault();saveFavoriteItems(favoriteItems().filter(item=>item.id!==favoriteRemove.dataset.favoriteRemove));showToast('Ürün favorilerinden çıkarıldı.');return;}
    const copyCoupon=e.target.closest('[data-copy-coupon]');
    if(copyCoupon){e.preventDefault();navigator.clipboard?.writeText(copyCoupon.dataset.copyCoupon);showToast('Kupon kodu kopyalandı.');return;}
    if(e.target.closest('[data-remove-coupon]')){e.preventDefault();removeCoupon();return;}
    if(e.target.closest('[data-ai-send]')){e.preventDefault();showToast('Sorunuz Castapos AI tarafından alındı.');return;}
    const compare=e.target.closest('[data-compare-toggle]');
    if(compare){e.preventDefault();toggleCompare(compare.dataset.compareToggle);return;}
    const compareRemove=e.target.closest('[data-compare-remove]');
    if(compareRemove){e.preventDefault();saveCompareItems(compareItems().filter(x=>x!==compareRemove.dataset.compareRemove));return;}
    if(e.target.closest('[data-compare-clear]')){e.preventDefault();setCompareHidden(false);saveCompareItems([]);return;}
    if(e.target.closest('[data-compare-hide]')){e.preventDefault();setCompareHidden(true);updateCompareUI();return;}
    if(e.target.closest('[data-compare-open]')){e.preventDefault();setCompareHidden(false);renderCompareModal();return;}
    if(e.target.closest('[data-compare-close]') || e.target.matches('[data-compare-modal]')){document.querySelector('[data-compare-modal]')?.classList.remove('open');return;}
    if(e.target.closest('[data-cart-close]')){ closeCartDrawer(); return; }
    if(e.target.classList.contains('cart-backdrop')) closeCartDrawer();
    if(!e.target.closest('.account-wrap')) document.querySelectorAll('.account-wrap.open').forEach(w=>w.classList.remove('open'));
  });
}
function showToast(message='İşleminiz alınmıştır.'){
  let t=document.querySelector('.site-toast');
  if(!t){t=document.createElement('div');t.className='site-toast';document.body.appendChild(t);}
  t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2100);
}

function initAccountMenu(){
  // Masaüstünde menü hover ile açılır; hesap bağlantısı doğrudan kullanıcı bilgilerine gider.
}

function renderNavCategories(){
  const root=document.querySelector('[data-nav-categories]'); if(!root) return;
  const normalizeItem=(item,cat)=>typeof item==='string'?{label:item,href:`kategori.html?cat=${encodeURIComponent(cat.name)}&q=${encodeURIComponent(item)}`} : item;
  root.innerHTML=NAV_CATEGORIES.map(cat=>{
    const columns=cat.groups.map(group=>{
      const links=group[1].map(item=>normalizeItem(item,cat)).filter(item=>!item.all);
      return `<div><h4>${group[0]}</h4>${links.map(item=>`<a href="${item.href}">${item.label}</a>`).join('')}</div>`;
    }).join('');
    return `<div class="nav-category ${cat.highlight?'highlight':''}"><a href="${cat.href}">${cat.name}</a><div class="mega-panel ${cat.groups.length===1?'single-column':''}">${columns}</div></div>`;
  }).join('');
  root.querySelectorAll('.nav-category').forEach(item=>item.addEventListener('mouseenter',()=>document.body.classList.add('mega-menu-open')));
  root.addEventListener('mouseleave',()=>document.body.classList.remove('mega-menu-open'));
}

function ensureCartDrawer(){
  if(document.querySelector('[data-cart-drawer]')) return;
  document.body.insertAdjacentHTML('beforeend',`<div class="cart-backdrop" data-cart-drawer><aside class="side-cart"><div class="side-cart-head"><strong>Sepetim</strong><button type="button" data-cart-close>×</button></div><div class="side-cart-body" data-cart-drawer-body></div><div class="side-cart-footer" data-cart-drawer-footer></div></aside></div>`);
}
function openCartDrawer(){document.querySelector('[data-cart-drawer]')?.classList.add('open');document.body.classList.add('cart-open')}
function closeCartDrawer(){document.querySelector('[data-cart-drawer]')?.classList.remove('open');document.body.classList.remove('cart-open')}

function renderCartDrawer(){
  const body=document.querySelector('[data-cart-drawer-body]');
  const footer=document.querySelector('[data-cart-drawer-footer]');
  if(!body || !footer) return;
  const items=cartItems();
  if(!items.length){
    body.innerHTML='<div class="empty-mini-cart"><b>Sepetin boş</b><p>Kiralama ürünlerini inceleyip sepetine ekleyebilirsin.</p></div>';
    footer.innerHTML='<button class="btn btn-soft full" type="button" data-cart-close>Alışverişe Devam Et</button><a class="btn btn-primary full" href="sepet.html">Sepete Git</a>';
    return;
  }
  const rows=items.map((it,idx)=>{
    const p=getProduct(it.id); const qty=it.qty||1;
    if(itemMode(it)==='buy'){
      return `<article class="drawer-item"><img src="${p.image}" alt="${p.name}"><div><b>${p.name}</b><span>Satın alma · ${qty} adet</span><strong>${formatPrice((p.buyPrice||p.price)*qty)}</strong></div><button class="remove-line" type="button" data-remove-cart="${idx}">Sil</button></article>`;
    }
    const period=Number(it.period||defaultPeriod(p));
    const monthly=monthlyPrice(p,period)*qty;
    const total=monthly*period; return `<article class="drawer-item"><img src="${p.image}" alt="${p.name}"><div><b>${p.name}</b><span class="drawer-period-meta">${period} aylık kiralama · ${qty} adet</span><small class="drawer-total-label">Toplam ödeme</small><strong>${formatPrice(total)}</strong></div><button class="remove-line" type="button" data-remove-cart="${idx}">Sil</button></article>`;
  }).join('');
  const monthlyTotal=items.reduce((sum,it)=>{const p=getProduct(it.id);const qty=it.qty||1;return sum+(itemMode(it)==='buy'?(p.buyPrice||p.price):monthlyPrice(p,it.period||defaultPeriod(p)))*qty},0);
  body.innerHTML=`<div class="drawer-items">${rows}</div>`;
  footer.innerHTML=`<div class="drawer-summary"><p class="grand"><span>Aylık ödeme toplamı</span><b>${formatPrice(monthlyTotal)}</b></p><p><span>Teslimat</span><b>Ücretsiz</b></p></div><button class="btn btn-soft full" type="button" data-cart-close>Alışverişe Devam Et</button><a class="btn btn-primary full" href="sepet.html">Sepete Git</a>`;
}

function productCard(p){
  const period=defaultPeriod(p);
  const monthly=monthlyPrice(p, period);
  const daily=dailyPrice(p, period);
  const badge = p.premium
    ? '<span class="discount-badge premium-badge"><i>★</i> Premium</span>'
    : (p.discount ? `<span class="discount-badge accent-badge">${p.discount}</span>` : '');
  return `<article class="compact-product-card modern-rental-card" data-product-card="${p.id}" data-selected-period="${period}">
    <a class="product-img" href="urun-detay.html?id=${p.id}">${badge}<button class="fav-btn" type="button" data-favorite-id="${p.id}" data-favorite-period="${period}" aria-label="Favorilere ekle">${heartIcon(false)}</button><img src="${p.image}" alt="${p.name}"></a>
    <div class="product-info">
      <a class="product-name" href="urun-detay.html?id=${p.id}">${p.name}</a>
      <div class="rating-row"><span>★ 4,7</span><small>(${ratingCount(p)})</small></div>
      <div class="card-periods">${p.periods.map(m=>`<button type="button" class="card-period-btn ${m===period?'active':''}" data-card-period="${m}">${m} Ay</button>`).join('')}</div>
      <div class="price-block rental-card-block compact-price-only">
        <div class="monthly-primary"><strong data-card-monthly>${formatPrice(monthly).replace(' TL',' ₺')}</strong><span>/ Aylık</span></div>
        <div class="daily-secondary"><strong data-card-daily>${formatPrice(daily).replace(' TL','₺')}</strong><span>/ Gün</span></div>
      </div>
      <button class="card-wide-btn standalone" type="button" data-add-cart="${p.id}" data-period="${period}">Hemen kirala</button>
    </div>
  </article>`;
}

function bindProductCards(scope=document){
  scope.querySelectorAll('[data-product-card]').forEach(card=>{
    const p=getProduct(card.dataset.productCard);
    card.querySelectorAll('[data-card-period]').forEach(btn=>btn.addEventListener('click',()=>{
      const period=Number(btn.dataset.cardPeriod);
      const monthly=monthlyPrice(p, period);
      const daily=dailyPrice(p, period);
      card.dataset.selectedPeriod=String(period);
      card.querySelectorAll('[data-card-period]').forEach(chip=>chip.classList.toggle('active', chip===btn));
      const monthlyEl=card.querySelector('[data-card-monthly]'); if(monthlyEl) monthlyEl.textContent=formatPrice(monthly).replace(' TL',' ₺');
      const dailyEl=card.querySelector('[data-card-daily]'); if(dailyEl) dailyEl.textContent=formatPrice(daily).replace(' TL','₺');
      const addBtn=card.querySelector('[data-add-cart]'); if(addBtn) addBtn.dataset.period=String(period);
      const favoriteBtn=card.querySelector('[data-favorite-id]'); if(favoriteBtn) favoriteBtn.dataset.favoritePeriod=String(period);
    }));
  });
  updateFavoriteButtons();
  updateCompareUI();
}

function renderEasySteps(){
  const root=document.querySelector('[data-easy-steps]'); if(!root) return;
  const items=[
    {icon:'🖱️', title:'Kiralamak istediğin ürünü seç', text:'İhtiyacına uygun modeli birkaç tıkla belirle.'},
    {icon:'📦', title:'Adres ve kiralama süreni belirle', text:'1, 3, 6 veya 9 ay seçeneklerinden sana uygun planı seç.'},
    {icon:'🛋️', title:'Ürünü teslim al ve kullan', text:'Ürünü evinde deneyimle, günlük yaşamına gerçekten uyuyor mu gör.'},
    {icon:'🔁', title:'Süreni uzat, iade et veya satın al', text:'Deneyim sonrası kararını rahatça ver, süreci esnek şekilde yönet.'}
  ];
  root.innerHTML=items.map((item,idx)=>`<article class="easy-step-card"><div class="easy-step-icon">${item.icon}</div><h3>${item.title}</h3><p>${item.text}</p>${idx<items.length-1?'<span class="easy-step-arrow">→</span>':''}</article>`).join('');
}

function renderHomeTestimonials(){
  const root=document.querySelector('[data-home-testimonials]'); if(!root) return;
  root.innerHTML=HOME_TESTIMONIALS.map(item=>{
    const p=getProduct(item.productId);
    return `<a class="testimonial-card" href="urun-detay.html?id=${item.productId}"><div class="testimonial-top"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><div class="gold-stars small">${starIcons(item.rating)}</div></div></div><p>${item.text}</p><div class="testimonial-meta"><span>${item.name}</span><b>${item.date}</b></div></a>`;
  }).join('');
}

function initHome(){
  initPromoSlider();
  renderEasySteps();
  renderHomeTestimonials();
  const rail=document.querySelector('[data-popular-products]');
  if(rail){rail.innerHTML=PRODUCTS.slice(0,14).map(productCard).join(''); bindProductCards(rail);}
  const left=document.querySelector('[data-rail-left]'), right=document.querySelector('[data-rail-right]');
  left?.addEventListener('click',()=>rail.scrollBy({left:-620,behavior:'smooth'}));
  right?.addEventListener('click',()=>rail.scrollBy({left:620,behavior:'smooth'}));
  const newRail=document.querySelector('[data-new-products]');
  if(newRail){newRail.innerHTML=PRODUCTS.slice().reverse().slice(0,12).map(productCard).join(''); bindProductCards(newRail);}
  document.querySelector('[data-new-left]')?.addEventListener('click',()=>newRail.scrollBy({left:-620,behavior:'smooth'}));
  document.querySelector('[data-new-right]')?.addEventListener('click',()=>newRail.scrollBy({left:620,behavior:'smooth'}));
}

function initPromoSlider(){
  const slider=document.querySelector('[data-promo-slider]'); if(!slider) return;
  const slides=[...slider.querySelectorAll('.promo-slide')]; const dots=slider.querySelector('[data-promo-dots]'); let i=0; let timer;
  dots.innerHTML=slides.map((_,idx)=>`<button class="${idx===0?'active':''}" data-dot="${idx}" aria-label="${idx+1}. afiş"></button>`).join('');
  function go(n){ i=(n+slides.length)%slides.length; slides.forEach((s,idx)=>s.classList.toggle('active',idx===i)); dots.querySelectorAll('button').forEach((d,idx)=>d.classList.toggle('active',idx===i)); }
  function start(){ timer=setInterval(()=>go(i+1),5000); }
  function stop(){ clearInterval(timer); }
  slider.querySelector('[data-promo-prev]')?.addEventListener('click',()=>{go(i-1); stop(); start();});
  slider.querySelector('[data-promo-next]')?.addEventListener('click',()=>{go(i+1); stop(); start();});
  dots.querySelectorAll('button').forEach(d=>d.addEventListener('click',()=>{go(Number(d.dataset.dot)); stop(); start();}));
  slider.addEventListener('mouseenter',stop); slider.addEventListener('mouseleave',start); start();
}

function categoryTypeConfig(label){
  let title='Ürün Tipi';
  if(['Ev Aletleri','Güzellik Teknolojileri','Elektronik','Yaz Sezonu'].includes(label)) title='Ürün Türleri';
  return {title, options: TYPE_FILTERS[label] || TYPE_FILTERS['Spor Aletleri']};
}

function matchesType(product, type){
  if(!type || type==='Tüm ürünler') return true;
  const hay=(product.name+' '+product.summary+' '+product.specs.join(' ')+' '+product.category+' '+product.brand).toLocaleLowerCase('tr-TR');
  const map={
    'Katlanabilir':['katlan'], 'Sessiz motor':['sessiz'], 'Satın alma opsiyonlu':['satın alma','opsiyon'], 'Ev tipi':['ev tipi','ev '],
    'Ofis altı':['ofis'], 'Sessiz':['sessiz'], 'Kumandalı':['kumanda'], 'Dikey':['dikey'], 'Şehir tipi':['şehir'],
    'Akıllı bisiklet':['akıllı','yapay zeka','bluetooth'], 'Stepper':['stepper'], 'Eliptik':['eliptik'], 'Akıllı antrenman':['akıllı','bluetooth','vr'],
    'Kardiyo':['kardiyo'], 'Halı ve koltuk yıkama':['halı','koltuk'], 'Leke çıkarma':['leke'], 'Ev temizliği':['temizlik'], 'Buharlı temizlik':['buhar'], 'Zemin temizliği':['zemin','temizlik'],
    'Saç bakım teknolojileri':['saç'], 'Cilt bakım cihazları':['cilt'], 'Kişisel bakım cihazları':['kişisel bakım'], 'Oyun teknolojileri':['oyun','vr'], 'Spor teknolojileri':['spor teknoloji','vr'], 'Ev / Ofis teknolojileri':['ev','ofis'],
    'Koşu':['koşu'], 'Yürüyüş':['yürüyüş'], 'Bisiklet':['bisiklet'], 'Fitness':['fitness'], 'Koşu Bantları':['koşu'], 'Yürüyüş Bantları':['yürüyüş'], 'Ev Aletleri':['temizlik','ev aletleri','halı','koltuk']
  };
  const tokens=map[type] || [type.toLocaleLowerCase('tr-TR')];
  return tokens.some(t=>hay.includes(t));
}

function initCategory(){
  const grid=document.querySelector('[data-product-grid]'); if(!grid) return;
  const title=document.querySelector('[data-category-title]');
  const h1=document.querySelector('[data-listing-h1]');
  const count=document.querySelector('[data-result-count]');
  const toolbar=document.querySelector('[data-toolbar-title]');
  const search=document.querySelector('[data-search-input]');
  const sort=document.querySelector('[data-sort]');
  const brandWrap=document.querySelector('[data-brand-filters]');
  const typeWrap=document.querySelector('[data-type-filters]');
  const typeTitle=document.querySelector('[data-type-title]');
  let active=q('cat') || '';
  let keyword=q('q') || '';
  let brand='';
  let activeType='Tüm ürünler';
  if(search && keyword) search.value=keyword;

  if(brandWrap){
    brandWrap.innerHTML=uniqueBrands().map(b=>`<label class="fake-check"><input type="checkbox" data-brand="${b}"> ${b}</label>`).join('');
    brandWrap.querySelectorAll('[data-brand]').forEach(ch=>ch.addEventListener('change',()=>{
      brand=ch.checked?ch.dataset.brand:''; brandWrap.querySelectorAll('[data-brand]').forEach(x=>{if(x!==ch)x.checked=false}); render();
    }));
  }
  function renderTypeOptions(){
    if(!typeWrap || !typeTitle) return;
    const label=active || 'Spor Aletleri';
    const cfg=categoryTypeConfig(label);
    typeTitle.textContent=cfg.title;
    typeWrap.innerHTML=cfg.options.map((opt,i)=>`<button class="filter-chip ${i===0?'active':''}" data-type="${opt}">${opt}</button>`).join('');
    activeType='Tüm ürünler';
    typeWrap.querySelectorAll('[data-type]').forEach(btn=>btn.addEventListener('click',()=>{
      typeWrap.querySelectorAll('[data-type]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeType=btn.dataset.type; render();
    }));
  }
  function list(){
    let arr=PRODUCTS.slice();
    if(active==='Spor Aletleri') arr=arr.filter(p=>['Koşu Bantları','Yürüyüş Bantları','Bisiklet','Fitness'].includes(p.collection));
    else if(active && !['Yaz Sezonu','Premium'].includes(active)) arr=arr.filter(p=>p.collection===active || p.category===active);
    if(active==='Premium') arr=arr.filter(p=>p.premium);
    if(active==='Yaz Sezonu') arr=arr.filter(p=>['Bisiklet','Fitness','Yürüyüş Bantları'].includes(p.collection));
    const kw=(search?.value || keyword || '').trim().toLocaleLowerCase('tr-TR');
    if(kw) arr=arr.filter(p=>(p.name+' '+p.brand+' '+p.category+' '+p.code+' '+p.summary).toLocaleLowerCase('tr-TR').includes(kw));
    if(brand) arr=arr.filter(p=>p.brand===brand);
    arr=arr.filter(p=>matchesType(p, activeType));
    const s=sort?.value || 'featured';
    if(s==='low') arr.sort((a,b)=>a.price-b.price);
    if(s==='high') arr.sort((a,b)=>b.price-a.price);
    if(s==='name') arr.sort((a,b)=>a.name.localeCompare(b.name,'tr'));
    if(s==='new') arr=arr.slice().reverse();
    if(s==='popular') arr.sort((a,b)=>ratingCount(b)-ratingCount(a));
    return arr;
  }
  function render(){
    const arr=list();
    const label=active || 'Tüm Ürünler';
    if(title) title.textContent=label;
    if(h1) h1.textContent=label;
    if(toolbar) toolbar.textContent=label;
    if(count) count.textContent=`${arr.length} ürün`;
    grid.innerHTML=arr.map(productCard).join('') || '<div class="empty-state">Bu filtrelere uygun ürün bulunamadı.</div>';
    bindProductCards(grid);
  }
  search?.addEventListener('input',render); sort?.addEventListener('change',render);
  renderTypeOptions(); render();
}

function buildDetailTabs(p){
  const pack=getReviewPack(p.id);
  const reviewFilters=['Tümü',5,4,3,2,1];
  const reviews=expandedReviews(pack.reviews);
  const qaItems=expandedQa(pack.qa);
  return `<div class="detail-tabs" data-detail-tabs>
    <button class="active" data-tab="description">Ürün Açıklaması</button>
    <button data-tab="specs">Teknik Özellikler</button>
    <button id="reviews-anchor" data-tab="reviews">Değerlendirmeler</button>
    <button data-tab="qa">Soru & Cevap</button>
    <button data-tab="return">İptal & İade Koşulları</button>
  </div>
  <div class="detail-tab-panels">
    <section class="detail-tab-panel active" data-panel="description">
      <h3>Ürün Hakkında</h3>
      <p>${highlightSummary(p.summary)}</p>
      <p>Bu ürün; <strong>${p.periods.join(', ')} ay</strong> kiralama seçenekleri, <strong>${p.specs[0].includes(':') ? p.specs[0].split(':').slice(1).join(':').trim() : p.specs[0]}</strong> ve <strong>${p.specs[1].includes(':') ? p.specs[1].split(':').slice(1).join(':').trim() : p.specs[1]}</strong> gibi temel verileriyle satın alma öncesi deneme ihtiyacına cevap verir.</p>
    </section>
    <section class="detail-tab-panel" data-panel="specs">
      <h3>Teknik Özellikler</h3>
      <div class="spec-table">${p.specs.map(s=>`<div><span>${s.split(':')[0]}</span><b>${s.includes(':')?s.split(':').slice(1).join(':').trim():s}</b></div>`).join('')}</div>
    </section>
    <section class="detail-tab-panel" data-panel="reviews">
      <h3>Değerlendirmeler</h3>
      <div class="reviews-shell" data-reviews-root>
        <div class="review-summary-box"><div><strong>${String(pack.average).replace('.',',')}</strong><span>Genel ürün puanı</span></div><div class="gold-stars">${starIcons(Math.round(pack.average))}</div></div>
        <div class="review-form-box"><h4>Değerlendirme Yap</h4><div class="review-rating-pick" data-star-pick>${[1,2,3,4,5].map(n=>`<button type="button" data-rate="${n}">${n} ★</button>`).join('')}</div><textarea placeholder="Ürünü kullandıysan deneyimini kısaca paylaşabilirsin."></textarea><button type="button" class="btn btn-primary" data-submit-review>Yorumu Gönder</button></div>
        <div class="review-filter-bar" data-review-filter>${reviewFilters.map(f=>`<button type="button" data-filter="${f}" class="${f==='Tümü'?'active':''}">${f==='Tümü'?'Tümü':f+' Yıldız'}</button>`).join('')}</div>
        <div class="qa-list review-list" data-review-list>${reviews.map(r=>`<article data-rating="${r.rating}"><div class="review-head"><b>${r.name}</b><span class="gold-stars small">${starIcons(r.rating)}</span></div><p>${r.text}</p></article>`).join('')}</div>
      </div>
    </section>
    <section class="detail-tab-panel" data-panel="qa">
      <h3>Soru & Cevap</h3>
      <div class="qa-list" data-qa-list>${qaItems.map(item=>`<article><b>Alper A.</b><p>${item.q}</p><div class="qa-answer"><strong>Castapos yanıtı</strong><p>${item.a}</p></div></article>`).join('')}</div>
      <div class="question-box"><h4>Sorunu Sor</h4><p>Ürünle ilgili merak ettiğin konuyu yaz; destek ekibi en kısa sürede dönüş sağlar.</p><textarea placeholder="Örn: Teslimat, kurulum veya kiralama uzatma süreci hakkında soru sorabilirsin."></textarea><div class="question-actions single-action"><button type="button" class="btn btn-primary" data-submit-question>Soru Gönder</button></div></div>
    </section>
    <section class="detail-tab-panel" data-panel="return">
      <h3>İptal & İade Koşulları</h3>
      <p>İade ve iptal süreçleri ürün kategorisine ve kiralama planına göre değişebilir. Teslimat öncesi iptal, kullanım süresi sonunda iade ve ürün kontrolü ilgili koşullar kapsamında yürütülür.</p>
      <ul class="return-list"><li>Teslimat öncesi iptal talebi destek ekibi üzerinden alınır.</li><li>Kiralama sonunda ürün kontrolü sonrası iade süreci tamamlanır.</li><li>Satın alma opsiyonu bulunan ürünlerde kira sonrası satın alma değerlendirmesi yapılabilir.</li></ul>
    </section>
  </div>`;
}

function initProductDetail(){
  const root=document.querySelector('[data-product-detail]'); if(!root) return;
  const p=getProduct(q('id')); const requestedPeriod=Number(q('period')); let period=p.periods.includes(requestedPeriod)?requestedPeriod:defaultPeriod(p); let mode='rent';
  document.title=p.name+' | Castapos';
  function render(){
    const currentMonthly=monthlyPrice(p,period);
    const rentTotal=currentMonthly*period;
    const buyActive=Boolean(p.buyPrice);
    const buyMeta = buyActive ? `<div class="compact-buy-meta active"><span>Satın alma opsiyonu</span><b>Aktif</b></div>` : `<div class="compact-buy-meta inactive"><span>Satın alma opsiyonu</span><b>Aktif değil</b></div>`;
    const reviewCount=ratingCount(p);
    const selectedTotal=mode==='buy' && buyActive ? p.buyPrice : rentTotal;
    const actionMode=mode==='buy' && buyActive ? 'buy' : 'rent';
    root.innerHTML=`<section class="detail-section"><div class="container product-detail-grid refined compact-detail-grid"><div class="gallery-panel detail-clean"><div class="main-gallery-image clean product-hero-image"><img src="${p.image}" alt="${p.name}"></div><div class="thumb-row clean"><span><img src="${p.image}" alt=""></span><span><img src="${p.image}" alt=""></span><span><img src="${p.image}" alt=""></span><span><img src="${p.image}" alt=""></span></div></div><div class="detail-panel refined clean compact-panel"><div class="detail-top-row"><nav class="breadcrumb"><a href="index.html">Ana Sayfa</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}">${p.collection}</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a></nav><div class="detail-top-actions"><button type="button" class="detail-compare-btn" data-compare-toggle="${p.id}">⇄ Karşılaştır</button><button type="button" class="detail-fav-btn" data-favorite-id="${p.id}" data-favorite-period="${period}" aria-label="Favorilere ekle">${heartIcon(false)}</button></div></div><h1>${p.name}</h1><div class="detail-rating">★ 4,7 <button type="button" class="review-link" data-open-reviews>(${reviewCount} değerlendirme)</button></div><div class="detail-price-grid selectable"><button type="button" class="price-mini-card ${mode==='rent'?'active':''}" data-choice="rent"><small>Kirala</small><b>${formatPrice(currentMonthly)}</b><span>/ aylık ödeme</span></button><button type="button" class="price-mini-card ${mode==='buy'?'active':''} ${buyActive?'buy-available':'buy-disabled'}" ${buyActive?'data-choice="buy"':'disabled'}><small>Satın Al</small><b>${buyActive ? formatPrice(p.buyPrice) : 'Aktif değil'}</b><span>${buyActive ? 'tek sefer ödeme' : 'yalnızca kiralama'}</span></button></div><div class="periods top-periods compact-pills ${mode==='buy'?'disabled-periods':''}"><label>Kiralama Süresi</label><div>${p.periods.map(m=>`<button class="period-chip ${m===period?'active':''}" data-period="${m}" ${mode==='buy'?'disabled':''}>${m} Ay</button>`).join('')}</div></div><div class="key-benefits compact tighter"><a href="sikca-sorulan-sorular.html">✓ Ücretsiz teslimat</a><a href="iletisim.html">✓ Teknik servis desteği</a><a href="nasil-calisir.html">✓ Satın alma opsiyonu</a></div><div class="installment-box refined compact cleaner light"><span>${mode==='buy' && buyActive ? 'Satın alma toplamı' : `Toplam · <strong class="period-accent">${period} Ay</strong>`}</span><div class="big-total">${formatPrice(selectedTotal)}</div>${mode==='buy' && buyActive ? `<em class="detail-buy-note"><span class="metric-label">Tek seferlik satın alma tutarı.</span></em>` : `<em class="detail-monthly-cost"><span class="metric-label">Aylık ödeme tutarı:</span> <strong class="metric-value">${formatPrice(currentMonthly)}</strong></em>`}</div>${buyMeta}<div class="detail-actions compact-actions single"><button class="btn btn-primary" data-add-cart="${p.id}" data-period="${period}" data-mode="${actionMode}" type="button">Sepete Ekle</button></div></div></div></section><section class="section product-info-section"><div class="container">${buildDetailTabs(p)}</div></section><section class="section compact-section"><div class="container section-title-row"><h2>Benzer ürünler</h2></div><div class="container catalog-grid">${PRODUCTS.filter(x=>x.id!==p.id && x.collection===p.collection).slice(0,4).map(productCard).join('')}</div></section>`;
    root.querySelectorAll('.period-chip').forEach(b=>b.addEventListener('click',()=>{period=Number(b.dataset.period); render();}));
    root.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.choice; render();}));
    root.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-tab]').forEach(b=>b.classList.remove('active')); root.querySelectorAll('[data-panel]').forEach(pnl=>pnl.classList.remove('active')); btn.classList.add('active'); root.querySelector(`[data-panel="${btn.dataset.tab}"]`)?.classList.add('active'); }));
    root.querySelector('[data-open-reviews]')?.addEventListener('click',()=>{ const btn=root.querySelector('[data-tab="reviews"]'); btn?.click(); document.getElementById('reviews-anchor')?.scrollIntoView({behavior:'smooth', block:'start'}); });
    updateFavoriteButtons();
    root.querySelector('[data-submit-review]')?.addEventListener('click',()=>showToast('Değerlendirmen alındı.'));
    root.querySelector('[data-submit-question]')?.addEventListener('click',()=>showToast('Sorun destek ekibine iletildi.'));
    root.querySelectorAll('[data-star-pick] [data-rate]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-star-pick] [data-rate]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }));
    root.querySelectorAll('[data-review-filter] [data-filter]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-review-filter] [data-filter]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const value=btn.dataset.filter; root.querySelectorAll('[data-review-list] article').forEach(card=>{ const pass=(value==='Tümü' || card.dataset.rating===value); card.hidden=!pass; }); }));
    root.querySelectorAll('[data-load-more]').forEach(btn=>btn.addEventListener('click',()=>{ if(btn.dataset.done==='1'){ showToast(); return; } const type=btn.dataset.loadMore; const holder=root.querySelector(type==='reviews'?'[data-review-list]':'[data-qa-list]'); const hidden=[...holder.querySelectorAll('article[hidden]')].slice(0,10); hidden.forEach(el=>el.hidden=false); if(holder.querySelectorAll('article[hidden]').length===0){ btn.textContent='Tümünü Gör'; btn.dataset.done='1'; } }));
    bindProductCards(root);
  }
  render();
}

function initSupportWidget(){
  const page=location.pathname.split('/').pop() || 'index.html';
  if(!['index.html','kategori.html','urun-detay.html','nasil-calisir.html',''].includes(page)) return;
  if(document.querySelector('[data-support-widget]')) return;
  document.body.insertAdjacentHTML('beforeend', `<div class="support-widget" data-support-widget>
    <div class="support-panel castapos-ai-panel">
      <div class="ai-panel-head"><span class="ai-brand-icon">✦</span><div><b>Castapos AI</b><small><i></i> 7/24 Çevrimiçi</small></div><button type="button" data-support-close aria-label="Kapat">×</button></div>
      <div class="ai-panel-body">
        <div class="ai-greeting">Merhaba, Castapos destek hattına hoş geldiniz.<br><br>Size hızlıca yardımcı olabilmem için aşağıdaki başlıklardan birini seçebilir veya sorunuzu yazabilirsiniz.</div>
        <a href="nasil-calisir.html" class="ai-option">Kiralama süreci hakkında bilgi almak istiyorum</a>
        <a href="kategori.html" class="ai-option">Ürün seçimi konusunda yardım</a>
        <a href="sikca-sorulan-sorular.html" class="ai-option">Teslimat ve kurulum desteği</a>
        <a href="iptal-iade-kosullari.html" class="ai-option">İptal ve iade süreci</a>
        <a class="ai-whatsapp-link" href="https://wa.me/905448010433" target="_blank" rel="noopener"><span>WhatsApp Destek Hattı</span><b>→</b></a>
      </div>
      <div class="ai-input-row"><input type="text" placeholder="Sorunuzu yazın..."><button type="button" data-ai-send aria-label="Gönder">→</button></div>
    </div>
    <button type="button" class="support-fab" data-support-toggle><span>✦</span> Castapos AI</button>
  </div>`);
  const wrap=document.querySelector('[data-support-widget]');
  wrap.querySelector('[data-support-toggle]')?.addEventListener('click',()=>wrap.classList.toggle('open'));
  wrap.querySelector('[data-support-close]')?.addEventListener('click',()=>wrap.classList.remove('open'));
}

function initCart(){
  const root=document.querySelector('[data-cart]'); if(!root) return;
  const items=cartItems();
  if(!items.length){root.innerHTML='<div class="empty-cart-page"><h1>Sepetin boş</h1><p>Kiralama ürünlerini inceleyip sepetine ekleyebilirsin.</p><a class="btn btn-primary" href="kategori.html">Ürünleri Keşfet</a></div>'; return;}
  const rows=items.map((it,idx)=>{
    const p=getProduct(it.id); const qty=it.qty||1; const detailHref=`urun-detay.html?id=${p.id}`;
    if(itemMode(it)==='buy'){
      const total=(p.buyPrice||p.price)*qty;
      return `<article class="rental-plan-item"><a class="cart-product-image" href="${detailHref}"><img src="${p.image}" alt="${p.name}"></a><div class="plan-product-copy"><a class="cart-product-brand" href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a><h2><a href="${detailHref}">${p.name}</a></h2><div class="plan-meta-row"><div class="selected-plan-tag"><span>İşlem</span><b>Satın Alma</b></div><div class="delivery-estimate"><span>Tahmini teslimat</span><b>1–3 İş Günü</b></div></div></div><div class="plan-price-summary"><span>Satın Alma Toplamı</span><b>${formatPrice(total)}</b><button type="button" data-remove-cart="${idx}">Ürünü kaldır</button></div></article>`;
    }
    const period=Number(it.period||defaultPeriod(p));
    const monthly=monthlyPrice(p,period)*qty;
    const daily=dailyPrice(p,period)*qty;
    const planTotal=monthly*period;
    return `<article class="rental-plan-item"><a class="cart-product-image" href="${detailHref}&period=${period}"><img src="${p.image}" alt="${p.name}"></a><div class="plan-product-copy"><a class="cart-product-brand" href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a><h2><a href="${detailHref}&period=${period}">${p.name}</a></h2><div class="plan-meta-row"><div class="selected-plan-tag"><span>Seçili plan</span><b>${period} Ay</b></div><div class="delivery-estimate"><span>Tahmini teslimat</span><b>1–3 İş Günü</b></div></div></div><div class="plan-price-summary"><span>${period} aylık toplam ödeme</span><b>${formatPrice(planTotal)}</b><small>Günlük karşılığı <strong class="daily-cart-value">${formatPrice(daily)}</strong></small><button type="button" data-remove-cart="${idx}">Ürünü kaldır</button></div></article>`;
  }).join('');
  const monthlyTotal=items.reduce((sum,it)=>{const p=getProduct(it.id);const qty=it.qty||1;return sum+(itemMode(it)==='buy'?(p.buyPrice||p.price):monthlyPrice(p,it.period||defaultPeriod(p)))*qty},0);
  const discountRate=couponDiscountRate();
  const discountAmount=Math.round(monthlyTotal*discountRate);
  const discountedMonthly=monthlyTotal-discountAmount;
  const couponStatus=discountRate?`<div class="applied-coupon"><span><b>merhaba10</b> · Her ay %10 indirim</span><button type="button" data-remove-coupon>Kuponu kaldır</button></div>`:'';
  root.innerHTML=`<div class="rental-cart-layout"><main class="rental-cart-main"><div class="cart-item-count"><span>${items.length} ürün sepetinde</span></div><div class="rental-plan-list">${rows}</div><label class="coupon-box rental-coupon"><span>Kupon kodu</span><div><input placeholder="Kupon kodu gir" value="${discountRate?'merhaba10':''}"><button type="button" data-apply-coupon-page>Uygula</button></div>${couponStatus}</label><a class="text-link" href="kategori.html">← Alışverişe devam et</a></main><aside class="rental-plan-summary"><span class="summary-kicker">Ödeme özeti</span><h2>Aylık kiralama</h2><div><span>Aylık ödeme toplamı</span><b>${formatPrice(monthlyTotal)}</b></div>${discountRate?`<div class="summary-saving"><span>Her ay kupon indirimi</span><b>- ${formatPrice(discountAmount)}</b></div>`:''}<div><span>Teslimat</span><b>Ücretsiz</b></div><div class="first-payment"><span>Aylık ödenecek tutar</span><b>${formatPrice(discountedMonthly)}</b></div>${discountRate?'<p class="coupon-summary-note">Kupon indirimi seçili kiralama süresi boyunca her aylık ödemeye uygulanır.</p>':''}<button class="btn btn-primary full" type="button" data-checkout>Kiralama planını onayla</button></aside></div>`;
  root.querySelector('[data-apply-coupon-page]')?.addEventListener('click',()=>{applyCouponCode(root.querySelector('.coupon-box input')?.value||'');initCart();});
  root.querySelector('[data-checkout]')?.addEventListener('click',()=>showToast('Kiralama planın onay için hazır.'));
}



function formatPhoneInput(phone){
  const nums=phone.value.replace(/\D/g,'').slice(0,10);
  let formatted='';
  if(nums.length) formatted='('+nums.slice(0,3);
  if(nums.length>=3) formatted+=')';
  if(nums.length>3) formatted+=' '+nums.slice(3,6);
  if(nums.length>6) formatted+=' '+nums.slice(6,8);
  if(nums.length>8) formatted+=' '+nums.slice(8,10);
  phone.value=formatted;
}
function initPhoneInputs(){
  document.querySelectorAll('[data-phone-input]').forEach(phone=>{
    if(phone.dataset.phoneBound==='1') return;
    phone.dataset.phoneBound='1';
    phone.maxLength=16;
    phone.addEventListener('input',()=>formatPhoneInput(phone));
  });
}

function initProfileForm(){
  const form=document.querySelector('[data-profile-form]');
  if(!form) return;
  const districts=['Adalar','Arnavutköy','Ataşehir','Avcılar','Bağcılar','Bahçelievler','Bakırköy','Başakşehir','Bayrampaşa','Beşiktaş','Beykoz','Beylikdüzü','Beyoğlu','Büyükçekmece','Çatalca','Çekmeköy','Esenler','Esenyurt','Eyüpsultan','Fatih','Gaziosmanpaşa','Güngören','Kadıköy','Kağıthane','Kartal','Küçükçekmece','Maltepe','Pendik','Sancaktepe','Sarıyer','Silivri','Sultanbeyli','Sultangazi','Şile','Şişli','Tuzla','Ümraniye','Üsküdar','Zeytinburnu'];
  const city=form.querySelector('[data-city-select]');
  const district=form.querySelector('[data-district-select]');
  const phone=form.querySelector('[data-phone-input]');
  const countryCode=form.querySelector('[data-country-code]');
  if(countryCode && countryCode.options.length===1){countryCode.innerHTML='<option value="+90" selected>🇹🇷 +90</option><option value="+1">🇺🇸 +1</option><option value="+49">🇩🇪 +49</option><option value="+44">🇬🇧 +44</option>';}
  if(city && district){
    const fillDistricts=()=>{
      district.innerHTML='<option value="">İlçe seçin</option>' + (city.value==='İstanbul' ? districts.map(name=>`<option value="${name}">${name}</option>`).join('') : '');
      district.disabled=city.value!=='İstanbul';
    };
    city.addEventListener('change',fillDistricts);
    fillDistricts();
  }
  if(phone){
    phone.maxLength=16;
    phone.dataset.phoneBound='1';
    phone.addEventListener('input',()=>formatPhoneInput(phone));
  }
}

initCommon(); initHome(); initCategory(); initProductDetail(); initCart(); renderCartDrawer(); initSupportWidget(); renderFavoritesPage(); updateFavoriteButtons(); initProfileForm(); initPhoneInputs();


/* === V32 behavior patch === */
(function(){
  const page=(location.pathname.split('/').pop()||'index.html').replace('.html','') || 'home';
  document.body.classList.add('page-'+page);

  const cityList=['Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin','Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkari','Hatay','Isparta','Mersin','İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş','Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak','Aksaray','Bayburt','Karaman','Kırıkkale','Batman','Şırnak','Bartın','Ardahan','Iğdır','Yalova','Karabük','Kilis','Osmaniye','Düzce'];
  const countryPhoneMeta={'+90':10,'+1':10,'+44':10,'+49':11};
  function activeCartItems(){ return cartItems(); }
  function saveCartAndRefresh(items){ saveCart(items); renderCartDrawer(); initCart(); }
  function supportsIstanbulOnly(item){ const p=getProduct(item.id); return ['Koşu Bantları','Yürüyüş Bantları','Bisiklet','Fitness','Spor Aletleri'].includes(p.collection) || ['Koşu Bantları','Yürüyüş Bantları','Bisiklet','Fitness'].includes(p.category); }
  function cartHasSports(){ return activeCartItems().some(supportsIstanbulOnly); }

  window.updateCartItemQty=function(index,delta){
    const items=activeCartItems();
    const item=items[index];
    if(!item) return;
    item.qty=Math.max(1,(item.qty||1)+delta);
    saveCartAndRefresh(items);
  }

  // richer product card periods
  productCard=function(p){
    const period=defaultPeriod(p);
    const monthly=monthlyPrice(p, period);
    const daily=dailyPrice(p, period);
    const badge = p.premium
      ? '<span class="discount-badge premium-badge"><i>★</i> Premium</span>'
      : (p.discount ? `<span class="discount-badge accent-badge">${p.discount}</span>` : '');
    const basePeriods=p.periods.slice(0,3);
    const extraPeriods=p.periods.slice(3);
    return `<article class="compact-product-card modern-rental-card" data-product-card="${p.id}" data-selected-period="${period}">
      <a class="product-img" href="urun-detay.html?id=${p.id}">${badge}<button class="fav-btn" type="button" data-favorite-id="${p.id}" data-favorite-period="${period}" aria-label="Favorilere ekle">${heartIcon(false)}</button><img src="${p.image}" alt="${p.name}"></a>
      <div class="product-info">
        <a class="product-name" href="urun-detay.html?id=${p.id}">${p.name}</a>
        <div class="rating-row"><span>★ 4,7</span><small>(${ratingCount(p)})</small></div>
        <div class="card-periods${extraPeriods.length?' has-extra':''}">
          ${basePeriods.map(m=>`<button type="button" class="card-period-btn ${m===period?'active':''}" data-card-period="${m}">${m} Ay</button>`).join('')}
          ${extraPeriods.length?`<div class="extra-periods">${extraPeriods.map(m=>`<button type="button" class="card-period-btn ${m===period?'active':''}" data-card-period="${m}">${m} Ay</button>`).join('')}</div><button type="button" class="period-toggle-btn" data-toggle-periods>+</button>`:''}
        </div>
        <div class="price-block rental-card-block compact-price-only">
          <div class="monthly-primary"><strong data-card-monthly>${formatPrice(monthly).replace(' TL',' ₺')}</strong><span>/ aylık</span></div>
          <div class="daily-secondary"><strong data-card-daily>${formatPrice(daily).replace(' TL',' ₺')}</strong><span>/ günlük</span></div>
        </div>
        <button class="card-wide-btn standalone" type="button" data-add-cart="${p.id}" data-period="${period}">Hemen kirala</button>
      </div>
    </article>`;
  };

  bindProductCards=function(scope=document){
    scope.querySelectorAll('[data-product-card]').forEach(card=>{
      const p=getProduct(card.dataset.productCard);
      card.querySelector('[data-toggle-periods]')?.addEventListener('click',()=>card.querySelector('.card-periods')?.classList.toggle('expanded'));
      card.querySelectorAll('[data-card-period]').forEach(btn=>btn.addEventListener('click',()=>{
        const period=Number(btn.dataset.cardPeriod);
        const monthly=monthlyPrice(p, period);
        const daily=dailyPrice(p, period);
        card.dataset.selectedPeriod=String(period);
        card.querySelectorAll('[data-card-period]').forEach(chip=>chip.classList.toggle('active', chip===btn));
        const monthlyEl=card.querySelector('[data-card-monthly]'); if(monthlyEl) monthlyEl.textContent=formatPrice(monthly).replace(' TL',' ₺');
        const dailyEl=card.querySelector('[data-card-daily]'); if(dailyEl) dailyEl.textContent=formatPrice(daily).replace(' TL',' ₺');
        const addBtn=card.querySelector('[data-add-cart]'); if(addBtn) addBtn.dataset.period=String(period);
        const favoriteBtn=card.querySelector('[data-favorite-id]'); if(favoriteBtn) favoriteBtn.dataset.favoritePeriod=String(period);
      }));
    });
    updateFavoriteButtons();
    updateCompareUI();
  };

  renderCartDrawer=function(){
    const body=document.querySelector('[data-cart-drawer-body]');
    const footer=document.querySelector('[data-cart-drawer-footer]');
    if(!body || !footer) return;
    const items=activeCartItems();
    if(!items.length){
      body.innerHTML='<div class="empty-mini-cart"><b>Sepetin boş</b><p>Kiralama ürünlerini inceleyip sepetine ekleyebilirsin.</p></div>';
      footer.innerHTML='<button class="btn btn-soft full" type="button" data-cart-close>Alışverişe Devam Et</button><a class="btn btn-primary full" href="sepet.html">Sepete Git</a>';
      return;
    }
    const rows=items.map((it,idx)=>{
      const p=getProduct(it.id); const qty=it.qty||1;
      const total=itemTotal(it);
      return `<article class="drawer-item"><img src="${p.image}" alt="${p.name}"><div><b>${p.name}</b><span class="drawer-period-meta">${itemLabel(it)}</span><small class="drawer-total-label">Toplam ödeme</small><strong>${formatPrice(total)}</strong></div><button class="remove-line" type="button" data-remove-cart="${idx}">Sil</button><div class="drawer-item-actions"><div class="qty-control"><button type="button" data-drawer-qty="${idx}" data-delta="-1">−</button><input type="text" value="${qty}" readonly><button type="button" data-drawer-qty="${idx}" data-delta="1">+</button></div><a href="urun-detay.html?id=${p.id}${itemMode(it)==='rent'?`&period=${it.period||defaultPeriod(p)}`:''}" class="text-link">Ürüne git →</a></div></article>`;
    }).join('');
    const monthlyTotal=items.reduce((sum,it)=>{const p=getProduct(it.id);const qty=it.qty||1;return sum+(itemMode(it)==='buy'?(p.buyPrice||p.price):monthlyPrice(p,it.period||defaultPeriod(p)))*qty},0);
    body.innerHTML=`<div class="drawer-items">${rows}</div>`;
    footer.innerHTML=`<div class="drawer-summary"><p class="grand"><span>Aylık ödeme toplamı</span><b class="highlight-green">${formatPrice(monthlyTotal)}</b></p><p><span>Teslimat</span><b>Ücretsiz</b></p></div><button class="btn btn-soft full" type="button" data-cart-close>Alışverişe Devam Et</button><a class="btn btn-primary full" href="sepet.html">Sepete Git</a>`;
    body.querySelectorAll('[data-drawer-qty]').forEach(btn=>btn.addEventListener('click',()=>updateCartItemQty(Number(btn.dataset.drawerQty),Number(btn.dataset.delta))));
  };

  removeCart=function(index){
    const items=activeCartItems();
    items.splice(index,1);
    saveCartAndRefresh(items);
  };

  addCart=function(id,period,mode='rent'){
    const p=getProduct(id); const selectedMode=mode==='buy' && p.buyPrice ? 'buy' : 'rent';
    const per=selectedMode==='buy' ? 0 : Number(period||defaultPeriod(p));
    const items=activeCartItems();
    const found=items.find(x=>x.id===id && itemMode(x)===selectedMode && Number(x.period||0)===per);
    if(found) found.qty+=1; else items.push({id,period:per,mode:selectedMode,qty:1});
    saveCart(items); renderCartDrawer(); openCartDrawer(); initCart();
  };

  function ensureCheckoutModal(){
    if(document.querySelector('[data-checkout-modal]')) return document.querySelector('[data-checkout-modal]');
    document.body.insertAdjacentHTML('beforeend',`<div class="checkout-flow-backdrop" data-checkout-modal><div class="checkout-flow-modal"><div class="checkout-flow-head"><div><h2>Sipariş ve ödeme bilgileri</h2><p>Kiralama planını onayladıktan sonra adres ve ödeme bilgilerini tamamlayabilirsin.</p></div><button type="button" class="checkout-close-btn" data-checkout-close>×</button></div><div class="checkout-flow-body" data-checkout-body></div></div></div>`);
    const modal=document.querySelector('[data-checkout-modal]');
    modal.addEventListener('click',e=>{ if(e.target===modal) modal.classList.remove('open'); });
    modal.querySelector('[data-checkout-close]')?.addEventListener('click',()=>modal.classList.remove('open'));
    return modal;
  }
  function checkoutSummaryHtml(){
    const items=activeCartItems();
    const monthlyTotal=items.reduce((sum,it)=>{const p=getProduct(it.id);const qty=it.qty||1;return sum+(itemMode(it)==='buy'?(p.buyPrice||p.price):monthlyPrice(p,it.period||defaultPeriod(p)))*qty},0);
    const discountRate=couponDiscountRate();
    const discountAmount=Math.round(monthlyTotal*discountRate);
    const discountedMonthly=monthlyTotal-discountAmount;
    return `<div class="checkout-summary-list"><div><span>Ürün sayısı</span><strong>${getCartQty()}</strong></div><div><span>Aylık ödeme toplamı</span><strong>${formatPrice(monthlyTotal)}</strong></div>${discountRate?`<div><span>Kupon indirimi</span><strong>- ${formatPrice(discountAmount)}</strong></div>`:''}<div><span>Teslimat</span><strong>Ücretsiz</strong></div><div><span>Aylık ödenecek tutar</span><strong>${formatPrice(discountedMonthly)}</strong></div></div>`;
  }
  function renderCheckoutStep(step=1){
    const modal=ensureCheckoutModal();
    const body=modal.querySelector('[data-checkout-body]');
    const cityOptions=(cartHasSports()?['İstanbul']:cityList).map(c=>`<option value="${c}">${c}</option>`).join('');
    body.innerHTML=`<div class="checkout-steps"><span class="checkout-step-pill ${step===1?'active':''}">1. Adres & iletişim</span><span class="checkout-step-pill ${step===2?'active':''}">2. Ödeme</span></div>${step===1?`<div class="checkout-grid"><section class="checkout-card"><h3>Teslimat bilgileri</h3><div class="form-grid"><label>Ad<input type="text" placeholder="Adınız"></label><label>Soyad<input type="text" placeholder="Soyadınız"></label><label>E-posta<input type="email" placeholder="ornek@eposta.com"></label><label>Telefon<div class="phone-field"><select class="country-code-select" data-country-code><option value="+90">🇹🇷 +90</option><option value="+1">🇺🇸 +1</option><option value="+44">🇬🇧 +44</option><option value="+49">🇩🇪 +49</option></select><input type="tel" placeholder="Telefon numaranız" data-phone-input></div></label><label>İl<select data-city-select>${cityOptions}</select></label><label>İlçe<input type="text" placeholder="İlçe"></label><label style="grid-column:1/-1">Adres<textarea placeholder="Mahalle, sokak, bina ve daire bilgilerini yazın."></textarea></label><label style="grid-column:1/-1">Sipariş notu<textarea placeholder="Teslimatla ilgili ek notunuz varsa buraya yazabilirsiniz."></textarea></label></div><p class="checkout-note">${cartHasSports()?'Spor aletleri siparişlerinde şu an yalnızca İstanbul içi kiralama desteklenmektedir.':''}</p></section><aside class="checkout-card"><h3>Sipariş özeti</h3>${checkoutSummaryHtml()}</aside></div><div class="checkout-actions"><button type="button" class="btn btn-soft" data-checkout-close-step>Kapat</button><button type="button" class="btn btn-primary" data-next-checkout>Ödemeye geç</button></div>`:`<div class="checkout-grid"><section class="checkout-card"><h3>Ödeme bilgileri</h3><div class="form-grid"><label>Kart üzerindeki ad<input type="text" placeholder="Kart sahibi"></label><label>Kart numarası<input type="text" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000"></label><label>Son kullanma tarihi<input type="text" placeholder="AA / YY"></label><label>CVV<input type="text" inputmode="numeric" maxlength="3" placeholder="123"></label><label style="grid-column:1/-1"><input type="checkbox" checked> Mesafeli satış sözleşmesi ve hizmet şartlarını okudum.</label></div><div class="checkout-success"><div class="success-box"><strong>Ödeme adımı hazır.</strong><p>Devam ettiğinde siparişin ödeme ekranına yönlendirilir.</p></div></div></section><aside class="checkout-card"><h3>Ödeme özeti</h3>${checkoutSummaryHtml()}</aside></div><div class="checkout-actions"><button type="button" class="btn btn-soft" data-prev-checkout>Geri</button><button type="button" class="btn btn-primary" data-complete-checkout>Ödeme Yap</button></div>`}`;
    modal.classList.add('open');
    initPhoneInputs();
    body.querySelector('[data-checkout-close-step]')?.addEventListener('click',()=>modal.classList.remove('open'));
    body.querySelector('[data-next-checkout]')?.addEventListener('click',()=>renderCheckoutStep(2));
    body.querySelector('[data-prev-checkout]')?.addEventListener('click',()=>renderCheckoutStep(1));
    body.querySelector('[data-complete-checkout]')?.addEventListener('click',()=>{ showToast('Ödeme ekranı hazırlandı.'); modal.classList.remove('open'); });
  }

  initCart=function(){
    const root=document.querySelector('[data-cart]'); if(!root) return;
    const items=activeCartItems();
    if(!items.length){root.innerHTML='<div class="empty-cart-page"><h1>Sepetin boş</h1><p>Kiralama ürünlerini inceleyip sepetine ekleyebilirsin.</p><a class="btn btn-primary" href="kategori.html">Ürünleri Keşfet</a></div>'; return;}
    const rows=items.map((it,idx)=>{
      const p=getProduct(it.id); const qty=it.qty||1; const detailHref=`urun-detay.html?id=${p.id}`;
      const summaryTitle=itemMode(it)==='buy'?'Satın alma toplamı':`${it.period||defaultPeriod(p)} aylık toplam ödeme`;
      const total=itemTotal(it);
      const daily=itemMode(it)==='buy' ? 0 : dailyPrice(p,it.period||defaultPeriod(p))*qty;
      return `<article class="rental-plan-item"><a class="cart-product-image" href="${detailHref}${itemMode(it)==='rent'?`&period=${it.period||defaultPeriod(p)}`:''}"><img src="${p.image}" alt="${p.name}"></a><div class="plan-product-copy"><a class="cart-product-brand" href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a><h2><a href="${detailHref}${itemMode(it)==='rent'?`&period=${it.period||defaultPeriod(p)}`:''}">${p.name}</a></h2><div class="plan-meta-row"><div class="selected-plan-tag"><span>${itemMode(it)==='buy'?'İşlem':'Seçili plan'}</span><b>${itemMode(it)==='buy'?'Satın Alma':`${it.period||defaultPeriod(p)} Ay`}</b></div><div class="delivery-estimate"><span>Tahmini teslimat</span><b>1–3 İş Günü</b></div></div><div class="plan-qty-row"><div class="qty-control"><button type="button" data-page-qty="${idx}" data-delta="-1">−</button><input type="text" value="${qty}" readonly><button type="button" data-page-qty="${idx}" data-delta="1">+</button></div><button type="button" class="remove-line" data-remove-cart="${idx}">Ürünü kaldır</button></div></div><div class="plan-price-summary"><span>${summaryTitle}</span><b>${formatPrice(total)}</b>${itemMode(it)==='rent'?`<small>Günlük karşılığı <strong class="daily-cart-value">${formatPrice(daily)}</strong></small>`:''}</div></article>`;
    }).join('');
    const monthlyTotal=items.reduce((sum,it)=>{const p=getProduct(it.id);const qty=it.qty||1;return sum+(itemMode(it)==='buy'?(p.buyPrice||p.price):monthlyPrice(p,it.period||defaultPeriod(p)))*qty},0);
    const discountRate=couponDiscountRate();
    const discountAmount=Math.round(monthlyTotal*discountRate);
    const discountedMonthly=monthlyTotal-discountAmount;
    const couponStatus=discountRate?`<div class="applied-coupon"><span><b>merhaba10</b> · Her ay %10 indirim</span><button type="button" data-remove-coupon>Kuponu kaldır</button></div>`:'';
    root.innerHTML=`<div class="rental-cart-layout"><main class="rental-cart-main"><div class="cart-item-count"><span>${items.length} ürün sepetinde</span></div><div class="rental-plan-list">${rows}</div><label class="coupon-box rental-coupon"><span>Kupon kodu</span><div><input placeholder="Kupon kodu gir" value="${discountRate?'merhaba10':''}"><button type="button" data-apply-coupon-page>Uygula</button></div>${couponStatus}</label><a class="text-link" href="kategori.html">← Alışverişe devam et</a></main><aside class="rental-plan-summary"><span class="summary-kicker">Ödeme özeti</span><h2>Aylık kiralama</h2><div><span>Aylık ödeme toplamı</span><b>${formatPrice(monthlyTotal)}</b></div>${discountRate?`<div class="summary-saving"><span>Her ay kupon indirimi</span><b>- ${formatPrice(discountAmount)}</b></div>`:''}<div><span>Teslimat</span><b>Ücretsiz</b></div><div class="first-payment"><span>Aylık ödenecek tutar</span><b>${formatPrice(discountedMonthly)}</b></div>${discountRate?'<p class="coupon-summary-note">Kupon indirimi seçili kiralama süresi boyunca her aylık ödemeye uygulanır.</p>':''}<button class="btn btn-primary full" type="button" data-checkout>Kiralama planını onayla</button></aside></div>`;
    root.querySelector('[data-apply-coupon-page]')?.addEventListener('click',()=>{applyCouponCode(root.querySelector('.coupon-box input')?.value||'');initCart();});
    root.querySelector('[data-checkout]')?.addEventListener('click',()=>renderCheckoutStep(1));
    root.querySelectorAll('[data-page-qty]').forEach(btn=>btn.addEventListener('click',()=>updateCartItemQty(Number(btn.dataset.pageQty),Number(btn.dataset.delta))));
  };

  function categoryRenderEnhancements(){
    const sidebar=document.querySelector('[data-filter-sidebar]');
    if(sidebar){
      const title=sidebar.querySelector('.filter-title');
      if(title && !title.querySelector('.filter-reset-btn')) title.innerHTML='<span>Filtreler</span><button type="button" class="filter-reset-btn" data-reset-filters>Sıfırla</button>';
    }
  }

  initCategory=function(){
    const grid=document.querySelector('[data-product-grid]'); if(!grid) return;
    const title=document.querySelector('[data-category-title]');
    const h1=document.querySelector('[data-listing-h1]');
    const count=document.querySelector('[data-result-count]');
    const search=document.querySelector('[data-search-input]');
    const sort=document.querySelector('[data-sort]');
    const brandWrap=document.querySelector('[data-brand-filters]');
    const typeWrap=document.querySelector('[data-type-filters]');
    const typeTitle=document.querySelector('[data-type-title]');
    const toolbar=document.querySelector('.category-listing-toolbar');
    let active=q('cat') || '';
    let keyword=q('q') || '';
    let brand='';
    let activeType='Tüm ürünler';
    if(search && keyword) search.value=keyword;
    if(brandWrap){
      brandWrap.innerHTML=uniqueBrands().map(b=>`<label class="fake-check"><input type="checkbox" data-brand="${b}"> ${b}</label>`).join('');
      brandWrap.querySelectorAll('[data-brand]').forEach(ch=>ch.addEventListener('change',()=>{ brand=ch.checked?ch.dataset.brand:''; brandWrap.querySelectorAll('[data-brand]').forEach(x=>{if(x!==ch)x.checked=false}); render(); }));
    }
    function renderTypeOptions(){
      if(!typeWrap || !typeTitle) return;
      const label=active || 'Spor Aletleri';
      const cfg=categoryTypeConfig(label);
      typeTitle.textContent=cfg.title;
      typeWrap.innerHTML=cfg.options.map((opt,i)=>`<button class="filter-chip ${i===0?'active':''}" data-type="${opt}">${opt}</button>`).join('');
      activeType='Tüm ürünler';
      typeWrap.querySelectorAll('[data-type]').forEach(btn=>btn.addEventListener('click',()=>{ typeWrap.querySelectorAll('[data-type]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); activeType=btn.dataset.type; render(); }));
    }
    function list(){
      let arr=PRODUCTS.slice();
      if(active==='Spor Aletleri') arr=arr.filter(p=>['Koşu Bantları','Yürüyüş Bantları','Bisiklet','Fitness'].includes(p.collection));
      else if(active && !['Yaz Sezonu','Premium'].includes(active)) arr=arr.filter(p=>p.collection===active || p.category===active);
      if(active==='Premium') arr=arr.filter(p=>p.premium);
      if(active==='Yaz Sezonu') arr=arr.filter(p=>['Bisiklet','Fitness','Yürüyüş Bantları'].includes(p.collection));
      const kw=(search?.value || keyword || '').trim().toLocaleLowerCase('tr-TR');
      if(kw) arr=arr.filter(p=>(p.name+' '+p.brand+' '+p.category+' '+p.code+' '+p.summary).toLocaleLowerCase('tr-TR').includes(kw));
      if(brand) arr=arr.filter(p=>p.brand===brand);
      arr=arr.filter(p=>matchesType(p, activeType));
      const s=sort?.value || 'featured';
      if(s==='low') arr.sort((a,b)=>a.price-b.price);
      if(s==='high') arr.sort((a,b)=>b.price-a.price);
      if(s==='name') arr.sort((a,b)=>a.name.localeCompare(b.name,'tr'));
      if(s==='new') arr=arr.slice().reverse();
      if(s==='popular') arr.sort((a,b)=>ratingCount(b)-ratingCount(a));
      return arr;
    }
    function resetFilters(){
      brand=''; activeType='Tüm ürünler'; keyword='';
      if(search) search.value='';
      if(sort) sort.value='featured';
      brandWrap?.querySelectorAll('[data-brand]').forEach(ch=>ch.checked=false);
      renderTypeOptions(); render();
      document.body.classList.remove('mobile-filters-open','mobile-sort-open');
    }
    function render(){
      const arr=list();
      const label=active || 'Tüm Ürünler';
      if(title) title.textContent=label;
      if(h1) h1.textContent=label;
      if(count) count.textContent=`${arr.length} ürün`;
      grid.innerHTML=arr.map(productCard).join('') || '<div class="empty-state">Bu filtrelere uygun ürün bulunamadı.</div>';
      bindProductCards(grid);
      categoryRenderEnhancements();
      document.querySelector('[data-reset-filters]')?.addEventListener('click',resetFilters);
    }
    if(toolbar && !toolbar.querySelector('[data-mobile-filter-btn]')){
      const filterBtn=document.createElement('button'); filterBtn.type='button'; filterBtn.className='mobile-filter-toggle'; filterBtn.dataset.mobileFilterBtn='1'; filterBtn.textContent='Filtreler';
      const sortBtn=document.createElement('button'); sortBtn.type='button'; sortBtn.className='mobile-sort-toggle'; sortBtn.dataset.mobileSortBtn='1'; sortBtn.textContent='Sırala';
      toolbar.prepend(sortBtn); toolbar.prepend(filterBtn);
      filterBtn.addEventListener('click',()=>document.body.classList.add('mobile-filters-open'));
      sortBtn.addEventListener('click',()=>document.body.classList.add('mobile-sort-open'));
      let backdrop=document.querySelector('[data-mobile-filter-backdrop]');
      if(!backdrop){backdrop=document.createElement('button');backdrop.type='button';backdrop.className='mobile-filter-backdrop';backdrop.dataset.mobileFilterBackdrop='1';document.body.appendChild(backdrop);} backdrop.onclick=()=>document.body.classList.remove('mobile-filters-open','mobile-sort-open');
      if(!document.querySelector('.mobile-sort-sheet')){
        const sheet=document.createElement('div'); sheet.className='mobile-sort-sheet'; sheet.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><strong>Sırala</strong><button type="button" class="mobile-sort-close" aria-label="Kapat">×</button></div>${[ ['featured','Öne çıkanlar'],['new','Yeni eklenenler'],['popular','Çok satanlar'],['low','Fiyat: düşükten yükseğe'],['high','Fiyat: yüksekten düşüğe'],['name','İsme göre'] ].map(([v,t])=>`<button type="button" data-mobile-sort="${v}">${t}</button>`).join('')}`; document.body.appendChild(sheet);
        sheet.querySelector('.mobile-sort-close').addEventListener('click',()=>document.body.classList.remove('mobile-sort-open'));
        sheet.querySelectorAll('[data-mobile-sort]').forEach(btn=>btn.addEventListener('click',()=>{ if(sort) sort.value=btn.dataset.mobileSort; document.body.classList.remove('mobile-sort-open'); render(); }));
      }
    }
    search?.addEventListener('input',render); sort?.addEventListener('change',render);
    renderTypeOptions(); render();
  };

  // detail page with local note + gallery overlay
  initProductDetail=function(){
    const root=document.querySelector('[data-product-detail]'); if(!root) return;
    const p=getProduct(q('id')); const requestedPeriod=Number(q('period')); let period=p.periods.includes(requestedPeriod)?requestedPeriod:defaultPeriod(p); let mode='rent'; let galleryIndex=0; const gallery=[p.image,p.image,p.image,p.image];
    document.title=p.name+' | Castapos';
    function openLightbox(){
      let lb=document.querySelector('.product-lightbox');
      if(!lb){
        document.body.insertAdjacentHTML('beforeend',`<div class="product-lightbox"><div class="product-lightbox-dialog"><button type="button" class="product-lightbox-close">×</button><button type="button" class="product-lightbox-arrow prev">‹</button><div class="product-lightbox-image"><img src="" alt=""></div><button type="button" class="product-lightbox-arrow next">›</button><div class="product-lightbox-thumbs"></div></div></div>`);
        lb=document.querySelector('.product-lightbox');
        lb.addEventListener('click',e=>{ if(e.target===lb) lb.classList.remove('open'); });
        lb.querySelector('.product-lightbox-close').addEventListener('click',()=>lb.classList.remove('open'));
        lb.querySelector('.product-lightbox-arrow.prev').addEventListener('click',()=>{galleryIndex=(galleryIndex-1+gallery.length)%gallery.length; updateLightbox();});
        lb.querySelector('.product-lightbox-arrow.next').addEventListener('click',()=>{galleryIndex=(galleryIndex+1)%gallery.length; updateLightbox();});
        document.addEventListener('keydown',e=>{ if(!lb.classList.contains('open')) return; if(e.key==='Escape') lb.classList.remove('open'); if(e.key==='ArrowRight'){galleryIndex=(galleryIndex+1)%gallery.length; updateLightbox();} if(e.key==='ArrowLeft'){galleryIndex=(galleryIndex-1+gallery.length)%gallery.length; updateLightbox();} });
      }
      function updateLightbox(){
        lb.querySelector('.product-lightbox-image img').src=gallery[galleryIndex];
        lb.querySelector('.product-lightbox-image img').alt=p.name;
        lb.querySelector('.product-lightbox-thumbs').innerHTML=gallery.map((src,i)=>`<button type="button" class="${i===galleryIndex?'active':''}" data-lightbox-thumb="${i}"><img src="${src}" alt="${p.name}"></button>`).join('');
        lb.querySelectorAll('[data-lightbox-thumb]').forEach(btn=>btn.addEventListener('click',()=>{galleryIndex=Number(btn.dataset.lightboxThumb); updateLightbox();}));
      }
      updateLightbox();
      lb.classList.add('open');
    }
    function render(){
      const currentMonthly=monthlyPrice(p,period);
      const rentTotal=currentMonthly*period;
      const buyActive=Boolean(p.buyPrice);
      const buyMeta = buyActive ? `<div class="compact-buy-meta active"><span>Satın alma opsiyonu</span><b>Aktif</b></div>` : `<div class="compact-buy-meta inactive"><span>Satın alma opsiyonu</span><b>Aktif değil</b></div>`;
      const reviewCount=ratingCount(p);
      const selectedTotal=mode==='buy' && buyActive ? p.buyPrice : rentTotal;
      const actionMode=mode==='buy' && buyActive ? 'buy' : 'rent';
      const isSport=['Koşu Bantları','Yürüyüş Bantları','Bisiklet','Fitness'].includes(p.collection);
      root.innerHTML=`<section class="detail-section"><div class="container product-detail-grid refined compact-detail-grid"><div class="gallery-panel detail-clean"><div class="main-gallery-image clean product-hero-image"><img src="${gallery[galleryIndex]}" alt="${p.name}"></div><div class="thumb-row clean">${gallery.map((src,i)=>`<span class="${i===galleryIndex?'active':''}" data-thumb="${i}"><img src="${src}" alt=""></span>`).join('')}</div></div><div class="detail-panel refined clean compact-panel"><div class="detail-top-row"><nav class="breadcrumb"><a href="index.html">Ana Sayfa</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}">${p.collection}</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a></nav><div class="detail-top-actions"><button type="button" class="detail-compare-btn" data-compare-toggle="${p.id}">⇄ Karşılaştır</button><button type="button" class="detail-fav-btn" data-favorite-id="${p.id}" data-favorite-period="${period}" aria-label="Favorilere ekle">${heartIcon(false)}</button></div></div><h1>${p.name}</h1><div class="detail-rating">★ 4,7 <button type="button" class="review-link" data-open-reviews>(${reviewCount} değerlendirme)</button></div><div class="detail-price-grid selectable"><button type="button" class="price-mini-card ${mode==='rent'?'active':''}" data-choice="rent"><small>Kirala</small><b>${formatPrice(currentMonthly)}</b><span>/ aylık ödeme</span></button><button type="button" class="price-mini-card ${mode==='buy'?'active':''} ${buyActive?'buy-available':'buy-disabled'}" ${buyActive?'data-choice="buy"':'disabled'}><small>Satın Al</small><b>${buyActive ? formatPrice(p.buyPrice) : 'Aktif değil'}</b><span>${buyActive ? 'tek sefer ödeme' : 'yalnızca kiralama'}</span></button></div><div class="periods top-periods compact-pills ${mode==='buy'?'disabled-periods':''}"><label>Kiralama Süresi</label><div>${p.periods.map(m=>`<button class="period-chip ${m===period?'active':''}" data-period="${m}" ${mode==='buy'?'disabled':''}>${m} Ay</button>`).join('')}</div></div><div class="key-benefits compact tighter"><a href="sikca-sorulan-sorular.html">✓ Ücretsiz teslimat</a><a href="iletisim.html">✓ Teknik servis desteği</a><a href="nasil-calisir.html">✓ Satın alma opsiyonu</a></div>${isSport?'<div class="detail-local-note">Yalnızca <u>İstanbul içi</u> kiralamalarda geçerlidir.</div>':''}<div class="installment-box refined compact cleaner light"><span>${mode==='buy' && buyActive ? 'Satın alma toplamı' : `Toplam · <strong class="period-accent">${period} Ay</strong>`}</span><div class="big-total">${formatPrice(selectedTotal)}</div>${mode==='buy' && buyActive ? `<em class="detail-buy-note"><span class="metric-label">Tek seferlik satın alma tutarı.</span></em>` : `<em class="detail-monthly-cost"><span class="metric-label">Aylık ödeme tutarı:</span> <strong class="metric-value">${formatPrice(currentMonthly)}</strong></em>`}</div>${buyMeta}<div class="detail-actions compact-actions single"><button class="btn btn-primary" data-add-cart="${p.id}" data-period="${period}" data-mode="${actionMode}" type="button">Sepete Ekle</button></div></div></div></section><section class="section product-info-section"><div class="container">${buildDetailTabs(p)}</div></section><section class="section compact-section"><div class="container section-title-row"><h2>Benzer ürünler</h2></div><div class="container catalog-grid">${PRODUCTS.filter(x=>x.id!==p.id && x.collection===p.collection).slice(0,4).map(productCard).join('')}</div></section>`;
      root.querySelector('.product-hero-image')?.addEventListener('click',openLightbox);
      root.querySelectorAll('[data-thumb]').forEach(t=>t.addEventListener('click',()=>{galleryIndex=Number(t.dataset.thumb); render();}));
      root.querySelectorAll('.period-chip').forEach(b=>b.addEventListener('click',()=>{period=Number(b.dataset.period); render();}));
      root.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.choice; render();}));
      root.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-tab]').forEach(b=>b.classList.remove('active')); root.querySelectorAll('[data-panel]').forEach(pnl=>pnl.classList.remove('active')); btn.classList.add('active'); root.querySelector(`[data-panel="${btn.dataset.tab}"]`)?.classList.add('active'); }));
      root.querySelector('[data-open-reviews]')?.addEventListener('click',()=>{ const btn=root.querySelector('[data-tab="reviews"]'); btn?.click(); document.getElementById('reviews-anchor')?.scrollIntoView({behavior:'smooth', block:'start'}); });
      updateFavoriteButtons();
      root.querySelector('[data-submit-review]')?.addEventListener('click',()=>showToast('Değerlendirmen alındı.'));
      root.querySelector('[data-submit-question]')?.addEventListener('click',()=>showToast('Sorun destek ekibine iletildi.'));
      root.querySelectorAll('[data-star-pick] [data-rate]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-star-pick] [data-rate]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }));
      root.querySelectorAll('[data-review-filter] [data-filter]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-review-filter] [data-filter]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const value=btn.dataset.filter; root.querySelectorAll('[data-review-list] article').forEach(card=>{ const pass=(value==='Tümü' || card.dataset.rating===value); card.hidden=!pass; }); }));
      bindProductCards(root);
    }
    render();
  };

  function applyPhoneFormatting(phone){
    const wrap=phone.closest('.phone-field') || phone.parentElement;
    const code=wrap?.querySelector('[data-country-code], .country-code-select')?.value || '+90';
    const maxDigits=countryPhoneMeta[code] || 10;
    const raw=phone.value.replace(/\D/g,'').slice(0,maxDigits);
    if(code==='+90'){
      let formatted='';
      if(raw.length) formatted='('+raw.slice(0,3);
      if(raw.length>=3) formatted+=')';
      if(raw.length>3) formatted+=' '+raw.slice(3,6);
      if(raw.length>6) formatted+=' '+raw.slice(6,8);
      if(raw.length>8) formatted+=' '+raw.slice(8,10);
      phone.value=formatted;
    }else phone.value=raw;
    phone.maxLength=code==='+90'?16:maxDigits;
  }
  initPhoneInputs=function(){
    document.querySelectorAll('[data-phone-input]').forEach(phone=>{
      if(phone.dataset.phoneBound==='1') return;
      phone.dataset.phoneBound='1';
      const wrap=phone.closest('.phone-field') || phone.parentElement;
      const codeSel=wrap?.querySelector('[data-country-code], .country-code-select');
      const refresh=()=>applyPhoneFormatting(phone);
      codeSel?.addEventListener('change',()=>{ phone.value=''; refresh(); });
      phone.addEventListener('input',refresh); refresh();
    });
  };
  initProfileForm=function(){
    const form=document.querySelector('[data-profile-form]');
    if(!form) return;
    const city=form.querySelector('[data-city-select]');
    const district=form.querySelector('[data-district-select]');
    const countryCode=form.querySelector('[data-country-code], .country-code-select');
    if(countryCode && countryCode.options.length===1){countryCode.innerHTML='<option value="+90" selected>🇹🇷 +90</option><option value="+1">🇺🇸 +1</option><option value="+49">🇩🇪 +49</option><option value="+44">🇬🇧 +44</option>';}
    if(city){ city.innerHTML='<option value="">İl seçin</option>'+cityList.map(name=>`<option value="${name}" ${name==='İstanbul'?'selected':''}>${name}</option>`).join(''); }
    if(district){ district.disabled=false; }
    initPhoneInputs();
  };

  initSupportWidget=function(){
    const page=location.pathname.split('/').pop() || 'index.html';
    if(!['index.html','kategori.html','urun-detay.html','nasil-calisir.html',''].includes(page)) return;
    let wrap=document.querySelector('[data-support-widget]');
    if(!wrap){
      document.body.insertAdjacentHTML('beforeend', `<div class="support-widget" data-support-widget>
        <div class="support-panel castapos-ai-panel">
          <div class="ai-panel-head"><span class="ai-brand-icon">✦</span><div><b>Castapos AI</b><small><i></i> 7/24 Çevrimiçi</small></div><button type="button" data-support-close aria-label="Kapat">×</button></div>
          <div class="ai-panel-body">
            <div class="ai-greeting">Merhaba, Castapos destek hattına hoş geldiniz.<br><br>Size hızlıca yardımcı olabilmem için aşağıdaki başlıklardan birini seçebilir veya sorunuzu yazabilirsiniz.</div>
            <a href="nasil-calisir.html" class="ai-option">Kiralama süreci hakkında bilgi almak istiyorum</a>
            <a href="kategori.html" class="ai-option">Ürün seçimi konusunda yardım</a>
            <a href="sikca-sorulan-sorular.html" class="ai-option">Teslimat ve kurulum desteği</a>
            <a href="iptal-iade-kosullari.html" class="ai-option">İptal ve iade süreci</a>
            <a class="ai-whatsapp-link" href="https://wa.me/905448010433" target="_blank" rel="noopener"><span>WhatsApp Destek Hattı</span><b>→</b></a>
          </div>
          <div class="ai-input-row"><input type="text" placeholder="Sorunuzu yazın..."><button type="button" data-ai-send aria-label="Gönder">→</button></div>
        </div>
        <button type="button" class="support-fab" data-support-toggle><span>✦</span><span>Castapos AI</span></button>
      </div>`);
      wrap=document.querySelector('[data-support-widget]');
    }
    if(wrap.dataset.enhanced==='1') return;
    wrap.dataset.enhanced='1';
    const fab=wrap.querySelector('[data-support-toggle]');
    const closeBtn=wrap.querySelector('[data-support-close]');
    const isMobile=()=>window.innerWidth<=760;
    if(isMobile()) wrap.classList.remove('mobile-docked');
    const scheduleDock=()=>{ if(!isMobile()) return; setTimeout(()=>{ if(!wrap.classList.contains('open')){ wrap.classList.add('mobile-docked'); wrap.classList.remove('mobile-armed'); } },10000); };
    fab?.addEventListener('click',()=>{
      if(!isMobile()){ wrap.classList.toggle('open'); return; }
      if(wrap.classList.contains('open')) return;
      if(wrap.classList.contains('mobile-docked')){ wrap.classList.remove('mobile-docked'); wrap.classList.add('mobile-armed'); return; }
      if(wrap.classList.contains('mobile-armed')){ wrap.classList.add('open'); return; }
      wrap.classList.add('mobile-armed');
    });
    closeBtn?.addEventListener('click',()=>{ wrap.classList.remove('open'); if(isMobile()) wrap.classList.add('mobile-docked'); });
    window.addEventListener('resize',()=>{ if(!isMobile()){ wrap.classList.remove('mobile-docked','mobile-armed'); } });
    scheduleDock();
  };

  function initLegalMobileNav(){
    const side=document.querySelector('.legal-side-nav'); if(!side || side.dataset.mobileNavReady==='1') return;
    side.dataset.mobileNavReady='1';
    const links=[...side.querySelectorAll('a')];
    const current=links.findIndex(a=>a.getAttribute('href')===location.pathname.split('/').pop());
    const wrap=document.createElement('div'); wrap.className='legal-mobile-nav';
    wrap.innerHTML=`<select aria-label="Bilgi başlıkları">${links.map((a,i)=>`<option value="${a.href}" ${i===current?'selected':''}>${a.textContent.trim()}</option>`).join('')}</select>`;
    side.parentElement.insertBefore(wrap,side);
    wrap.querySelector('select').addEventListener('change',e=>location.href=e.target.value);
  }

  // rerender / init after overrides
  initPhoneInputs();
  initProfileForm();
  initHome();
  initCategory();
  initProductDetail();
  initCart();
  renderCartDrawer();
  updateCartCount();
  initSupportWidget();
  initLegalMobileNav();
  renderFavoritesPage();
})();


/* === V33 behavior corrections === */
(function(){
  const cleanName=name=>{const parts=String(name||'Müşteri').trim().split(/\s+/);return parts.length>1?`${parts[0]} ${parts[1][0]}.`:parts[0]};
  const isSportProduct=p=>['Koşu Bantları','Yürüyüş Bantları','Bisiklet','Fitness'].includes(p.collection);

  productCard=function(p){
    const periods=p.periods.slice(0,3);
    const period=periods.includes(defaultPeriod(p))?defaultPeriod(p):periods[0];
    const monthly=monthlyPrice(p,period),daily=dailyPrice(p,period);
    const badge=p.premium?'<span class="discount-badge premium-badge"><i>★</i> Premium</span>':(p.discount?`<span class="discount-badge accent-badge">${p.discount}</span>`:'');
    return `<article class="compact-product-card modern-rental-card" data-product-card="${p.id}" data-selected-period="${period}"><a class="product-img" href="urun-detay.html?id=${p.id}">${badge}<button class="fav-btn" type="button" data-favorite-id="${p.id}" data-favorite-period="${period}" aria-label="Favorilere ekle">${heartIcon(false)}</button><img src="${p.image}" alt="${p.name}"></a><div class="product-info"><a class="product-name" href="urun-detay.html?id=${p.id}">${p.name}</a><div class="rating-row"><span>★ 4,7</span><small>(${ratingCount(p)})</small></div><div class="card-periods">${periods.map(m=>`<button type="button" class="card-period-btn ${m===period?'active':''}" data-card-period="${m}">${m} Ay</button>`).join('')}</div><div class="price-block rental-card-block compact-price-only"><div class="monthly-primary"><strong data-card-monthly>${formatPrice(monthly).replace(' TL',' ₺')}</strong><span>/ aylık</span></div><div class="daily-secondary"><strong data-card-daily>${formatPrice(daily).replace(' TL',' ₺')}</strong><span>/ günlük</span></div></div><button class="card-wide-btn standalone" type="button" data-add-cart="${p.id}" data-period="${period}">Hemen kirala</button></div></article>`;
  };
  bindProductCards=function(scope=document){scope.querySelectorAll('[data-product-card]').forEach(card=>{const p=getProduct(card.dataset.productCard);card.querySelectorAll('[data-card-period]').forEach(btn=>btn.addEventListener('click',()=>{const period=Number(btn.dataset.cardPeriod);card.dataset.selectedPeriod=String(period);card.querySelectorAll('[data-card-period]').forEach(x=>x.classList.toggle('active',x===btn));card.querySelector('[data-card-monthly]').textContent=formatPrice(monthlyPrice(p,period)).replace(' TL',' ₺');card.querySelector('[data-card-daily]').textContent=formatPrice(dailyPrice(p,period)).replace(' TL',' ₺');const add=card.querySelector('[data-add-cart]');if(add)add.dataset.period=period;const fav=card.querySelector('[data-favorite-id]');if(fav)fav.dataset.favoritePeriod=period;}));});updateFavoriteButtons();updateCompareUI();};

  buildDetailTabs=function(p){
    const pack=getReviewPack(p.id),reviews=expandedReviews(pack.reviews),qaItems=expandedQa(pack.qa),reviewFilters=['Tümü',5,4,3,2,1];
    return `<div class="detail-tabs" data-detail-tabs><button class="active" data-tab="description">Ürün Açıklaması</button><button data-tab="specs">Teknik Özellikler</button><button id="reviews-anchor" data-tab="reviews">Değerlendirmeler</button><button data-tab="qa">Soru & Cevap</button><button data-tab="return">İptal & İade Koşulları</button></div><div class="detail-tab-panels"><section class="detail-tab-panel active" data-panel="description"><h3>Ürün Hakkında</h3><p>${highlightSummary(p.summary)}</p>${isSportProduct(p)?'<p class="detail-local-note">Yalnızca <u>İstanbul içi</u> kiralamalarda geçerlidir.</p>':''}</section><section class="detail-tab-panel" data-panel="specs"><h3>Teknik Özellikler</h3><div class="spec-table">${p.specs.map(s=>`<div><span>${s.split(':')[0]}</span><b>${s.includes(':')?s.split(':').slice(1).join(':').trim():s}</b></div>`).join('')}</div></section><section class="detail-tab-panel" data-panel="reviews"><h3>Değerlendirmeler</h3><div class="reviews-shell" data-reviews-root><div class="review-summary-box"><div><strong>${String(pack.average).replace('.',',')}</strong><span>Genel ürün puanı</span></div><div class="gold-stars">${starIcons(Math.round(pack.average))}</div></div><div class="review-form-box"><h4>Değerlendirme Yap</h4><div class="review-rating-pick" data-star-pick>${[1,2,3,4,5].map(n=>`<button type="button" data-rate="${n}">${n} ★</button>`).join('')}</div><textarea placeholder="Ürünü kullandıysan deneyimini kısaca paylaşabilirsin."></textarea><label class="review-photo-upload"><input type="file" accept="image/*" data-review-photo><span>Fotoğraf Ekle</span></label><button type="button" class="btn btn-primary" data-submit-review>Yorumu Gönder</button></div><div class="review-filter-bar" data-review-filter>${reviewFilters.map(f=>`<button type="button" data-filter="${f}" class="${f==='Tümü'?'active':''}">${f==='Tümü'?'Tümü':f+' Yıldız'}</button>`).join('')}</div><div class="qa-list review-list" data-review-list>${reviews.map(r=>`<article data-rating="${r.rating}"><div class="review-head"><b>${cleanName(r.name)}</b><span class="gold-stars small">${starIcons(r.rating)}</span></div><p>${r.text}</p></article>`).join('')}</div></div></section><section class="detail-tab-panel" data-panel="qa"><h3>Soru & Cevap</h3><div class="qa-list" data-qa-list>${qaItems.map(item=>`<article><b>Alper A.</b><p>${item.q}</p><div class="qa-answer"><strong>Castapos yanıtı</strong><p>${item.a}</p></div></article>`).join('')}</div><div class="question-box"><h4>Sorunu Sor</h4><textarea placeholder="Ürünle ilgili sorunuzu yazın."></textarea><div class="question-actions single-action"><button type="button" class="btn btn-primary" data-submit-question>Soru Gönder</button></div></div></section><section class="detail-tab-panel" data-panel="return"><h3>İptal & İade Koşulları</h3><p>İade ve iptal süreçleri ürün kategorisine ve kiralama planına göre yürütülür.</p></section></div>`;
  };

  initProductDetail=function(){
    const root=document.querySelector('[data-product-detail]');if(!root)return;const p=getProduct(q('id'));const requested=Number(q('period'));let period=p.periods.includes(requested)?requested:defaultPeriod(p);let mode='rent';let galleryIndex=0;const gallery=[p.image,p.image,p.image,p.image];document.title=p.name+' | Castapos';
    const lightbox=()=>{let lb=document.querySelector('.product-lightbox');if(!lb){document.body.insertAdjacentHTML('beforeend','<div class="product-lightbox"><div class="product-lightbox-dialog"><button class="product-lightbox-close">×</button><button class="product-lightbox-arrow prev">‹</button><div class="product-lightbox-image"><img></div><button class="product-lightbox-arrow next">›</button><div class="product-lightbox-thumbs"></div></div></div>');lb=document.querySelector('.product-lightbox');const upd=()=>{lb.querySelector('img').src=gallery[galleryIndex];lb.querySelector('.product-lightbox-thumbs').innerHTML=gallery.map((s,i)=>`<button class="${i===galleryIndex?'active':''}" data-lb="${i}"><img src="${s}"></button>`).join('');lb.querySelectorAll('[data-lb]').forEach(b=>b.onclick=()=>{galleryIndex=Number(b.dataset.lb);upd();});};lb.querySelector('.prev').onclick=()=>{galleryIndex=(galleryIndex-1+gallery.length)%gallery.length;upd();};lb.querySelector('.next').onclick=()=>{galleryIndex=(galleryIndex+1)%gallery.length;upd();};lb.querySelector('.product-lightbox-close').onclick=()=>lb.classList.remove('open');document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='ArrowRight')lb.querySelector('.next').click();if(e.key==='ArrowLeft')lb.querySelector('.prev').click();if(e.key==='Escape')lb.classList.remove('open');});lb._upd=upd;}lb._upd();lb.classList.add('open');};
    function render(){const monthly=monthlyPrice(p,period),daily=dailyPrice(p,period),rentTotal=monthly*period,buyActive=!!p.buyPrice,selected=mode==='buy'&&buyActive?p.buyPrice:rentTotal,reviewCount=ratingCount(p);root.innerHTML=`<section class="detail-section"><div class="container product-detail-grid refined compact-detail-grid"><div class="gallery-panel detail-clean"><div class="main-gallery-image clean product-hero-image"><img src="${gallery[galleryIndex]}" alt="${p.name}"></div><div class="thumb-row clean">${gallery.map((s,i)=>`<span class="${i===galleryIndex?'active':''}" data-thumb="${i}"><img src="${s}"></span>`).join('')}</div></div><div class="detail-panel refined clean compact-panel"><div class="detail-top-row"><nav class="breadcrumb"><a href="index.html">Ana Sayfa</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}">${p.collection}</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a></nav><div class="detail-top-actions"><button class="detail-compare-btn" data-compare-toggle="${p.id}">⇄ Karşılaştır</button><button class="detail-fav-btn" data-favorite-id="${p.id}" data-favorite-period="${period}">${heartIcon(false)}</button></div></div><h1>${p.name}</h1><div class="detail-rating"><span>★ 4,7</span> <button class="review-link" data-open-reviews>(${reviewCount} değerlendirme)</button></div><div class="detail-price-grid selectable"><button class="price-mini-card ${mode==='rent'?'active':''}" data-choice="rent"><small>Kirala</small><b>${formatPrice(monthly)}</b><span>/ aylık ödeme</span></button><button class="price-mini-card ${mode==='buy'?'active':''} ${buyActive?'buy-available':'buy-disabled'}" ${buyActive?'data-choice="buy"':'disabled'}><small>Satın Al</small><b>${buyActive?formatPrice(p.buyPrice):'Aktif değil'}</b><span>${buyActive?'tek sefer ödeme':'yalnızca kiralama'}</span></button></div><div class="periods top-periods compact-pills"><label>Kiralama Süresi</label><div>${p.periods.map(m=>`<button class="period-chip ${m===period?'active':''}" data-period="${m}">${m} Ay</button>`).join('')}</div></div><div class="key-benefits compact tighter"><a href="sikca-sorulan-sorular.html">✓ Ücretsiz teslimat</a><a href="iletisim.html">✓ Teknik servis desteği</a><a href="nasil-calisir.html">✓ Satın alma opsiyonu</a></div>${isSportProduct(p)?'<div class="detail-local-note">Yalnızca <u>İstanbul içi</u> kiralamalarda geçerlidir.</div>':''}<div class="installment-box refined compact cleaner light"><span>${mode==='buy'?'Satın alma toplamı':`Toplam · <strong class="period-accent">${period} Ay</strong>`}</span><div class="big-total">${formatPrice(selected)}</div>${mode==='buy'?'<em class="detail-buy-note"><span class="metric-label">Tek seferlik satın alma tutarı.</span></em>':`<em class="detail-monthly-cost"><span class="metric-label">Aylık ödeme tutarı:</span> <strong class="metric-value">${formatPrice(monthly)}</strong></em><em class="detail-daily-cost"><span class="metric-label">Günlük karşılığı:</span> <strong class="metric-value">${formatPrice(daily)}</strong></em>`}</div><div class="compact-buy-meta ${buyActive?'active':'inactive'}"><span>Satın alma opsiyonu</span><b>${buyActive?'Aktif':'Aktif değil'}</b></div><div class="detail-actions compact-actions single"><button class="btn btn-primary" data-add-cart="${p.id}" data-period="${period}" data-mode="${mode==='buy'?'buy':'rent'}">Sepete Ekle</button></div></div></div></section><section class="section product-info-section"><div class="container">${buildDetailTabs(p)}</div></section><section class="section compact-section"><div class="container section-title-row"><h2>Benzer ürünler</h2></div><div class="container catalog-grid">${PRODUCTS.filter(x=>x.id!==p.id&&x.collection===p.collection).slice(0,4).map(productCard).join('')}</div></section>`;root.querySelector('.product-hero-image').onclick=lightbox;root.querySelectorAll('[data-thumb]').forEach(t=>t.onclick=()=>{galleryIndex=Number(t.dataset.thumb);render();});root.querySelectorAll('.period-chip').forEach(b=>b.onclick=()=>{period=Number(b.dataset.period);render();});root.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{mode=b.dataset.choice;render();});root.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{root.querySelectorAll('[data-tab]').forEach(x=>x.classList.remove('active'));root.querySelectorAll('[data-panel]').forEach(x=>x.classList.remove('active'));b.classList.add('active');root.querySelector(`[data-panel="${b.dataset.tab}"]`).classList.add('active');});root.querySelector('[data-open-reviews]').onclick=()=>{root.querySelector('[data-tab="reviews"]').click();document.getElementById('reviews-anchor').scrollIntoView({behavior:'smooth'});};root.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{root.querySelectorAll('[data-rate]').forEach(x=>x.classList.remove('active'));b.classList.add('active');});root.querySelectorAll('[data-review-filter] button').forEach(b=>b.onclick=()=>{root.querySelectorAll('[data-review-filter] button').forEach(x=>x.classList.remove('active'));b.classList.add('active');root.querySelectorAll('[data-review-list] article').forEach(a=>a.hidden=!(b.dataset.filter==='Tümü'||a.dataset.rating===b.dataset.filter));});root.querySelector('[data-review-photo]')?.addEventListener('change',()=>showToast('Fotoğraf değerlendirmeye eklendi.'));root.querySelector('[data-submit-review]')?.addEventListener('click',()=>showToast('Değerlendirmen alındı.'));bindProductCards(root);updateFavoriteButtons();}
    render();
  };

  window.v33Qty=function(index,delta){const items=cartItems();if(!items[index])return;items[index].qty=Math.max(1,(items[index].qty||1)+delta);saveCart(items);renderCartDrawer();initCart();};
  renderCartDrawer=function(){const body=document.querySelector('[data-cart-drawer-body]'),footer=document.querySelector('[data-cart-drawer-footer]');if(!body||!footer)return;const items=cartItems();if(!items.length){body.innerHTML='<div class="empty-mini-cart"><b>Sepetin boş</b><p>Kiralama ürünlerini inceleyip sepetine ekleyebilirsin.</p></div>';footer.innerHTML='<button class="btn btn-soft full" data-cart-close>Alışverişe Devam Et</button><a class="btn btn-primary full" href="sepet.html">Sepete Git</a>';return;}body.innerHTML='<div class="drawer-items">'+items.map((it,i)=>{const p=getProduct(it.id),qty=it.qty||1,total=itemTotal(it);return `<article class="drawer-item"><img src="${p.image}" alt="${p.name}"><div><b>${p.name}</b><span class="drawer-period-meta">${itemLabel(it)}</span><small class="drawer-total-label">Toplam ödeme</small><strong>${formatPrice(total)}</strong></div><button class="remove-line" data-remove-cart="${i}">Sil</button><div class="drawer-item-actions"><div class="qty-control"><button data-v33-qty="${i}" data-delta="-1">−</button><input value="${qty}" readonly><button data-v33-qty="${i}" data-delta="1">+</button></div><a class="text-link" href="urun-detay.html?id=${p.id}">Ürüne git →</a></div></article>`;}).join('')+'</div>';const monthly=items.reduce((s,it)=>{const p=getProduct(it.id);return s+(itemMode(it)==='buy'?(p.buyPrice||p.price):monthlyPrice(p,it.period||defaultPeriod(p)))*(it.qty||1)},0);footer.innerHTML=`<div class="drawer-summary"><p class="grand"><span>Aylık ödeme toplamı</span><b class="highlight-green">${formatPrice(monthly)}</b></p><p><span>Teslimat</span><b>Ücretsiz</b></p></div><button class="btn btn-soft full" data-cart-close>Alışverişe Devam Et</button><a class="btn btn-primary full" href="sepet.html">Sepete Git</a>`;body.querySelectorAll('[data-v33-qty]').forEach(b=>b.onclick=()=>v33Qty(Number(b.dataset.v33Qty),Number(b.dataset.delta)));};

  function openCheckout(step=1){let modal=document.querySelector('[data-checkout-modal]');if(!modal){document.body.insertAdjacentHTML('beforeend','<div class="checkout-flow-backdrop" data-checkout-modal><div class="checkout-flow-modal v33"><div class="checkout-flow-head"><div><h2>Sipariş bilgileri</h2><p>Adres ve ödeme bilgilerini tamamlayın.</p></div><button class="checkout-close-btn">×</button></div><div class="checkout-flow-body"></div></div></div>');modal=document.querySelector('[data-checkout-modal]');modal.querySelector('.checkout-close-btn').onclick=()=>modal.classList.remove('open');}const body=modal.querySelector('.checkout-flow-body');if(step===1){body.innerHTML=`<div class="checkout-steps"><span class="checkout-step-pill active">1. Adres & kimlik</span><span class="checkout-step-pill">2. Ödeme</span></div><div class="checkout-form-shell"><section class="checkout-card"><h3>Teslimat bilgileri</h3><div class="form-grid"><label>Ad<input placeholder="Adınız"></label><label>Soyad<input placeholder="Soyadınız"></label><label>TC Kimlik No<input data-tc-id inputmode="numeric" maxlength="11" placeholder="11 haneli TC Kimlik No"></label><label>E-posta<input type="email" placeholder="ornek@eposta.com"></label><label>Telefon<div class="phone-field"><select class="country-code-select"><option value="+90">🇹🇷 +90</option><option value="+1">🇺🇸 +1</option><option value="+44">🇬🇧 +44</option><option value="+49">🇩🇪 +49</option></select><input data-phone-input placeholder="Telefon numaranız"></div></label><label>İl<select><option>İstanbul</option></select></label><label>İlçe<input placeholder="İlçe"></label><label style="grid-column:1/-1">Açık Adres<textarea placeholder="Mahalle, sokak, bina ve daire bilgileri"></textarea></label></div></section><div class="checkout-actions"><button class="btn btn-soft" data-close-checkout>Kapat</button><button class="btn btn-primary" data-next-checkout>Ödemeye geç</button></div></div>`;body.querySelector('[data-tc-id]').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,11);body.querySelector('[data-close-checkout]').onclick=()=>modal.classList.remove('open');body.querySelector('[data-next-checkout]').onclick=()=>openCheckout(2);if(window.initPhoneInputs)initPhoneInputs();}else{body.innerHTML=`<div class="checkout-steps"><span class="checkout-step-pill">1. Adres & kimlik</span><span class="checkout-step-pill active">2. Ödeme</span></div><div class="checkout-form-shell"><section class="checkout-card"><h3>Ödeme bilgileri</h3><div class="form-grid"><label>Kart üzerindeki ad<input placeholder="Kart sahibi"></label><label>Kart numarası<input inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000"></label><label>Son kullanma tarihi<input placeholder="AA / YY"></label><label>CVV<input inputmode="numeric" maxlength="3" placeholder="123"></label></div><div class="checkout-choice-list"><label><input type="checkbox" checked> 3D ile ödemeye devam et</label><label><input type="checkbox"> Kartı bir sonraki ödeme için kaydet</label><label><input type="checkbox" checked> Mesafeli satış sözleşmesi ve hizmet şartlarını okudum.</label></div></section><div class="checkout-actions"><button class="btn btn-soft" data-prev-checkout>Geri</button><button class="btn btn-primary" data-pay-checkout>Ödeme Yap</button></div></div>`;body.querySelector('[data-prev-checkout]').onclick=()=>openCheckout(1);body.querySelector('[data-pay-checkout]').onclick=()=>{showToast('Ödeme adımı hazırlandı.');modal.classList.remove('open');};}modal.classList.add('open');}

  initCart=function(){const root=document.querySelector('[data-cart]');if(!root)return;const items=cartItems();if(!items.length){root.innerHTML='<div class="empty-cart-page"><h1>Sepetin boş</h1><p>Kiralama ürünlerini inceleyip sepetine ekleyebilirsin.</p><a class="btn btn-primary" href="kategori.html">Ürünleri Keşfet</a></div>';return;}const rows=items.map((it,i)=>{const p=getProduct(it.id),qty=it.qty||1,period=it.period||defaultPeriod(p),monthly=monthlyPrice(p,period)*qty,daily=dailyPrice(p,period)*qty,total=itemTotal(it);return `<article class="rental-plan-item"><a class="cart-product-image" href="urun-detay.html?id=${p.id}&period=${period}"><img src="${p.image}" alt="${p.name}"></a><div class="plan-product-copy"><a class="cart-product-brand" href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a><h2><a href="urun-detay.html?id=${p.id}&period=${period}">${p.name}</a></h2><div class="plan-meta-row"><div class="selected-plan-tag"><span>Seçili plan</span><b>${period} Ay</b></div><div class="delivery-estimate"><span>Tahmini teslimat</span><b>1–3 İş Günü</b></div></div><div class="plan-qty-row"><div class="qty-control"><button data-v33-page-qty="${i}" data-delta="-1">−</button><input value="${qty}" readonly><button data-v33-page-qty="${i}" data-delta="1">+</button></div><button class="remove-line" data-remove-cart="${i}">Ürünü kaldır</button></div></div><div class="plan-price-summary"><span>${period} aylık toplam ödeme</span><b>${formatPrice(total)}</b><small class="monthly-cart-value">Aylık ödeme <strong>${formatPrice(monthly)}</strong></small><small>Günlük karşılığı <strong class="daily-cart-value">${formatPrice(daily)}</strong></small></div></article>`;}).join('');const monthlyTotal=items.reduce((s,it)=>{const p=getProduct(it.id);return s+monthlyPrice(p,it.period||defaultPeriod(p))*(it.qty||1)},0),rate=couponDiscountRate(),discount=Math.round(monthlyTotal*rate),pay=monthlyTotal-discount;root.innerHTML=`<div class="rental-cart-layout"><main class="rental-cart-main"><div class="cart-item-count"><span>${items.length} ürün sepetinde</span></div><div class="rental-plan-list">${rows}</div><label class="coupon-box rental-coupon"><span>Kupon kodu</span><div><input placeholder="Kupon kodu gir" value="${rate?'merhaba10':''}"><button data-apply-coupon-page>Uygula</button></div>${rate?'<div class="applied-coupon"><span><b>merhaba10</b> · Her ay %10 indirim</span><button data-remove-coupon>Kuponu kaldır</button></div>':''}</label><a class="text-link" href="kategori.html">← Alışverişe devam et</a></main><aside class="rental-plan-summary"><span class="summary-kicker">Ödeme özeti</span><h2>Aylık kiralama</h2><div><span>Aylık ödeme toplamı</span><b>${formatPrice(monthlyTotal)}</b></div>${rate?`<div class="summary-saving"><span>Her ay kupon indirimi</span><b>- ${formatPrice(discount)}</b></div>`:''}<div><span>Teslimat</span><b>Ücretsiz</b></div><div class="first-payment"><span>Aylık ödenecek tutar</span><b>${formatPrice(pay)}</b></div><button class="btn btn-primary full" data-checkout>Kiralama planını onayla</button></aside></div>`;root.querySelectorAll('[data-v33-page-qty]').forEach(b=>b.onclick=()=>v33Qty(Number(b.dataset.v33PageQty),Number(b.dataset.delta)));root.querySelector('[data-checkout]').onclick=()=>openCheckout(1);root.querySelector('[data-apply-coupon-page]')?.addEventListener('click',()=>{applyCouponCode(root.querySelector('.rental-coupon input').value);initCart();});};

  function freshSupport(){document.querySelector('[data-support-widget]')?.remove();document.body.insertAdjacentHTML('beforeend','<div class="support-widget" data-support-widget><div class="support-panel castapos-ai-panel"><div class="ai-panel-head"><span class="ai-brand-icon">✦</span><div><b>Castapos AI</b><small><i></i> 7/24 Çevrimiçi</small></div><button data-support-close>×</button></div><div class="ai-panel-body"><div class="ai-greeting">Merhaba, Castapos destek hattına hoş geldiniz.</div><a class="ai-option" href="nasil-calisir.html">Kiralama süreci hakkında bilgi</a><a class="ai-option" href="kategori.html">Ürün seçimi konusunda yardım</a><a class="ai-option" href="sikca-sorulan-sorular.html">Teslimat ve kurulum desteği</a><a class="ai-option" href="iptal-iade-kosullari.html">İptal ve iade süreci</a><a class="ai-whatsapp-link" href="https://wa.me/905448010433"><span>WhatsApp Destek Hattı</span><b>→</b></a></div><div class="ai-input-row"><input placeholder="Sorunuzu yazın..."><button data-ai-send>→</button></div></div><button class="support-fab" data-support-toggle><span>✦</span><span>Castapos AI</span></button></div>');const w=document.querySelector('[data-support-widget]'),fab=w.querySelector('[data-support-toggle]'),close=w.querySelector('[data-support-close]');fab.onclick=()=>w.classList.toggle('open');close.onclick=()=>w.classList.remove('open');w.querySelector('[data-ai-send]').onclick=()=>showToast('Sorunuz Castapos AI tarafından alındı.');if(innerWidth<=760)setTimeout(()=>{if(!w.classList.contains('open'))w.classList.add('mobile-docked')},10000);}

  function mobileSearch(){if(innerWidth>760)return;const form=document.querySelector('.main-search');if(!form||(!document.body.classList.contains('page-urun-detay')&&!document.body.classList.contains('page-kategori')))return;form.addEventListener('submit',e=>{if(!document.body.classList.contains('mobile-search-open')){e.preventDefault();document.body.classList.add('mobile-search-open');setTimeout(()=>form.querySelector('input').focus(),50);}});}
  function ensureSortButton(){const toolbar=document.querySelector('.category-listing-toolbar'),sort=document.querySelector('[data-sort]');if(!toolbar||!sort)return;let btn=toolbar.querySelector('.mobile-sort-toggle');if(!btn){btn=document.createElement('button');btn.type='button';btn.className='mobile-sort-toggle';btn.textContent='Sırala';toolbar.appendChild(btn);}btn.onclick=()=>{let sheet=document.querySelector('.v33-sort-sheet');if(!sheet){sheet=document.createElement('div');sheet.className='mobile-sort-sheet v33-sort-sheet';sheet.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center"><strong>Sırala</strong><button class="mobile-sort-close">×</button></div>'+[...sort.options].map(o=>`<button data-sort-value="${o.value}">${o.textContent}</button>`).join('');document.body.appendChild(sheet);sheet.querySelector('.mobile-sort-close').onclick=()=>document.body.classList.remove('mobile-sort-open');sheet.querySelectorAll('[data-sort-value]').forEach(b=>b.onclick=()=>{sort.value=b.dataset.sortValue;sort.dispatchEvent(new Event('change'));document.body.classList.remove('mobile-sort-open');});}document.body.classList.add('mobile-sort-open');};const reset=document.querySelector('[data-reset-filters]');if(reset)reset.textContent='Sıfırla';}

  document.querySelector('[data-remove-saved-card]')?.addEventListener('click',e=>{e.target.closest('.saved-payment-card')?.remove();showToast('Kayıtlı kart kaldırıldı.');});
  document.querySelector('[data-update-saved-card]')?.addEventListener('click',()=>showToast('Kart güncelleme alanı açıldı.'));
  initHome();initCategory();initProductDetail();initCart();renderCartDrawer();renderFavoritesPage();freshSupport();mobileSearch();ensureSortButton();
})();


/* === V34 final UI corrections === */
(function(){
  const cleanDisplayName=name=>{const parts=String(name||'Müşteri').trim().split(/\s+/);return parts.length>1?`${parts[0]} ${parts[1][0]}.`:parts[0]};

  buildDetailTabs=function(p){
    const pack=getReviewPack(p.id),reviews=expandedReviews(pack.reviews),qaItems=expandedQa(pack.qa),reviewFilters=['Tümü',5,4,3,2,1];
    return `<div class="detail-tabs" data-detail-tabs>
      <button class="active" data-tab="description">Ürün Açıklaması</button>
      <button data-tab="specs">Teknik Özellikler</button>
      <button id="reviews-anchor" data-tab="reviews">Değerlendirmeler</button>
      <button data-tab="qa">Soru & Cevap</button>
      <button data-tab="return">İptal & İade Koşulları</button>
    </div>
    <div class="detail-tab-panels">
      <section class="detail-tab-panel active" data-panel="description">
        <h3>Ürün Hakkında</h3>
        <p>${highlightSummary(p.summary)}</p>
      </section>
      <section class="detail-tab-panel" data-panel="specs">
        <h3>Teknik Özellikler</h3>
        <div class="spec-table">${p.specs.map(s=>`<div><span>${s.split(':')[0]}</span><b>${s.includes(':')?s.split(':').slice(1).join(':').trim():s}</b></div>`).join('')}</div>
      </section>
      <section class="detail-tab-panel" data-panel="reviews">
        <h3>Değerlendirmeler</h3>
        <div class="reviews-shell" data-reviews-root>
          <div class="review-summary-box"><div><strong>${String(pack.average).replace('.',',')}</strong><span>Genel ürün puanı</span></div><div class="gold-stars">${starIcons(Math.round(pack.average))}</div></div>
          <div class="review-form-box">
            <h4>Değerlendirme Yap</h4>
            <div class="review-rating-pick" data-star-pick>${[1,2,3,4,5].map(n=>`<button type="button" data-rate="${n}">${n} ★</button>`).join('')}</div>
            <textarea placeholder="Ürünü kullandıysan deneyimini kısaca paylaşabilirsin."></textarea>
            <div class="review-form-actions">
              <label class="review-photo-upload"><input type="file" accept="image/*" data-review-photo><span>Fotoğraf Ekle</span></label>
              <button type="button" class="btn btn-primary" data-submit-review>Yorumu Gönder</button>
            </div>
            <div class="review-photo-preview" data-review-photo-preview hidden></div>
          </div>
          <div class="review-filter-bar" data-review-filter>${reviewFilters.map(f=>`<button type="button" data-filter="${f}" class="${f==='Tümü'?'active':''}">${f==='Tümü'?'Tümü':f+' Yıldız'}</button>`).join('')}</div>
          <div class="qa-list review-list" data-review-list>${reviews.map(r=>`<article data-rating="${r.rating}"><div class="review-head"><b>${cleanDisplayName(r.name)}</b><span class="gold-stars small">${starIcons(r.rating)}</span></div><p>${r.text}</p></article>`).join('')}</div>
        </div>
      </section>
      <section class="detail-tab-panel" data-panel="qa">
        <h3>Soru & Cevap</h3>
        <div class="qa-list" data-qa-list>${qaItems.map(item=>`<article><b>Alper A.</b><p>${item.q}</p><div class="qa-answer"><strong>Castapos yanıtı</strong><p>${item.a}</p></div></article>`).join('')}</div>
        <div class="question-box separated-question-box"><h4>Sorunu Sor</h4><textarea placeholder="Ürünle ilgili sorunuzu yazın."></textarea><div class="question-actions single-action"><button type="button" class="btn btn-primary" data-submit-question>Soru Gönder</button></div></div>
      </section>
      <section class="detail-tab-panel" data-panel="return"><h3>İptal & İade Koşulları</h3><p>İade ve iptal süreçleri ürün kategorisine ve kiralama planına göre yürütülür.</p></section>
    </div>`;
  };

  function bindV34DetailEnhancements(){
    const root=document.querySelector('[data-product-detail]');
    if(!root) return;
    const enhance=()=>{
      const gallery=root.querySelector('.gallery-panel');
      const thumbs=[...root.querySelectorAll('[data-thumb]')];
      if(gallery && thumbs.length && !gallery.querySelector('.inline-gallery-arrow')){
        gallery.insertAdjacentHTML('beforeend','<button type="button" class="inline-gallery-arrow prev" aria-label="Önceki görsel">‹</button><button type="button" class="inline-gallery-arrow next" aria-label="Sonraki görsel">›</button>');
        const move=delta=>{
          const current=Math.max(0,thumbs.findIndex(t=>t.classList.contains('active')));
          thumbs[(current+delta+thumbs.length)%thumbs.length]?.click();
        };
        gallery.querySelector('.inline-gallery-arrow.prev').onclick=()=>move(-1);
        gallery.querySelector('.inline-gallery-arrow.next').onclick=()=>move(1);
      }
      const input=root.querySelector('[data-review-photo]');
      if(input && input.dataset.previewBound!=='1'){
        input.dataset.previewBound='1';
        input.addEventListener('change',()=>{
          const preview=root.querySelector('[data-review-photo-preview]');
          const file=input.files?.[0];
          if(!preview||!file) return;
          const reader=new FileReader();
          reader.onload=()=>{preview.hidden=false;preview.innerHTML=`<div><img src="${reader.result}" alt="Değerlendirme fotoğrafı"><button type="button" data-remove-review-photo>×</button></div><span>${file.name}</span>`;preview.querySelector('[data-remove-review-photo]').onclick=()=>{input.value='';preview.hidden=true;preview.innerHTML='';};};
          reader.readAsDataURL(file);
        });
      }
      const qbtn=root.querySelector('[data-submit-question]');if(qbtn&&qbtn.dataset.v34Bound!=='1'){qbtn.dataset.v34Bound='1';qbtn.addEventListener('click',()=>showToast('Sorun destek ekibine iletildi.'));}
    };
    enhance();
    const observer=new MutationObserver(enhance);
    observer.observe(root,{childList:true,subtree:true});
  }

  renderCartDrawer=function(){
    const body=document.querySelector('[data-cart-drawer-body]'),footer=document.querySelector('[data-cart-drawer-footer]');
    if(!body||!footer) return;
    const items=cartItems();
    if(!items.length){
      body.innerHTML='<div class="empty-mini-cart"><b>Sepetin boş</b><p>Kiralama ürünlerini inceleyip sepetine ekleyebilirsin.</p></div>';
      footer.innerHTML='<button class="btn btn-soft full" data-cart-close>Alışverişe Devam Et</button><a class="btn btn-primary full" href="sepet.html">Sepete Git</a>';
      return;
    }
    body.innerHTML=`<div class="drawer-items v34-drawer-items">${items.map((it,i)=>{const p=getProduct(it.id),total=itemTotal(it);return `<article class="drawer-item v34-drawer-item"><img src="${p.image}" alt="${p.name}"><div><b>${p.name}</b><span class="drawer-period-meta">${itemLabel(it)}</span><small class="drawer-total-label">Toplam ödeme</small><strong>${formatPrice(total)}</strong></div><button class="remove-line" data-remove-cart="${i}">Sil</button></article>`;}).join('')}</div>`;
    const monthly=items.reduce((s,it)=>{const p=getProduct(it.id);return s+(itemMode(it)==='buy'?(p.buyPrice||p.price):monthlyPrice(p,it.period||defaultPeriod(p)))*(it.qty||1)},0);
    footer.innerHTML=`<div class="drawer-summary"><p class="grand"><span>Aylık ödeme toplamı</span><b class="highlight-green">${formatPrice(monthly)}</b></p><p><span>Teslimat</span><b>Ücretsiz</b></p></div><button class="btn btn-soft full" data-cart-close>Alışverişe Devam Et</button><a class="btn btn-primary full" href="sepet.html">Sepete Git</a>`;
  };

  function rebuildSupport(){
    document.querySelector('[data-support-widget]')?.remove();
    const page=location.pathname.split('/').pop()||'index.html';
    if(!['index.html','kategori.html','urun-detay.html','nasil-calisir.html',''].includes(page)) return;
    document.body.insertAdjacentHTML('beforeend',`<div class="support-widget v34-support" data-support-widget>
      <div class="support-panel castapos-ai-panel">
        <div class="ai-panel-head"><span class="ai-brand-icon">✦</span><div><b>Castapos AI</b><small><i></i> 7/24 Çevrimiçi</small></div><button type="button" data-support-close>×</button></div>
        <div class="ai-panel-body"><div class="ai-greeting">Merhaba, Castapos destek hattına hoş geldiniz.</div><a class="ai-option" href="nasil-calisir.html">Kiralama süreci hakkında bilgi</a><a class="ai-option" href="kategori.html">Ürün seçimi konusunda yardım</a><a class="ai-option" href="sikca-sorulan-sorular.html">Teslimat ve kurulum desteği</a><a class="ai-option" href="iptal-iade-kosullari.html">İptal ve iade süreci</a><a class="ai-whatsapp-link" href="https://wa.me/905448010433"><span>WhatsApp Destek Hattı</span><b>→</b></a></div>
        <div class="ai-input-row"><input placeholder="Sorunuzu yazın..."><button data-ai-send>→</button></div>
      </div>
      <button class="support-fab" type="button" data-support-toggle><span class="support-fab-icon">✦</span><span class="support-fab-label">Castapos AI</span></button>
    </div>`);
    const w=document.querySelector('[data-support-widget]');
    w.querySelector('[data-support-toggle]').onclick=()=>w.classList.toggle('open');
    w.querySelector('[data-support-close]').onclick=()=>w.classList.remove('open');
    w.querySelector('[data-ai-send]').onclick=()=>showToast('Sorunuz Castapos AI tarafından alındı.');
  }

  function setupMobileAccountSheet(){
    const nav=document.querySelector('[data-mobile-bottom-nav]');
    if(!nav||document.querySelector('[data-mobile-account-sheet]')) return;
    const account=nav.querySelector('a[href="kullanici-bilgilerim.html"]');
    if(!account) return;
    account.addEventListener('click',e=>{e.preventDefault();document.body.classList.add('mobile-account-open');});
    document.body.insertAdjacentHTML('beforeend',`<div class="mobile-account-backdrop" data-mobile-account-sheet><aside class="mobile-account-sheet"><div class="mobile-account-sheet-head"><h2>Hesabım</h2><button type="button" data-mobile-account-close>×</button></div><a href="kiraladiklarim.html">Kiraladıklarım</a><a href="kuponlarim.html">Kuponlarım</a><a href="degerlendirmelerim.html">Değerlendirmelerim</a><a href="kullanici-bilgilerim.html">Kullanıcı Bilgilerim</a></aside></div>`);
    const sheet=document.querySelector('[data-mobile-account-sheet]');
    const close=()=>document.body.classList.remove('mobile-account-open');
    sheet.querySelector('[data-mobile-account-close]').onclick=close;
    sheet.addEventListener('click',e=>{if(e.target===sheet)close();});
  }

  initProductDetail();
  bindV34DetailEnhancements();
  renderCartDrawer();
  rebuildSupport();
  setupMobileAccountSheet();
})();


/* === V35 behavioral refinements === */
(function(){
  const reviewDateList=['19/07/2026','16/07/2026','13/07/2026','10/07/2026','07/07/2026','03/07/2026','29/06/2026','24/06/2026','19/06/2026','14/06/2026'];
  const cleanDisplayName=name=>{const parts=String(name||'Müşteri').trim().split(/\s+/);return parts.length>1?`${parts[0]} ${parts[1][0]}.`:parts[0]};
  const isSportCollection=name=>['Koşu Bantları','Yürüyüş Bantları','Bisiklet','Fitness'].includes(name);

  buildDetailTabs=function(p){
    const pack=getReviewPack(p.id),reviews=expandedReviews(pack.reviews).map((r,i)=>({...r,date:reviewDateList[i%reviewDateList.length],sortIndex:i})),qaItems=expandedQa(pack.qa),reviewFilters=['Tümü',5,4,3,2,1];
    return `<div class="detail-tabs" data-detail-tabs>
      <button class="active" data-tab="description">Ürün Açıklaması</button>
      <button data-tab="specs">Teknik Özellikler</button>
      <button id="reviews-anchor" data-tab="reviews">Değerlendirmeler</button>
      <button data-tab="qa">Soru & Cevap</button>
      <button data-tab="return">İptal & İade Koşulları</button>
    </div>
    <div class="detail-tab-panels">
      <section class="detail-tab-panel active" data-panel="description">
        <h3>Ürün Hakkında</h3>
        <p>${highlightSummary(p.summary)}</p>
      </section>
      <section class="detail-tab-panel" data-panel="specs">
        <h3>Teknik Özellikler</h3>
        <div class="spec-table">${p.specs.map(s=>`<div><span>${s.split(':')[0]}</span><b>${s.includes(':')?s.split(':').slice(1).join(':').trim():s}</b></div>`).join('')}</div>
      </section>
      <section class="detail-tab-panel" data-panel="reviews">
        <h3>Değerlendirmeler</h3>
        <div class="reviews-shell" data-reviews-root>
          <div class="review-summary-box"><div><strong>${String(pack.average).replace('.',',')}</strong><span>Genel ürün puanı</span></div><div class="gold-stars">${starIcons(Math.round(pack.average))}</div></div>
          <div class="review-form-box">
            <h4>Değerlendirme Yap</h4>
            <div class="review-rating-pick" data-star-pick>${[1,2,3,4,5].map(n=>`<button type="button" data-rate="${n}">${n} ★</button>`).join('')}</div>
            <textarea placeholder="Ürünü kullandıysan deneyimini kısaca paylaşabilirsin."></textarea>
            <div class="review-form-actions"><label class="review-photo-upload"><input type="file" accept="image/*" data-review-photo><span>Fotoğraf Ekle</span></label><button type="button" class="btn btn-primary" data-submit-review>Yorumu Gönder</button></div>
            <div class="review-photo-preview" data-review-photo-preview hidden></div>
          </div>
          <div class="review-sort-bar" data-review-sort><button type="button" data-sort-order="new" class="active">En yeni</button><button type="button" data-sort-order="old">En eski</button></div>
          <div class="review-filter-bar compact" data-review-filter>${reviewFilters.map(f=>`<button type="button" data-filter="${f}" class="${f==='Tümü'?'active':''}">${f==='Tümü'?'Tümü':f+' Yıldız'}</button>`).join('')}</div>
          <div class="qa-list review-list" data-review-list>${reviews.map(r=>`<article data-rating="${r.rating}" data-sort-index="${r.sortIndex}"><div class="review-head"><b>${cleanDisplayName(r.name)}</b><div class="review-meta-right"><span class="gold-stars small">${starIcons(r.rating)}</span><small class="review-date">${r.date}</small></div></div><p class="review-text">${r.text}</p></article>`).join('')}</div>
        </div>
      </section>
      <section class="detail-tab-panel" data-panel="qa">
        <h3>Soru & Cevap</h3>
        <div class="qa-list" data-qa-list>${qaItems.map(item=>`<article><b>Alper A.</b><p>${item.q}</p><div class="qa-answer"><strong>Castapos yanıtı</strong><p>${item.a}</p></div></article>`).join('')}</div>
        <div class="question-box separated-question-box"><h4>Sorunu Sor</h4><textarea placeholder="Ürünle ilgili sorunuzu yazın."></textarea><div class="question-actions single-action"><button type="button" class="btn btn-primary" data-submit-question>Soru Gönder</button></div></div>
      </section>
      <section class="detail-tab-panel" data-panel="return"><h3>İptal & İade Koşulları</h3><p>İade ve iptal süreçleri ürün kategorisine ve kiralama planına göre yürütülür.</p></section>
    </div>`;
  };

  initProductDetail=function(){
    const root=document.querySelector('[data-product-detail]'); if(!root) return;
    const p=getProduct(q('id')); const requestedPeriod=Number(q('period')); let period=p.periods.includes(requestedPeriod)?requestedPeriod:defaultPeriod(p); let mode='rent'; let galleryIndex=0; const gallery=[p.image,p.image,p.image,p.image];
    document.title=p.name+' | Castapos';
    function openLightbox(){
      let lb=document.querySelector('.product-lightbox');
      if(!lb){
        document.body.insertAdjacentHTML('beforeend',`<div class="product-lightbox"><div class="product-lightbox-dialog"><button type="button" class="product-lightbox-close">×</button><button type="button" class="product-lightbox-arrow prev">‹</button><div class="product-lightbox-image"><img src="" alt=""></div><button type="button" class="product-lightbox-arrow next">›</button><div class="product-lightbox-thumbs"></div></div></div>`);
        lb=document.querySelector('.product-lightbox');
        lb.addEventListener('click',e=>{ if(e.target===lb) lb.classList.remove('open'); });
        lb.querySelector('.product-lightbox-close').addEventListener('click',()=>lb.classList.remove('open'));
        lb.querySelector('.product-lightbox-arrow.prev').addEventListener('click',()=>{galleryIndex=(galleryIndex-1+gallery.length)%gallery.length; updateLightbox();});
        lb.querySelector('.product-lightbox-arrow.next').addEventListener('click',()=>{galleryIndex=(galleryIndex+1)%gallery.length; updateLightbox();});
        document.addEventListener('keydown',e=>{ if(!lb.classList.contains('open')) return; if(e.key==='Escape') lb.classList.remove('open'); if(e.key==='ArrowRight'){galleryIndex=(galleryIndex+1)%gallery.length; updateLightbox();} if(e.key==='ArrowLeft'){galleryIndex=(galleryIndex-1+gallery.length)%gallery.length; updateLightbox();} });
      }
      function updateLightbox(){
        lb.querySelector('.product-lightbox-image img').src=gallery[galleryIndex];
        lb.querySelector('.product-lightbox-image img').alt=p.name;
        lb.querySelector('.product-lightbox-thumbs').innerHTML=gallery.map((src,i)=>`<button type="button" class="${i===galleryIndex?'active':''}" data-lightbox-thumb="${i}"><img src="${src}" alt="${p.name}"></button>`).join('');
        lb.querySelectorAll('[data-lightbox-thumb]').forEach(btn=>btn.addEventListener('click',()=>{galleryIndex=Number(btn.dataset.lightboxThumb); updateLightbox();}));
      }
      updateLightbox();
      lb.classList.add('open');
    }
    function render(){
      const currentMonthly=monthlyPrice(p,period), currentDaily=dailyPrice(p,period), rentTotal=currentMonthly*period, buyActive=Boolean(p.buyPrice), selectedTotal=mode==='buy'&&buyActive?p.buyPrice:rentTotal, actionMode=mode==='buy'&&buyActive?'buy':'rent';
      const buyMeta=buyActive?`<div class="compact-buy-meta active"><span>Satın alma opsiyonu</span><b>Aktif</b></div>`:`<div class="compact-buy-meta inactive"><span>Satın alma opsiyonu</span><b>Aktif değil</b></div>`;
      const reviewCount=ratingCount(p); const isSport=isSportCollection(p.collection);
      const summaryMeta = mode==='buy' && buyActive
        ? `<em class="detail-buy-note"><span class="metric-label">Tek seferlik satın alma tutarı.</span></em>`
        : `<em class="detail-monthly-cost"><span class="metric-label">Aylık ödeme tutarı:</span> <strong class="metric-value">${formatPrice(currentMonthly)}</strong></em><em class="detail-daily-cost"><span class="metric-label">Günlük karşılığı:</span> <strong class="metric-value">${formatPrice(currentDaily)}</strong></em>`;
      root.innerHTML=`<section class="detail-section"><div class="container product-detail-grid refined compact-detail-grid"><div class="gallery-panel detail-clean"><div class="main-gallery-image clean product-hero-image"><img src="${gallery[galleryIndex]}" alt="${p.name}"></div><div class="thumb-row clean">${gallery.map((src,i)=>`<span class="${i===galleryIndex?'active':''}" data-thumb="${i}"><img src="${src}" alt=""></span>`).join('')}</div></div><div class="detail-panel refined clean compact-panel"><div class="detail-top-row"><nav class="breadcrumb"><a href="index.html">Ana Sayfa</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}">${p.collection}</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a></nav><div class="detail-top-actions"><button type="button" class="detail-compare-btn" data-compare-toggle="${p.id}">⇄ Karşılaştır</button><button type="button" class="detail-fav-btn" data-favorite-id="${p.id}" data-favorite-period="${period}" aria-label="Favorilere ekle">${heartIcon(false)}</button></div></div><h1>${p.name}</h1><div class="detail-rating"><span class="rating-score">★ 4,7</span><button type="button" class="review-link" data-open-reviews>(${reviewCount} değerlendirme)</button></div><div class="detail-price-grid selectable"><button type="button" class="price-mini-card ${mode==='rent'?'active':''}" data-choice="rent"><small>Kirala</small><b>${formatPrice(currentMonthly)}</b><span>/ aylık ödeme</span></button><button type="button" class="price-mini-card ${mode==='buy'?'active':''} ${buyActive?'buy-available':'buy-disabled'}" ${buyActive?'data-choice="buy"':''} ${buyActive?'':'disabled'}><small>Satın Al</small><b>${buyActive ? formatPrice(p.buyPrice) : 'Aktif değil'}</b><span>${buyActive ? 'tek sefer ödeme' : 'yalnızca kiralama'}</span></button></div><div class="periods top-periods compact-pills ${mode==='buy'?'disabled-periods':''}"><label>Kiralama Süresi</label><div>${p.periods.map(m=>`<button class="period-chip ${m===period?'active':''}" data-period="${m}" ${mode==='buy'?'disabled':''}>${m} Ay</button>`).join('')}</div></div><div class="key-benefits compact tighter"><a href="sikca-sorulan-sorular.html">✓ Ücretsiz teslimat</a><a href="iletisim.html">✓ Teknik servis desteği</a><a href="nasil-calisir.html">✓ Satın alma opsiyonu</a></div>${mode==='rent' && isSport?'<div class="detail-local-note">Yalnızca <u>İstanbul içi</u> kiralamalarda geçerlidir.</div>':''}<div class="installment-box refined compact cleaner light"><span>${mode==='buy' && buyActive ? 'Satın alma toplamı' : `Toplam · <strong class="period-accent">${period} Ay</strong>`}</span><div class="big-total">${formatPrice(selectedTotal)}</div>${summaryMeta}</div>${buyMeta}<div class="detail-actions compact-actions single"><button class="btn btn-primary" data-add-cart="${p.id}" data-period="${period}" data-mode="${actionMode}" type="button">Sepete Ekle</button></div></div></div></section><section class="section product-info-section"><div class="container">${buildDetailTabs(p)}</div></section><section class="section compact-section"><div class="container section-title-row"><h2>Benzer ürünler</h2></div><div class="container catalog-grid">${PRODUCTS.filter(x=>x.id!==p.id && x.collection===p.collection).slice(0,4).map(productCard).join('')}</div></section>`;
      root.querySelector('.product-hero-image')?.addEventListener('click',openLightbox);
      root.querySelectorAll('[data-thumb]').forEach(t=>t.addEventListener('click',()=>{galleryIndex=Number(t.dataset.thumb); render();}));
      root.querySelector('.gallery-panel')?.insertAdjacentHTML('beforeend','<button type="button" class="inline-gallery-arrow prev" aria-label="Önceki görsel">‹</button><button type="button" class="inline-gallery-arrow next" aria-label="Sonraki görsel">›</button>');
      root.querySelector('.inline-gallery-arrow.prev')?.addEventListener('click',()=>{galleryIndex=(galleryIndex-1+gallery.length)%gallery.length; render();});
      root.querySelector('.inline-gallery-arrow.next')?.addEventListener('click',()=>{galleryIndex=(galleryIndex+1)%gallery.length; render();});
      root.querySelectorAll('.period-chip').forEach(b=>b.addEventListener('click',()=>{period=Number(b.dataset.period); render();}));
      root.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.choice; render();}));
      root.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-tab]').forEach(b=>b.classList.remove('active')); root.querySelectorAll('[data-panel]').forEach(pnl=>pnl.classList.remove('active')); btn.classList.add('active'); root.querySelector(`[data-panel="${btn.dataset.tab}"]`)?.classList.add('active'); }));
      root.querySelector('[data-open-reviews]')?.addEventListener('click',()=>{ const btn=root.querySelector('[data-tab="reviews"]'); btn?.click(); document.getElementById('reviews-anchor')?.scrollIntoView({behavior:'smooth', block:'start'}); });
      updateFavoriteButtons();
      root.querySelector('[data-submit-review]')?.addEventListener('click',()=>showToast('Değerlendirmen alındı.'));
      root.querySelector('[data-submit-question]')?.addEventListener('click',()=>showToast('Sorun destek ekibine iletildi.'));
      root.querySelectorAll('[data-star-pick] [data-rate]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-star-pick] [data-rate]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }));
      root.querySelectorAll('[data-review-filter] [data-filter]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-review-filter] [data-filter]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const value=btn.dataset.filter; root.querySelectorAll('[data-review-list] article').forEach(card=>{ const pass=(value==='Tümü' || card.dataset.rating===value); card.hidden=!pass; }); }));
      root.querySelectorAll('[data-review-sort] [data-sort-order]').forEach(btn=>btn.addEventListener('click',()=>{ root.querySelectorAll('[data-review-sort] [data-sort-order]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const list=root.querySelector('[data-review-list]'); const cards=[...list.querySelectorAll('article')]; cards.sort((a,b)=>btn.dataset.sortOrder==='new'?Number(a.dataset.sortIndex)-Number(b.dataset.sortIndex):Number(b.dataset.sortIndex)-Number(a.dataset.sortIndex)); cards.forEach(card=>list.appendChild(card)); }));
      const photoInput=root.querySelector('[data-review-photo]');
      if(photoInput){ photoInput.addEventListener('change',()=>{ const preview=root.querySelector('[data-review-photo-preview]'); const file=photoInput.files?.[0]; if(!preview){return;} if(!file){preview.hidden=true;preview.innerHTML='';return;} const reader=new FileReader(); reader.onload=()=>{preview.hidden=false; preview.innerHTML=`<div><img src="${reader.result}" alt="Değerlendirme fotoğrafı"><button type="button" data-remove-review-photo>×</button></div><span>${file.name}</span>`; preview.querySelector('[data-remove-review-photo]').onclick=()=>{photoInput.value=''; preview.hidden=true; preview.innerHTML='';};}; reader.readAsDataURL(file); }); }
      bindProductCards(root);
    }
    render();
  };

  function rebuildSupportV35(){
    document.querySelector('[data-support-widget]')?.remove();
    const page=location.pathname.split('/').pop()||'index.html';
    if(!['index.html','kategori.html','urun-detay.html','nasil-calisir.html',''].includes(page)) return;
    document.body.insertAdjacentHTML('beforeend',`<div class="support-widget v35-support" data-support-widget><div class="support-panel castapos-ai-panel"><div class="ai-panel-head"><span class="ai-brand-icon">✦</span><div><b>Castapos AI</b><small><i></i> 7/24 Çevrimiçi</small></div><button type="button" data-support-close>×</button></div><div class="ai-panel-body"><div class="ai-greeting">Merhaba, Castapos destek hattına hoş geldiniz.</div><a class="ai-option" href="nasil-calisir.html">Kiralama süreci hakkında bilgi</a><a class="ai-option" href="kategori.html">Ürün seçimi konusunda yardım</a><a class="ai-option" href="sikca-sorulan-sorular.html">Teslimat ve kurulum desteği</a><a class="ai-option" href="iptal-iade-kosullari.html">İptal ve iade süreci</a><a class="ai-whatsapp-link" href="https://wa.me/905448010433"><span>WhatsApp Destek Hattı</span><b>→</b></a></div><div class="ai-input-row"><input placeholder="Sorunuzu yazın..."><button data-ai-send>→</button></div></div><button class="support-fab" type="button" data-support-toggle><span class="support-fab-icon">✦</span><span class="support-fab-label">Castapos AI</span></button></div>`);
    const w=document.querySelector('[data-support-widget]');
    const open=()=>{w.classList.add('open');w.classList.remove('mobile-docked');};
    const close=()=>{w.classList.remove('open');if(window.innerWidth<=760)w.classList.add('mobile-docked');};
    w.querySelector('[data-support-toggle]').onclick=()=>{ if(window.innerWidth<=760 && w.classList.contains('mobile-docked')){open();return;} w.classList.toggle('open'); if(!w.classList.contains('open')&&window.innerWidth<=760)w.classList.add('mobile-docked'); };
    w.querySelector('[data-support-close]').onclick=close;
    w.querySelector('[data-ai-send]').onclick=()=>showToast('Sorunuz Castapos AI tarafından alındı.');
    if(window.innerWidth<=760){setTimeout(()=>{if(!w.classList.contains('open'))w.classList.add('mobile-docked');},10000);}  }

  function bindMobileSearchCollapse(){
    if(window.innerWidth>760) return;
    const form=document.querySelector('.main-search');
    if(!form||(!document.body.classList.contains('page-urun-detay')&&!document.body.classList.contains('page-kategori'))) return;
    const close=()=>document.body.classList.remove('mobile-search-open');
    document.addEventListener('click',e=>{ if(!document.body.classList.contains('mobile-search-open')) return; if(form.contains(e.target)) return; close(); });
  }

  initProductDetail();
  rebuildSupportV35();
  bindMobileSearchCollapse();
})();

(function(){document.addEventListener('click',function(e){if(window.innerWidth>760)return; if(document.body.classList.contains('mobile-sort-open')){const sheet=document.querySelector('.mobile-sort-sheet'); const toggle=document.querySelector('.mobile-sort-toggle'); if(sheet && !sheet.contains(e.target) && (!toggle || !toggle.contains(e.target))){document.body.classList.remove('mobile-sort-open');}}});})();




/* === V40 authentication + account menus === */
(function(){
  const USERS_KEY='castapos_demo_users_v1';
  const SESSION_KEY='castapos_demo_session_v1';
  const RESET_KEY='castapos_auth_reset_v40';
  try{if(!localStorage.getItem(RESET_KEY)){localStorage.removeItem(SESSION_KEY);localStorage.setItem(RESET_KEY,'1');}}catch(e){}
  const readUsers=()=>{try{return JSON.parse(localStorage.getItem(USERS_KEY)||'[]')}catch(e){return[]}};
  const saveUsers=users=>localStorage.setItem(USERS_KEY,JSON.stringify(users));
  const readSession=()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch(e){return null}};
  const setSession=user=>localStorage.setItem(SESSION_KEY,JSON.stringify({email:user.email,firstName:user.firstName,lastName:user.lastName}));
  const clearSession=()=>localStorage.removeItem(SESSION_KEY);
  const fullName=user=>[user?.firstName,user?.lastName].filter(Boolean).join(' ')||'Hesabım';

  const DEMO_USER={firstName:'Alper',lastName:'Adlım',email:'alper@castapos.com',phone:'(541) 541 51 51',countryCode:'+90',password:'Castapos123',createdAt:'2026-07-20T00:00:00.000Z',isDemo:true};
  try{
    const seededUsers=readUsers();
    const existingIndex=seededUsers.findIndex(u=>u.email===DEMO_USER.email);
    if(existingIndex===-1){seededUsers.push(DEMO_USER);saveUsers(seededUsers);}
    else if(!seededUsers[existingIndex].password){seededUsers[existingIndex]=DEMO_USER;saveUsers(seededUsers);}
  }catch(e){}
  function renderAccountMenus(){
    const session=readSession();
    document.querySelectorAll('.account-link').forEach(link=>{link.href=session?'kullanici-bilgilerim.html':'giris.html';const label=link.querySelector('small');if(label)label.textContent='Hesabım';if(!link.dataset.v40Bound){link.dataset.v40Bound='1';link.addEventListener('click',e=>{if(window.innerWidth<=760)return;e.preventDefault();const wrap=link.closest('.account-wrap');document.querySelectorAll('.account-wrap.open').forEach(x=>{if(x!==wrap)x.classList.remove('open')});wrap?.classList.toggle('open');});}});
    document.querySelectorAll('.account-menu').forEach(menu=>{
      menu.innerHTML=session?`<div class="account-user-head"><b>${fullName(session)}</b><small>${session.email}</small></div><a href="kiraladiklarim.html">Kiraladıklarım</a><a href="kuponlarim.html">Kuponlarım</a><a href="degerlendirmelerim.html">Değerlendirmelerim</a><a href="kullanici-bilgilerim.html">Kullanıcı Bilgilerim</a><button type="button" class="account-logout" data-account-logout>Oturumu Kapat</button>`:`<div class="account-auth-intro"><b>Hesabına giriş yap</b><p>Kiralama ve siparişlerini yönetmek için devam et.</p></div><a class="account-menu-primary" href="giris.html">Giriş Yap</a><a class="account-menu-secondary" href="uye-ol.html">Hesap Oluştur</a>`;
    });
    const sheet=document.querySelector('[data-mobile-account-sheet] .mobile-account-sheet');
    if(sheet){
      sheet.innerHTML=session?`<div class="mobile-account-sheet-head"><h2>Hesabım</h2><button type="button" data-mobile-account-close>×</button></div><div class="mobile-auth-intro"><h3>${fullName(session)}</h3><p>${session.email}</p></div><a href="kiraladiklarim.html">Kiraladıklarım</a><a href="kuponlarim.html">Kuponlarım</a><a href="degerlendirmelerim.html">Değerlendirmelerim</a><a href="kullanici-bilgilerim.html">Kullanıcı Bilgilerim</a><button type="button" class="mobile-account-logout" data-account-logout>Oturumu Kapat</button>`:`<div class="mobile-account-sheet-head"><h2>Hesabım</h2><button type="button" data-mobile-account-close>×</button></div><div class="mobile-auth-intro"><h3>Hoş geldin</h3><p>Kiralama ve siparişlerini yönetmek için giriş yap veya yeni bir hesap oluştur.</p></div><a class="mobile-auth-primary" href="giris.html">Giriş Yap</a><a class="mobile-auth-secondary" href="uye-ol.html">Hesap Oluştur</a>`;
      const close=()=>document.body.classList.remove('mobile-account-open');
      sheet.querySelector('[data-mobile-account-close]')?.addEventListener('click',close);
    }
    document.querySelectorAll('[data-account-logout]').forEach(btn=>btn.addEventListener('click',()=>{clearSession();renderAccountMenus();document.body.classList.remove('mobile-account-open');location.href='index.html';}));
  }
  function showAuthMessage(form,message,type='error'){
    const box=form.querySelector('[data-auth-message]');if(!box)return;box.hidden=false;box.textContent=message;box.className='auth-message '+type;
  }
  function bindPasswordToggles(scope=document){scope.querySelectorAll('[data-toggle-password]').forEach(btn=>{if(btn.dataset.bound)return;btn.dataset.bound='1';btn.addEventListener('click',()=>{const input=btn.parentElement.querySelector('input');const visible=input.type==='text';input.type=visible?'password':'text';btn.textContent=visible?'Göster':'Gizle';});});}
  function bindLogin(){
    const form=document.querySelector('[data-login-form]');if(!form)return;
    form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const email=String(fd.get('email')||'').trim().toLowerCase();const password=String(fd.get('password')||'');if(!email||!password){showAuthMessage(form,'E-posta ve şifre alanlarını doldurmalısın.');return;}const user=readUsers().find(u=>u.email===email&&u.password===password);if(!user){showAuthMessage(form,'E-posta veya şifre hatalı. Bilgilerini kontrol et.');return;}setSession(user);showAuthMessage(form,'Giriş başarılı. Hesabına yönlendiriliyorsun.','success');setTimeout(()=>location.href='kullanici-bilgilerim.html',450);});
    form.querySelector('[data-forgot-password]')?.addEventListener('click',()=>showAuthMessage(form,'Şifre yenileme bağlantısı demo ortamında e-posta adresine gönderilmiş kabul edilir.','success'));
    form.querySelector('[data-fill-demo-login]')?.addEventListener('click',()=>{const emailInput=form.querySelector('input[name="email"]');const passInput=form.querySelector('input[name="password"]');if(emailInput)emailInput.value=DEMO_USER.email;if(passInput)passInput.value=DEMO_USER.password;showAuthMessage(form,'Demo hesap bilgileri forma dolduruldu.','success');});
  }
  function bindRegister(){
    const form=document.querySelector('[data-register-form]');if(!form)return;
    form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const firstName=String(fd.get('firstName')||'').trim(),lastName=String(fd.get('lastName')||'').trim(),email=String(fd.get('email')||'').trim().toLowerCase(),phone=String(fd.get('phone')||'').trim(),countryCode=String(fd.get('countryCode')||'+90'),password=String(fd.get('password')||''),confirmPassword=String(fd.get('confirmPassword')||'');if(!firstName||!lastName||!email||!phone||!password||!confirmPassword){showAuthMessage(form,'Tüm zorunlu alanları doldurmalısın.');return;}if(password.length<6){showAuthMessage(form,'Şifre en az 6 karakter olmalıdır.');return;}if(password!==confirmPassword){showAuthMessage(form,'Şifreler birbiriyle eşleşmiyor.');return;}if(!fd.get('agreement')){showAuthMessage(form,'Üyelik sözleşmesini kabul etmelisin.');return;}const users=readUsers();if(users.some(u=>u.email===email)){showAuthMessage(form,'Bu e-posta adresiyle daha önce hesap oluşturulmuş.');return;}const marketing=Boolean(fd.get('marketing'));const user={firstName,lastName,email,phone,countryCode,password,marketing,createdAt:new Date().toISOString()};users.push(user);saveUsers(users);setSession(user);showAuthMessage(form,'Hesabın oluşturuldu. Hesabına yönlendiriliyorsun.','success');setTimeout(()=>location.href='kullanici-bilgilerim.html',550);});
  }
  function finalDetailLayout(){
    const grid=document.querySelector('.product-detail-grid.refined.compact-detail-grid');if(!grid)return;const gallery=grid.querySelector('.gallery-panel.detail-clean'),detail=grid.querySelector('.detail-panel.refined.clean.compact-panel'),main=gallery?.querySelector('.main-gallery-image.clean'),thumbs=gallery?.querySelector('.thumb-row.clean');if(!gallery||!detail||!main)return;
    if(window.innerWidth<=1060){gallery.style.removeProperty('--v40-gallery-height');main.style.removeProperty('--v40-main-height');return;}
    requestAnimationFrame(()=>{const h=Math.ceil(detail.getBoundingClientRect().height);const cs=getComputedStyle(gallery);const pad=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);const gap=parseFloat(cs.rowGap)||14;const thumbH=thumbs?Math.ceil(thumbs.getBoundingClientRect().height):0;const mainH=Math.max(220,h-pad-thumbH-gap);gallery.style.setProperty('--v40-gallery-height',h+'px');main.style.setProperty('--v40-main-height',mainH+'px');});
  }
  renderAccountMenus();bindPasswordToggles();bindLogin();bindRegister();if(typeof initPhoneInputs==='function')initPhoneInputs();finalDetailLayout();setTimeout(finalDetailLayout,80);setTimeout(finalDetailLayout,260);window.addEventListener('resize',finalDetailLayout);const detailRoot=document.querySelector('[data-product-detail]');if(detailRoot)new MutationObserver(()=>setTimeout(finalDetailLayout,20)).observe(detailRoot,{childList:true,subtree:true});document.addEventListener('click',e=>{if(!e.target.closest('.account-wrap'))document.querySelectorAll('.account-wrap.open').forEach(x=>x.classList.remove('open'));});
})();


/* === V42 login-required actions === */
(function(){
  const SESSION_KEY='castapos_demo_session_v1';
  const RESET_KEY='castapos_auth_reset_v42';
  try{
    if(!localStorage.getItem(RESET_KEY)){
      localStorage.removeItem(SESSION_KEY);
      localStorage.setItem(RESET_KEY,'1');
    }
  }catch(e){}

  const readSession=()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch(e){return null}};
  const isLoggedIn=()=>Boolean(readSession()?.email);
  const currentReturn=()=>location.pathname.split('/').pop()+location.search+location.hash;
  const loginUrl=()=>`giris.html?return=${encodeURIComponent(currentReturn())}`;
  const registerUrl=()=>`uye-ol.html?return=${encodeURIComponent(currentReturn())}`;
  const redirectToLogin=()=>{location.href=loginUrl();};

  function applyReturnLinks(){
    const params=new URLSearchParams(location.search);
    const returnTo=params.get('return');
    if(!returnTo) return;
    document.querySelectorAll('a[href="uye-ol.html"]').forEach(a=>a.href=`uye-ol.html?return=${encodeURIComponent(returnTo)}`);
    document.querySelectorAll('a[href="giris.html"]').forEach(a=>a.href=`giris.html?return=${encodeURIComponent(returnTo)}`);
  }

  function patchAuthForms(){
    const returnTo=new URLSearchParams(location.search).get('return');
    const loginForm=document.querySelector('[data-login-form]');
    if(loginForm && !loginForm.dataset.v42Bound){
      loginForm.dataset.v42Bound='1';
      loginForm.addEventListener('submit',()=>{
        if(!returnTo) return;
        const timer=setInterval(()=>{
          if(isLoggedIn()){
            clearInterval(timer);
            location.href=returnTo;
          }
        },40);
        setTimeout(()=>clearInterval(timer),1200);
      });
    }
    const registerForm=document.querySelector('[data-register-form]');
    if(registerForm && !registerForm.dataset.v42Bound){
      registerForm.dataset.v42Bound='1';
      registerForm.addEventListener('submit',()=>{
        if(!returnTo) return;
        const timer=setInterval(()=>{
          if(isLoggedIn()){
            clearInterval(timer);
            location.href=returnTo;
          }
        },40);
        setTimeout(()=>clearInterval(timer),1400);
      });
    }
  }

  function lockCouponUi(){
    document.querySelectorAll('.rental-coupon,.coupon-box').forEach(box=>{
      const input=box.querySelector('input');
      const button=box.querySelector('[data-apply-coupon-page],button');
      if(!input || isLoggedIn()){
        box.classList.remove('auth-locked');
        if(input){input.readOnly=false;if(input.dataset.originalPlaceholder)input.placeholder=input.dataset.originalPlaceholder;}
        return;
      }
      box.classList.add('auth-locked');
      if(!input.dataset.originalPlaceholder)input.dataset.originalPlaceholder=input.placeholder||'Kupon kodu gir';
      input.readOnly=true;
      input.value='';
      input.placeholder='Kupon kullanmak için giriş yap';
      input.onclick=redirectToLogin;
      if(button)button.title='Kupon kullanmak için giriş yap';
    });
  }

  function protectDirectAccountPages(){
    const page=location.pathname.split('/').pop();
    const protectedPages=['kiraladiklarim.html','kuponlarim.html','degerlendirmelerim.html','kullanici-bilgilerim.html','hesabim.html'];
    if(protectedPages.includes(page) && !isLoggedIn()) location.replace(loginUrl());
  }

  document.addEventListener('click',e=>{
    if(isLoggedIn()) return;
    const favorite=e.target.closest('[data-favorite-id],[data-favorite-remove]');
    const coupon=e.target.closest('[data-apply-coupon-page],[data-remove-coupon]');
    const checkout=e.target.closest('[data-checkout],[data-next-checkout],[data-pay-checkout]');
    if(!favorite && !coupon && !checkout) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    redirectToLogin();
  },true);

  applyReturnLinks();
  patchAuthForms();
  protectDirectAccountPages();
  lockCouponUi();
  new MutationObserver(()=>lockCouponUi()).observe(document.body,{childList:true,subtree:true});
})();


/* === V43 functional refinements === */
(function(){
  const SESSION_KEY='castapos_demo_session_v1';
  const ADDRESS_KEY='castapos_saved_address_v1';
  const COMPARE_V43_KEY='castapos_compare_v43';
  const isLoggedIn=()=>{try{return Boolean(JSON.parse(localStorage.getItem(SESSION_KEY)||'null')?.email)}catch(e){return false}};
  const safeRead=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(e){return fallback}};
  const safeWrite=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
  const cityList=['Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin','Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkari','Hatay','Isparta','Mersin','İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş','Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak','Aksaray','Bayburt','Karaman','Kırıkkale','Batman','Şırnak','Bartın','Ardahan','Iğdır','Yalova','Karabük','Kilis','Osmaniye','Düzce'];
  const districtMap={
    'İstanbul':['Adalar','Arnavutköy','Ataşehir','Avcılar','Bağcılar','Bahçelievler','Bakırköy','Başakşehir','Bayrampaşa','Beşiktaş','Beykoz','Beylikdüzü','Beyoğlu','Büyükçekmece','Çatalca','Çekmeköy','Esenler','Esenyurt','Eyüpsultan','Fatih','Gaziosmanpaşa','Güngören','Kadıköy','Kağıthane','Kartal','Küçükçekmece','Maltepe','Pendik','Sancaktepe','Sarıyer','Silivri','Sultanbeyli','Sultangazi','Şile','Şişli','Tuzla','Ümraniye','Üsküdar','Zeytinburnu'],
    'Ankara':['Akyurt','Altındağ','Ayaş','Bala','Beypazarı','Çankaya','Çubuk','Elmadağ','Etimesgut','Gölbaşı','Güdül','Haymana','Kahramankazan','Kalecik','Keçiören','Kızılcahamam','Mamak','Nallıhan','Polatlı','Pursaklar','Sincan','Şereflikoçhisar','Yenimahalle'],
    'İzmir':['Aliağa','Balçova','Bayındır','Bayraklı','Bergama','Beydağ','Bornova','Buca','Çeşme','Çiğli','Dikili','Foça','Gaziemir','Güzelbahçe','Karabağlar','Karaburun','Karşıyaka','Kemalpaşa','Kınık','Kiraz','Konak','Menderes','Menemen','Narlıdere','Ödemiş','Seferihisar','Selçuk','Tire','Torbalı','Urla'],
    'Bursa':['Büyükorhan','Gemlik','Gürsu','Harmancık','İnegöl','İznik','Karacabey','Keles','Kestel','Mudanya','Mustafakemalpaşa','Nilüfer','Orhaneli','Orhangazi','Osmangazi','Yenişehir','Yıldırım'],
    'Antalya':['Akseki','Aksu','Alanya','Demre','Döşemealtı','Elmalı','Finike','Gazipaşa','Gündoğmuş','İbradı','Kaş','Kemer','Kepez','Konyaaltı','Korkuteli','Kumluca','Manavgat','Muratpaşa','Serik'],
    'Kocaeli':['Başiskele','Çayırova','Darıca','Derince','Dilovası','Gebze','Gölcük','İzmit','Kandıra','Karamürsel','Kartepe','Körfez'],
    'Adana':['Aladağ','Ceyhan','Çukurova','Feke','İmamoğlu','Karaisalı','Karataş','Kozan','Pozantı','Saimbeyli','Sarıçam','Seyhan','Tufanbeyli','Yumurtalık','Yüreğir'],
    'Konya':['Ahırlı','Akören','Akşehir','Altınekin','Beyşehir','Bozkır','Cihanbeyli','Çeltik','Çumra','Derbent','Derebucak','Doğanhisar','Emirgazi','Ereğli','Güneysınır','Hadim','Halkapınar','Hüyük','Ilgın','Kadınhanı','Karapınar','Karatay','Kulu','Meram','Sarayönü','Selçuklu','Seydişehir','Taşkent','Tuzlukçu','Yalıhüyük','Yunak'],
    'Mersin':['Akdeniz','Anamur','Aydıncık','Bozyazı','Çamlıyayla','Erdemli','Gülnar','Mezitli','Mut','Silifke','Tarsus','Toroslar','Yenişehir'],
    'Gaziantep':['Araban','İslahiye','Karkamış','Nizip','Nurdağı','Oğuzeli','Şahinbey','Şehitkamil','Yavuzeli']
  };
  const districtsFor=city=>districtMap[city]||['Merkez'];
  const cartHasSports=()=>cartItems().some(item=>{const product=getProduct(item.id);return ['Koşu Bantları','Yürüyüş Bantları','Bisiklet','Fitness'].includes(product.collection)});
  const fillCitySelect=(select,selected='')=>{if(!select)return;select.innerHTML='<option value="">İl seçin</option>'+cityList.map(c=>`<option value="${c}" ${c===selected?'selected':''}>${c}</option>`).join('')};
  const fillDistrictSelect=(select,city,selected='')=>{if(!select)return;const list=city?districtsFor(city):[];select.innerHTML='<option value="">İlçe seçin</option>'+list.map(d=>`<option value="${d}" ${d===selected?'selected':''}>${d}</option>`).join('');select.disabled=!city};

  // Login page must always start blank and must not expose autofill controls.
  document.querySelectorAll('[data-fill-demo-login],.demo-account-box').forEach(el=>el.remove());
  const loginForm=document.querySelector('[data-login-form]');
  if(loginForm){loginForm.reset();loginForm.querySelectorAll('input[type="email"],input[type="password"]').forEach(input=>{input.value='';input.setAttribute('autocomplete',input.type==='password'?'new-password':'off')});}

  function bindProfileAddress(){
    const form=document.querySelector('[data-profile-form]');if(!form)return;
    const saved=safeRead(ADDRESS_KEY,{});
    const title=form.querySelector('[data-profile-address-title]'),city=form.querySelector('[data-profile-city]'),district=form.querySelector('[data-profile-district]'),postal=form.querySelector('[data-profile-postal]'),address=form.querySelector('[data-profile-address]');
    fillCitySelect(city,saved.city||'İstanbul');fillDistrictSelect(district,city?.value,saved.district||'');
    if(title)title.value=saved.title||'';if(postal)postal.value=saved.postal||'';if(address)address.value=saved.address||'';
    city?.addEventListener('change',()=>fillDistrictSelect(district,city.value,''));
    form.querySelector('[data-profile-save]')?.addEventListener('click',()=>{safeWrite(ADDRESS_KEY,{title:title?.value.trim()||'Teslimat Adresi',city:city?.value||'',district:district?.value||'',postal:postal?.value.trim()||'',address:address?.value.trim()||''});showToast('Adres ve kullanıcı bilgileri kaydedildi.');});
  }

  function v43Checkout(step=1){
    let modal=document.querySelector('[data-checkout-modal]');
    if(!modal){document.body.insertAdjacentHTML('beforeend','<div class="checkout-flow-backdrop" data-checkout-modal><div class="checkout-flow-modal v43"><div class="checkout-flow-head"><div><h2>Sipariş bilgileri</h2><p>Adres ve ödeme bilgilerini tamamlayın.</p></div><button type="button" class="checkout-close-btn">×</button></div><div class="checkout-flow-body"></div></div></div>');modal=document.querySelector('[data-checkout-modal]');modal.querySelector('.checkout-close-btn').onclick=()=>modal.classList.remove('open');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')}}
    const body=modal.querySelector('.checkout-flow-body');const saved=safeRead(ADDRESS_KEY,{});
    if(step===1){
      body.innerHTML=`<div class="checkout-steps"><span class="checkout-step-pill active">1. Adres</span><span class="checkout-step-pill">2. Ödeme</span></div><div class="checkout-form-shell"><section class="checkout-card"><h3>Teslimat bilgileri</h3><div class="form-grid"><label>Ad<input data-checkout-first-name placeholder="Adınız"></label><label>Soyad<input data-checkout-last-name placeholder="Soyadınız"></label><label>TC Kimlik No<input data-tc-id inputmode="numeric" maxlength="11" placeholder="11 haneli TC Kimlik No"></label><label>E-posta<input type="email" data-checkout-email placeholder="ornek@eposta.com"></label><label>Telefon<div class="phone-field"><select class="country-code-select" data-country-code><option value="+90">🇹🇷 +90</option><option value="+1">🇺🇸 +1</option><option value="+44">🇬🇧 +44</option><option value="+49">🇩🇪 +49</option></select><input data-phone-input placeholder="Telefon numaranız"></div></label><label>İl<select data-checkout-city></select></label><label>İlçe<select data-checkout-district></select></label><label>Posta Kodu<input data-checkout-postal inputmode="numeric" maxlength="5" placeholder="34000"></label><label class="full-row">Açık Adres<textarea data-checkout-address placeholder="Mahalle, sokak, bina ve daire bilgileri"></textarea></label></div><p class="checkout-address-note">Bu adımda girdiğiniz adres, hesabınızdaki teslimat adresine kaydedilir.</p></section><div class="checkout-actions"><button type="button" class="btn btn-soft" data-close-checkout>Kapat</button><button type="button" class="btn btn-primary" data-next-checkout>Ödemeye geç</button></div></div>`;
      const city=body.querySelector('[data-checkout-city]'),district=body.querySelector('[data-checkout-district]');if(cartHasSports()){city.innerHTML='<option value="İstanbul" selected>İstanbul</option>';city.disabled=true;}else{fillCitySelect(city,saved.city||'İstanbul');}fillDistrictSelect(district,city.value,saved.district||'');
      body.querySelector('[data-checkout-postal]').value=saved.postal||'';body.querySelector('[data-checkout-address]').value=saved.address||'';
      city.onchange=()=>fillDistrictSelect(district,city.value,'');
      body.querySelector('[data-tc-id]').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,11);
      body.querySelector('[data-checkout-postal]').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,5);
      body.querySelector('[data-close-checkout]').onclick=()=>modal.classList.remove('open');
      body.querySelector('[data-next-checkout]').onclick=()=>{const tc=body.querySelector('[data-tc-id]').value;if(tc.length!==11){showToast('TC Kimlik No 11 haneli olmalıdır.');return;}safeWrite(ADDRESS_KEY,{title:'Sipariş Adresi',city:city.value,district:district.value,postal:body.querySelector('[data-checkout-postal]').value.trim(),address:body.querySelector('[data-checkout-address]').value.trim()});v43Checkout(2)};
      if(typeof initPhoneInputs==='function')initPhoneInputs();
    }else{
      body.innerHTML=`<div class="checkout-steps"><span class="checkout-step-pill">1. Adres</span><span class="checkout-step-pill active">2. Ödeme</span></div><div class="checkout-form-shell"><section class="checkout-card"><h3>Ödeme bilgileri</h3><div class="form-grid"><label>Kart üzerindeki ad<input placeholder="Kart sahibi"></label><label>Kart numarası<input inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000"></label><label>Son kullanma tarihi<input placeholder="AA / YY"></label><label>CVV<input inputmode="numeric" maxlength="3" placeholder="123"></label></div><div class="checkout-choice-list"><label><input type="checkbox" checked> 3D ile ödemeye devam et</label><label><input type="checkbox"> Kartı bir sonraki ödeme için kaydet</label><label><input type="checkbox" checked> Mesafeli satış sözleşmesini ve hizmet şartlarını okudum.</label></div></section><div class="checkout-actions"><button type="button" class="btn btn-soft" data-prev-checkout>Geri</button><button type="button" class="btn btn-primary" data-pay-checkout>Ödeme Yap</button></div></div>`;
      body.querySelector('[data-prev-checkout]').onclick=()=>v43Checkout(1);body.querySelector('[data-pay-checkout]').onclick=()=>{showToast('Ödeme adımı hazırlandı.');modal.classList.remove('open')};
    }
    modal.classList.add('open');
  }

  // Replace cart rendering with correct punctuation and the V43 checkout.
  initCart=function(){
    const root=document.querySelector('[data-cart]');if(!root)return;const items=cartItems();
    if(!items.length){root.innerHTML='<div class="empty-cart-page"><h1>Sepetin boş</h1><p>Kiralama ürünlerini inceleyip sepetine ekleyebilirsin.</p><a class="btn btn-primary" href="kategori.html">Ürünleri Keşfet</a></div>';return;}
    const rows=items.map((it,i)=>{const p=getProduct(it.id),qty=it.qty||1,period=it.period||defaultPeriod(p),monthly=monthlyPrice(p,period)*qty,daily=dailyPrice(p,period)*qty,total=itemTotal(it);return `<article class="rental-plan-item"><a class="cart-product-image" href="urun-detay.html?id=${p.id}&period=${period}"><img src="${p.image}" alt="${p.name}"></a><div class="plan-product-copy"><a class="cart-product-brand" href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a><h2><a href="urun-detay.html?id=${p.id}&period=${period}">${p.name}</a></h2><div class="plan-meta-row"><div class="selected-plan-tag"><span>Seçili Plan</span><b>${period} Ay</b></div><div class="delivery-estimate"><span>Tahmini Teslimat</span><b>1–3 İş Günü</b></div></div><div class="plan-qty-row"><div class="qty-control"><button data-v43-page-qty="${i}" data-delta="-1">−</button><input value="${qty}" readonly><button data-v43-page-qty="${i}" data-delta="1">+</button></div><button class="remove-line" data-remove-cart="${i}">Ürünü Kaldır</button></div></div><div class="plan-price-summary"><span>${period} Aylık Toplam Ödeme</span><b>${formatPrice(total)}</b><small class="monthly-cart-value">Aylık Ödeme: <strong>${formatPrice(monthly)}</strong></small><small class="daily-cart-value">Günlük Karşılığı: <strong>${formatPrice(daily)}</strong></small></div></article>`}).join('');
    const monthlyTotal=items.reduce((s,it)=>{const p=getProduct(it.id);return s+monthlyPrice(p,it.period||defaultPeriod(p))*(it.qty||1)},0),rate=couponDiscountRate(),discount=Math.round(monthlyTotal*rate),pay=monthlyTotal-discount;
    root.innerHTML=`<div class="rental-cart-layout"><main class="rental-cart-main"><div class="cart-item-count"><span>${items.length} ürün sepetinde</span></div><div class="rental-plan-list">${rows}</div><label class="coupon-box rental-coupon"><span>Kupon Kodu</span><div><input placeholder="Kupon kodu gir" value="${rate?'merhaba10':''}"><button data-apply-coupon-page>Uygula</button></div>${rate?'<div class="applied-coupon"><span><b>merhaba10</b> · Her ay %10 indirim</span><button data-remove-coupon>Kuponu Kaldır</button></div>':''}</label><a class="text-link" href="kategori.html">← Alışverişe devam et</a></main><aside class="rental-plan-summary"><span class="summary-kicker">Ödeme Özeti</span><h2>Aylık Kiralama</h2><div><span>Aylık Ödeme Toplamı</span><b>${formatPrice(monthlyTotal)}</b></div>${rate?`<div class="summary-saving"><span>Her Ay Kupon İndirimi</span><b>- ${formatPrice(discount)}</b></div>`:''}<div><span>Teslimat</span><b>Ücretsiz</b></div><div class="first-payment"><span>Aylık Ödenecek Tutar</span><b>${formatPrice(pay)}</b></div><button class="btn btn-primary full" data-checkout>Kiralama Planını Onayla</button></aside></div>`;
    root.querySelectorAll('[data-v43-page-qty]').forEach(b=>b.onclick=()=>{const list=cartItems(),item=list[Number(b.dataset.v43PageQty)];if(!item)return;item.qty=Math.max(1,(item.qty||1)+Number(b.dataset.delta));saveCart(list);initCart();renderCartDrawer()});
    root.querySelector('[data-checkout]').onclick=()=>{if(!isLoggedIn()){location.href='giris.html?return='+encodeURIComponent('sepet.html');return;}v43Checkout(1)};
    root.querySelector('[data-apply-coupon-page]')?.addEventListener('click',()=>{applyCouponCode(root.querySelector('.rental-coupon input').value);initCart()});
  };

  // Rental detail modal.
  function initRentalDetails(){
    if(!document.querySelector('[data-rental-detail]'))return;
    if(!document.querySelector('[data-rental-detail-modal]'))document.body.insertAdjacentHTML('beforeend','<div class="rental-detail-backdrop" data-rental-detail-modal><div class="rental-detail-modal rental-detail-modal-rich"><div class="rental-detail-head"><div><h2>Kiralama Detayları</h2><p data-rental-modal-product></p></div><button type="button" class="rental-detail-close">×</button></div><div class="rental-detail-body rental-detail-body-rich" data-rental-modal-body></div></div></div>');
    const modal=document.querySelector('[data-rental-detail-modal]'),body=modal.querySelector('[data-rental-modal-body]');
    document.querySelectorAll('[data-rental-detail]').forEach(btn=>btn.onclick=()=>{
      modal.querySelector('[data-rental-modal-product]').textContent=btn.dataset.product;
      const productId=btn.dataset.productId||'';
      const product=(typeof getProduct==='function' && productId)?getProduct(productId):null;
      const image=product?.image||'';
      const detailHref=productId?`urun-detay.html?id=${productId}`:'#';
      const plan=btn.dataset.plan||'—';
      const monthly=btn.dataset.monthly||'—';
      const remaining=btn.dataset.remaining||'—';
      const rentalDate=btn.dataset.rentalDate||'—';
      const deliveryDate=btn.dataset.deliveryDate||'—';
      const address=btn.dataset.address||'—';
      const card=btn.dataset.card||'**** **** **** 4821';
      body.innerHTML=`<div class="rental-detail-product full"><a class="rental-detail-visual" href="${detailHref}">${image?`<img src="${image}" alt="${btn.dataset.product}">`:''}</a><div class="rental-detail-summary"><a class="rental-detail-product-link" href="${detailHref}">${btn.dataset.product}</a><div class="rental-detail-pills"><span>${plan}</span><span>${remaining} kaldı</span></div><div class="rental-detail-cardline"><span>Ödeme Kartı</span><b>${card}</b></div><p>Ürüne tıklayarak detay sayfasına gidebilirsin.</p></div></div><div><span>Kiralama Planı</span><b>${plan}</b></div><div><span>Aylık Ödeme</span><b>${monthly}</b></div><div><span>Kalan Süre</span><b>${remaining}</b></div><div><span>İlk Kiralama Tarihi</span><b>${rentalDate}</b></div><div><span>Teslim Tarihi</span><b>${deliveryDate}</b></div><div class="full"><span>Teslimat Adresi</span><b>${address}</b></div>`;
      modal.classList.add('open')
    });
    modal.querySelector('.rental-detail-close').onclick=()=>modal.classList.remove('open');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};
  }

  // Plan-aware comparison.
  const normaliseCompare=items=>(items||[]).map(item=>typeof item==='string'?{id:item,period:defaultPeriod(getProduct(item))}:{id:item.id,period:Number(item.period||defaultPeriod(getProduct(item.id)))}).filter(x=>x.id).slice(0,3);
  compareItems=function(){return normaliseCompare(safeRead(COMPARE_V43_KEY,[]))};
  saveCompareItems=function(items){safeWrite(COMPARE_V43_KEY,normaliseCompare(items));updateCompareUI()};
  const currentDetailPeriod=()=>Number(document.querySelector('.period-chip.active')?.dataset.period||q('period')||defaultPeriod(getProduct(q('id'))));
  toggleCompare=function(id,period=currentDetailPeriod()){const items=compareItems(),index=items.findIndex(x=>x.id===id);if(index>=0){items.splice(index,1);saveCompareItems(items);return}if(items.length>=3){showToast('En fazla 3 ürün karşılaştırabilirsin.');return}items.push({id,period});saveCompareItems(items)};
  updateCompareUI=function(){if(!isProductDetailPage())return;ensureCompareUI();const items=compareItems(),bar=document.querySelector('[data-compare-bar]'),list=document.querySelector('[data-compare-products]');bar?.classList.toggle('show',items.length>0);if(list)list.innerHTML=items.map(item=>{const p=getProduct(item.id);return `<button type="button" class="compare-mini" data-v43-compare-remove="${item.id}"><img src="${p.image}" alt="${p.name}"><span>${p.name}<small class="compare-selected-plan">${item.period} Ay</small></span><b>×</b></button>`}).join('');document.querySelectorAll('[data-compare-toggle]').forEach(btn=>btn.classList.toggle('active',items.some(x=>x.id===btn.dataset.compareToggle)));const open=document.querySelector('[data-compare-open]');if(open){open.disabled=items.length<2;open.textContent=items.length<2?`Karşılaştır (${items.length}/3)`:`Karşılaştır (${items.length})`}};
  renderCompareModal=function(){const items=compareItems();if(items.length<2){showToast('Karşılaştırmak için en az 2 ürün seçmelisin.');return}const products=items.map(item=>({p:getProduct(item.id),period:item.period}));const specLabels=[...new Set(products.flatMap(({p})=>(p.specs||[]).map(spec=>spec.split(':')[0].trim())))];const getSpec=(p,label)=>{const found=(p.specs||[]).find(spec=>spec.split(':')[0].trim()===label);return found?found.split(':').slice(1).join(':').trim()||found:'—'};const rows=[['Seçili Plan',x=>`${x.period} Ay`],['Aylık Ödeme',x=>formatPrice(monthlyPrice(x.p,x.period))],['Günlük Karşılığı',x=>formatPrice(dailyPrice(x.p,x.period))],['Kategori',x=>x.p.collection],['Marka',x=>x.p.brand],['Kiralama Seçenekleri',x=>x.p.periods.map(v=>v+' Ay').join(' · ')],['Satın Alma Opsiyonu',x=>x.p.buyPrice?'Var':'Yok'],...specLabels.map(label=>[label,x=>getSpec(x.p,label)])];const body=document.querySelector('[data-compare-modal-body]');body.innerHTML=`<div class="compare-table" style="--compare-count:${products.length}"><div class="compare-label"></div>${products.map(({p,period})=>`<div class="compare-product-head"><img src="${p.image}" alt="${p.name}"><a href="urun-detay.html?id=${p.id}&period=${period}">${p.name}</a><span class="compare-selected-plan">${period} Ay</span></div>`).join('')}${rows.map(([label,getter])=>`<div class="compare-label">${label}</div>${products.map(item=>`<div class="compare-value">${getter(item)}</div>`).join('')}`).join('')}</div>`;document.querySelector('[data-compare-modal]')?.classList.add('open')};
  document.addEventListener('click',e=>{const toggle=e.target.closest('[data-compare-toggle]');if(toggle){e.preventDefault();e.stopImmediatePropagation();toggleCompare(toggle.dataset.compareToggle,currentDetailPeriod());return}const remove=e.target.closest('[data-v43-compare-remove]');if(remove){e.preventDefault();e.stopImmediatePropagation();saveCompareItems(compareItems().filter(x=>x.id!==remove.dataset.v43CompareRemove));return}if(e.target.closest('[data-compare-clear]')){e.preventDefault();e.stopImmediatePropagation();saveCompareItems([]);return}if(e.target.closest('[data-compare-open]')){e.preventDefault();e.stopImmediatePropagation();renderCompareModal();return}},true);

  bindProfileAddress();initRentalDetails();initCart();updateCompareUI();
})();


/* V46 interaction refinement patch */
(function(){
  function initReviewModal(){
    const triggers=[...document.querySelectorAll('[data-review-modal-trigger]')];
    if(!triggers.length) return;
    let backdrop=document.querySelector('.review-full-backdrop');
    if(!backdrop){
      document.body.insertAdjacentHTML('beforeend','<div class="review-full-backdrop"><div class="review-full-modal"><div class="review-full-head"><div><span class="gold-stars" data-review-modal-stars></span><h3 data-review-modal-title></h3><div class="review-full-meta"><span>Değerlendirme Detayı</span><time data-review-modal-date></time></div></div><button type="button" aria-label="Kapat">×</button></div><div class="review-full-body" data-review-modal-body></div></div></div>');
      backdrop=document.querySelector('.review-full-backdrop');
      backdrop.addEventListener('click',e=>{if(e.target===backdrop)backdrop.classList.remove('open')});
      backdrop.querySelector('button').addEventListener('click',()=>backdrop.classList.remove('open'));
    }
    const openModal=(card)=>{
      backdrop.querySelector('[data-review-modal-title]').textContent=card.dataset.reviewTitle||'';
      backdrop.querySelector('[data-review-modal-stars]').innerHTML=card.dataset.reviewStars||'';
      backdrop.querySelector('[data-review-modal-date]').textContent=card.dataset.reviewDate||'';
      backdrop.querySelector('[data-review-modal-body]').textContent=card.dataset.reviewFull||'';
      backdrop.classList.add('open');
    };
    triggers.forEach(card=>{
      card.querySelector('[data-review-open]')?.addEventListener('click',e=>{e.preventDefault();openModal(card)});
    });
  }

  function dockSupportImmediately(){
    const widget=document.querySelector('.support-widget.v35-support');
    if(!widget) return;
    const isMobile=()=>window.innerWidth<=760;
    if(isMobile()) widget.classList.add('mobile-docked');
    const collapse=()=>{ if(isMobile() && !widget.classList.contains('open')) widget.classList.add('mobile-docked'); };
    const expand=()=>{ if(isMobile()) widget.classList.remove('mobile-docked'); };
    const fab=widget.querySelector('[data-support-toggle]');
    const close=widget.querySelector('[data-support-close]');
    fab?.addEventListener('click',()=>{ if(isMobile()) expand(); },true);
    close?.addEventListener('click',collapse,true);
    document.addEventListener('click',e=>{
      if(!isMobile()) return;
      if(widget.contains(e.target)) return;
      if(widget.classList.contains('open')) return;
      widget.classList.add('mobile-docked');
    },true);
    window.addEventListener('resize',()=>{ if(isMobile()) widget.classList.add('mobile-docked'); else widget.classList.remove('mobile-docked'); });
  }

  function swapCompareMiniLabels(){
    if(typeof updateCompareUI!=='function') return;
    const original=updateCompareUI;
    updateCompareUI=function(){
      original();
      document.querySelectorAll('.compare-mini .compare-selected-plan').forEach(el=>el.remove());
    };
    try{updateCompareUI();}catch(e){}
  }

  function patchCompareBarActions(){
    document.addEventListener('click',()=>{document.querySelectorAll('.compare-mini .compare-selected-plan').forEach(el=>el.remove())},true);
  }

  function initCompareOnNonDetailPages(){
    if(typeof compareItems!=='function' || typeof ensureCompareUI!=='function' || typeof getProduct!=='function') return;
    const page=location.pathname.split('/').pop()||'index.html';
    if(['urun-detay.html'].includes(page)) return;
    const items=compareItems();
    const existingBar=document.querySelector('[data-compare-bar]');
    if(!items.length){
      existingBar?.classList.remove('show');
      return;
    }
    ensureCompareUI();
    const bar=document.querySelector('[data-compare-bar]');
    const list=document.querySelector('[data-compare-products]');
    if(bar) bar.classList.add('show');
    if(list) list.innerHTML=items.map(item=>{const p=getProduct(item.id);return `<button type="button" class="compare-mini" data-v43-compare-remove="${item.id}"><img src="${p.image}" alt="${p.name}"><span>${p.name}</span><b>×</b></button>`}).join('');
    const open=document.querySelector('[data-compare-open]');
    if(open) open.textContent=items.length<2?`Karşılaştır (${items.length}/3)`:`Karşılaştır (${items.length})`;
    open && (open.disabled=items.length<2);
  }

  document.addEventListener('DOMContentLoaded',()=>{initReviewModal();dockSupportImmediately();swapCompareMiniLabels();patchCompareBarActions();initCompareOnNonDetailPages();});
  initReviewModal();dockSupportImmediately();swapCompareMiniLabels();patchCompareBarActions();initCompareOnNonDetailPages();
})();
