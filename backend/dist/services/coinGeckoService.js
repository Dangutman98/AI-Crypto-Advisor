"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const symbolToId = {
    btc: 'bitcoin',
    eth: 'ethereum',
    sol: 'solana',
    ada: 'cardano',
    doge: 'dogecoin',
    xrp: 'ripple',
    dot: 'polkadot',
    bnb: 'binancecoin',
    matic: 'matic-network',
    link: 'chainlink'
};
const getCoinPrices = async (assets) => {
    try {
        let idsStr = 'bitcoin,ethereum';
        if (assets) {
            const parts = assets.split(',').map(s => s.trim().toLowerCase());
            const mappedIds = parts.map(p => symbolToId[p] || p);
            idsStr = mappedIds.join(',');
        }
        const response = await axios_1.default.get(`https://api.coingecko.com/api/v3/simple/price?ids=${idsStr}&vs_currencies=usd&include_24hr_change=true`);
        // If CoinGecko didn't recognize any of the user's coins, fallback to BTC/ETH
        if (Object.keys(response.data).length === 0) {
            const fallback = await axios_1.default.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true`);
            return fallback.data;
        }
        return response.data;
    }
    catch (error) {
        console.error('CoinGecko error:', error);
        return { error: 'Failed to fetch coin prices' };
    }
};
exports.getCoinPrices = getCoinPrices;
