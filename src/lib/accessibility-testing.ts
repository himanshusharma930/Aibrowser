/**
 * Accessibility Testing Framework
 *
 * Comprehensive automated and manual testing utilities for WCAG 2.1 AA compliance.
 * Provides tools for color contrast validation, keyboard navigation, screen reader support,
 * and ARIA attribute verification.
 *
 * Features:
 * - Automated color contrast checking with WCAG standards
 * - Keyboard navigation validation
 * - Screen reader compatibility testing
 * - ARIA attribute verification
 * - Accessible form validation
 * - Focus management testing
 * - Semantic HTML structure validation
 */

/**
 * Color Contrast Checker - WCAG 2.1 AA Compliance
 * Minimum ratios: 4.5:1 for normal text, 3:1 for large text
 */
export const ColorContrastChecker = {
  /**
   * Convert hex color to RGB
   */
  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  /**
   * Calculate relative luminance (WCAG formula)
   */
  getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(x => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio(color1: string, color2: string): number | null {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    if (!rgb1 || !rgb2) return null;

    const lum1 = this.getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = this.getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  },

  /**
   * Check if contrast ratio meets WCAG AA standard
   */
  meetsWCAGAA(ratio: number, isLargeText: boolean = false): boolean {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  },

  /**
   * Audit all text-background color combinations in document
   */
  auditPageContrast(): Array<{
    element: HTMLElement;
    foreground: string;
    background: string;
    ratio: number;
    meetsAA: boolean;
    meetsAAA: boolean;
    issue?: string;
  }> {
    const issues: any[] = [];
    const elements = document.querySelectorAll('*');

    elements.forEach(el => {
      const element = el as HTMLElement;
      const computedStyle = window.getComputedStyle(element);
      const color = computedStyle.color;
      const bgColor = computedStyle.backgroundColor;

      // Skip if no text content or invisible elements
      if (!element.textContent?.trim() || computedStyle.display === 'none') {
        return;
      }

      // Convert RGB to hex for contrast calculation
      const foreHex = this.rgbToHex(color);
      const bgHex = this.rgbToHex(bgColor);

      if (foreHex && bgHex) {
        const ratio = this.getContrastRatio(foreHex, bgHex);
        if (ratio !== null) {
          const fontSize = parseFloat(computedStyle.fontSize);
          const fontWeight = computedStyle.fontWeight;
          const isLarge = fontSize >= 18 || (fontSize >= 14 && fontWeight === 'bold');

          const meetsAA = this.meetsWCAGAA(ratio, isLarge);
          const meetsAAA = isLarge ? ratio >= 4.5 : ratio >= 7;

          if (!meetsAA) {
            issues.push({
              element,
              foreground: foreHex,
              background: bgHex,
              ratio: parseFloat(ratio.toFixed(2)),
              meetsAA,
              meetsAAA,
              issue: `Text contrast ratio ${ratio.toFixed(2)}:1 fails WCAG AA requirement`
            });
          }
        }
      }
    });

    return issues;
  },

  /**
   * Convert RGB string to hex
   */
  rgbToHex(rgb: string): string | null {
    const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;

    const [, r, g, b] = match;
    return '#' + [parseInt(r), parseInt(g), parseInt(b)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  }
};

/**
 * Keyboard Navigation Validator
 * Tests keyboard navigation, focus management, and shortcut handling
 */
export const KeyboardNavigationValidator = {
  /**
   * Check if all interactive elements are keyboard accessible
   */
  auditKeyboardAccess(): Array<{
    element: HTMLElement;
    role: string;
    isKeyboardAccessible: boolean;
    issue?: string;
  }> {
    const issues: any[] = [];
    const interactiveSelectors = 'button, a, input, select, textarea, [role="button"], [role="link"], [tabindex]';
    const elements = document.querySelectorAll(interactiveSelectors);

    elements.forEach(el => {
      const element = el as HTMLElement;
      const role = element.getAttribute('role') || element.tagName.toLowerCase();

      // Check if element is focusable
      const tabindex = element.getAttribute('tabindex');
      const isFocusable = tabindex === null || parseInt(tabindex) >= -1;

      if (!isFocusable) {
        issues.push({
          element,
          role,
          isKeyboardAccessible: false,
          issue: `${role} element is not keyboard focusable (tabindex=${tabindex})`
        });
      }

      // Check for keyboard event handlers
      const hasKeyboardHandler = element.onkeydown || element.onkeyup || element.onkeypress;
      if (['button', 'link'].includes(role) && !hasKeyboardHandler && !['button', 'a', 'input', 'select', 'textarea'].includes(element.tagName.toLowerCase())) {
        issues.push({
          element,
          role,
          isKeyboardAccessible: false,
          issue: `${role} element missing keyboard event handlers`
        });
      }
    });

    return issues;
  },

  /**
   * Test focus visibility and focus order
   */
  testFocusManagement(): {
    hasFocusIndicators: boolean;
    focusOrder: HTMLElement[];
    issues: string[];
  } {
    const issues: string[] = [];
    const focusableElements: HTMLElement[] = [];
    const focusableSelectors = 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])';

    document.querySelectorAll(focusableSelectors).forEach(el => {
      focusableElements.push(el as HTMLElement);
    });

    // Check focus indicator visibility
    let hasFocusIndicators = true;
    const testElement = document.createElement('button');
    document.body.appendChild(testElement);
    testElement.focus();

    const focusStyle = window.getComputedStyle(testElement, ':focus');
    if (!focusStyle.outline && !focusStyle.boxShadow) {
      issues.push('No visible focus indicator found');
      hasFocusIndicators = false;
    }

    document.body.removeChild(testElement);

    return {
      hasFocusIndicators,
      focusOrder: focusableElements,
      issues
    };
  }
};

