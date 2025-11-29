import React, { useState, useEffect } from 'react';
import { Search, X, ChevronRight, Activity, AlertCircle, Check, Utensils, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

const FoodSearch = () => {
  const { goals } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [portionSize, setPortionSize] = useState(100); // Default 100g

  const isGain = goals?.goalType === 'gain';

  // Curated list of popular foods for instant suggestions
  const DESI_FOOD_DB = [
    { product_name: "Chicken Karahi", brands: "Homemade/Restaurant", nutriments: { "energy-kcal_100g": 250, proteins_100g: 18, fat_100g: 15, carbohydrates_100g: 5 } },
    { product_name: "Chicken Biryani", brands: "Homemade", nutriments: { "energy-kcal_100g": 290, proteins_100g: 12, fat_100g: 10, carbohydrates_100g: 40 } },
    { product_name: "Beef Nihari", brands: "Homemade", nutriments: { "energy-kcal_100g": 350, proteins_100g: 20, fat_100g: 25, carbohydrates_100g: 8 } },
    { product_name: "Seekh Kabab", brands: "BBQ", nutriments: { "energy-kcal_100g": 220, proteins_100g: 22, fat_100g: 12, carbohydrates_100g: 4 } },
    { product_name: "Chapli Kabab", brands: "Peshawari", nutriments: { "energy-kcal_100g": 280, proteins_100g: 18, fat_100g: 20, carbohydrates_100g: 6 } },
    { product_name: "Daal Chawal", brands: "Homemade", nutriments: { "energy-kcal_100g": 180, proteins_100g: 8, fat_100g: 4, carbohydrates_100g: 30 } },
    { product_name: "Haleem", brands: "Homemade", nutriments: { "energy-kcal_100g": 200, proteins_100g: 15, fat_100g: 8, carbohydrates_100g: 25 } },
    { product_name: "Roti / Naan", brands: "Staple", nutriments: { "energy-kcal_100g": 260, proteins_100g: 8, fat_100g: 3, carbohydrates_100g: 50 } },
    { product_name: "Samosa", brands: "Snack", nutriments: { "energy-kcal_100g": 260, proteins_100g: 4, fat_100g: 14, carbohydrates_100g: 30 } },
    { product_name: "Gulab Jamun", brands: "Dessert", nutriments: { "energy-kcal_100g": 350, proteins_100g: 3, fat_100g: 15, carbohydrates_100g: 55, sugars_100g: 45 } },
    { product_name: "Apple", brands: "Fresh Fruit", nutriments: { "energy-kcal_100g": 52, proteins_100g: 0.3, fat_100g: 0.2, carbohydrates_100g: 14, sugars_100g: 10 } },
    { product_name: "Banana", brands: "Fresh Fruit", nutriments: { "energy-kcal_100g": 89, proteins_100g: 1.1, fat_100g: 0.3, carbohydrates_100g: 23, sugars_100g: 12 } },
    { product_name: "Chicken Breast", brands: "Raw", nutriments: { "energy-kcal_100g": 165, proteins_100g: 31, fat_100g: 3.6, carbohydrates_100g: 0 } },
    { product_name: "Eggs", brands: "Scrambled", nutriments: { "energy-kcal_100g": 148, proteins_100g: 10, fat_100g: 10, carbohydrates_100g: 1.3 } },
    { product_name: "Brown Rice", brands: "Cooked", nutriments: { "energy-kcal_100g": 112, proteins_100g: 2.7, fat_100g: 0.9, carbohydrates_100g: 24 } },
  ];

  // Debounce logic for suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      // 1. Local Search (Instant)
      const localMatches = DESI_FOOD_DB.filter(item => 
        item.product_name.toLowerCase().includes(query.toLowerCase())
      );
      
      // Set local matches immediately while API fetches
      setSuggestions(localMatches);
      setShowSuggestions(true);

      try {
        // 2. API Search
        const response = await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.products) {
            // Combine: Local matches first, then API results
            setSuggestions(prev => {
              const apiProducts = data.products.filter(apiItem => 
                !prev.some(localItem => localItem.product_name === apiItem.product_name)
              );
              return [...prev, ...apiProducts];
            });
          }
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const searchFood = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setSelectedFood(null);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10`
      );
      
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      if (data.products && data.products.length > 0) {
        setResults(data.products);
      } else {
        setError('No foods found. Try a different search term.');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getHealthVerdict = (product) => {
    const nutriscore = product.nutriscore_grade;
    const sugar = product.nutriments?.sugars_100g || 0;
    const protein = product.nutriments?.proteins_100g || 0;
    const fat = product.nutriments?.fat_100g || 0;

    // For weight gain: prioritize high protein and calories
    // For weight loss: prioritize low calories and sugar
    if (isGain) {
      if (protein > 20) {
        return { status: 'Excellent for Muscle Gain', color: '#10b981', icon: <Check size={18} />, text: 'High protein content - perfect for building muscle!' };
      } else if (protein > 10 && (product.nutriments?.["energy-kcal_100g"] || 0) > 200) {
        return { status: 'Good for Bulking', color: '#3b82f6', icon: <Activity size={18} />, text: 'Good balance of protein and calories for weight gain.' };
      } else {
        return { status: 'Moderate', color: '#f59e0b', icon: <Star size={18} />, text: 'Decent option, but consider higher protein foods.' };
      }
    } else {
      // Weight loss logic
      const calories = product.nutriments?.["energy-kcal_100g"] || 0;
      if (calories < 100 && sugar < 10) {
        return { status: 'Excellent for Weight Loss', color: '#10b981', icon: <Check size={18} />, text: 'Low calorie and sugar - great choice!' };
      } else if (calories < 200 && sugar < 15) {
        return { status: 'Good Choice', color: '#3b82f6', icon: <Activity size={18} />, text: 'Moderate calories - good in controlled portions.' };
      } else {
        return { status: 'Limit This', color: '#ef4444', icon: <AlertCircle size={18} />, text: 'High in calories or sugar - consume sparingly.' };
      }
    }
  };

  const handleSuggestionClick = (product) => {
    setQuery(product.product_name);
    setShowSuggestions(false);
    setSelectedFood(product);
    setResults([product]);
  };

  return (
    <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', border: '2px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(145deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', 
          padding: '0.5rem', 
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
        }}>
          <Search size={20} color="white" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>AI Smart Food Search</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Powered by OpenFoodFacts</p>
        </div>
      </div>

      <form onSubmit={searchFood} style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for any food (e.g., 'Apple', 'Chicken Karahi')..."
          style={{
            width: '100%',
            padding: '1rem 1rem 1rem 3rem',
            borderRadius: '12px',
            border: '2px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.2s'
          }}
          className="search-input"
        />
        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <button 
          type="submit"
          disabled={loading}
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '0.5rem',
            bottom: '0.5rem',
            padding: '0 1.5rem',
            background: 'var(--gradient-primary)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Scanning...' : 'Analyze'}
        </button>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            marginTop: '0.5rem',
            zIndex: 50,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {suggestions.slice(0, 8).map((product, idx) => (
              <div
                key={product.code || idx}
                onClick={() => handleSuggestionClick(product)}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  borderBottom: idx < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-main)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {product.image_small_url ? (
                  <img src={product.image_small_url} alt="" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
                ) : (
                  <Utensils size={16} color="var(--text-muted)" />
                )}
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>{product.product_name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{product.brands || 'Generic'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>

      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {selectedFood ? (
        <div className="animate-fade-in" style={{ background: 'var(--bg-main)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setSelectedFood(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Back to results
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
              {selectedFood.brands || 'Generic'}
            </span>
          </div>
          
          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                {selectedFood.image_url && (
                  <img 
                    src={selectedFood.image_url} 
                    alt={selectedFood.product_name} 
                    style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '12px', background: 'white', padding: '0.5rem', border: '1px solid var(--border)' }} 
                  />
                )}
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{selectedFood.product_name}</h2>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {getHealthVerdict(selectedFood).status && (
                      <span style={{ 
                        background: `${getHealthVerdict(selectedFood).color}20`, 
                        color: getHealthVerdict(selectedFood).color, 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '20px', 
                        fontSize: '0.85rem', 
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        {getHealthVerdict(selectedFood).icon}
                        {getHealthVerdict(selectedFood).status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Portion Size Input */}
              <div style={{ padding: '1.5rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, fontSize: '1rem' }}>
                  How much did you eat?
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="number"
                    value={portionSize}
                    onChange={(e) => setPortionSize(Math.max(1, parseInt(e.target.value) || 100))}
                    min="1"
                    max="2000"
                    style={{
                      width: '120px',
                      padding: '0.75rem',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      borderRadius: '8px',
                      border: '2px solid var(--border)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      textAlign: 'center'
                    }}
                  />
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-muted)' }}>grams</span>
                  <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setPortionSize(100)} style={{ padding: '0.5rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>100g</button>
                    <button onClick={() => setPortionSize(200)} style={{ padding: '0.5rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>200g</button>
                    <button onClick={() => setPortionSize(300)} style={{ padding: '0.5rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>300g</button>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem', background: `${getHealthVerdict(selectedFood).color}10`, borderRadius: '12px', border: `1px solid ${getHealthVerdict(selectedFood).color}30` }}>
                <h4 style={{ color: getHealthVerdict(selectedFood).color, fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Health Verdict for {isGain ? 'Muscle Gain' : 'Weight Loss'}
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {getHealthVerdict(selectedFood).text}
                </p>
              </div>

              {/* Nutritional Info for Selected Portion */}
              <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                  Nutritional Info for {portionSize}g
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                  <NutrientCard 
                    label="Calories" 
                    value={((selectedFood.nutriments?.['energy-kcal_100g'] || 0) * portionSize / 100)} 
                    unit="kcal" 
                    color="var(--accent)" 
                  />
                  <NutrientCard 
                    label="Protein" 
                    value={((selectedFood.nutriments?.proteins_100g || 0) * portionSize / 100)} 
                    unit="g" 
                    color="var(--primary)" 
                  />
                  <NutrientCard 
                    label="Carbs" 
                    value={((selectedFood.nutriments?.carbohydrates_100g || 0) * portionSize / 100)} 
                    unit="g" 
                    color="var(--secondary)" 
                  />
                  <NutrientCard 
                    label="Fat" 
                    value={((selectedFood.nutriments?.fat_100g || 0) * portionSize / 100)} 
                    unit="g" 
                    color="#ef4444" 
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                 <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sugar ({portionSize}g)</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      {((selectedFood.nutriments?.sugars_100g || 0) * portionSize / 100).toFixed(1)}g
                    </p>
                 </div>
                 <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fiber ({portionSize}g)</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      {((selectedFood.nutriments?.fiber_100g || 0) * portionSize / 100).toFixed(1)}g
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {results.map((product) => (
            <div 
              key={product.code} 
              onClick={() => setSelectedFood(product)}
              className="card-hover"
              style={{ 
                padding: '1rem', 
                background: 'var(--bg-main)', 
                borderRadius: '12px', 
                border: '1px solid var(--border)',
                cursor: 'pointer',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: 'white', flexShrink: 0, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {product.image_small_url ? (
                  <img src={product.image_small_url} alt={product.product_name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <Utensils size={24} color="var(--text-muted)" />
                )}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.product_name || 'Unknown Product'}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {product.brands || 'Generic'}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                   <span style={{ fontSize: '0.75rem', background: 'var(--bg-card)', padding: '2px 6px', borderRadius: '4px' }}>
                     {Math.round(product.nutriments?.['energy-kcal_100g'] || 0)} kcal
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NutrientCard = ({ label, value, unit, color }) => (
  <div style={{ padding: '0.75rem', background: 'var(--bg-card)', borderRadius: '10px', textAlign: 'center', border: `1px solid ${color}30` }}>
    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</p>
    <p style={{ fontSize: '1.1rem', fontWeight: 800, color: color }}>{Math.round(value)}{unit}</p>
  </div>
);

export default FoodSearch;
