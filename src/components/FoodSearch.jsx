import React, { useState } from 'react';
import { Search, Sparkles, X, ChevronRight, Activity, Heart, AlertCircle, CheckCircle2, Utensils } from 'lucide-react';

const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [error, setError] = useState(null);

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
    const fat = product.nutriments?.fat_100g || 0;
    const protein = product.nutriments?.proteins_100g || 0;

    if (nutriscore === 'a' || nutriscore === 'b') {
      return { status: 'Excellent', color: '#10b981', icon: <CheckCircle2 />, text: 'Great choice! High nutritional value.' };
    } else if (nutriscore === 'c') {
      return { status: 'Moderate', color: '#f59e0b', icon: <Activity />, text: 'Good in moderation.' };
    } else if (nutriscore === 'd' || nutriscore === 'e') {
      return { status: 'Limit This', color: '#ef4444', icon: <AlertCircle />, text: 'High in calories, sugar, or saturated fats.' };
    } else if (protein > 15) {
      return { status: 'High Protein', color: '#3b82f6', icon: <Sparkles />, text: 'Excellent source of protein for muscle repair.' };
    } else if (sugar > 20) {
      return { status: 'High Sugar', color: '#ef4444', icon: <AlertCircle />, text: 'Contains a high amount of sugar.' };
    } else {
      return { status: 'Neutral', color: '#64748b', icon: <Activity />, text: 'Standard nutritional profile.' };
    }
  };

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Curated list of popular Desi/Pakistani foods for instant suggestions
  const DESI_FOOD_DB = [
    { product_name: "Chicken Karahi", brands: "Homemade/Restaurant", nutriments: { "energy-kcal_100g": 250, proteins_100g: 18, fat_100g: 15, carbohydrates_100g: 5 }, image_small_url: null },
    { product_name: "Chicken Biryani", brands: "Homemade", nutriments: { "energy-kcal_100g": 290, proteins_100g: 12, fat_100g: 10, carbohydrates_100g: 40 }, image_small_url: null },
    { product_name: "Beef Nihari", brands: "Homemade", nutriments: { "energy-kcal_100g": 350, proteins_100g: 20, fat_100g: 25, carbohydrates_100g: 8 }, image_small_url: null },
    { product_name: "Seekh Kabab", brands: "BBQ", nutriments: { "energy-kcal_100g": 220, proteins_100g: 22, fat_100g: 12, carbohydrates_100g: 4 }, image_small_url: null },
    { product_name: "Chapli Kabab", brands: "Peshawari", nutriments: { "energy-kcal_100g": 280, proteins_100g: 18, fat_100g: 20, carbohydrates_100g: 6 }, image_small_url: null },
    { product_name: "Daal Chawal", brands: "Homemade", nutriments: { "energy-kcal_100g": 180, proteins_100g: 8, fat_100g: 4, carbohydrates_100g: 30 }, image_small_url: null },
    { product_name: "Haleem", brands: "Homemade", nutriments: { "energy-kcal_100g": 200, proteins_100g: 15, fat_100g: 8, carbohydrates_100g: 25 }, image_small_url: null },
    { product_name: "Roti / Naan", brands: "Staple", nutriments: { "energy-kcal_100g": 260, proteins_100g: 8, fat_100g: 3, carbohydrates_100g: 50 }, image_small_url: null },
    { product_name: "Samosa", brands: "Snack", nutriments: { "energy-kcal_100g": 260, proteins_100g: 4, fat_100g: 14, carbohydrates_100g: 30 }, image_small_url: null },
    { product_name: "Gulab Jamun", brands: "Dessert", nutriments: { "energy-kcal_100g": 350, proteins_100g: 3, fat_100g: 15, carbohydrates_100g: 55, sugars_100g: 45 }, image_small_url: null },
  ];

  // Debounce logic for suggestions
  React.useEffect(() => {
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
            // Combine: Local matches first, then API results (avoiding duplicates if possible, though simple concat is fine for now)
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
    }, 300); // Reduced debounce to 300ms for snappier feel

    return () => clearTimeout(timer);
  }, [query]);

  const handleSuggestionClick = (product) => {
    setQuery(product.product_name);
    setShowSuggestions(false);
    setSelectedFood(product);
    setResults([product]); // Show this product as the result
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
          <Sparkles size={20} color="white" />
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
            {suggestions.map((product, idx) => (
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
            <div style={{ display: 'flex', gap: '1.5rem', flexDirection: 'column', md: 'row' }}>
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

              <div style={{ marginTop: '1.5rem', padding: '1rem', background: `${getHealthVerdict(selectedFood).color}10`, borderRadius: '12px', border: `1px solid ${getHealthVerdict(selectedFood).color}30` }}>
                <h4 style={{ color: getHealthVerdict(selectedFood).color, fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Health Verdict
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {getHealthVerdict(selectedFood).text}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '1.5rem' }}>
                <NutrientCard label="Calories" value={selectedFood.nutriments?.['energy-kcal_100g'] || 0} unit="kcal" color="var(--accent)" />
                <NutrientCard label="Protein" value={selectedFood.nutriments?.proteins_100g || 0} unit="g" color="var(--primary)" />
                <NutrientCard label="Carbs" value={selectedFood.nutriments?.carbohydrates_100g || 0} unit="g" color="var(--secondary)" />
                <NutrientCard label="Fat" value={selectedFood.nutriments?.fat_100g || 0} unit="g" color="#ef4444" />
              </div>
              
              <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                 <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sugar (100g)</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{selectedFood.nutriments?.sugars_100g || 0}g</p>
                 </div>
                 <div style={{ padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fiber (100g)</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{selectedFood.nutriments?.fiber_100g || 0}g</p>
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
