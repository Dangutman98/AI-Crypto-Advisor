"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeme = void 0;
const axios_1 = __importDefault(require("axios"));
const getMeme = async () => {
    try {
        const response = await axios_1.default.get('https://www.reddit.com/r/cryptocurrencymemes/top.json?limit=10&t=week');
        const posts = response.data.data.children;
        // Find all posts with an image link
        const imagePosts = posts.filter((p) => p.data.url && (p.data.url.endsWith('.jpg') || p.data.url.endsWith('.png')));
        if (imagePosts.length > 0) {
            // Pick a random image from the top posts
            const randomIndex = Math.floor(Math.random() * imagePosts.length);
            const imagePost = imagePosts[randomIndex];
            return { title: imagePost.data.title, url: imagePost.data.url };
        }
        throw new Error('No images found in top posts');
    }
    catch (error) {
        console.error('Reddit error:', error);
        const fallbacks = [
            { title: 'When you buy the dip but it keeps dipping', url: 'https://i.imgflip.com/1ur9b0.jpg' },
            { title: 'Hodl strong', url: 'https://i.imgflip.com/46e43q.jpg' },
            { title: 'Checking my portfolio every 5 minutes', url: 'https://i.imgflip.com/261vxi.jpg' },
            { title: 'To the moon!', url: 'https://i.imgflip.com/34vd6w.jpg' }
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
};
exports.getMeme = getMeme;
