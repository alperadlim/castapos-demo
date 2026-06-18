function q(name){return new URLSearchParams(window.location.search).get(name) || ''}
const CART_KEY='castaposDemoCartV9';

const TYPE_FILTERS={
  'Koşu Bantları':['Tüm ürünler','Katlanabilir','Sessiz motor','Satın alma opsiyonlu','Ev tipi'],
  'Yürüyüş Bantları':['Tüm ürünler','Katlanabilir','Ofis altı','Sessiz','Kumandalı'],
  'Bisiklet':['Tüm ürünler','Katlanabilir','Dikey','Şehir tipi','Akıllı bisiklet'],
  'Fitness':['Tüm ürünler','Stepper','Eliptik','Akıllı antrenman','Kardiyo'],
  'Ev Aletleri':['Tüm ürünler','Halı ve koltuk yıkama','Leke çıkarma','Ev temizliği'],
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
function ratingCount(p){ return Math.floor((p.price%900)+42); }
function cartItems(){ try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch(e){return []} }
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
  saveCart(items); openCartDrawer(); renderCartDrawer();
}

function updateCartCount(){
  const total=getCartQty();
  document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=`${total} Ürün`);
  document.querySelectorAll('.cart-action').forEach(el=>el.classList.toggle('has-items', total>0));
}

function initCommon(){
  const y=document.querySelector('[data-year]'); if(y) y.textContent=new Date().getFullYear();
  document.querySelectorAll('[data-mobile-toggle]').forEach(btn=>btn.addEventListener('click',()=>document.body.classList.toggle('mobile-open')));
  renderNavCategories(); ensureCartDrawer(); updateCartCount(); initAccountMenu();
  document.addEventListener('click',e=>{
    const add=e.target.closest('[data-add-cart]');
    if(add){ e.preventDefault(); addCart(add.dataset.addCart, add.dataset.period, add.dataset.mode || 'rent'); return; }
    const rem=e.target.closest('[data-remove-cart]');
    if(rem){ e.preventDefault(); removeCart(Number(rem.dataset.removeCart)); return; }
    if(e.target.closest('[data-cart-close]')){ closeCartDrawer(); return; }
    if(e.target.classList.contains('cart-backdrop')) closeCartDrawer();
    if(!e.target.closest('.account-wrap')) document.querySelectorAll('.account-wrap.open').forEach(w=>w.classList.remove('open'));
    const demo=e.target.closest('a[href="#"],button[data-demo]');
    if(demo){ e.preventDefault(); showToast(); }
  });
}
function showToast(){ const t=document.querySelector('.demo-toast'); if(t){ t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2100); } }

function initAccountMenu(){
  document.querySelectorAll('.account-link').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      const wrap=link.closest('.account-wrap');
      wrap.classList.toggle('open');
    });
  });
}

function renderNavCategories(){
  const root=document.querySelector('[data-nav-categories]'); if(!root) return;
  root.innerHTML=NAV_CATEGORIES.map(cat=>`<div class="nav-category ${cat.highlight?'highlight':''}"><a href="${cat.href}">${cat.name}</a><div class="mega-panel">${cat.groups.map(g=>`<div><h4>${g[0]}</h4>${g[1].map(item=>`<a href="kategori.html?cat=${encodeURIComponent(cat.name)}&q=${encodeURIComponent(item)}">${item}</a>`).join('')}</div>`).join('')}</div></div>`).join('');
}

function ensureCartDrawer(){
  if(document.querySelector('[data-cart-drawer]')) return;
  document.body.insertAdjacentHTML('beforeend',`<div class="cart-backdrop" data-cart-drawer><aside class="side-cart"><div class="side-cart-head"><strong>Sepetim</strong><button type="button" data-cart-close>×</button></div><div class="side-cart-body" data-cart-drawer-body></div><div class="side-cart-footer" data-cart-drawer-footer></div></aside></div>`);
}
function openCartDrawer(){document.querySelector('[data-cart-drawer]')?.classList.add('open')}
function closeCartDrawer(){document.querySelector('[data-cart-drawer]')?.classList.remove('open')}