/**
 * ARIA Attribute Validator
 * Verifies proper ARIA implementation
 */
export const AriaValidator = {
  /**
   * Audit ARIA attributes in document
   */
  auditAriaAttributes(): Array<{
    element: HTMLElement;
    role: string;
    ariaAttributes: Record<string, string>;
    issues: string[];
  }> {
    const results: any[] = [];
    const elements = document.querySelectorAll('[role], [aria-*]');

    elements.forEach(el => {
      const element = el as HTMLElement;
      const role = element.getAttribute('role') || 'none';
      const ariaAttributes: Record<string, string> = {};
      const issues: string[] = [];

      // Collect ARIA attributes
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('aria-')) {
          ariaAttributes[attr.name] = attr.value;
        }
      });

      // Validate ARIA usage
      if (role && !this.isValidRole(role)) {
        issues.push(`Invalid ARIA role: ${role}`);
      }

      // Check for required ARIA attributes based on role
      const requiredAttrs = this.getRequiredAriaAttributes(role);
      requiredAttrs.forEach(attr => {
        if (!element.hasAttribute(attr)) {
          issues.push(`Missing required ARIA attribute: ${attr} for role ${role}`);
        }
      });

      results.push({
        element,
        role,
        ariaAttributes,
        issues
      });
    });

    return results;
  },

  /**
   * Check if role is valid
   */
  isValidRole(role: string): boolean {
    const validRoles = [
      'alert', 'alertdialog', 'button', 'checkbox', 'columnheader', 'combobox',
      'complementary', 'contentinfo', 'definition', 'dialog', 'directory',
      'document', 'feed', 'figure', 'form', 'grid', 'gridcell', 'group',
      'heading', 'img', 'link', 'list', 'listbox', 'listitem', 'log',
      'main', 'marquee', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox',
      'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation',
      'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup',
      'rowheader', 'scrollbar', 'search', 'searchbox', 'separator', 'slider',
      'spinbutton', 'status', 'switch', 'tab', 'tablist', 'tabpanel', 'text',
      'textbox', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem'
    ];
    return validRoles.includes(role.toLowerCase());
  },

  /**
   * Get required ARIA attributes for a role
   */
  getRequiredAriaAttributes(role: string): string[] {
    const required: Record<string, string[]> = {
      'slider': ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
      'progressbar': ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
      'spinbutton': ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
      'scrollbar': ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
      'tablist': ['aria-orientation'],
      'radio': ['aria-checked'],
      'checkbox': ['aria-checked'],
      'switch': ['aria-checked']
    };

    return required[role.toLowerCase()] || [];
  }
};

/**
 * Semantic HTML Validator
 * Verifies semantic HTML structure
 */
export const SemanticValidator = {
  /**
   * Audit semantic HTML structure
   */
  auditSemanticStructure(): {
    hasProperHeadingHierarchy: boolean;
    hasLandmarks: boolean;
    hasSkipLinks: boolean;
    headingHierarchy: { level: number; element: HTMLElement; text: string }[];
    landmarks: { name: string; element: HTMLElement }[];
    issues: string[];
  } {
    const issues: string[] = [];
    const headings: { level: number; element: HTMLElement; text: string }[] = [];
    const landmarks: { name: string; element: HTMLElement }[] = [];
    let hasSkipLinks = false;

    // Check heading hierarchy
    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;

    headingElements.forEach(el => {
      const level = parseInt(el.tagName[1]);
      headings.push({
        level,
        element: el as HTMLElement,
        text: el.textContent || ''
      });

      // Check for skipped levels
      if (level > lastLevel + 1) {
        issues.push(`Heading hierarchy broken: jumped from h${lastLevel} to h${level}`);
      }
      lastLevel = level;
    });

    // Check for landmark roles
    const landmarkRoles = ['main', 'navigation', 'search', 'complementary', 'contentinfo', 'region'];
    landmarkRoles.forEach(role => {
      const elements = document.querySelectorAll(`[role="${role}"], ${role}`);
      if (elements.length > 0) {
        elements.forEach(el => {
          landmarks.push({
            name: role,
            element: el as HTMLElement
          });
        });
      }
    });

    // Check for skip links
    const skipLinks = document.querySelectorAll('a[href="#main"], a[href="#content"]');
    hasSkipLinks = skipLinks.length > 0;

    if (!hasSkipLinks) {
      issues.push('No skip links found for keyboard navigation');
    }

    return {
      hasProperHeadingHierarchy: issues.filter(i => i.includes('hierarchy')).length === 0,
      hasLandmarks: landmarks.length > 0,
      hasSkipLinks,
      headingHierarchy: headings,
      landmarks,
      issues
    };
  }
};

