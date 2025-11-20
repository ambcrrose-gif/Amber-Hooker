import React from 'react';
import { Product } from '../types';
import { ShoppingBag, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAskChef: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAskChef }) => {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-bold text-navy mb-2">{product.name}</h3>
        <p className="text-stone-600 text-sm mb-4 flex-grow font-sans leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex gap-3 mt-auto pt-4 border-t border-stone-100">
          <button 
            onClick={() => onAskChef(product)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-navy bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            <MessageCircle size={16} />
            Pairing?
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-navy hover:bg-navy/90 rounded-lg transition-colors">
            <ShoppingBag size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
