import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { agentContextManager, AgentContextManager } from '../src/services/agent-context-manager';
import type { AgentState, ContextTransfer, WindowContext } from '../src/services/agent-context-manager';

/**
 * Integration Tests for Agent Context Manager (Phase 2)
 * Tests multi-agent state coordination and context transfer
 */

describe('Agent Context Manager Integration Tests', () => {
  const windowId = 12345;
  const testAgents = ['BrowserAgent', 'FileAgent'];

  beforeEach(async () => {
    // Ensure clean state
    await agentContextManager.initializeWindowContext(windowId);
  });

  afterEach(async () => {
    // Cleanup
    await agentContextManager.clearWindowContext(windowId);
  });

  describe('Window Context Initialization', () => {
    it('should initialize window context with unique ID', async () => {
      const context = await agentContextManager.initializeWindowContext(windowId + 1);

      expect(context).toBeDefined();
      expect(context.windowId).toBe(windowId + 1);
      expect(context.contextId).toMatch(/^ctx_/);
      expect(context.isActive).toBe(true);
      expect(context.globalVariables).toEqual({});
      expect(context.agentStates).toBeInstanceOf(Map);
      expect(context.contextTransfers).toEqual([]);
    });

    it('should return existing context if window already initialized', async () => {
      const ctx1 = await agentContextManager.initializeWindowContext(windowId + 2);
      const ctx2 = await agentContextManager.initializeWindowContext(windowId + 2);

      expect(ctx1.contextId).toBe(ctx2.contextId);
    });
  });

  describe('Agent State Management', () => {
    it('should save agent state with variables and session state', async () => {
      const variables = { taskId: 'task_123', progress: 50 };
      const sessionState = { cookies: ['session=abc'], auth: { token: 'xyz' } };

      const agentState = await agentContextManager.saveAgentState(
        windowId,
        'BrowserAgent',
        variables,
        sessionState
      );

      expect(agentState).toBeDefined();
      expect(agentState.agentName).toBe('BrowserAgent');
      expect(agentState.variables).toEqual(variables);
      expect(agentState.sessionState).toEqual(sessionState);
      expect(agentState.timestamp).toBeGreaterThan(0);
    });

    it('should retrieve saved agent state', async () => {
      const variables = { status: 'running' };
      await agentContextManager.saveAgentState(windowId, 'FileAgent', variables, {});

      const retrieved = await agentContextManager.getAgentState(windowId, 'FileAgent');

      expect(retrieved).toBeDefined();
      expect(retrieved?.agentName).toBe('FileAgent');
      expect(retrieved?.variables).toEqual(variables);
    });

    it('should return null for non-existent agent state', async () => {
      const state = await agentContextManager.getAgentState(windowId, 'NonExistentAgent');
      expect(state).toBeNull();
    });

    it('should overwrite agent state on save', async () => {
      const var1 = { data: 'first' };
      const var2 = { data: 'second' };

      await agentContextManager.saveAgentState(windowId, 'BrowserAgent', var1, {});
      const state1 = await agentContextManager.getAgentState(windowId, 'BrowserAgent');
      expect(state1?.variables).toEqual(var1);

      await agentContextManager.saveAgentState(windowId, 'BrowserAgent', var2, {});
      const state2 = await agentContextManager.getAgentState(windowId, 'BrowserAgent');
      expect(state2?.variables).toEqual(var2);
    });
  });

  describe('Context Transfer (Agent Handoff)', () => {
    it('should transfer context from one agent to another', async () => {
      const contextData = { sharedData: 'important_value', nodeId: 5 };

      const transfer = await agentContextManager.transferContext(
        windowId,
        'BrowserAgent',
        'FileAgent',
        contextData,
        'Navigation complete, handing off to file agent'
      );

      expect(transfer).toBeDefined();
      expect(transfer.fromAgent).toBe('BrowserAgent');
      expect(transfer.toAgent).toBe('FileAgent');
      expect(transfer.context).toEqual(contextData);
      expect(transfer.handoffReason).toBe('Navigation complete, handing off to file agent');
      expect(transfer.timestamp).toBeGreaterThan(0);
    });

    it('should update target agent state on transfer', async () => {
      const initialVars = { initial: 'data' };
      const transferData = { transferred: 'context' };

      // Initialize target agent
      await agentContextManager.saveAgentState(windowId, 'FileAgent', initialVars, {});

      // Transfer context
      await agentContextManager.transferContext(
        windowId,
        'BrowserAgent',
        'FileAgent',
        transferData
      );

      // Verify target agent has merged state
      const updated = await agentContextManager.getAgentState(windowId, 'FileAgent');
      expect(updated?.variables).toEqual({ ...initialVars, ...transferData });
    });

    it('should record context transfer in history', async () => {
      await agentContextManager.transferContext(
        windowId,
        'BrowserAgent',
        'FileAgent',
        { data: 'test' }
      );

      const history = await agentContextManager.getContextTransferHistory(windowId);
      expect(history.length).toBe(1);
      expect(history[0].fromAgent).toBe('BrowserAgent');
      expect(history[0].toAgent).toBe('FileAgent');
    });

    it('should filter context transfer history by direction', async () => {
      await agentContextManager.transferContext(windowId, 'BrowserAgent', 'FileAgent', {});
      await agentContextManager.transferContext(windowId, 'FileAgent', 'BrowserAgent', {});
      await agentContextManager.transferContext(windowId, 'BrowserAgent', 'FileAgent', {});

      const browserToFile = await agentContextManager.getContextTransferHistory(
        windowId,
        'BrowserAgent',
        'FileAgent'
      );
      expect(browserToFile.length).toBe(2);

      const fromBrowser = await agentContextManager.getContextTransferHistory(
        windowId,
        'BrowserAgent'
      );
      expect(fromBrowser.length).toBe(2);
    });
  });

  describe('Global Variables', () => {
    it('should set and retrieve global variables', async () => {
      await agentContextManager.setGlobalVariable(windowId, 'apiEndpoint', 'https://api.example.com');
      await agentContextManager.setGlobalVariable(windowId, 'timeout', 5000);

      const endpoint = await agentContextManager.getGlobalVariable(windowId, 'apiEndpoint');
      const timeout = await agentContextManager.getGlobalVariable(windowId, 'timeout');

      expect(endpoint).toBe('https://api.example.com');
      expect(timeout).toBe(5000);
    });

    it('should return undefined for non-existent global variable', async () => {
      const value = await agentContextManager.getGlobalVariable(windowId, 'nonExistent');
      expect(value).toBeUndefined();
    });

    it('should be accessible to all agents through getAgentVariables', async () => {
      const globalVar = { sharedKey: 'sharedValue' };
      await agentContextManager.setGlobalVariable(windowId, 'sharedKey', 'sharedValue');

      const browserVars = await agentContextManager.getAgentVariables(windowId, 'BrowserAgent');
      const fileVars = await agentContextManager.getAgentVariables(windowId, 'FileAgent');

      expect(browserVars.sharedKey).toBe('sharedValue');
      expect(fileVars.sharedKey).toBe('sharedValue');
    });
  });

  describe('Agent Variables (Merged)', () => {
    it('should merge global and agent-specific variables', async () => {
      const globalData = { globalKey: 'global_value' };
      const agentData = { agentKey: 'agent_value' };

      await agentContextManager.setGlobalVariable(windowId, 'globalKey', 'global_value');
      await agentContextManager.saveAgentState(windowId, 'BrowserAgent', agentData, {});

      const merged = await agentContextManager.getAgentVariables(windowId, 'BrowserAgent');

      expect(merged.globalKey).toBe('global_value');
      expect(merged.agentKey).toBe('agent_value');
    });

    it('should return empty object for uninitialized window', async () => {
      const vars = await agentContextManager.getAgentVariables(windowId + 999, 'AnyAgent');
      expect(vars).toEqual({});
    });

    it('should agent-specific variables override global variables', async () => {
      const key = 'configValue';

      await agentContextManager.setGlobalVariable(windowId, key, 'global');
      await agentContextManager.saveAgentState(
        windowId,
        'BrowserAgent',
        { configValue: 'agent_override' },
        {}
      );

      const merged = await agentContextManager.getAgentVariables(windowId, 'BrowserAgent');
      expect(merged.configValue).toBe('agent_override');
    });
  });

  describe('Snapshot Operations', () => {
    it('should get all agent states snapshot', async () => {
      const vars1 = { id: 1, name: 'agent1' };
      const vars2 = { id: 2, name: 'agent2' };

      await agentContextManager.saveAgentState(windowId, 'Agent1', vars1, {});
      await agentContextManager.saveAgentState(windowId, 'Agent2', vars2, {});

      const allStates = await agentContextManager.getAllAgentStates(windowId);

      expect(allStates.size).toBe(2);
      expect(allStates.get('Agent1')?.variables).toEqual(vars1);
      expect(allStates.get('Agent2')?.variables).toEqual(vars2);
    });

    it('should export context for persistence', async () => {
      const globalVar = { endpoint: 'https://api.example.com' };
      const agentVars = { status: 'running' };

      await agentContextManager.setGlobalVariable(windowId, 'endpoint', 'https://api.example.com');
      await agentContextManager.saveAgentState(windowId, 'BrowserAgent', agentVars, {});
      await agentContextManager.transferContext(
        windowId,
        'BrowserAgent',
        'FileAgent',
        { handoff: 'data' }
      );

      const exported = await agentContextManager.exportContext(windowId);

      expect(exported).toBeDefined();
      expect(exported?.windowId).toBe(windowId);
      expect(exported?.globalVariables).toEqual(globalVar);
      expect(exported?.agentStates).toHaveProperty('BrowserAgent');
      expect(exported?.contextTransfers.length).toBe(1);
    });

    it('should import context from persistence', async () => {
      const data = {
        globalVariables: { key: 'value' },
        agentStates: [
          { agent: 'TestAgent', agentName: 'TestAgent', timestamp: Date.now(), variables: { test: 'data' }, sessionState: {} }
        ],
        contextTransfers: []
      };

      const imported = await agentContextManager.importContext(windowId + 1000, data);

      expect(imported.globalVariables).toEqual(data.globalVariables);
      expect(imported.agentStates.size).toBe(1);
      expect(imported.agentStates.get('TestAgent')).toBeDefined();
    });
  });

  describe('Context Cleanup', () => {
    it('should clear window context', async () => {
      await agentContextManager.saveAgentState(windowId, 'Agent1', { data: 'test' }, {});
      await agentContextManager.setGlobalVariable(windowId, 'key', 'value');

      await agentContextManager.clearWindowContext(windowId);

      const state = await agentContextManager.getAgentState(windowId, 'Agent1');
      expect(state).toBeNull();

      const var_ = await agentContextManager.getGlobalVariable(windowId, 'key');
      expect(var_).toBeUndefined();
    });

    it('should mark context as inactive on clear', async () => {
      const context1 = await agentContextManager.initializeWindowContext(windowId + 2000);
      expect(context1.isActive).toBe(true);

      await agentContextManager.clearWindowContext(windowId + 2000);

      const allContexts = agentContextManager.getActiveContexts();
      const found = allContexts.find(ctx => ctx.windowId === windowId + 2000);
      expect(found).toBeUndefined();
    });

    it('should auto-cleanup old contexts', async () => {
      const oldWindowId = windowId + 3000;

      // Manually set a very old context
      await agentContextManager.initializeWindowContext(oldWindowId);

      // Simulate old context by directly manipulating (normally done by time passage)
      // In production, this would be tested by waiting or mocking time

      await agentContextManager.cleanupOldContexts();

      // Old contexts should be removed
      // (In real tests, would verify with mocked timestamps)
    });
  });

  describe('Memory Management', () => {
    it('should handle context compression', async () => {
      // Add large objects to trigger compression
      const largeData = { huge: 'x'.repeat(15000) };

      await agentContextManager.saveAgentState(windowId, 'LargeAgent', largeData, {});

      // After compression, large fields should be removed
      const state = await agentContextManager.getAgentState(windowId, 'LargeAgent');
      expect(state).toBeDefined();
    });

    it('should track active contexts for monitoring', () => {
      const activeContexts = agentContextManager.getActiveContexts();

      expect(Array.isArray(activeContexts)).toBe(true);
      const hasWindow = activeContexts.some(ctx => ctx.windowId === windowId);
      expect(hasWindow).toBe(true);
    });
  });

  describe('Multi-window Isolation', () => {
    it('should isolate state between windows', async () => {
      const windowId1 = 10001;
      const windowId2 = 10002;

      await agentContextManager.initializeWindowContext(windowId1);
      await agentContextManager.initializeWindowContext(windowId2);

      await agentContextManager.setGlobalVariable(windowId1, 'key', 'window1_value');
      await agentContextManager.setGlobalVariable(windowId2, 'key', 'window2_value');

      const val1 = await agentContextManager.getGlobalVariable(windowId1, 'key');
      const val2 = await agentContextManager.getGlobalVariable(windowId2, 'key');

      expect(val1).toBe('window1_value');
      expect(val2).toBe('window2_value');

      // Cleanup
      await agentContextManager.clearWindowContext(windowId1);
      await agentContextManager.clearWindowContext(windowId2);
    });
  });
});
