import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { signUp, viewAgentDetails, viewStartingLocation, viewContracts, acceptContract } from './spaceTradersAPI';

// Mock fetch globally
const globalFetch = global.fetch;

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  global.fetch = globalFetch;
});

describe('SpaceTraders API', () => {
  const mockToken = 'mock-token';
  const mockContractId = 'mock-contract-id';

  it('signUp', async () => {
    const mockResponse = { data: { token: 'mock-token' } };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await signUp('test-symbol', 'test-faction');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.spacetraders.io/v2/register',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: 'test-symbol', faction: 'test-faction' }),
      })
    );
  });

  it('viewAgentDetails', async () => {
    const mockResponse = { data: { agent: { symbol: 'test-agent' } } };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await viewAgentDetails(mockToken);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.spacetraders.io/v2/my/agent',
      expect.objectContaining({
        method: 'GET',
        headers: { 'Authorization': 'Bearer mock-token' },
      })
    );
  });

  it('viewStartingLocation', async () => {
    const mockResponse = { data: { waypoint: { symbol: 'X1-FS16-A1' } } };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await viewStartingLocation(mockToken);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.spacetraders.io/v2/systems/X1-FS16/waypoints/X1-FS16-A1',
      expect.objectContaining({
        method: 'GET',
        headers: { 'Authorization': 'Bearer mock-token' },
      })
    );
  });

  it('viewContracts', async () => {
    const mockResponse = { data: [{ id: 'contract-1' }] };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await viewContracts(mockToken);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.spacetraders.io/v2/my/contracts',
      expect.objectContaining({
        method: 'GET',
        headers: { 'Authorization': 'Bearer mock-token' },
      })
    );
  });

  it('acceptContract', async () => {
    const mockResponse = { data: { contract: { id: mockContractId, accepted: true } } };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await acceptContract(mockToken, mockContractId);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.spacetraders.io/v2/my/contracts/${mockContractId}/accept`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Authorization': 'Bearer mock-token',
          'Content-Type': 'application/json',
        },
      })
    );
  });

  it('checkAPIResponse handles errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Test error' }),
    });

    await expect(signUp('test-symbol', 'test-faction')).rejects.toThrow('signUp Error');
  });
});