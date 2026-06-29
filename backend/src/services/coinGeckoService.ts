import axios from 'axios';

export const getCoinPrices = async (assets: string) => {
  try {
    // Fetch top 100 coins with their icons and 24h change
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    
    // We will return the array directly to the frontend
    const coinsList = response.data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h
    }));

    // If the user selected specific assets, we could filter or highlight them.
    // For now, let's return all 100 coins so the frontend can display them all,
    // but maybe move the user's selected assets to the top!
    if (assets) {
      const selectedIds = assets.split(',').map(s => s.trim().toLowerCase());
      const selectedCoins = coinsList.filter((c: any) => selectedIds.includes(c.id));
      const otherCoins = coinsList.filter((c: any) => !selectedIds.includes(c.id));
      return [...selectedCoins, ...otherCoins];
    }

    return coinsList;
  } catch (error) {
    console.error('CoinGecko error or rate limit hit. Returning fallback data.', error);
    // If we hit a rate limit (429), return a static list of top coins so the UI doesn't break
    const fallbackCoins = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', current_price: 65000, price_change_percentage_24h: 2.5 },
      { id: 'ethereum', name: 'Ethereum', symbol: 'eth', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', current_price: 3500, price_change_percentage_24h: 1.8 },
      { id: 'tether', name: 'Tether', symbol: 'usdt', image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png', current_price: 1.0, price_change_percentage_24h: 0.01 },
      { id: 'solana', name: 'Solana', symbol: 'sol', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', current_price: 145, price_change_percentage_24h: -1.2 },
      { id: 'binancecoin', name: 'BNB', symbol: 'bnb', image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', current_price: 600, price_change_percentage_24h: 0.5 }
    ];
    return fallbackCoins;
  }
};
