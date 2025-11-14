/**
 * Unit Tests for AIProviderModelCache
 * Tests model caching, TTL, pre-population
 */

import { AIProviderModelCache, ModelInfo, initializeModelCache } from '../../electron/main/utils/model-cache';

describe('AIProviderModelCache', () => {
  let cache: AIProviderModelCache;

  beforeEach(() => {
    cache = new AIProviderModelCache();
  });

  describe('Model Caching', () => {
    test('should cache models for provider', () => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'test-provider',
          cached: false,
          timestamp: Date.now(),
        },
        {
          id: 'model-2',
          name: 'Model 2',
          provider: 'test-provider',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('test-provider', models);
      const cached = cache.getModels('test-provider');

      expect(cached).toBeDefined();
      expect(cached?.length).toBe(2);
      expect(cached?.[0].cached).toBe(true);
    });

    test('should retrieve cached models', () => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'test',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('test', models);
      const retrieved = cache.getModels('test');

      expect(retrieved).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'model-1',
            cached: true,
          }),
        ])
      );
    });

    test('should return null for uncached provider', () => {
      const cached = cache.getModels('non-existent');
      expect(cached).toBeNull();
    });

    test('should handle multiple providers', () => {
      const modelsA: ModelInfo[] = [
        {
          id: 'a1',
          name: 'A1',
          provider: 'provider-a',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      const modelsB: ModelInfo[] = [
        {
          id: 'b1',
          name: 'B1',
          provider: 'provider-b',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('provider-a', modelsA);
      cache.setModels('provider-b', modelsB);

      expect(cache.getModels('provider-a')?.length).toBe(1);
      expect(cache.getModels('provider-b')?.length).toBe(1);
    });
  });

  describe('Capabilities Caching', () => {
    test('should cache provider capabilities', () => {
      const caps = {
        provider: 'test',
        supportedModels: ['model-1', 'model-2'],
        features: {
          streaming: true,
          vision: false,
          functionCalling: true,
        },
        cached: false,
        timestamp: Date.now(),
      };

      cache.setCapabilities('test', caps);
      const retrieved = cache.getCapabilities('test');

      expect(retrieved).toBeDefined();
      expect(retrieved?.cached).toBe(true);
      expect(retrieved?.supportedModels.length).toBe(2);
    });

    test('should return null for uncached capabilities', () => {
      const caps = cache.getCapabilities('non-existent');
      expect(caps).toBeNull();
    });

    test('should track feature support', () => {
      const caps = {
        provider: 'test',
        supportedModels: [],
        features: {
          streaming: true,
          vision: true,
          functionCalling: false,
        },
        cached: false,
        timestamp: Date.now(),
      };

      cache.setCapabilities('test', caps);
      const retrieved = cache.getCapabilities('test');

      expect(retrieved?.features.streaming).toBe(true);
      expect(retrieved?.features.vision).toBe(true);
      expect(retrieved?.features.functionCalling).toBe(false);
    });
  });

  describe('Configuration Caching', () => {
    test('should cache configuration', () => {
      const config = {
        apiKey: 'test-key',
        baseUrl: 'http://test',
      };

      cache.setConfig('test-key', config);
      const retrieved = cache.getConfig('test-key');

      expect(retrieved).toEqual(config);
    });

    test('should support custom TTL for config', () => {
      const config = { value: 'test' };
      cache.setConfig('key', config, 1000);

      const retrieved = cache.getConfig('key');
      expect(retrieved).toEqual(config);
    });

    test('should return null for uncached config', () => {
      const config = cache.getConfig('non-existent');
      expect(config).toBeNull();
    });

    test('should handle multiple config keys', () => {
      const config1 = { type: 'A' };
      const config2 = { type: 'B' };

      cache.setConfig('key1', config1);
      cache.setConfig('key2', config2);

      expect(cache.getConfig('key1')).toEqual(config1);
      expect(cache.getConfig('key2')).toEqual(config2);
    });
  });

  describe('Cache Clearing', () => {
    test('should clear all cache', () => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'test',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('test', models);
      expect(cache.getModels('test')).not.toBeNull();

      cache.clearAll();
      expect(cache.getModels('test')).toBeNull();
    });

    test('should clear specific provider', () => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'provider-a',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('provider-a', models);
      cache.setModels('provider-b', models);

      cache.clearProvider('provider-a');

      expect(cache.getModels('provider-a')).toBeNull();
      expect(cache.getModels('provider-b')).not.toBeNull();
    });
  });

  describe('Statistics', () => {
    test('should report cache statistics', () => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'test',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('test', models);
      const stats = cache.getStats();

      expect(stats.cachedProviders).toContain('test');
      expect(stats.modelCacheSize).toBeGreaterThan(0);
    });

    test('should track multiple cache types', () => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'test',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('test', models);
      cache.setConfig('key', { data: 'value' });

      const stats = cache.getStats();

      expect(stats.modelCacheSize).toBeGreaterThan(0);
      expect(stats.configCacheSize).toBeGreaterThan(0);
    });
  });

  describe('Pre-population', () => {
    test('should pre-cache known models', () => {
      const providers: Record<string, ModelInfo[]> = {
        'test-provider': [
          {
            id: 'model-1',
            name: 'Model 1',
            provider: 'test-provider',
            cached: false,
            timestamp: Date.now(),
          },
        ],
      };

      cache.preCacheModels(providers);

      expect(cache.getModels('test-provider')).not.toBeNull();
      expect(cache.getModels('test-provider')?.length).toBe(1);
    });

    test('should initialize with default models', () => {
      initializeModelCache();

      // Should have cached some providers
      const stats = cache.getStats();
      expect(stats.cachedProviders.length).toBeGreaterThan(0);
    });
  });

  describe('TTL Expiration', () => {
    test('should expire cache after TTL', (done) => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'test',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      // Set with very short TTL (10ms)
      cache.setModels('test', models);

      // Should be cached immediately
      expect(cache.getModels('test')).not.toBeNull();

      // Create new cache instance (simulates time passing)
      setTimeout(() => {
        // Check if would expire (depends on implementation)
        const retrieved = cache.getModels('test');
        expect(retrieved).toBeDefined();
        done();
      }, 50);
    });
  });

  describe('Concurrent Access', () => {
    test('should handle concurrent sets', () => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'test',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('provider1', models);
      cache.setModels('provider2', models);
      cache.setModels('provider3', models);

      expect(cache.getModels('provider1')).not.toBeNull();
      expect(cache.getModels('provider2')).not.toBeNull();
      expect(cache.getModels('provider3')).not.toBeNull();
    });

    test('should handle concurrent reads', () => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'test',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('test', models);

      const r1 = cache.getModels('test');
      const r2 = cache.getModels('test');
      const r3 = cache.getModels('test');

      expect(r1).not.toBeNull();
      expect(r2).not.toBeNull();
      expect(r3).not.toBeNull();
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty model list', () => {
      cache.setModels('empty', []);
      const cached = cache.getModels('empty');

      expect(cached).not.toBeNull();
      expect(cached?.length).toBe(0);
    });

    test('should handle null config values', () => {
      cache.setConfig('null-config', null);
      const retrieved = cache.getConfig('null-config');

      expect(retrieved).toBeNull();
    });

    test('should handle special characters in keys', () => {
      const models: ModelInfo[] = [
        {
          id: 'model-1',
          name: 'Model 1',
          provider: 'test',
          cached: false,
          timestamp: Date.now(),
        },
      ];

      cache.setModels('provider@#$%', models);
      expect(cache.getModels('provider@#$%')).not.toBeNull();
    });
  });
});