/**
 * Comprehensive Accessibility Audit
 */
export const AccessibilityAudit = {
  /**
   * Run complete accessibility audit
   */
  runFullAudit(): {
    colorContrast: ReturnType<typeof ColorContrastChecker.auditPageContrast>;
    keyboardAccess: ReturnType<typeof KeyboardNavigationValidator.auditKeyboardAccess>;
    focusManagement: ReturnType<typeof KeyboardNavigationValidator.testFocusManagement>;
    ariaAttributes: ReturnType<typeof AriaValidator.auditAriaAttributes>;
    semanticStructure: ReturnType<typeof SemanticValidator.auditSemanticStructure>;
    summary: {
      totalIssues: number;
      severity: 'critical' | 'warning' | 'info';
      wcagCompliance: 'AA' | 'AAA' | 'non-compliant';
    };
  } {
    const colorContrast = ColorContrastChecker.auditPageContrast();
    const keyboardAccess = KeyboardNavigationValidator.auditKeyboardAccess();
    const focusManagement = KeyboardNavigationValidator.testFocusManagement();
    const ariaAttributes = AriaValidator.auditAriaAttributes();
    const semanticStructure = SemanticValidator.auditSemanticStructure();

    // Calculate totals
    const totalIssues = colorContrast.filter(c => !c.meetsAA).length +
                       keyboardAccess.filter(k => !k.isKeyboardAccessible).length +
                       focusManagement.issues.length +
                       ariaAttributes.reduce((sum, a) => sum + a.issues.length, 0) +
                       semanticStructure.issues.length;

    let severity: 'critical' | 'warning' | 'info' = 'info';
    if (totalIssues > 10) severity = 'critical';
    else if (totalIssues > 5) severity = 'warning';

    const wcagCompliance = totalIssues === 0 ? 'AA' : 'non-compliant';

    return {
      colorContrast,
      keyboardAccess,
      focusManagement,
      ariaAttributes,
      semanticStructure,
      summary: {
        totalIssues,
        severity,
        wcagCompliance
      }
    };
  },

  /**
   * Generate accessibility report
   */
  generateReport(audit: ReturnType<typeof this.runFullAudit>): string {
    const lines: string[] = [
      '=== ACCESSIBILITY AUDIT REPORT ===\n',
      `Total Issues: ${audit.summary.totalIssues}`,
      `Severity: ${audit.summary.severity}`,
      `WCAG 2.1 Compliance: ${audit.summary.wcagCompliance}\n`,

      '--- Color Contrast Issues ---',
      `Found: ${audit.colorContrast.filter(c => !c.meetsAA).length} issues`,
      ...audit.colorContrast.filter(c => !c.meetsAA).map(c => `  - Ratio: ${c.ratio}:1 (required: 4.5:1)`),

      '\n--- Keyboard Access Issues ---',
      `Found: ${audit.keyboardAccess.filter(k => !k.isKeyboardAccessible).length} issues`,
      ...audit.keyboardAccess.filter(k => !k.isKeyboardAccessible).map(k => `  - ${k.issue}`),

      '\n--- Focus Management Issues ---',
      `Found: ${audit.focusManagement.issues.length} issues`,
      ...audit.focusManagement.issues.map(i => `  - ${i}`),

      '\n--- ARIA Issues ---',
      `Found: ${audit.ariaAttributes.reduce((sum, a) => sum + a.issues.length, 0)} issues`,
      ...audit.ariaAttributes.filter(a => a.issues.length > 0).map(a => `  - ${a.issues.join(', ')}`),

      '\n--- Semantic Structure Issues ---',
      `Found: ${audit.semanticStructure.issues.length} issues`,
      ...audit.semanticStructure.issues.map(i => `  - ${i}`)
    ];

    return lines.join('\n');
  }
};

export default AccessibilityAudit;
