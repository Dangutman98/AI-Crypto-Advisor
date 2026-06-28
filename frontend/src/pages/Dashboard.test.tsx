import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { api } from '../services/api';

vi.mock('../services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

describe('Dashboard Component', () => {
  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');
  });

  it('renders loading state initially', () => {
    vi.mocked(api.get).mockReturnValue(new Promise(() => {}));
    
    renderDashboard();
    expect(screen.getByText(/Loading your tailored insights.../i)).toBeInTheDocument();
  });

  it('Edge Case: displays an error message if the API returns a 500 error', async () => {
    vi.mocked(api.get).mockRejectedValue(new Error('Internal server error'));
    
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/Failed to load dashboard/i)).toBeInTheDocument();
    });
  });

  it('displays data when loaded successfully', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        prices: { bitcoin: { usd: 50000, usd_24h_change: 5 } },
        news: [{ title: 'Crypto is mooning', url: 'https://test.com', source: { title: 'News' }, created_at: '2026' }],
        insight: 'Hold onto your hats!',
        meme: null,
      }
    });
    
    renderDashboard();

    expect(await screen.findByText('bitcoin')).toBeInTheDocument();
    expect(await screen.findByText('Crypto is mooning')).toBeInTheDocument();
    expect(await screen.findByText(/"Hold onto your hats!"/)).toBeInTheDocument();
  });
});