function renderCartDrawer(){
  const body=document.querySelector('[data-cart-drawer-body]');
  const footer=document.querySelector('[data-cart-drawer-footer]');
  if(!body || !footer) return;
  const items=cartItems();
  if(!items.length){
    body.innerHTML='<div class="empty-mini-cart"><b>Sepetin boş</b><p>Ürünleri inceleyip kiralama sepetine ekleyebilirsin.</p></div>';
    footer.innerHTML='';
    return;
  }
  const rows=items.map((it,idx)=>{
    const p=getProduct(it.id); const total=itemTotal(it);
    const monthly=itemMode(it)==='buy' ? '' : `<small>Aylık ${formatPrice(monthlyPrice(p,it.period))}</small>`;
    return `<article class="drawer-item"><img src="${p.image}" alt="${p.name}"><div><b>${p.name}</b><span>${itemLabel(it)}</span>${monthly}<strong>${formatPrice(total)}</strong></div><button class="remove-line" type="button" data-remove-cart="${idx}" aria-label="Ürünü sepetten sil">Sil</button></article>`
  }).join('');
  const sub=items.reduce((sum,it)=>sum+itemTotal(it),0);
  body.innerHTML=`<div class="drawer-items">${rows}</div>`;
  footer.innerHTML=`<label class="coupon-box compact"><span>Kupon Kodu</span><div><input placeholder="Kupon kodu gir"><button type="button" data-demo>Uygula</button></div></label><div class="drawer-summary"><p><span>Ara toplam</span><b>${formatPrice(sub)}</b></p><p><span>Teslimat</span><b>Ücretsiz</b></p><p class="grand"><span>Toplam</span><b>${formatPrice(sub)}</b></p></div><a class="btn btn-primary full" href="sepet.html">Sepete Git</a><button class="btn btn-soft full" type="button" data-cart-close>Alışverişe Devam Et</button>`;
}


function productCard(p){
  const period=defaultPeriod(p);
  const monthly=monthlyPrice(p, period); const total=monthly*period; const sepette=Math.round(total*.92);
  const badge = p.premium ? '<span class="discount-badge premium-badge"><i>◆</i> Premium</span>' : (p.discount ? `<span class="discount-badge">${p.discount}</span>` : '');
  const discountLine = p.discount ? `<em>Sepette ${formatPrice(sepette)}</em>` : '';
  return `<article class="compact-product-card">
    <a class="product-img" href="urun-detay.html?id=${p.id}">${badge}<button class="fav-btn" type="button" aria-label="Favorilere ekle">♡</button><img src="${p.image}" alt="${p.name}"></a>
    <div class="product-info"><a class="product-name" href="urun-detay.html?id=${p.id}">${p.name}</a><div class="rating-row"><span>★ 4,7</span><small>(${ratingCount(p)})</small></div><div class="price-block with-action"><small>${period} aylık kiralama</small><div class="total-line"><b>${formatPrice(total)}</b></div><span class="monthly-note">Aylık <strong>${formatPrice(monthly)}</strong> ödenecek</span>${discountLine}<button class="card-add-btn" type="button" data-add-cart="${p.id}" data-period="${period}" aria-label="Sepete ekle">+</button></div></div>
  </article>`;
}

function initHome(){
  initPromoSlider();
  const rail=document.querySelector('[data-popular-products]');
  if(rail){rail.innerHTML=PRODUCTS.slice(0,14).map(productCard).join('');}
  const left=document.querySelector('[data-rail-left]'), right=document.querySelector('[data-rail-right]');
  left?.addEventListener('click',()=>rail.scrollBy({left:-620,behavior:'smooth'}));
  right?.addEventListener('click',()=>rail.scrollBy({left:620,behavior:'smooth'}));
  const newRail=document.querySelector('[data-new-products]');
  if(newRail){newRail.innerHTML=PRODUCTS.slice().reverse().slice(0,12).map(productCard).join('');}
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
  if(label==='Ev Aletleri') title='Alt Kategori';
  return {title, options: TYPE_FILTERS[label] || TYPE_FILTERS['Spor Aletleri']};
}

