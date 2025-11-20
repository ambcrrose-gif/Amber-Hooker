import React, { useState } from 'react';
import { Product } from './types';
import { ChatInterface } from './components/ChatInterface';
import { ProductCard } from './components/ProductCard';
import { Menu, Fish, Anchor, ArrowRight, MessageCircle, ChefHat } from 'lucide-react';

const products: Product[] = [
  {
    id: '1',
    name: 'Sardines in Olive Oil',
    description: 'The classic Portuguese staple. Plump, silver sardines bathed in pure golden olive oil. Perfect on sourdough toast.',
    imageUrl: 'https://images.unsplash.com/photo-1599021456807-75278d5db5de?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Mackerel Fillets in Spicy Oil',
    description: 'Hand-filleted mackerel with a piri-piri kick. A warming, savory delight that pairs beautifully with a crisp Vinho Verde.',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2747?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Tuna Fillets with Sweet Potato',
    description: 'A hearty Algarvian tradition. Tender tuna chunks combined with the sweetness of local sweet potatoes.',
    imageUrl: 'https://images.unsplash.com/photo-1606850780554-b55eaac84bc2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Codfish in Garlic and Oil',
    description: 'Bacalhau is king in Portugal. Preserved with aromatic garlic cloves for an instant, elegant meal.',
    imageUrl: 'https://images.unsplash.com/photo-1534483501941-b78d62855829?auto=format&fit=crop&w=800&q=80',
  },
];

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAskChef = (product: Product) => {
    setSelectedProduct(product);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <Anchor className="text-navy w-6 h-6" />
              <span className="font-serif font-bold text-2xl tracking-widest text-navy">MISS CAN</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#products" className="text-navy hover:text-gold transition-colors font-semibold text-sm uppercase tracking-wide">Our Products</a>
              <a href="#heritage" className="text-navy hover:text-gold transition-colors font-semibold text-sm uppercase tracking-wide">Heritage</a>
              <a href="#journal" className="text-navy hover:text-gold transition-colors font-semibold text-sm uppercase tracking-wide">Journal</a>
            </div>
            <button className="md:hidden text-navy">
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute right-0 top-0 w-96 h-96 bg-navy rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-gold rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-sm mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-stone-500">Est. 2011 • Portugal</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-navy mb-8 leading-tight">
              From Portugal, <br/>
              <span className="italic text-gold">With Love.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Miss Can isn’t just a tinned fish brand — it’s a celebration of Portuguese heritage, 
              ethical fishing, and the craft of canning as a way of life. 
              Sourced directly from the coast of Portugal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#products" 
                className="inline-flex items-center justify-center gap-2 bg-white text-navy border-2 border-navy px-8 py-4 rounded-xl font-bold text-lg hover:bg-navy hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Discover Your Catch
                <Fish size={20} />
              </a>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-navy text-white border-2 border-navy px-8 py-4 rounded-xl font-bold text-lg hover:bg-navy/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ask the Chef
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section id="products" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-navy mb-4">Explore Portuguese Flavors</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Each tin tells a story of the sea. Sustainable, artisanal, and packed by hand using methods passed down through generations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAskChef={handleAskChef} 
                />
              ))}
            </div>

            <div className="mt-16 text-center">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center gap-2 text-navy font-bold text-lg border-b-2 border-navy pb-1 hover:text-gold hover:border-gold transition-colors"
              >
                Can't decide? Ask for a recommendation <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Gallery / Teaser Section */}
        <section className="py-20 bg-cream overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="font-serif text-4xl font-bold text-navy mb-6">The Art of Canning</h2>
              <p className="text-stone-700 text-lg mb-6 leading-relaxed">
                Our "Miss" represents the Portuguese woman, bold and traditional. Our "Can" is the vessel that carries our history to your table. 
                We believe that opening a tin should be an experience—a moment to pause and savor the Atlantic.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <span className="block text-3xl font-serif font-bold text-gold mb-2">100%</span>
                  <span className="text-sm text-navy font-bold uppercase tracking-wide">Sustainable Fishing</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <span className="block text-3xl font-serif font-bold text-gold mb-2">Hand</span>
                  <span className="text-sm text-navy font-bold uppercase tracking-wide">Packed Quality</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1627246926743-f03f4514e963?auto=format&fit=crop&w=800&q=80" alt="Canning process" className="rounded-2xl shadow-lg translate-y-8" />
              <img src="https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=800&q=80" alt="Fresh ingredients" className="rounded-2xl shadow-lg" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-8">
             <Anchor className="text-gold w-8 h-8" />
             <span className="font-serif font-bold text-2xl tracking-widest">MISS CAN</span>
          </div>
          <div className="flex justify-center gap-8 mb-8 text-sm tracking-widest uppercase text-stone-400">
            <a href="#" className="hover:text-white transition-colors">Shop</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Stockists</a>
          </div>
          <p className="text-stone-500 text-sm">
            © 2025 Miss Can. From Portugal, With Love.
          </p>
        </div>
      </footer>

      {/* Chat Interface (Fixed) */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        initialContext={selectedProduct}
      />
      
      {/* Floating Action Button for Chat if closed */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-gold text-navy p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-40 group"
        >
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-white text-navy text-xs p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Need a recipe or wine pairing?
          </div>
          <ChefHat size={24} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

export default App;