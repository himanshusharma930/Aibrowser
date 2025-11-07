# Requirements Document

## Introduction

This specification defines the requirements for transforming the Manus Electron application's initial user experience from a centered AI-chat interface to a browser-first layout. The transformation includes rebranding from "DeepFundAI" to "Manus" and implementing a progressive disclosure pattern where the full-width interface transitions to a split-view layout (browser left, AI sidebar right) after the user sends their first message.

## Glossary

- **Application**: The Manus Electron desktop application
- **Initial Screen**: The first screen users see when launching the Application, before sending any messages
- **Browser View**: The Electron WebContentsView component that displays web content on the left side (75% width)
- **AI Sidebar**: The React-based chat interface on the right side (25% width)
- **Split Layout**: The layout state where Browser View (left) and AI Sidebar (right) are both visible
- **Full-Width Layout**: The layout state where only the AI Sidebar is visible, occupying the entire window width
- **First Message Event**: The user action of submitting their first query through the input field
- **Header Component**: The top navigation bar containing branding and navigation controls
- **Home Page**: The landing page component (src/pages/home.tsx) shown on application launch
- **Main Page**: The chat interface component (src/pages/main.tsx) shown during active conversations

## Requirements

### Requirement 1: Rebrand Application Identity

**User Story:** As a user, I want to see "Manus" branding instead of "DeepFundAI" throughout the application, so that I recognize the updated product identity.

#### Acceptance Criteria

1. WHEN the Application launches, THE Header Component SHALL display "Manus" as the application name
2. WHEN the user views the Initial Screen, THE greeting text SHALL reference "Manus" instead of "DeepFundAI"
3. WHEN the user views any page, THE Header Component SHALL use consistent "Manus" branding with appropriate styling
4. WHERE translation files exist, THE Application SHALL update all language-specific branding references to "Manus"

### Requirement 2: Implement Full-Width Initial Layout

**User Story:** As a new user, I want to see a clean, centered interface when I first launch the application, so that I can focus on getting started without distraction.

#### Acceptance Criteria

1. WHEN the Application launches, THE Home Page SHALL display the AI Sidebar in full-width mode occupying 100% of the window width
2. WHEN the Initial Screen is displayed, THE Browser View SHALL remain hidden from the user
3. WHEN the user views the Initial Screen, THE greeting message SHALL be centered and prominently displayed
4. WHEN the Initial Screen is displayed, THE model configuration and input area SHALL be centered with maximum width of 636px
5. WHILE the Initial Screen is displayed, THE Application SHALL maintain the Browser View in memory but not render it visibly

### Requirement 3: Transition to Split Layout on First Message

**User Story:** As a user, I want the interface to automatically reveal the browser view when I send my first message, so that I can see both the AI conversation and browser automation simultaneously.

#### Acceptance Criteria

1. WHEN the First Message Event occurs, THE Application SHALL transition from Full-Width Layout to Split Layout
2. WHEN transitioning to Split Layout, THE Browser View SHALL become visible at 75% window width on the left side
3. WHEN transitioning to Split Layout, THE AI Sidebar SHALL resize to 25% window width on the right side
4. WHEN the transition occurs, THE Application SHALL animate the layout change smoothly over 300 milliseconds
5. WHEN the Split Layout is active, THE Browser View SHALL display at coordinates (x: 0, y: 0) with full window height

### Requirement 4: Preserve Split Layout After First Message

**User Story:** As a user, I want the split layout to remain visible throughout my session after sending my first message, so that I maintain consistent access to both the browser and chat interface.

#### Acceptance Criteria

1. WHILE the user has sent at least one message, THE Application SHALL maintain Split Layout across all navigation within the Main Page
2. WHEN the user sends subsequent messages, THE Application SHALL NOT toggle the Browser View visibility
3. WHEN the user resizes the panels, THE Application SHALL persist the custom layout proportions to localStorage
4. WHEN the user returns to the Home Page, THE Application SHALL reset to Full-Width Layout for the Initial Screen

### Requirement 5: Maintain Existing Functionality

**User Story:** As an existing user, I want all current features to continue working after the layout changes, so that my workflow is not disrupted.

#### Acceptance Criteria

1. WHEN the layout transitions occur, THE Application SHALL preserve all message history and task state
2. WHEN the Browser View becomes visible, THE Application SHALL maintain all existing browser automation capabilities
3. WHEN the user interacts with the AI Sidebar, THE Application SHALL preserve all existing chat, history, and toolbox features
4. WHEN the user navigates between pages, THE Application SHALL maintain all existing routing and state management behavior
5. WHEN the layout changes, THE Application SHALL continue to support all existing keyboard shortcuts and interactions

### Requirement 6: Update Visual Branding Elements

**User Story:** As a user, I want the visual design to reflect the Manus brand identity, so that the application feels cohesive and professional.

#### Acceptance Criteria

1. WHEN the Header Component renders, THE Application SHALL display "Manus" with appropriate typography and styling
2. WHEN the user views the Initial Screen, THE greeting SHALL use "Manus" in the introduction text
3. WHERE the Application displays the robot/assistant name, THE Application SHALL use "Manus" instead of "Altas" or other legacy names
4. WHEN the Application renders branding elements, THE Application SHALL use consistent color schemes and visual hierarchy
5. WHERE hover effects exist on branding elements, THE Application SHALL maintain smooth transitions and appropriate visual feedback

### Requirement 7: Handle Edge Cases and State Management

**User Story:** As a user, I want the application to handle various scenarios gracefully, so that I have a reliable experience regardless of how I interact with it.

#### Acceptance Criteria

1. WHEN the user navigates from Main Page back to Home Page, THE Application SHALL reset to Full-Width Layout
2. WHEN the Application detects a pending message from sessionStorage, THE Application SHALL trigger the layout transition automatically
3. WHEN the user is in scheduled task detail mode, THE Application SHALL maintain Split Layout regardless of message count
4. WHEN the Application initializes the Browser View bounds, THE Application SHALL calculate correct dimensions based on current layout state
5. IF the layout transition fails, THEN THE Application SHALL log the error and maintain the current layout state without crashing
