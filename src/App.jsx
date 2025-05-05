import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import productsData from './data/products.json';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui is installed
import { Input } from '@/components/ui/input'; // Assuming shadcn/ui is installed
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming shadcn/ui is installed
import { ShoppingCart, Minus, Plus, Phone, Mail, MapPin, Building } from 'lucide-react'; // Lucide icons

// --- Components --- 

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Replace with actual logo if available */}
        <h1 className="text-2xl font-bold text-yellow-600">Bronzella</h1> 
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#home" className="text-gray-600 hover:text-yellow-600">{t('nav.home')}</a>
          <a href="#products" className="text-gray-600 hover:text-yellow-600">{t('nav.products')}</a>
          <a href="#about" className="text-gray-600 hover:text-yellow-600">{t('nav.about')}</a>
          <a href="#contact" className="text-gray-600 hover:text-yellow-600">{t('nav.contact')}</a>
          <Select defaultValue={i18n.language} onValueChange={changeLanguage}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Lang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">PT</SelectItem>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="es">ES</SelectItem>
            </SelectContent>
          </Select>
          <a href="#quote-cart" className="text-gray-600 hover:text-yellow-600">
            <ShoppingCart />
          </a>
        </nav>
        {/* Add mobile menu button here if needed */}
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useTranslation();
  // Basic hero, consider adding carousel later if needed based on reference image
  return (
    <section id="home" className="relative bg-cover bg-center h-[60vh] text-white" style={{ backgroundImage: "url('/images/slide1.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">{t('hero.title')}</h2>
        <p className="text-lg md:text-xl">{t('hero.subtitle')}</p>
      </div>
    </section>
  );
}

function ProductCard({ product, onAddToCart }) {
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  // Get translated fields based on current language
  const productName = product[`name_${i18n.language}`] || product.name_pt;
  const productDescription = product[`description_${i18n.language}`] || product.description_pt;
  const productAlt = product[`alt_${i18n.language}`] || product.alt_pt;

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
      <div className="w-full h-48 overflow-hidden">
         <img src={product.image} alt={t('products_section.product_image_alt', { productName: productName })} className="w-full h-full object-cover"/>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 h-14 overflow-hidden">{productName}</h3>
        {/* Placeholder for price - easy to add later */}
        {/* {product.price && <p className="text-xl font-bold text-green-600 mb-2">R$ {product.price.toFixed(2)}</p>} */}
        <p className="text-sm text-gray-600 mb-4 flex-grow">{productDescription}</p>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium">{t('products_section.quantity')}:</label>
          <div className="flex items-center border rounded">
            <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(quantity - 1)} className="px-2">
              <Minus size={16} />
            </Button>
            <Input 
              type="number" 
              value={quantity} 
              onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)} 
              min="1" 
              max="99" 
              className="w-12 text-center border-l border-r rounded-none h-8"
            />
            <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(quantity + 1)} className="px-2">
              <Plus size={16} />
            </Button>
          </div>
        </div>
        <Button onClick={handleAddToCartClick} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
          <ShoppingCart size={18} className="mr-2" /> {t('products_section.add_to_quote')}
        </Button>
      </div>
    </div>
  );
}

