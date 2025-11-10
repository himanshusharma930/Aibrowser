/**
 * BrowserPanel Component
 *
 * Displays the browser automation detail panel with:
 * - Current tool status and information
 * - Browser URL bar
 * - Tool execution history playback controls
 * - Slider for navigating through execution steps
 */

import React, { useMemo } from 'react'
import { Button, Slider } from 'antd'
import { StepUpDown } from '@/icons/deepfundai-icons'
import { useTranslation } from 'react-i18next'
import type { ToolAction } from '@/models'
import type { CurrentToolState } from '@/types/tool'

interface BrowserPanelProps {
  isVisible: boolean
  currentTool: CurrentToolState | null
  currentUrl: string
  toolHistory: (ToolAction & { screenshot?: string; toolSequence?: number })[]
  currentHistoryIndex: number
  onHistoryIndexChange: (index: number) => void
}

export const BrowserPanel: React.FC<BrowserPanelProps> = ({
  isVisible,
  currentTool,
  currentUrl,
  toolHistory,
  currentHistoryIndex,
  onHistoryIndexChange,
}) => {
  const { t } = useTranslation('main')

  // Memoize status dot color to prevent unnecessary re-renders
  const statusDotColor = useMemo(() => {
    if (!currentTool) return ''
    switch (currentTool.status) {
      case 'running':
        return 'bg-blue-500 animate-pulse'
      case 'completed':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      default:
        return ''
    }
  }, [currentTool?.status])

  // Memoize status text
  const statusText = useMemo(() => {
    if (!currentTool) return ''
    switch (currentTool.status) {
      case 'running':
        return t('running')
      case 'completed':
        return t('completed')
      case 'error':
        return t('execution_error')
      default:
        return ''
    }
  }, [currentTool?.status, t])

  if (!isVisible) return null

  return (
    <div className='h-[560px] transition-all pt-5 pb-4 pr-4 duration-300 text-text-01-dark'>
      <div className='h-full border-border-message border flex flex-col rounded-xl'>
        {/* Detail panel title and current tool info */}
        <div className='p-4'>
          <h3 className='text-xl font-semibold'>{t('atlas_computer')}</h3>
          <div className='flex flex-col items-start justify-center px-5 py-3 gap-3 border-border-message border rounded-md h-[80px] bg-tool-call mt-3'>
            {currentTool && (
              <>
                <div className='border-b w-full border-dashed border-border-message flex items-center'>
                  {t('atlas_using_tool')}
                  <div className={`w-2 h-2 ml-2 rounded-full ${statusDotColor}`} />
                  <span className='ml-1 text-xs text-text-12-dark'>{statusText}</span>
                </div>
                <h3 className='text-sm text-text-12-dark'>
                  {currentTool.toolName} - {currentTool.operation}
                </h3>
              </>
            )}
          </div>
        </div>

        {/* Browser URL bar and tool history controls */}
        <div className='p-4 pt-0 flex-1'>
          <div className='border-border-message border rounded-md h-full flex flex-col'>
            {/* URL Bar */}
            <div className='h-[42px] bg-tool-call rounded-md flex items-center justify-center p-2'>
              {currentUrl && (
                <div className='text-xs text-text-12-dark line-clamp-1'>{currentUrl}</div>
              )}
            </div>

            {/* Spacer for browser view content */}
            <div className='flex-1' />

            {/* Tool history playback controls */}
            <div className='h-[42px] bg-tool-call rounded-md flex items-center px-3'>
              {toolHistory.length > 0 && (
                <div className='flex-1 flex items-center gap-2'>
                  {/* Previous/Next button group */}
                  <div className='flex items-center border border-border-message rounded'>
                    <Button
                      type='text'
                      size='small'
                      disabled={toolHistory.length === 0 || currentHistoryIndex === 0}
                      onClick={() => {
                        const newIndex =
                          currentHistoryIndex === -1
                            ? toolHistory.length - 2
                            : currentHistoryIndex - 1
                        onHistoryIndexChange(Math.max(0, newIndex))
                      }}
                      className='!border-0 !rounded-r-none'
                    >
                      <StepUpDown className='w-3 h-3' />
                    </Button>
                    <Button
                      type='text'
                      size='small'
                      disabled={currentHistoryIndex === -1}
                      onClick={() => onHistoryIndexChange(currentHistoryIndex + 1)}
                      className='!border-0 !rounded-l-none border-l border-border-message'
                    >
                      <StepUpDown className='rotate-180 w-3 h-3' />
                    </Button>
                  </div>

                  {/* Tool execution timeline slider */}
                  <Slider
                    className='flex-1'
                    min={0}
                    max={toolHistory.length}
                    value={currentHistoryIndex === -1 ? toolHistory.length : currentHistoryIndex + 1}
                    onChange={(value) => onHistoryIndexChange(value - 1)}
                    step={1}
                    marks={toolHistory.reduce(
                      (marks, _, index) => {
                        marks[index + 1] = ''
                        return marks
                      },
                      {} as Record<number, string>
                    )}
                  />

                  <span className='text-xs text-text-12-dark'>{t('realtime')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