function matchesType(product, type){
  if(!type || type==='Tüm ürünler') return true;
  const hay=(product.name+' '+product.summary+' '+product.specs.join(' ')+' '+product.category+' '+product.brand).toLocaleLowerCase('tr-TR');
  const map={
    'Katlanabilir':['katlan'], 'Sessiz motor':['sessiz'], 'Satın alma opsiyonlu':['satın alma','opsiyon'], 'Ev tipi':['ev tipi','ev '],
    'Ofis altı':['ofis'], 'Sessiz':['sessiz'], 'Kumandalı':['kumanda'], 'Dikey':['dikey'], 'Şehir tipi':['şehir'],
    'Akıllı bisiklet':['akıllı','yapay zeka','bluetooth'], 'Stepper':['stepper'], 'Eliptik':['eliptik'], 'Akıllı antrenman':['akıllı','bluetooth','vr'],
    'Kardiyo':['kardiyo'], 'Halı ve koltuk yıkama':['halı','koltuk'], 'Leke çıkarma':['leke'], 'Ev temizliği':['temizlik'],
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
    if(active && active!=='Spor Aletleri' && active!=='Yaz Sezonu') arr=arr.filter(p=>p.collection===active || p.category===active);
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
  }
  search?.addEventListener('input',render); sort?.addEventListener('change',render);
  renderTypeOptions(); render();
}

