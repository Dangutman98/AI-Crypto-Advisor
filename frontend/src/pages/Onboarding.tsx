import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const POPULAR_COINS = [
  { id: 'bitcoin', label: 'Bitcoin (BTC)' },
  { id: 'ethereum', label: 'Ethereum (ETH)' },
  { id: 'solana', label: 'Solana (SOL)' },
  { id: 'ripple', label: 'Ripple (XRP)' },
  { id: 'cardano', label: 'Cardano (ADA)' },
  { id: 'dogecoin', label: 'Dogecoin (DOGE)' },
  { id: 'polkadot', label: 'Polkadot (DOT)' },
  { id: 'chainlink', label: 'Chainlink (LINK)' }
];

const Onboarding = () => कराते
  const [selectedCoins, setSelectedCoins] = useState<string[]>(['bitcoin']);
  const [investorType, setInvestorType] = useState('HODLer');
  const [contentPrefs, setContentPrefs] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/user/preferences', {
        assets: selectedCoins.join(','),
        investorType,
        contentPrefs,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to save preferences', err);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '20px' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '8px' }}>Let's get personal</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tell us about your crypto journey so we can tailor your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>1. What crypto assets are you interested in?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {POPULAR_COINS.map(coin => {
                const isSelected = selectedCoins.includes(coin.id);
                return (
                  <button
                    key={coin.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        if (selectedCoins.length > 1) {
                          setSelectedCoins(selectedCoins.filter(c => c !== coin.id));
                        }
                      } else {
                        setSelectedCoins([...selectedCoins, coin.id]);
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: `1px solid ${isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.2)'}`,
                      background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.3)',
                      color: isSelected ? 'var(--accent)' : '#d1d5db',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: isSelected ? 600 : 400
                    }}
                  >
                    {coin.label}
                  </button>
                );
              })}
            </div>
            {selectedCoins.length === 0 && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '8px' }}>Please select at least one asset.</p>}
          </div>

          <div className="input-group">
            <label>2. What type of investor are you?</label>
            <select 
              className="input-field" 
              value={investorType}
              onChange={(e) => setInvestorType(e.target.value)}
              style={{ appearance: 'none', backgroundColor: 'rgba(0,0,0,0.4)', color: 'white' }}
            >
              <option value="HODLer" style={{ color: 'black' }}>HODLer (Long-term)</option>
              <option value="Day Trader" style={{ color: 'black' }}>Day Trader (Short-term)</option>
              <option value="NFT Collector" style={{ color: 'black' }}>NFT Collector</option>
              <option value="DeFi Degen" style={{ color: 'black' }}>DeFi Degen</option>
            </select>
          </div>

          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label>3. What kind of content do you want to see?</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g., Market News, Charts, Social, Memes"
              value={contentPrefs}
              onChange={(e) => setContentPrefs(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Saving...' : 'Go to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
