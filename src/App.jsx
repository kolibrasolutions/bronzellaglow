import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import productsData from './data/products.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ShoppingCart, Minus, Plus, Phone, Mail, MapPin, Building, X } from 'lucide-react';

// --- Components --- 

function Header({ cartItemCount }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <img src="/images/bronzella-glow-logo.png" alt="Bronzella Glow Logo" className="h-10" /> 
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
          <SheetTrigger asChild>
            <Button variant="ghost" className="relative text-gray-600 hover:text-yellow-600">
              <ShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
        </nav>
        {/* TODO: Add mobile menu button if needed */}
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useTranslation();
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
    setQuantity(1); 
  };

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
        <p className="text-sm text-gray-600 mb-4 flex-grow">{productDescription}</p>
        <div className="flex items-center justify-between mb-4">
          <Label htmlFor={`quantity-${product.id}`} className="text-sm font-medium">{t('products_section.quantity')}:</Label>
          <div className="flex items-center border rounded">
            <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(quantity - 1)} className="px-2">
              <Minus size={16} />
            </Button>
            <Input 
              id={`quantity-${product.id}`}
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

// ProductList: Corrected filter logic and category mapping
function ProductList({ products, categories, onAddToCart }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('todos'); 

  // Filter products based on the selected category key
  const filteredProducts = filter === 'todos' 
    ? products 
    : products.filter(p => p.category_key === filter);

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
          {/* Map through categories ensuring key and name are used correctly */}
          {categories.map(category => (
            <Button 
              key={category.key} 
              variant={filter === category.key ? 'default' : 'outline'}
              onClick={() => setFilter(category.key)} 
              className={`capitalize ${filter === category.key ? 'bg-yellow-500 text-white hover:bg-yellow-600' : ''}`}
            >
              {/* Use translation key based on category.key, fallback to category.name */}
              {t(`categories.${category.key.replace(/-/g, '_')}`, category.name)} 
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

function QuoteCartSidebar({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const { t, i18n } = useTranslation();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const whatsappNumber = "5511982901369"; 

  const generateWhatsAppMessage = () => {
    let message = t('whatsapp_quote.message_header') + "\n\n";
    message += `${t('quote_sidebar.customer_name')}: ${customerName}\n`;
    message += `${t('quote_sidebar.customer_phone')}: ${customerPhone}\n\n`;
    message += t('quote_sidebar.items_header') + "\n";
    
    cartItems.forEach(item => {
      const productName = item.product[`name_${i18n.language}`] || item.product.name_pt;
      message += `${item.quantity}x ${productName}\n`; 
    });
        
    return encodeURIComponent(message);
  };

  const [whatsappLink, setWhatsappLink] = useState('');

  useEffect(() => {
    setWhatsappLink(`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`);
  }, [cartItems, customerName, customerPhone, i18n.language]);

  const handleRequestQuote = (e) => {
    if (!customerName || !customerPhone) {
      e.preventDefault(); 
      alert(t('quote_sidebar.form_validation_error')); 
    } 
  };

  return (
    <SheetContent className="flex flex-col w-[90vw] sm:w-[400px]">
      <SheetHeader>
        <SheetTitle>{t('quote_sidebar.title')}</SheetTitle>
      </SheetHeader>
      
      <div className="flex-1 overflow-y-auto py-4 px-1">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">{t('quote_sidebar.empty')}</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => {
              const productName = item.product[`name_${i18n.language}`] || item.product.name_pt;
              return (
                <div key={item.product.id} className="flex justify-between items-center border-b pb-3">
                  <div className="flex-1 mr-2">
                    <p className="text-sm font-medium">{productName}</p>
                  </div>
                  <div className="flex items-center mx-2">
                    <Button variant="outline" size="icon" onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="h-7 w-7">
                      <Minus size={14} />
                    </Button>
                    <span className="mx-3 text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="h-7 w-7">
                      <Plus size={14} />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item.product.id)} className="ml-2 text-red-500 h-7 w-7">
                    <X size={16} />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="px-1 py-4 border-t">
          <h4 className="text-md font-semibold mb-3">{t('quote_sidebar.your_info')}</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="customerName">{t('quote_sidebar.customer_name')}</Label>
              <Input 
                id="customerName" 
                value={customerName} 
                onChange={(e) => setCustomerName(e.target.value)} 
                placeholder={t('quote_sidebar.name_placeholder')}
                required
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">{t('quote_sidebar.customer_phone')}</Label>
              <Input 
                id="customerPhone" 
                type="tel" 
                value={customerPhone} 
                onChange={(e) => setCustomerPhone(e.target.value)} 
                placeholder={t('quote_sidebar.phone_placeholder')}
                required
              />
            </div>
          </div>
        </div>
      )}
      
      {cartItems.length > 0 && (
        <SheetFooter className="mt-auto px-1 pt-4 border-t">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={handleRequestQuote} className="w-full">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              {t('whatsapp_quote.button_text')}
            </Button>
          </a>
        </SheetFooter>
      )}
    </SheetContent>
  );
}

function AboutUs() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('nav.about')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
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
            <div className="flex items-start">
              <Phone size={20} className="mr-3 text-yellow-600 mt-1" />
              <div>
                <span className="font-semibold">{t('contact_section.phone')}:</span> 
                <a href={`tel:${contactInfo.phone1.replace(/[^0-9+]/g, '')}`} className="text-gray-700 hover:text-yellow-600 block">{contactInfo.phone1}</a>
                <a href={`tel:${contactInfo.phone2.replace(/[^0-9+]/g, '')}`} className="text-gray-700 hover:text-yellow-600 block">{contactInfo.phone2}</a>
              </div>
            </div>
            <div className="flex items-start">
              <Mail size={20} className="mr-3 text-yellow-600 mt-1" />
              <div>
                <span className="font-semibold">{t('contact_section.email')}:</span> 
                <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-yellow-600 block">{contactInfo.email}</a>
              </div>
            </div>
             <div className="flex items-start">
              <Building size={20} className="mr-3 text-yellow-600 mt-1" />
              <div>
                <span className="font-semibold">{t('contact_section.cnpj')}:</span> 
                <span className="text-gray-700 block">{contactInfo.cnpj}</span>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin size={20} className="mr-3 text-yellow-600 mt-1" />
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
  const contactInfo = {
    phone1: "+55 11 98290-1369",
    email: "Bronzellaprodutoosbronzeamento@gmail.com",
    address: "Rua Coronel Murça, 56, Brás, São Paulo, Brasil"
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="space-y-4">
          <img src="/images/bronzella-glow-logo.png" alt="Bronzella Glow Logo" className="h-12 mb-3" />
          <p className="text-sm leading-relaxed">{t("footer.about_short")}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">{t("footer.quick_links")}</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#home" className="hover:text-yellow-500 transition-colors duration-200">{t("nav.home")}</a></li>
            <li><a href="#products" className="hover:text-yellow-500 transition-colors duration-200">{t("nav.products")}</a></li>
            <li><a href="#about" className="hover:text-yellow-500 transition-colors duration-200">{t("nav.about")}</a></li>
            <li><a href="#contact" className="hover:text-yellow-500 transition-colors duration-200">{t("nav.contact")}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">{t("nav.contact")}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <Phone size={16} className="mr-3 mt-1 text-yellow-500 flex-shrink-0" />
              <a href={`tel:${contactInfo.phone1.replace(/[^0-9+]/g, '')}`} className="hover:text-yellow-500 transition-colors duration-200">{contactInfo.phone1}</a>
            </li>
            <li className="flex items-start">
              <Mail size={16} className="mr-3 mt-1 text-yellow-500 flex-shrink-0" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-yellow-500 transition-colors duration-200 break-all">{contactInfo.email}</a>
            </li>
            <li className="flex items-start">
              <MapPin size={16} className="mr-3 mt-1 text-yellow-500 flex-shrink-0" />
              <span className="leading-relaxed">{contactInfo.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-8 border-t border-gray-700 text-center text-sm">
        <p>{t("footer.rights", { year: currentYear })}</p>
      </div>
    </footer>
  );
}

// --- Main App Component --- 

function App() {
  const [cartItems, setCartItems] = useState(() => {
    // Carregar do localStorage ao iniciar
    try {
      const stored = localStorage.getItem('bronzellaCart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [allProducts, setAllProducts] = useState([]); // Store all products with category keys
  const [categories, setCategories] = useState([]); // Store categories with keys and names

  // Salvar no localStorage sempre que cartItems mudar
  useEffect(() => {
    localStorage.setItem('bronzellaCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Load and process products and categories on mount
  useEffect(() => {
    // Generate category key from category_pt (lowercase, replace space with dash)
    const productsWithKeys = productsData.products.map(p => ({
      ...p,
      category_key: p.category_pt.toLowerCase().replace(/ /g, '-')
    }));
    
    // Create categories array with key and name from categories_pt
    const uniqueCategoryKeys = [...new Set(productsWithKeys.map(p => p.category_key))];
    const categoriesWithKeys = uniqueCategoryKeys.map(key => {
      // Find the original name from the first product with this key (or from categories_pt if needed)
      const originalName = productsData.products.find(p => p.category_pt.toLowerCase().replace(/ /g, '-') === key)?.category_pt || key;
      return { key: key, name: originalName }; // Use original name for display
    });

    setAllProducts(productsWithKeys);
    setCategories(categoriesWithKeys);

  }, []); // Load once on mount

  const handleAddToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
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

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet> 
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={cartItemCount} /> 
        <main className="flex-grow">
          <Hero />
          <ProductList 
            products={allProducts} 
            categories={categories} // Pass processed categories
            onAddToCart={handleAddToCart} 
          />
          <AboutUs />
          <Contact />
        </main>
        <Footer /> 
      </div>
      <QuoteCartSidebar 
        cartItems={cartItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveItem={handleRemoveItem} 
      />
    </Sheet>
  );
}

export default App;

