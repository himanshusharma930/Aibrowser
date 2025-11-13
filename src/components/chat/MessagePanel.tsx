import React, { useRef, useState, useEffect } from 'react'
import { MessageList } from '@/components/chat/MessageComponents'
import { ToolAction } from '@/models'

interface MessagePanelProps {
    messages: any[]
    onToolClick: (message: ToolAction) => void
    isHistoryMode: boolean
    currentTaskId?: string
    tasks: any[]
    t: any
}

/**
 * Component for displaying the message list with scroll management and tool interaction
 */
export const MessagePanel: React.FC<MessagePanelProps> = ({
    messages,
    onToolClick,
    isHistoryMode,
    currentTaskId,
    tasks,
    t
}) => {
    // Scroll related state and references
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isAtBottom, setIsAtBottom] = useState(true)
    const [isUserScrolling, setIsUserScrolling] = useState(false)
    const scrollTimeoutRef = useRef<NodeJS.Timeout>(null)

    // Scroll to bottom function
    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }

    // Handle scroll events
    const handleScroll = () => {
        if (!scrollContainerRef.current) return

        const container = scrollContainerRef.current
        const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10
        setIsAtBottom(isBottom)

        // User active scrolling marker
        setIsUserScrolling(true)
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsUserScrolling(false)
        }, 150)
    }

    // Monitor message changes, auto scroll to bottom
    useEffect(() => {
        if (isAtBottom && !isUserScrolling) {
            setTimeout(() => scrollToBottom(), 50) // Slight delay to ensure DOM updates
        }
    }, [messages, isAtBottom, isUserScrolling])

    return (
        <div className='flex-1 h-full transition-all duration-300'>
            <div className='w-full max-w-[636px] mx-auto flex flex-col gap-2 pt-7 pb-4 h-full relative px-4'>
                {/* Task title and history button */}
                <div className='absolute top-0 left-4 right-4 flex items-center justify-between'>
                    <div className='line-clamp-1 text-xl font-semibold flex-1 text-text-01-dark'>
                        {currentTaskId && tasks.find(task => task.id === currentTaskId)?.name}
                        {isHistoryMode && (
                            <span className='ml-2 text-sm text-gray-500'>{t('history_task_readonly')}</span>
                        )}
                    </div>
                </div>

                {/* Message list */}
                <div
                    ref={scrollContainerRef}
                    className='flex-1 h-full overflow-x-hidden overflow-y-auto px-4 pt-5'
                    onScroll={handleScroll}
                >
                    <MessageList messages={messages} onToolClick={onToolClick} />
                </div>
            </div>
        </div>
    )
}