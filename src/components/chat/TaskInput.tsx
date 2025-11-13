import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { SendMessage, CancleTask } from '@/icons/deepfundai-icons'

interface TaskInputProps {
    query: string
    setQuery: (query: string) => void
    isHistoryMode: boolean
    isCurrentTaskRunning: boolean
    onSendMessage: (message: string) => void
    onCancelTask: () => void
    t: any
}

/**
 * Component for task input with send/cancel functionality and keyboard shortcuts
 */
export const TaskInput: React.FC<TaskInputProps> = ({
    query,
    setQuery,
    isHistoryMode,
    isCurrentTaskRunning,
    onSendMessage,
    onCancelTask,
    t
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            // Handle sending message logic
            console.log('Sending message')
            onSendMessage(query)
        }
    }

    return (
        <div className='h-30 gradient-border relative'>
            <Input.TextArea
                value={query}
                onKeyDown={handleKeyDown}
                onChange={(e) => setQuery(e.target.value)}
                className="!h-full !bg-tool-call !text-text-01-dark !placeholder-text-12-dark !py-2"
                placeholder={isHistoryMode ? t('history_readonly_input') : t('input_placeholder')}
                disabled={isHistoryMode}
            />

            {/* Send/Cancel button - only shown in non-history mode */}
            {!isHistoryMode && (
                <div className="absolute right-3 bottom-3">
                    {isCurrentTaskRunning ? (
                        <span
                        className='bg-ask-status rounded-md flex justify-center items-center w-7 h-7 cursor-pointer'
                        onClick={onCancelTask}>
                            <CancleTask className="w-5 h-5" />
                        </span>
                    ) : (
                        <span
                        className={`bg-ask-status rounded-md flex justify-center items-center w-7 h-7 cursor-pointer ${
                           query ? '' : '!cursor-not-allowed opacity-60'
                        }`}
                        onClick={() => onSendMessage(query)}>
                            <SendMessage className="w-5 h-5" />
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}