function ProductList({ products, categories, onAddToCart }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('todos');

  const filteredProducts = filter === 'todos' 
    ? products 
    : products.filter(p => p.category_pt.toLowerCase() === filter);

  return (
    <section id="products" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('products_section.title')}</h2>
          <p className="text-gray-600">{t('products_section.subtitle')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button 
            variant={filter === 'todos' ? 'default' : 'outline'}
            onClick={() => setFilter('todos')}
            className={`capitalize ${filter === 'todos' ? 'bg-yellow-500 text-white hover:bg-yellow-600' : ''}`}
          >
            {t('products_section.filter_all')}
          </Button>
          {categories.map(category => (
            <Button 
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              onClick={() => setFilter(category)}
              className={`capitalize ${filter === category ? 'bg-yellow-500 text-white hover:bg-yellow-600' : ''}`}
            >
              {t(`categories.${category.replace(/-/g, '_')}`, category)} {/* Translate category */}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteCart({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const { t, i18n } = useTranslation();
  const whatsappNumber = "5511982901369"; // Format for WhatsApp API (Country Code + Number)

  const generateWhatsAppMessage = () => {
    let message = t('whatsapp_quote.message_header') + "\n";
    cartItems.forEach(item => {
      const productName = item.product[`name_${i18n.language}`] || item.product.name_pt;
      message += t('whatsapp_quote.message_item', { quantity: item.quantity, productName: productName }) + "\n";
    });
    // Add placeholder for total - calculation can be added here later if prices exist
    message += t('whatsapp_quote.message_total_placeholder'); 
    return encodeURIComponent(message);
  };

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`;

  if (cartItems.length === 0) {
    return null; // Don't show cart if empty
  }

  return (
    <section id="quote-cart" className="py-8 bg-white sticky bottom-0 shadow-lg border-t">
      <div className="container mx-auto px-4">
        <h3 className="text-xl font-semibold mb-4 text-center">{t('products_section.add_to_quote')}</h3>
        {cartItems.map(item => {
           const productName = item.product[`name_${i18n.language}`] || item.product.name_pt;
           return (
            <div key={item.product.id} className="flex justify-between items-center mb-2 border-b pb-2">
              <span className="text-sm flex-1 mr-2">{productName}</span>
              <div className="flex items-center">
                 <Button variant="ghost" size="sm" onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="px-1 h-6">
                    <Minus size={14} />
                 </Button>
                 <span className="mx-2 text-sm">{item.quantity}</span>
                 <Button variant="ghost" size="sm" onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="px-1 h-6">
                    <Plus size={14} />
                 </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onRemoveItem(item.product.id)} className="ml-2 text-red-500 px-1 h-6">
                 X
              </Button>
            </div>
           );
        })}
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block mt-4">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            {t('whatsapp_quote.button_text')}
          </Button>
        </a>
      </div>
    </section>
  );
}

function AboutUs() {
  const { t } = useTranslation();
  // Add content for About Us section later if provided
  return (
    <section id="about" className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('nav.about')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {/* Placeholder text - replace with actual content */}
          Somos a Bronzella, sua parceira ideal para um bronzeado perfeito e duradouro. Oferecemos produtos de alta qualidade com entrega rápida e segura em todo o Brasil e selecionados países. Nossa missão é realçar sua beleza natural com segurança e eficácia.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useTranslation();
  const contactInfo = {
    phone1: "+55 11 98290-1369",
    phone2: "+55 11 93351-7039",
    email: "Bronzellaprodutoosbronzeamento@gmail.com",
    cnpj: "59.681.427/0001-45",
    address: "Rua Coronel Murça, 56, Brás, São Paulo, Brasil"
  };

  return (
    <section id="contact" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('contact_section.title')}</h2>
        </div>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone size={20} className="mr-3 text-yellow-600" />
              <div>
                <span className="font-semibold">{t('contact_section.phone')}:</span> 
                <a href={`tel:${contactInfo.phone1}`} className="text-gray-700 hover:text-yellow-600 block">{contactInfo.phone1}</a>
                <a href={`tel:${contactInfo.phone2}`} className="text-gray-700 hover:text-yellow-600 block">{contactInfo.phone2}</a>
              </div>
            </div>
            <div className="flex items-center">
              <Mail size={20} className="mr-3 text-yellow-600" />
              <div>
                <span className="font-semibold">{t('contact_section.email')}:</span> 
                <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-yellow-600 block">{contactInfo.email}</a>
              </div>
            </div>
             <div className="flex items-center">
              <Building size={20} className="mr-3 text-yellow-600" />
              <div>
                <span className="font-semibold">{t('contact_section.cnpj')}:</span> 
                <span className="text-gray-700 block">{contactInfo.cnpj}</span>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin size={20} className="mr-3 text-yellow-600" />
              <div>
                <span className="font-semibold">{t('contact_section.address')}:</span> 
                <span className="text-gray-700 block">{contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>{t('footer.rights', { year: currentYear })}</p>
      </div>
    </footer>
  );
}

// --- Main App Component --- 

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Add product translations to the product data itself
  // This is a simplified approach. For larger apps, consider fetching translated product data.
  const { i18n } = useTranslation();
  const [translatedProducts, setTranslatedProducts] = useState([]);

  useEffect(() => {
    // Function to simulate fetching/loading translations for products
    const loadProductTranslations = async () => {
      // In a real app, you might fetch this from an API based on i18n.language
      // For now, we'll just map the existing data structure
      const productsWithTranslations = productsData.products.map(p => {
        // You would need actual translations here. Using placeholders for now.
        // Example: Fetch from API or have a more complex JSON structure
        return {
          ...p,
          name_en: p.name_pt + " (EN)", // Placeholder
          description_en: p.description_pt + " (EN)", // Placeholder
          alt_en: p.alt_pt + " (EN)", // Placeholder
          name_es: p.name_pt + " (ES)", // Placeholder
          description_es: p.description_pt + " (ES)", // Placeholder
          alt_es: p.alt_pt + " (ES)", // Placeholder
        };
      });
      setTranslatedProducts(productsWithTranslations);
    };

    loadProductTranslations();
    // Rerun when language changes - ideally fetch new data
  }, [i18n.language]); 

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductList 
          products={translatedProducts} 
          categories={productsData.categories_pt} 
          onAddToCart={handleAddToCart} 
        />
        <AboutUs />
        <Contact />
      </main>
      <QuoteCart 
        cartItems={cartItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveItem={handleRemoveItem} 
      />
      <Footer />
    </div>
  );
}

export default App;

