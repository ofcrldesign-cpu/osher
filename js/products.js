/**
 * OSHER Açaí Shop — Cardápio e Dados de Produtos
 * Identidade visual baseada no Brandkit oficial:
 * Cores: Ouro (#EA9F1D a #D27F02), Grafite (#222222), Off-White (#FAF8F5)
 * Filosofia: "Açaí + Sorvete. Do seu jeito."
 */

const OSHER_PRODUCTS = [
  {
    id: 'copo-classico',
    name: 'Copo Clássico OSHER',
    category: 'copos',
    price: 24.90,
    rating: 4.9,
    reviewsCount: 312,
    badge: 'Mais Pedido',
    image: 'assets/images/prod-copo-classico.jpg',
    description: 'Camadas perfeitas de açaí artesanal cremoso, leite ninho em pó, fatias frescas de banana e morango, finalizado com granola dourada crocante.',
    sizes: [
      { label: '300ml', price: 21.90 },
      { label: '500ml', price: 26.90 },
      { label: '700ml', price: 32.90 }
    ],
    isCustomizable: true
  },
  {
    id: 'bowl-ouro-imperial',
    name: 'Bowl Ouro Imperial',
    category: 'bowls',
    price: 36.90,
    rating: 5.0,
    reviewsCount: 184,
    badge: 'Assinatura OSHER',
    image: 'assets/images/prod-bowl-ouro.jpg',
    description: 'Açaí puro premium aveludado, avelãs tostadas crocantes, raspas de chocolate belga, amoras frescas silvestres e espiral de mel âmbar com toques dourados.',
    sizes: [
      { label: '500ml', price: 36.90 },
      { label: '700ml', price: 44.90 }
    ],
    isCustomizable: true
  },
  {
    id: 'duo-fusion-gelato',
    name: 'Duo Fusion Açaí + Gelato',
    category: 'duo',
    price: 32.90,
    rating: 4.9,
    reviewsCount: 228,
    badge: 'Exclusividade',
    image: 'assets/images/hero-duo-fusion.jpg',
    description: 'A combinação que define a OSHER: metade açaí puro cremoso e metade gelato artesanal italiano de baunilha bourbon ou pistache, com calda de caramelo e raspas de chocolate.',
    sizes: [
      { label: '400ml', price: 29.90 },
      { label: '600ml', price: 35.90 }
    ],
    isCustomizable: true
  },
  {
    id: 'gelato-artesanal-pote',
    name: 'Gelato Artesanal Pistache & Baunilha',
    category: 'sorvetes',
    price: 28.90,
    rating: 4.9,
    reviewsCount: 145,
    badge: 'Artesanal',
    image: 'assets/images/prod-sorvete-artesanal.jpg',
    description: 'Autêntico gelato de pistache Bronte e fava de baunilha Bourbon de Madagascar, textura aveludada incomparável, finalizado com pistache picado e toques refinados.',
    sizes: [
      { label: '250g (Pote P)', price: 28.90 },
      { label: '500g (Pote M)', price: 48.90 }
    ],
    isCustomizable: false
  },
  {
    id: 'smoothie-energy-acai',
    name: 'Smoothie Açaí Energy Velvet',
    category: 'shakes',
    price: 22.90,
    rating: 4.8,
    reviewsCount: 97,
    badge: 'Refrescante',
    image: 'assets/images/prod-shake-energy.jpg',
    description: 'Shake aveludado de açaí batido com frutas silvestres e leite vegetal, coberto com chantilly suave, sementes de chia e morango fresco.',
    sizes: [
      { label: '450ml', price: 22.90 }
    ],
    isCustomizable: false
  },
  {
    id: 'combo-delivery-duplo',
    name: 'Combo OSHER Em Casa',
    category: 'combos',
    price: 54.90,
    originalPrice: 63.80,
    rating: 5.0,
    reviewsCount: 420,
    badge: 'Oferta Especial',
    image: 'assets/images/hero-delivery-cup.jpg',
    description: '2 Copos de Açaí 500ml completos com morango, banana, ninho e granola + 2 caldas especiais enviadas em embalagem térmica premium com selo dourado.',
    sizes: [
      { label: '2x 500ml', price: 54.90 }
    ],
    isCustomizable: true
  },
  {
    id: 'bowl-tropical-supreme',
    name: 'Bowl Tropical Supreme',
    category: 'bowls',
    price: 33.90,
    rating: 4.9,
    reviewsCount: 167,
    badge: 'Solar',
    image: 'assets/images/hero-acai-bowl.jpg',
    description: 'Pura polpa de açaí servida com lascas de coco fresco, morangos fatiados, mirtilos, castanhas de caju caramelizadas e fio de mel de laranjeira.',
    sizes: [
      { label: '500ml', price: 33.90 },
      { label: '700ml', price: 41.90 }
    ],
    isCustomizable: true
  }
];

