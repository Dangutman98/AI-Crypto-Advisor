"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketNews = void 0;
const axios_1 = __importDefault(require("axios"));
const getMarketNews = async () => {
    try {
        const apiKey = process.env.CRYPTOPANIC_API_KEY;
        if (!apiKey) {
            // Static fallback if no API key is provided
            const dummyNews = [
                { title: 'Bitcoin Surges Past Key Resistance Level', domain: 'coindesk.com', url: '#' },
                { title: 'Ethereum Gas Fees Hit New Lows Following Upgrade', domain: 'decrypt.co', url: '#' },
                { title: 'Global Regulatory Clarity Expected Soon', domain: 'cointelegraph.com', url: '#' },
                { title: 'Solana Network Activity Reaches All-Time High', domain: 'theblock.co', url: '#' },
                { title: 'Major Institutional Adoption Announced by Top Bank', domain: 'bloomberg.com', url: '#' },
                { title: 'New DeFi Protocol Locks $1B in TVL in 24 Hours', domain: 'defipulse.com', url: '#' },
                { title: 'Crypto Markets Rally on Inflation Data', domain: 'reuters.com', url: '#' },
                { title: 'Central Banks Discuss CBDC Interoperability', domain: 'wsj.com', url: '#' }
            ];
            // Randomly shuffle and pick 3
            return dummyNews.sort(() => 0.5 - Math.random()).slice(0, 3);
        }
        const response = await axios_1.default.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&public=true`);
        return response.data.results.slice(0, 5);
    }
    catch (error) {
        console.error('CryptoPanic error:', error);
        return { error: 'Failed to fetch news' };
    }
};
exports.getMarketNews = getMarketNews;
