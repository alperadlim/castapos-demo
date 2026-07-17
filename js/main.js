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
  {productId:'walkingpad-r2-pro', rating:5, name:'Enes S***', date:'07 Mart 2026', text:'Evde uzun süre kullanmadan satın almak istemiyordum. 3 aylık kiralama benim için çok daha güvenli bir karar oldu.'},
  {productId:'wero-ai-bike', rating:5, name:'S*** K***', date:'04 Mart 2026', text:'Satın alma düşüncem vardı ama önce kiralamak çok mantıklı geldi. Ürünü deneyip karar vermek gerçekten rahatlatıcı.'},
  {productId:'voit-at1000', rating:4, name:'Halil İbrahim M***', date:'27 Şubat 2026', text:'Kurulum ve teslimat düzenliydi. Ürünü deneyimledikten sonra hangi modele geçeceğime daha net karar verdim.'},
  {productId:'bissell-proheat', rating:5, name:'Cemre A***', date:'22 Şubat 2026', text:'Dönemsel ihtiyaç için satın almadan kullanmak büyük avantaj. Temizlik dönemlerinde gerçekten hayat kurtarıyor.'}
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

function compareItems(){return readJSON(COMPARE_KEY,[])}
function saveCompareItems(items){writeJSON(COMPARE_KEY,items.slice(0,3));updateCompareUI()}
function toggleCompare(id){
  const items=compareItems();
  const exists=items.includes(id);
  if(exists){saveCompareItems(items.filter(x=>x!==id));return}
  if(items.length>=3){showToast('En fazla 3 ürün karşılaştırabilirsin.');return}
  saveCompareItems([...items,id]);
}
function ensureCompareUI(){
  if(document.querySelector('[data-compare-bar]')) return;
  document.body.insertAdjacentHTML('beforeend',`<div class="compare-bar" data-compare-bar><div class="compare-bar-products" data-compare-products></div><div class="compare-bar-actions"><button type="button" class="compare-clear" data-compare-clear>Temizle</button><button type="button" class="compare-open" data-compare-open>Karşılaştır</button></div></div><div class="compare-modal-backdrop" data-compare-modal><div class="compare-modal"><div class="compare-modal-head"><div><span>Ürün Karşılaştırma</span><h2>Seçtiğin ürünleri yan yana incele</h2></div><button type="button" data-compare-close>×</button></div><div class="compare-modal-body" data-compare-modal-body></div></div></div>`);
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
  bar?.classList.toggle('show',items.length>0);
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
    if(e.target.closest('[data-compare-clear]')){e.preventDefault();saveCompareItems([]);return;}
    if(e.target.closest('[data-compare-open]')){e.preventDefault();renderCompareModal();return;}
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
    root.innerHTML=`<section class="detail-section"><div class="container product-detail-grid refined compact-detail-grid"><div class="gallery-panel detail-clean"><div class="main-gallery-image clean product-hero-image"><img src="${p.image}" alt="${p.name}"></div><div class="thumb-row clean"><span><img src="${p.image}" alt=""></span><span><img src="${p.image}" alt=""></span><span><img src="${p.image}" alt=""></span><span><img src="${p.image}" alt=""></span></div></div><div class="detail-panel refined clean compact-panel"><div class="detail-top-row"><nav class="breadcrumb"><a href="index.html">Ana Sayfa</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}">${p.collection}</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}">${p.brand}</a></nav><div class="detail-top-actions"><button type="button" class="detail-compare-btn" data-compare-toggle="${p.id}">⇄ Karşılaştır</button><button type="button" class="detail-fav-btn" data-favorite-id="${p.id}" data-favorite-period="${period}" aria-label="Favorilere ekle">${heartIcon(false)}</button></div></div><h1>${p.name}</h1><div class="detail-rating">★ 4,7 <button type="button" class="review-link" data-open-reviews>(${reviewCount} değerlendirme)</button></div><div class="detail-price-grid selectable"><button type="button" class="price-mini-card ${mode==='rent'?'active':''}" data-choice="rent"><small>Kirala</small><b>${formatPrice(currentMonthly)}</b><span>/ aylık ödeme</span></button><button type="button" class="price-mini-card ${mode==='buy'?'active':''} ${buyActive?'buy-available':'buy-disabled'}" ${buyActive?'data-choice="buy"':'disabled'}><small>Satın Al</small><b>${buyActive ? formatPrice(p.buyPrice) : 'Aktif değil'}</b><span>${buyActive ? 'tek sefer ödeme' : 'yalnızca kiralama'}</span></button></div><div class="periods top-periods compact-pills ${mode==='buy'?'disabled-periods':''}"><label>Kiralama Süresi</label><div>${p.periods.map(m=>`<button class="period-chip ${m===period?'active':''}" data-period="${m}" ${mode==='buy'?'disabled':''}>${m} Ay</button>`).join('')}</div></div><div class="key-benefits compact tighter"><a href="sikca-sorulan-sorular.html">✓ Ücretsiz teslimat</a><a href="iletisim.html">✓ Teknik servis desteği</a><a href="nasil-calisir.html">✓ Satın alma opsiyonu</a></div><div class="installment-box refined compact cleaner light"><span>${mode==='buy' && buyActive ? 'Satın alma toplamı' : `Toplam · <strong class="period-accent">${period} Ay</strong>`}</span><div class="big-total">${formatPrice(selectedTotal)}</div>${mode==='buy' && buyActive ? `<em>Tek seferlik satın alma tutarı.</em>` : `<em>Aylık ödeme tutarı: <strong>${formatPrice(currentMonthly)}</strong></em>`}</div>${buyMeta}<div class="detail-actions compact-actions single"><button class="btn btn-primary" data-add-cart="${p.id}" data-period="${period}" data-mode="${actionMode}" type="button">Sepete Ekle</button></div></div></div></section><section class="section product-info-section"><div class="container">${buildDetailTabs(p)}</div></section><section class="section compact-section"><div class="container section-title-row"><h2>Benzer ürünler</h2></div><div class="container catalog-grid">${PRODUCTS.filter(x=>x.id!==p.id && x.collection===p.collection).slice(0,4).map(productCard).join('')}</div></section>`;
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
