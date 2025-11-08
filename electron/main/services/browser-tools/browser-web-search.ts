/**
 * Browser Web Search Tool
 *
 * Performs web searches using the browser's search engine.
 * Navigates to search results and extracts information.
 *
 * @phase 6
 * @priority HIGH
 * @complexity MEDIUM
 * @risk LOW
 */

import type { Tool, ToolResult } from '@jarvis-agent/core/types';
import type { AgentContext } from '@jarvis-agent/core';
import type { LanguageModelV2ToolCallPart } from '@jarvis-agent/core/types';

interface BrowserWebSearchArgs {
  query: string;
  count?: number;
  engine?: 'google' | 'bing' | 'duckduckgo';
}

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export const browserWebSearchTool: Tool = {
  name: 'browser_web_search',
  description: 'Search the web for information using a search engine. Returns search results with titles, URLs, and snippets.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query to look up'
      },
      count: {
        type: 'number',
        description: 'Number of results to return (default: 10, max: 20)'
      },
      engine: {
        type: 'string',
        enum: ['google', 'bing', 'duckduckgo'],
        description: 'Search engine to use (default: google)'
      }
    },
    required: ['query']
  },
  execute: async (
    args: Record<string, unknown>,
    agentContext: AgentContext,
    _toolCall: LanguageModelV2ToolCallPart
  ): Promise<ToolResult> => {
    try {
      const typedArgs = args as unknown as BrowserWebSearchArgs;
      const query = typedArgs.query;
      const count = Math.min(typedArgs.count || 10, 20);
      const engine = typedArgs.engine || 'google';

      // Build search URL based on engine
      let searchUrl: string;
      switch (engine) {
        case 'bing':
          searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
          break;
        case 'duckduckgo':
          searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
          break;
        case 'google':
        default:
          searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
          break;
      }

      // Navigate to search results
      await (agentContext.agent as any).navigate_to(agentContext, searchUrl);

      // Wait for results to load
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Extract search results based on engine
      const results: SearchResult[] = await (agentContext.agent as any).execute_script(agentContext,
        agentContext,
        (engine: string, maxCount: number) => {
          const results: any[] = [];

          if (engine === 'google') {
            // Google search results
            const searchResults = document.querySelectorAll('div.g, div[data-sokoban-container]');

            searchResults.forEach((result, index) => {
              if (index >= maxCount) return;

              const titleEl = result.querySelector('h3');
              const linkEl = result.querySelector('a');
              const snippetEl = result.querySelector('div[data-sncf], div.VwiC3b, span.aCOpRe');

              if (titleEl && linkEl) {
                results.push({
                  title: titleEl.textContent?.trim() || '',
                  url: linkEl.getAttribute('href') || '',
                  snippet: snippetEl?.textContent?.trim() || ''
                });
              }
            });
          } else if (engine === 'bing') {
            // Bing search results
            const searchResults = document.querySelectorAll('li.b_algo');

            searchResults.forEach((result, index) => {
              if (index >= maxCount) return;

              const titleEl = result.querySelector('h2 a');
              const snippetEl = result.querySelector('p, div.b_caption p');

              if (titleEl) {
                results.push({
                  title: titleEl.textContent?.trim() || '',
                  url: titleEl.getAttribute('href') || '',
                  snippet: snippetEl?.textContent?.trim() || ''
                });
              }
            });
          } else if (engine === 'duckduckgo') {
            // DuckDuckGo search results
            const searchResults = document.querySelectorAll('article[data-testid="result"]');

            searchResults.forEach((result, index) => {
              if (index >= maxCount) return;

              const titleEl = result.querySelector('h2 a');
              const snippetEl = result.querySelector('div[data-result="snippet"]');

              if (titleEl) {
                results.push({
                  title: titleEl.textContent?.trim() || '',
                  url: titleEl.getAttribute('href') || '',
                  snippet: snippetEl?.textContent?.trim() || ''
                });
              }
            });
          }

          return results;
        },
        [engine, count]
      );

      if (results.length === 0) {
        return {
          content: [{
            type: 'text',
            text: `No search results found for: "${query}"`
          }],
          isError: false
        };
      }

      // Format results
      const formattedResults = results
        .map((result, index) =>
          `[${index + 1}] ${result.title}\nURL: ${result.url}\n${result.snippet}`
        )
        .join('\n\n---\n\n');

      const summary = `Search results for: "${query}" (${results.length} results from ${engine})\n\n${formattedResults}`;

      return {
        content: [{
          type: 'text',
          text: summary
        }],
        isError: false
      };

    } catch (error: any) {
      return {
        content: [{
          type: 'text',
          text: `Search error: ${error.message}`
        }],
        isError: true
      };
    }
  }
};