// Opções para a experiência "Monte do Seu Jeito"
const CUSTOMIZER_DATA = {
  sizes: [
    { id: '300ml', name: 'Copo 300ml (Individual)', price: 19.90, desc: 'Perfeito para um lanche rápido e energizante' },
    { id: '500ml', name: 'Copo 500ml (O Favorito)', price: 26.90, desc: 'A medida perfeita para quem ama açaí', popular: true },
    { id: '700ml', name: 'Bowl 700ml (Generoso)', price: 34.90, desc: 'Espaço de sobra para muitas camadas e frutas' },
    { id: '1000ml', name: 'Pote Imperial 1 Litro', price: 46.90, desc: 'Ideal para compartilhar em família ou a dois' }
  ],
  bases: [
    { id: 'acai-tradicional', name: 'Açaí OSHER Tradicional', desc: 'Puro da Amazônia, textura cremosa aveludada', extra: 0, default: true },
    { id: 'acai-zero', name: 'Açaí Zero Adição de Açúcar', desc: '100% natural adoçado com stévia pura', extra: 2.00 },
    { id: 'duo-pistache', name: 'Duo: Açaí + Gelato Pistache', desc: 'Metade açaí e metade gelato artesanal de pistache', extra: 4.50 },
    { id: 'duo-baunilha', name: 'Duo: Açaí + Gelato Baunilha Bourbon', desc: 'Metade açaí e metade gelato fava de baunilha', extra: 3.50 }
  ],
  fruits: [
    { id: 'morango', name: 'Morango Fresco Fatiado', price: 3.00, icon: '🍓' },
    { id: 'banana', name: 'Banana Prata em Rodelas', price: 2.00, icon: '🍌' },
    { id: 'mirtilo', name: 'Mirtilos Silvestres (Blueberries)', price: 4.50, icon: '🫐' },
    { id: 'kiwi', name: 'Kiwi Dourado em Cubos', price: 3.50, icon: '🥝' },
    { id: 'manga', name: 'Manga Palmer Fresca', price: 2.50, icon: '🥭' }
  ],
  crunchies: [
    { id: 'granola', name: 'Granola Artesanal Dourada', price: 2.50 },
    { id: 'ninho', name: 'Leite Ninho em Pó Ninho®', price: 3.00 },
    { id: 'pacoca', name: 'Paçoca Artesanal Rolha', price: 2.00 },
    { id: 'castanha', name: 'Castanha de Caju Tostada', price: 4.00 },
    { id: 'choc-70', name: 'Gotas de Chocolate Belga 70%', price: 4.00 },
    { id: 'coco', name: 'Flocos de Coco Tostado', price: 2.50 },
    { id: 'chia', name: 'Sementes de Chia Orgânica', price: 1.50 }
  ],
  syrups: [
    { id: 'mel-silvestre', name: 'Mel Silvestre Puro Dourado', price: 2.50 },
    { id: 'leite-condensado', name: 'Leite Condensado Moça®', price: 2.50 },
    { id: 'nutella', name: 'Creme de Avelã Nutella® Original', price: 5.00 },
    { id: 'caramelo-salgado', name: 'Caramelo Toffee com Flor de Sal', price: 3.50 },
    { id: 'calda-morango', name: 'Coulis Artesanal de Frutas Vermelhas', price: 3.00 }
  ]
};

// Cupons promocionais ativos
const PROMO_COUPONS = {
  'OSHER10': { discountPercent: 10, minOrder: 25.00, description: '10% OFF no primeiro pedido' },
  'DOSEUJEITO': { discountPercent: 15, minOrder: 40.00, description: '15% OFF em pedidos acima de R$ 40' },
  'FRETEGRATIS': { freeDelivery: true, minOrder: 35.00, description: 'Frete grátis para sua região' }
};