function buildDetailTabs(p){
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
      <p>${p.summary}</p>
      <p>Bu ürün, Castapos kiralama deneyiminde satın alma kararı vermeden önce gerçek kullanım senaryosunda denenebilmesi için listelenir. Dönemsel ihtiyaçlar, alan kısıtı veya kısa süreli kullanım planları için pratik çözüm sunar.</p>
    </section>
    <section class="detail-tab-panel" data-panel="specs">
      <h3>Teknik Özellikler</h3>
      <div class="spec-table">${p.specs.map(s=>`<div><span>${s.split(':')[0]}</span><b>${s.includes(':')?s.split(':').slice(1).join(':').trim():s}</b></div>`).join('')}</div>
    </section>
    <section class="detail-tab-panel" data-panel="reviews">
      <h3>Değerlendirmeler</h3>
      <div class="qa-list review-list"><article><b>Genel memnuniyet: 4,7/5</b><p>Kullanıcılar ürünün kurulum kolaylığını, sessiz çalışmasını ve ev kullanımına uygun yapısını olumlu değerlendiriyor.</p></article><article><b>Öne çıkan yorum</b><p>“Düzenli kullanım için çok pratik. Özellikle satın almadan önce denemek için iyi bir çözüm.”</p></article></div>
    </section>
    <section class="detail-tab-panel" data-panel="qa">
      <h3>Soru & Cevap</h3>
      <div class="qa-list"><article><b>Kiralama süresi bitince ne olur?</b><p>Süre sonunda iade planı oluşturabilir, uygun ürünlerde kiralamayı uzatabilir veya satın alma opsiyonunu değerlendirebilirsin.</p></article><article><b>Teslimat ve kurulum desteği var mı?</b><p>Uygun ürünlerde teslimat süreci Castapos tarafından organize edilir. Demo tasarımda bu alan bilgilendirme amaçlı gösterilir.</p></article><article><b>Ürünü farklı modelle değiştirebilir miyim?</b><p>Kategori ve stok uygunluğuna göre kiralama döneminde farklı bir modele geçiş planlanabilir.</p></article></div>
    </section>
    <section class="detail-tab-panel" data-panel="return">
      <h3>İptal & İade Koşulları</h3>
      <p>İade ve iptal süreçleri ürün kategorisine göre değişebilir. Teslimat öncesi iptal, kullanım süresi sonunda iade ve ürün kontrol süreci demo içinde örnek akış olarak gösterilmektedir.</p>
      <ul class="return-list"><li>Teslimat öncesi iptal talebi destek ekibi üzerinden alınır.</li><li>Kiralama sonunda ürün kontrolü sonrası iade süreci tamamlanır.</li><li>Satın alma opsiyonu bulunan ürünlerde kira sonrası satın alma değerlendirmesi yapılabilir.</li></ul>
    </section>
  </div>`;
}

function initProductDetail(){
  const root=document.querySelector('[data-product-detail]'); if(!root) return;
  const p=getProduct(q('id')); let period=defaultPeriod(p); let mode='rent';
  document.title=p.name+' | Castapos Demo';
  function render(){
    const currentMonthly=monthlyPrice(p,period);
    const rentTotal=currentMonthly*period;
    const buyActive=Boolean(p.buyPrice);
    const buyMeta = buyActive ? `<div class="compact-buy-meta active"><span>Satın alma opsiyonu</span><b>Aktif</b><small>Satın al seçeneğini seçip sepete ekleyebilirsin.</small></div>` : `<div class="compact-buy-meta inactive"><span>Satın alma opsiyonu</span><b>Aktif değil</b><small>Bu ürün şu anda yalnızca kiralama için sunuluyor.</small></div>`;
    const reviewCount=ratingCount(p);
    const selectedTotal=mode==='buy' && buyActive ? p.buyPrice : rentTotal;
    const actionMode=mode==='buy' && buyActive ? 'buy' : 'rent';
    root.innerHTML=`<section class="detail-section"><div class="container product-detail-grid refined compact-detail-grid"><div class="gallery-panel detail-clean"><div class="main-gallery-image clean"><img src="${p.image}" alt="${p.name}"></div><div class="thumb-row clean"><span><img src="${p.image}" alt=""></span><span><img src="${p.image}" alt=""></span><span><img src="${p.image}" alt=""></span><span><img src="${p.image}" alt=""></span></div></div><div class="detail-panel refined clean compact-panel"><nav class="breadcrumb"><a href="index.html" data-demo>Ana Sayfa</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}" data-demo>${p.collection}</a> / <a href="kategori.html?cat=${encodeURIComponent(p.collection)}&q=${encodeURIComponent(p.brand)}" data-demo>${p.brand}</a> / <span>${p.code}</span></nav><h1>${p.name}</h1><div class="detail-rating">★ 4,7 <button type="button" class="review-link" data-open-reviews>(${reviewCount} değerlendirme)</button></div><div class="detail-price-grid selectable"><button type="button" class="price-mini-card ${mode==='rent'?'active':''}" data-choice="rent"><small>Kirala</small><b>${formatPrice(currentMonthly)}</b><span>/ aylık ödeme</span></button><button type="button" class="price-mini-card ${mode==='buy'?'active':''} ${buyActive?'buy-available':'buy-disabled'}" ${buyActive?'data-choice="buy"':'disabled'}><small>Satın Al</small><b>${buyActive ? formatPrice(p.buyPrice) : 'Aktif değil'}</b><span>${buyActive ? 'tek sefer ödeme' : 'yalnızca kiralama'}</span></button></div><div class="periods top-periods compact-pills ${mode==='buy'?'disabled-periods':''}"><label>Kiralama Süresi</label><div>${p.periods.map(m=>`<button class="period-chip ${m===period?'active':''}" data-period="${m}" ${mode==='buy'?'disabled':''}>${m} Ay</button>`).join('')}</div></div><div class="key-benefits compact tighter"><span>✓ Ücretsiz teslimat</span><span>✓ Teknik servis desteği</span><span>✓ Satın alma opsiyonu</span></div><div class="installment-box refined compact cleaner light"><span>${mode==='buy' && buyActive ? 'Satın alma toplamı' : `Toplam · ${period} Ay`}</span><div class="big-total">${formatPrice(selectedTotal)}</div>${mode==='buy' && buyActive ? `<em>Tek seferlik satın alma tutarı.</em>` : `<em>Aylık ödeme tutarı: <strong>${formatPrice(currentMonthly)}</strong></em>`}</div>${buyMeta}<div class="detail-actions compact-actions single"><button class="btn btn-primary" data-add-cart="${p.id}" data-period="${period}" data-mode="${actionMode}" type="button">Sepete Ekle</button></div></div></div></section><section class="section product-info-section"><div class="container">${buildDetailTabs(p)}</div></section><section class="section compact-section"><div class="container section-title-row"><h2>Benzer ürünler</h2></div><div class="container catalog-grid">${PRODUCTS.filter(x=>x.id!==p.id && x.collection===p.collection).slice(0,4).map(productCard).join('')}</div></section>`;
    root.querySelectorAll('.period-chip').forEach(b=>b.addEventListener('click',()=>{period=Number(b.dataset.period); render();}));
    root.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.choice; render();}));
    root.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{
      root.querySelectorAll('[data-tab]').forEach(b=>b.classList.remove('active'));
      root.querySelectorAll('[data-panel]').forEach(pnl=>pnl.classList.remove('active'));
      btn.classList.add('active');
      root.querySelector(`[data-panel="${btn.dataset.tab}"]`)?.classList.add('active');
    }));
    root.querySelector('[data-open-reviews]')?.addEventListener('click',()=>{
      const btn=root.querySelector('[data-tab="reviews"]');
      btn?.click();
      document.getElementById('reviews-anchor')?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }
  render();
}


