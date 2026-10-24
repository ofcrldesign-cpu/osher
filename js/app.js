/**
 * OSHER Açaí Shop — Lógica da Aplicação
 * Versão Clara e Noturna, Catálogo, Personalizador "Do Seu Jeito",
 * Carrinho Delivery, Checkout WhatsApp e Botão Voltar ao Topo.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Estado Global da Aplicação
  const state = {
    theme: localStorage.getItem('osher_theme') || 'dark',
    cart: JSON.parse(localStorage.getItem('osher_cart')) || [],
    currentSlide: 0,
    activeCategory: 'all',
    searchQuery: '',
    coupon: null,
    discountAmount: 0,
    deliveryFee: 6.00,
    deliveryType: 'delivery',
    customizer: {
      size: CUSTOMIZER_DATA.sizes[1], // 500ml default
      base: CUSTOMIZER_DATA.bases[0], // tradicional default
      fruits: ['morango', 'banana'],
      crunchies: ['granola', 'ninho'],
      syrups: ['mel-silvestre']
    }
  };

  // =========================================================================
  // 1. TEMA CLARO E NOTURNO
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  
  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    state.theme = themeName;
    localStorage.setItem('osher_theme', themeName);
  }

  // Inicializa tema
  applyTheme(state.theme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      showToast(nextTheme === 'light' ? 'Modo Claro ativado' : 'Modo Noturno ativado');
    });
  }

  // =========================================================================
  // 2. HERO SLIDER EM SLIDES (CHAMATIVO COM PRODUTOS E PROMOÇÕES)
  // =========================================================================
  const heroSliderTrack = document.getElementById('heroSliderTrack');
  const sliderDotsContainer = document.getElementById('sliderDotsContainer');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const totalSlides = 3;
  let slideInterval = null;

  function updateSlider() {
    if (!heroSliderTrack) return;
    heroSliderTrack.style.transform = `translateX(-${state.currentSlide * 100}%)`;
    
    // Atualiza dots
    const dots = sliderDotsContainer ? sliderDotsContainer.querySelectorAll('.slider-dot') : [];
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === state.currentSlide);
    });
  }

  function nextSlide() {
    state.currentSlide = (state.currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    state.currentSlide = (state.currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function startSlideAutoPlay() {
    stopSlideAutoPlay();
    slideInterval = setInterval(nextSlide, 5500);
  }

  function stopSlideAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => { nextSlide(); startSlideAutoPlay(); });
  if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => { prevSlide(); startSlideAutoPlay(); });

  if (sliderDotsContainer) {
    sliderDotsContainer.querySelectorAll('.slider-dot').forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        state.currentSlide = slideIndex;
        updateSlider();
        startSlideAutoPlay();
      });
    });
  }

  const heroSection = document.querySelector('.hero-slider-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopSlideAutoPlay);
    heroSection.addEventListener('mouseleave', startSlideAutoPlay);
  }

  startSlideAutoPlay();

  // =========================================================================
  // 3. RENDERIZAÇÃO DO CATÁLOGO DE PRODUTOS
  // =========================================================================
  const productsGrid = document.getElementById('productsGrid');
  const categoryTabBtns = document.querySelectorAll('.category-tab-btn');
  const catalogSearchInput = document.getElementById('catalogSearchInput');

  function renderCatalog() {
    if (!productsGrid) return;

    let filtered = OSHER_PRODUCTS.filter(product => {
      const matchesCategory = state.activeCategory === 'all' || product.category === state.activeCategory;
      const q = state.searchQuery.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(q) || 
                            product.description.toLowerCase().includes(q) ||
                            product.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🌿</div>
          <h3 style="font-size: 1.4rem; color: var(--text-main); margin-bottom: 6px;">Nenhum produto encontrado</h3>
          <p>Tente buscar por outro termo ou selecione outra categoria.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(item => `
      <div class="product-card" data-id="${item.id}">
        <div class="product-thumb-wrap">
          ${item.badge ? `<span class="product-badge-tag">${item.badge}</span>` : ''}
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="product-info-wrap">
          <div class="product-rating-row">
            <span class="star-gold">★</span>
            <strong style="color: var(--text-main);">${item.rating}</strong>
            <span>(${item.reviewsCount} avaliações)</span>
          </div>
          <h3 class="product-name">${item.name}</h3>
          <p class="product-desc">${item.description}</p>
          <div class="product-footer-row">
            <div class="product-price-box">
              <span class="price-prefix">A partir de</span>
              <div>
                <span class="price-val">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                ${item.originalPrice ? `<span class="original-price">R$ ${item.originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
              </div>
            </div>
            <button class="btn btn-gold btn-add-product" data-id="${item.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Eventos de clique para adicionar ao carrinho
    productsGrid.querySelectorAll('.btn-add-product').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.getAttribute('data-id');
        const prod = OSHER_PRODUCTS.find(p => p.id === prodId);
        if (prod) {
          addToCart({
            id: prod.id,
            name: prod.name,
            price: prod.price,
            image: prod.image,
            details: 'Tamanho padrão OSHER',
            quantity: 1
          });
        }
      });
    });
  }

  // Categorias
  categoryTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      categoryTabBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.activeCategory = e.currentTarget.getAttribute('data-category');
      renderCatalog();
    });
  });

  // Busca
  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderCatalog();
    });
  }

  // =========================================================================
  // 4. SEÇÃO INTERATIVA: MONTE DO SEU JEITO
  // =========================================================================
  const customizerSizesGrid = document.getElementById('customizerSizesGrid');
  const customizerBasesGrid = document.getElementById('customizerBasesGrid');
  const customizerFruitsGrid = document.getElementById('customizerFruitsGrid');
  const customizerCrunchiesGrid = document.getElementById('customizerCrunchiesGrid');
  const customizerSyrupsGrid = document.getElementById('customizerSyrupsGrid');
  const customizerTotalPrice = document.getElementById('customizerTotalPrice');
  const addCustomAcaiBtn = document.getElementById('addCustomAcaiBtn');

  // Elementos do resumo
  const summarySize = document.getElementById('summarySize');
  const summaryBase = document.getElementById('summaryBase');
  const summaryFruits = document.getElementById('summaryFruits');
  const summaryCrunchies = document.getElementById('summaryCrunchies');
  const summarySyrups = document.getElementById('summarySyrups');

  function renderCustomizerOptions() {
    // 1. Tamanhos
    if (customizerSizesGrid) {
      customizerSizesGrid.innerHTML = CUSTOMIZER_DATA.sizes.map(size => `
        <div class="selectable-option-card ${state.customizer.size.id === size.id ? 'selected' : ''}" data-type="size" data-id="${size.id}">
          ${size.popular ? `<span class="option-badge-pop">Favorito</span>` : ''}
          <div>
            <div class="option-name">${size.name}</div>
            <div class="option-desc">${size.desc}</div>
          </div>
          <div class="option-price">R$ ${size.price.toFixed(2).replace('.', ',')}</div>
        </div>
      `).join('');
    }

    // 2. Bases
    if (customizerBasesGrid) {
      customizerBasesGrid.innerHTML = CUSTOMIZER_DATA.bases.map(base => `
        <div class="selectable-option-card ${state.customizer.base.id === base.id ? 'selected' : ''}" data-type="base" data-id="${base.id}">
          <div>
            <div class="option-name">${base.name}</div>
            <div class="option-desc">${base.desc}</div>
          </div>
          <div class="option-price">${base.extra === 0 ? 'Incluso' : `+ R$ ${base.extra.toFixed(2).replace('.', ',')}`}</div>
        </div>
      `).join('');
    }

    // 3. Frutas
    if (customizerFruitsGrid) {
      customizerFruitsGrid.innerHTML = CUSTOMIZER_DATA.fruits.map(fruit => {
        const isChecked = state.customizer.fruits.includes(fruit.id);
        return `
          <div class="tag-checkbox-item ${isChecked ? 'checked' : ''}" data-type="fruit" data-id="${fruit.id}">
            <span>${fruit.icon || '•'} ${fruit.name}</span>
            <div class="tag-check-icon">✓</div>
          </div>
        `;
      }).join('');
    }

    // 4. Crocantes
    if (customizerCrunchiesGrid) {
      customizerCrunchiesGrid.innerHTML = CUSTOMIZER_DATA.crunchies.map(item => {
        const isChecked = state.customizer.crunchies.includes(item.id);
        return `
          <div class="tag-checkbox-item ${isChecked ? 'checked' : ''}" data-type="crunchy" data-id="${item.id}">
            <span>${item.name}</span>
            <div class="tag-check-icon">✓</div>
          </div>
        `;
      }).join('');
    }

    // 5. Caldas
    if (customizerSyrupsGrid) {
      customizerSyrupsGrid.innerHTML = CUSTOMIZER_DATA.syrups.map(item => {
        const isChecked = state.customizer.syrups.includes(item.id);
        return `
          <div class="tag-checkbox-item ${isChecked ? 'checked' : ''}" data-type="syrup" data-id="${item.id}">
            <span>${item.name}</span>
            <div class="tag-check-icon">✓</div>
          </div>
        `;
      }).join('');
    }

    attachCustomizerListeners();
    calculateCustomizerTotal();
  }

  function attachCustomizerListeners() {
    // Tamanhos
    document.querySelectorAll('[data-type="size"]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        state.customizer.size = CUSTOMIZER_DATA.sizes.find(s => s.id === id);
        renderCustomizerOptions();
      });
    });

    // Bases
    document.querySelectorAll('[data-type="base"]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        state.customizer.base = CUSTOMIZER_DATA.bases.find(b => b.id === id);
        renderCustomizerOptions();
      });
    });

    // Frutas
    document.querySelectorAll('[data-type="fruit"]').forEach(tag => {
      tag.addEventListener('click', () => {
        const id = tag.getAttribute('data-id');
        const idx = state.customizer.fruits.indexOf(id);
        if (idx > -1) {
          state.customizer.fruits.splice(idx, 1);
        } else {
          state.customizer.fruits.push(id);
        }
        renderCustomizerOptions();
      });
    });

    // Crocantes
    document.querySelectorAll('[data-type="crunchy"]').forEach(tag => {
      tag.addEventListener('click', () => {
        const id = tag.getAttribute('data-id');
        const idx = state.customizer.crunchies.indexOf(id);
        if (idx > -1) {
          state.customizer.crunchies.splice(idx, 1);
        } else {
          state.customizer.crunchies.push(id);
        }
        renderCustomizerOptions();
      });
    });

    // Caldas
    document.querySelectorAll('[data-type="syrup"]').forEach(tag => {
      tag.addEventListener('click', () => {
        const id = tag.getAttribute('data-id');
        const idx = state.customizer.syrups.indexOf(id);
        if (idx > -1) {
          state.customizer.syrups.splice(idx, 1);
        } else {
          state.customizer.syrups.push(id);
        }
        renderCustomizerOptions();
      });
    });
  }

  function calculateCustomizerTotal() {
    let total = state.customizer.size.price + state.customizer.base.extra;

    // Atualiza resumo textual
    if (summarySize) summarySize.textContent = state.customizer.size.name;
    if (summaryBase) summaryBase.textContent = state.customizer.base.name;
    
    if (summaryFruits) {
      const names = state.customizer.fruits
        .map(fId => CUSTOMIZER_DATA.fruits.find(f => f.id === fId)?.name)
        .filter(Boolean);
      summaryFruits.textContent = names.length ? names.join(', ') : 'Nenhuma selecionada';
    }

    if (summaryCrunchies) {
      const names = state.customizer.crunchies
        .map(cId => CUSTOMIZER_DATA.crunchies.find(c => c.id === cId)?.name)
        .filter(Boolean);
      summaryCrunchies.textContent = names.length ? names.join(', ') : 'Nenhum selecionado';
    }

    if (summarySyrups) {
      const names = state.customizer.syrups
        .map(sId => CUSTOMIZER_DATA.syrups.find(s => s.id === sId)?.name)
        .filter(Boolean);
      summarySyrups.textContent = names.length ? names.join(', ') : 'Sem calda';
    }

    if (customizerTotalPrice) {
      customizerTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    return total;
  }

  if (addCustomAcaiBtn) {
    addCustomAcaiBtn.addEventListener('click', () => {
      const total = calculateCustomizerTotal();
      const fruitsList = state.customizer.fruits
        .map(fId => CUSTOMIZER_DATA.fruits.find(f => f.id === fId)?.name)
        .join(', ');
      const crunchiesList = state.customizer.crunchies
        .map(cId => CUSTOMIZER_DATA.crunchies.find(c => c.id === cId)?.name)
        .join(', ');
      const syrupsList = state.customizer.syrups
        .map(sId => CUSTOMIZER_DATA.syrups.find(s => s.id === sId)?.name)
        .join(', ');

      const descDetails = [
        state.customizer.size.name,
        state.customizer.base.name,
        fruitsList ? `Frutas: ${fruitsList}` : null,
        crunchiesList ? `Crocantes: ${crunchiesList}` : null,
        syrupsList ? `Caldas: ${syrupsList}` : null
      ].filter(Boolean).join(' • ');

      addToCart({
        id: `custom-${Date.now()}`,
        name: 'Açaí OSHER — Do Seu Jeito',
        price: total,
        image: 'assets/images/hero-acai-bowl.jpg',
        details: descDetails,
        quantity: 1
      });

      showToast('Seu Açaí personalizado foi adicionado ao pedido!');
    });
  }

  // =========================================================================
  // 5. CARRINHO DE COMPRAS & DRAWER DELIVERY
  // =========================================================================
  const cartHeaderBtn = document.getElementById('cartHeaderBtn');
  const cartBadge = document.getElementById('cartBadge');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartDiscountRow = document.getElementById('cartDiscountRow');
  const cartDiscountAmountEl = document.getElementById('cartDiscountAmount');
  const cartDeliveryFeeEl = document.getElementById('cartDeliveryFee');
  const cartTotalAmountEl = document.getElementById('cartTotalAmount');
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');
  const checkoutProceedBtn = document.getElementById('checkoutProceedBtn');

  function openCart() {
    cartDrawer.classList.add('active');
    cartDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('active');
    cartDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartHeaderBtn) cartHeaderBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCart);

  function saveCart() {
    localStorage.setItem('osher_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function addToCart(item) {
    const existingIndex = state.cart.findIndex(i => i.id === item.id && i.details === item.details);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push(item);
    }
    saveCart();

    // Feedback no badge
    if (cartBadge) {
      cartBadge.classList.add('bump');
      setTimeout(() => cartBadge.classList.remove('bump'), 300);
    }

    showToast(`"${item.name}" adicionado ao pedido!`);
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) cartBadge.textContent = totalCount;

    if (!cartItemsList) return;

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">🛒</div>
          <h4 style="font-size: 1.25rem; color: var(--text-main);">Seu pedido está vazio</h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); max-width: 280px;">
            Que tal escolher uma receita especial ou montar um açaí do seu jeito?
          </p>
          <button class="btn btn-gold" id="btnExploreCatalog" style="margin-top: 10px;">Explorar Cardápio</button>
        </div>
      `;
      const btnExp = document.getElementById('btnExploreCatalog');
      if (btnExp) {
        btnExp.addEventListener('click', () => {
          closeCart();
          document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
        });
      }

      if (checkoutProceedBtn) checkoutProceedBtn.disabled = true;
      if (cartSubtotalEl) cartSubtotalEl.textContent = 'R$ 0,00';
      if (cartTotalAmountEl) cartTotalAmountEl.textContent = 'R$ 0,00';
      if (cartDiscountRow) cartDiscountRow.style.display = 'none';
      return;
    }

    if (checkoutProceedBtn) checkoutProceedBtn.disabled = false;

    // Renderiza itens
    cartItemsList.innerHTML = state.cart.map((item, idx) => `
      <div class="cart-item-card">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <button class="remove-cart-item" data-index="${idx}" title="Remover item">✕</button>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-custom-notes">${item.details}</div>
          <div class="cart-item-bottom-row">
            <div class="qty-stepper">
              <button class="qty-btn btn-qty-minus" data-index="${idx}">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn btn-qty-plus" data-index="${idx}">+</button>
            </div>
            <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
          </div>
        </div>
      </div>
    `).join('');

    // Eventos de stepper e exclusão
    cartItemsList.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        if (state.cart[idx].quantity > 1) {
          state.cart[idx].quantity -= 1;
        } else {
          state.cart.splice(idx, 1);
        }
        saveCart();
      });
    });

    cartItemsList.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        state.cart[idx].quantity += 1;
        saveCart();
      });
    });

    cartItemsList.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        state.cart.splice(idx, 1);
        saveCart();
        showToast('Item removido do pedido');
      });
    });

    // Cálculos de totais
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calcula desconto do cupom
    state.discountAmount = 0;
    let actualDeliveryFee = state.deliveryFee;

    if (state.coupon) {
      if (state.coupon.discountPercent && subtotal >= state.coupon.minOrder) {
        state.discountAmount = (subtotal * state.coupon.discountPercent) / 100;
      }
      if (state.coupon.freeDelivery && subtotal >= state.coupon.minOrder) {
        actualDeliveryFee = 0;
      }
    }

    const total = Math.max(0, subtotal - state.discountAmount + actualDeliveryFee);

    if (cartSubtotalEl) cartSubtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (cartDeliveryFeeEl) {
      cartDeliveryFeeEl.textContent = actualDeliveryFee === 0 ? 'GRÁTIS' : `R$ ${actualDeliveryFee.toFixed(2).replace('.', ',')}`;
    }

    if (cartDiscountRow) {
      if (state.discountAmount > 0) {
        cartDiscountRow.style.display = 'flex';
        if (cartDiscountAmountEl) {
          cartDiscountAmountEl.textContent = `- R$ ${state.discountAmount.toFixed(2).replace('.', ',')}`;
        }
      } else {
        cartDiscountRow.style.display = 'none';
      }
    }

    if (cartTotalAmountEl) {
      cartTotalAmountEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  }

  // Cupom de Desconto
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim().toUpperCase();
      if (!code) return;

      if (PROMO_COUPONS[code]) {
        state.coupon = PROMO_COUPONS[code];
        showToast(`Cupom ${code} aplicado com sucesso!`);
        updateCartUI();
      } else {
        showToast('Cupom inválido ou expirado.');
      }
    });
  }

  // =========================================================================
  // 6. MODAL DE CHECKOUT & FINALIZAÇÃO DELIVERY
  // =========================================================================
  const checkoutModalOverlay = document.getElementById('checkoutModalOverlay');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const paymentMethodCards = document.querySelectorAll('.payment-card-opt');
  let selectedPayment = 'PIX';

  function openCheckout() {
    closeCart();
    checkoutModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckout() {
    checkoutModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (checkoutProceedBtn) checkoutProceedBtn.addEventListener('click', openCheckout);
  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);
  if (checkoutModalOverlay) {
    checkoutModalOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutModalOverlay) closeCheckout();
    });
  }

  // Seleção de Pagamento
  paymentMethodCards.forEach(card => {
    card.addEventListener('click', () => {
      paymentMethodCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedPayment = card.getAttribute('data-payment');
    });
  });

  // Submissão do Pedido
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const customerName = document.getElementById('customerName').value.trim();
      const customerPhone = document.getElementById('customerPhone').value.trim();
      const deliveryAddress = document.getElementById('customerAddress').value.trim();
      const orderNotes = document.getElementById('orderNotes').value.trim();
      const orderNumber = `OSH-${Math.floor(1000 + Math.random() * 9000)}`;

      const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const finalTotal = Math.max(0, subtotal - state.discountAmount + (state.coupon?.freeDelivery ? 0 : state.deliveryFee));

      // Monta Mensagem Formatada para WhatsApp
      let msg = `🌿 *PEDIDO ${orderNumber} — OSHER AÇAÍ SHOP* 🍨\n`;
      msg += `Acolhimento com sofisticação. Do seu jeito.\n\n`;
      msg += `👤 *Cliente:* ${customerName}\n`;
      msg += `📱 *WhatsApp:* ${customerPhone}\n`;
      msg += `📍 *Endereço de Entrega:* ${deliveryAddress}\n`;
      msg += `💳 *Forma de Pagamento:* ${selectedPayment}\n`;
      if (orderNotes) msg += `📝 *Observações:* ${orderNotes}\n`;
      msg += `\n🛒 *ITENS DO PEDIDO:*\n`;

      state.cart.forEach(item => {
        msg += `• *${item.quantity}x ${item.name}* (R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')})\n`;
        if (item.details) msg += `   ↳ _${item.details}_\n`;
      });

      msg += `\n--------------------------------\n`;
      msg += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
      if (state.discountAmount > 0) {
        msg += `Desconto Cupom: - R$ ${state.discountAmount.toFixed(2).replace('.', ',')}\n`;
      }
      msg += `Taxa de Entrega: ${state.coupon?.freeDelivery ? 'GRÁTIS' : `R$ ${state.deliveryFee.toFixed(2).replace('.', ',')}`}\n`;
      msg += `*TOTAL A PAGAR: R$ ${finalTotal.toFixed(2).replace('.', ',')}*\n`;
      msg += `--------------------------------\n`;
      msg += `_Enviado pelo site oficial OSHER Açaí Shop_ ✨`;

      // Exibe Tela de Sucesso no Modal
      const modalBody = checkoutModalOverlay.querySelector('.modal-body');
      if (modalBody) {
        modalBody.innerHTML = `
          <div class="order-success-card">
            <div class="success-check-badge">✓</div>
            <span class="label-caps">Pedido Confirmado com Sucesso!</span>
            <h3 style="font-size: 2rem; color: var(--text-main); margin: 6px 0 12px;">Pedido #${orderNumber}</h3>
            <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 24px; font-size: 0.95rem;">
              Obrigado, <strong>${customerName}</strong>! Seu pedido foi registrado e nossa equipe já está preparando cada detalhe com a excelência OSHER.
            </p>

            <div class="order-timeline-track">
              <div class="timeline-step completed">
                <div class="step-dot">1</div>
                <span>Recebido</span>
              </div>
              <div class="timeline-step active">
                <div class="step-dot">2</div>
                <span>Em Preparo</span>
              </div>
              <div class="timeline-step">
                <div class="step-dot">3</div>
                <span>Saiu Entrega</span>
              </div>
              <div class="timeline-step">
                <div class="step-dot">4</div>
                <span>Entregue</span>
              </div>
            </div>

            <div style="background: var(--bg-main); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-gold-subtle); margin-bottom: 24px; text-align: left;">
              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 4px;">Previsão de entrega: <strong>25 a 40 minutos</strong></div>
              <div style="font-size: 0.85rem; color: var(--text-secondary);">Endereço: <strong>${deliveryAddress}</strong></div>
              <div style="font-size: 0.85rem; color: var(--text-secondary);">Total: <strong style="color: var(--gold-deep); font-size: 1.1rem;">R$ ${finalTotal.toFixed(2).replace('.', ',')}</strong> (${selectedPayment})</div>
            </div>

            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
              <a href="https://wa.me/5511999999999?text=${encodeURIComponent(msg)}" target="_blank" class="btn btn-gold" style="padding: 14px 28px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.983.541 1.879.82 2.796.82 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.766-5.769-5.766zm9.969 5.766c0 5.498-4.472 9.97-9.969 9.97-1.745 0-3.37-.45-4.805-1.242l-5.226 1.37 1.395-5.093c-.902-1.488-1.423-3.235-1.423-5.005 0-5.498 4.473-9.97 9.97-9.97 5.498 0 9.969 4.472 9.969 9.97z"/></svg>
                Enviar Pedido no WhatsApp
              </a>
              <button class="btn btn-outline" id="btnFinishOrderClose">Concluir</button>
            </div>
          </div>
        `;

        document.getElementById('btnFinishOrderClose')?.addEventListener('click', () => {
          closeCheckout();
          // Limpa carrinho após concluir
          state.cart = [];
          saveCart();
          location.reload();
        });
      }

      // Limpa dados temporários
      state.cart = [];
      saveCart();
    });
  }

  // =========================================================================
  // 7. BOTÃO LEVAR AO TOPO (COM ANEL CIRCULAR DE PROGRESSO)
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  const scrollProgressCircle = document.getElementById('scrollProgressCircle');
  const circleRadius = 25;
  const circleCircumference = 2 * Math.PI * circleRadius; // ~157px

  if (scrollProgressCircle) {
    scrollProgressCircle.style.strokeDasharray = `${circleCircumference}`;
    scrollProgressCircle.style.strokeDashoffset = `${circleCircumference}`;
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (docHeight > 0 && scrollProgressCircle) {
      const scrollPercent = Math.min(1, Math.max(0, scrollTop / docHeight));
      const offset = circleCircumference - (scrollPercent * circleCircumference);
      scrollProgressCircle.style.strokeDashoffset = `${offset}`;
    }

    if (backToTopBtn) {
      if (scrollTop > 280) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 8. NOTIFICAÇÃO TOAST VISUAL
  // =========================================================================
  let toastTimeout = null;
  function showToast(message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <span class="toast-icon">✨</span>
      <span style="font-size: 0.88rem; font-weight: 500;">${message}</span>
    `;

    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Renderização inicial
  renderCatalog();
  renderCustomizerOptions();
  updateCartUI();
});
