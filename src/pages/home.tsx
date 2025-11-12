import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AISidebarHeader from '@/components/AISidebarHeader'
import { Input } from 'antd'
import { ScheduledTaskModal, ScheduledTaskListPanel } from '@/components/scheduled-task'
import { useScheduledTaskStore } from '@/stores/scheduled-task-store'
import { ModelConfigBar } from '@/components/ModelConfigBar'
import { ChromeBrowserBackground } from '@/components/fellou/ChromeBrowserBackground'
import { useTranslation } from 'react-i18next'
import { FIRST_MESSAGE_KEY } from '@/hooks/useLayoutMode'
import { optimizedFullWidthLayoutTransition } from '@/utils/layout-transition'

export default function Home() {
    const [query, setQuery] = useState('')
    const router = useRouter()
    const { t } = useTranslation('home')

    // Reset layout to full-width when home page mounts
    // Requirement 6.2, 6.3: Hide browser area and tab bar, expand AI chat panel to full width,
    // hide WebContentsView, and maintain smooth transition
    useEffect(() => {
        const resetLayout = async () => {
            if (typeof window !== 'undefined') {
                // Function to reset layout mode in session storage
                const resetToFullWidth = () => {
                    sessionStorage.removeItem(FIRST_MESSAGE_KEY);
                    console.log('[Home] Layout mode reset to full-width');
                };

                try {
                    // Use optimized full-width layout transition
                    // This will:
                    // 1. Hide WebContentsView first
                    // 2. Wait for next animation frame for smooth coordination
                    // 3. Update React state (hides browser area and tab bar, expands AI chat panel)
                    const result = await optimizedFullWidthLayoutTransition(resetToFullWidth);
                    
                    if (!result.success) {
                        console.warn('[Home] Layout transition completed with warnings:', result.error);
                        // Non-blocking - layout may be partially applied
                    } else {
                        console.log('[Home] Full-width layout transition completed successfully');
                    }
                } catch (error) {
                    console.error('[Home] Failed to transition to full-width layout:', error);
                    // Fallback: still reset the session storage flag
                    resetToFullWidth();
                    // Try to hide browser view as fallback
                    if ((window as any).api?.setDetailViewVisible) {
                        (window as any).api.setDetailViewVisible(false).catch((error: any) => {
                            console.error('[Home] Fallback: Failed to hide browser view:', error);
                        });
                    }
                }
            }
        };

        resetLayout();
    }, []);

    // Initialize scheduled task scheduler
    // Note: Use main process state flag to prevent duplicate initialization due to route switching
    useEffect(() => {
        const initScheduler = async () => {
            try {
                // Check if main process is already initialized
                if (typeof window !== 'undefined' && (window as any).api) {
                    const isInitialized = await (window as any).api.invoke('scheduler:is-initialized')

                    if (isInitialized) {
                        return
                    }

                    // Load and register all enabled tasks from storage
                    const { initializeScheduler } = useScheduledTaskStore.getState()
                    await initializeScheduler()

                    // Mark main process as initialized
                    await (window as any).api.invoke('scheduler:mark-initialized')
                }
            } catch (error) {
                console.error('[Home] Failed to initialize scheduler:', error)
            }
        }

        initScheduler()
    }, [])

    // Handle sending message
    const handleSendMessage = () => {
        if (query.trim()) {
            // Use sessionStorage to implicitly pass message
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('pendingMessage', query.trim())
            }
            // Directly navigate to main page without URL parameters
            router.push('/main')
        }
    }

    // Handle Enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="h-screen w-screen overflow-hidden flex" style={{ background: 'var(--mono-darkest)' }}>
            {/* Full-width AI Sidebar - centered content */}
            <div className="w-full h-full flex flex-col" style={{ background: 'var(--bg-ai-sidebar)' }}>
                {/* AI Sidebar Header */}
                <AISidebarHeader />

                {/* AI Sidebar Content */}
                <div className='bg-main-view bg-origin-padding bg-no-repeat bg-cover h-full overflow-y-auto text-text-01-dark flex flex-col relative'>
                    <div className='flex flex-col items-center pt-[80px] w-full h-full overflow-y-auto z-10 px-4'>
                        {/* Greeting - centered */}
                        <div className='text-center leading-10 text-text-01-dark text-[28px] font-bold max-w-[636px] w-full'>
                            <div>{t('greeting_name')}</div>
                            <p>{t('greeting_intro')}</p>
                        </div>

                        {/* Unified Input Area: Model Config + Query Input - centered */}
                        <div className='gradient-border w-full max-w-[636px] mt-[30px]' style={{ height: 'auto' }}>
                            <div className='bg-tool-call rounded-xl w-full h-full'>
                                {/* Model Configuration Bar */}
                                <ModelConfigBar />

                                {/* Query input box */}
                                <div className='h-[160px] p-4'>
                                    <Input.TextArea
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className='!h-full !bg-transparent !text-text-01-dark !placeholder-text-12-dark !py-3 !px-4 !border !border-solid'
                                        placeholder={t('input_placeholder')}
                                        autoSize={false}
                                        style={{
                                            borderColor: 'rgba(255, 255, 255, 0.2)',
                                            borderWidth: '1px',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom background decoration */}
                    <div className='absolute bottom-0 w-full h-[212px] bg-main-view-footer bg-cover bg-no-repeat bg-center pointer-events-none'></div>
                </div>
            </div>

            {/* Scheduled task related components */}
            <ScheduledTaskModal />
            <ScheduledTaskListPanel />
        </div>
    )
}