function initCart(){
  const root=document.querySelector('[data-cart]'); if(!root) return;
  let items=cartItems();
  if(!items.length && q('id')){const p=getProduct(q('id')); items=[{id:p.id,period:Number(q('period')||defaultPeriod(p)),mode:'rent',qty:1}];}
  if(!items.length){root.innerHTML='<div class="empty-cart-page"><h1>Sepetin boş</h1><p>Kiralama ürünlerini inceleyip sepete ekleyebilirsin.</p><a class="btn btn-primary" href="kategori.html">Ürünleri Keşfet</a></div>'; return;}
  const rows=items.map((it,idx)=>{const p=getProduct(it.id); const total=itemTotal(it); const monthly=itemMode(it)==='buy' ? '' : `<small>Aylık ${formatPrice(monthlyPrice(p,it.period))}</small>`; return `<article class="cart-item hb-item"><label class="cart-check"><input type="checkbox" checked><span></span></label><img src="${p.image}" alt="${p.name}"><div class="cart-copy"><h2>${p.name}</h2><p>${p.brand} · ${p.code}</p><span>${itemLabel(it)}</span>${monthly}</div><div class="cart-price-box"><b>${formatPrice(total)}</b><button class="remove-line cart-remove" type="button" data-remove-cart="${idx}">Sil</button></div></article>`}).join('');
  const total=items.reduce((sum,it)=>sum+itemTotal(it),0);
  root.innerHTML=`<div class="cart-layout hb-layout"><div class="cart-main"><div class="cart-coupon-line"><strong>Kuponlarım (${items.length})</strong><a href="#" data-demo>Kupon kodu ekle +</a></div><div class="cart-coupon-card"><div><b>15 TL</b><span>Alt limit: 50 TL</span></div><button type="button" data-demo>Kaldır</button></div><div class="cart-items hb-items">${rows}</div><label class="coupon-box in-summary"><span>Kupon Kodu</span><div><input placeholder="Kupon kodu gir"><button type="button" data-demo>Uygula</button></div></label><a class="text-link" href="kategori.html">← Alışverişe devam et</a></div><aside class="cart-summary hb-summary"><h2>Seçilen Ürünler (${items.length})</h2><div><span>Ürünler</span><b>${formatPrice(total)}</b></div><div><span>Kargo</span><b>Ücretsiz</b></div><div class="summary-saving"><span>Avantajın</span><b>- ${formatPrice(Math.round(total*0.08))}</b></div><div class="summary-total"><span>Toplam</span><b>${formatPrice(total)}</b></div><button class="btn btn-primary full" type="button" data-demo>Alışverişi Tamamla</button><small>Bu prototipte ödeme işlemi aktif değildir.</small></aside></div>`;
}


initCommon(); initHome(); initCategory(); initProductDetail(); initCart(); renderCartDrawer();
