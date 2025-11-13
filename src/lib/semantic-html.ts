/**
 * Semantic HTML and Landmark Utilities
 *
 * Utilities for ensuring proper semantic HTML structure, landmark roles,
 * heading hierarchy, and accessibility best practices.
 *
 * Features:
 * - Semantic HTML helpers
 * - ARIA landmark role management
 * - Skip link generation
 * - Heading hierarchy validation
 * - List structure helpers
 * - Form helper utilities
 * - Document outline generation
 */

/**
 * Semantic HTML element factory
 */
export const SemanticHTML = {
  /**
   * Create skip link for keyboard users
   */
  createSkipLink(targetId: string, label: string = 'Skip to main content'): HTMLElement {
    const link = document.createElement('a');
    link.href = `#${targetId}`;
    link.textContent = label;
    link.className = 'skip-link';
    link.setAttribute('role', 'navigation');
    link.setAttribute('aria-label', 'Skip to main content');
    return link;
  },

  /**
   * Ensure heading hierarchy is correct
   */
  validateHeadingHierarchy(): {
    isValid: boolean;
    issues: string[];
    structure: Array<{ level: number; text: string }>;
  } {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const structure: Array<{ level: number; text: string }> = [];
    const issues: string[] = [];

    let lastLevel = 0;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      structure.push({
        level,
        text: heading.textContent || ''
      });

      // Check for multiple h1 elements
      if (level === 1 && index > 0) {
        issues.push(`Multiple h1 elements found. Only one h1 per page recommended.`);
      }

      // Check for skipped heading levels
      if (level > lastLevel + 1 && index > 0) {
        issues.push(`Heading hierarchy broken: jumped from h${lastLevel} to h${level}`);
      }

      // Check for empty headings
      if (!heading.textContent?.trim()) {
        issues.push(`Empty heading: h${level}`);
      }

      lastLevel = level;
    });

    // Check if no headings exist
    if (headings.length === 0) {
      issues.push('No headings found on page. Add h1 element for page title.');
    }

    // Check if page has no h1
    if (!headings.some(h => h.tagName === 'H1')) {
      issues.push('No h1 element found. Page should have exactly one h1 element.');
    }

    return {
      isValid: issues.length === 0,
      issues,
      structure
    };
  },

  /**
   * Create accessible list structure
   */
  createAccessibleList(
    items: Array<{ text: string; role?: string }>,
    type: 'ordered' | 'unordered' = 'unordered'
  ): HTMLElement {
    const listElement = type === 'ordered' ? document.createElement('ol') : document.createElement('ul');

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.text;
      if (item.role) {
        li.setAttribute('role', item.role);
      }
      listElement.appendChild(li);
    });

    return listElement;
  },

  /**
   * Create accessible form group
   */
  createFormGroup(
    label: string,
    inputId: string,
    inputType: string = 'text',
    required: boolean = false,
    helpText?: string
  ): HTMLElement {
    const group = document.createElement('div');
    group.className = 'form-group';

    const labelElement = document.createElement('label');
    labelElement.htmlFor = inputId;
    labelElement.textContent = label;
    if (required) {
      const requiredSpan = document.createElement('span');
      requiredSpan.textContent = ' *';
      requiredSpan.setAttribute('aria-label', '(required)');
      requiredSpan.className = 'required-indicator';
      labelElement.appendChild(requiredSpan);
    }
    group.appendChild(labelElement);

    const input = document.createElement('input');
    input.id = inputId;
    input.type = inputType;
    input.required = required;
    input.setAttribute('aria-required', required.toString());
    if (helpText) {
      input.setAttribute('aria-describedby', `${inputId}-help`);
    }
    group.appendChild(input);

    if (helpText) {
      const help = document.createElement('small');
      help.id = `${inputId}-help`;
      help.textContent = helpText;
      help.className = 'form-help';
      group.appendChild(help);
    }

    return group;
  },

  /**
   * Create accessible button
   */
  createAccessibleButton(
    label: string,
    onClick?: () => void,
    options?: {
      ariaLabel?: string;
      ariaPressed?: boolean;
      disabled?: boolean;
      type?: 'button' | 'submit' | 'reset';
      variant?: 'primary' | 'secondary' | 'danger';
    }
  ): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = label;
    button.type = options?.type || 'button';
    button.disabled = options?.disabled || false;

    if (options?.ariaLabel) {
      button.setAttribute('aria-label', options.ariaLabel);
    }

    if (options?.ariaPressed !== undefined) {
      button.setAttribute('aria-pressed', options.ariaPressed.toString());
    }

    if (options?.variant) {
      button.className = `btn btn-${options.variant}`;
    }

    if (onClick) {
      button.addEventListener('click', onClick);
    }

    return button;
  }
};

/**
 * ARIA Landmark Roles Manager
 */
export class LandmarkManager {
  private landmarks: Map<string, HTMLElement> = new Map();

  /**
   * Register landmark
   */
  registerLandmark(name: string, element: HTMLElement, role: string): void {
    element.setAttribute('role', role);

    // Add aria-label for unnamed landmarks
    if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
      element.setAttribute('aria-label', name);
    }

    this.landmarks.set(name, element);
  }

  /**
   * Get all landmarks
   */
  getLandmarks(): Map<string, HTMLElement> {
    return new Map(this.landmarks);
  }

  /**
   * Navigate to landmark
   */
  navigateToLandmark(name: string): boolean {
    const landmark = this.landmarks.get(name);
    if (landmark) {
      landmark.focus();
      landmark.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    return false;
  },

  /**
   * Create landmark navigation menu
   */
  createLandmarkMenu(): HTMLElement {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Landmarks');
    nav.className = 'landmark-nav';

    const list = document.createElement('ul');

    this.landmarks.forEach((element, name) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = name;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateToLandmark(name);
      });
      li.appendChild(link);
      list.appendChild(li);
    });

    nav.appendChild(list);
    return nav;
  }
}

/**
 * Document outline generator
 */
export class DocumentOutlineGenerator {
  /**
   * Generate document outline
   */
  static generateOutline(): Array<{
    level: number;
    text: string;
    element: HTMLElement;
  }> {
    const outline: Array<{ level: number; text: string; element: HTMLElement }> = [];
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    headings.forEach(heading => {
      const level = parseInt(heading.tagName[1]);
      outline.push({
        level,
        text: heading.textContent || '',
        element: heading as HTMLElement
      });
    });

    return outline;
  },

  /**
   * Generate HTML table of contents
   */
  static generateTableOfContents(containerId: string = 'toc'): HTMLElement {
    const outline = this.generateOutline();
    const toc = document.createElement('nav');
    toc.id = containerId;
    toc.setAttribute('aria-label', 'Table of contents');

    const list = document.createElement('ul');
    let currentLevel = 0;
    let currentList = list;
    const listStack: HTMLElement[] = [list];

    outline.forEach((item, index) => {
      // Adjust nesting level
      while (item.level > currentLevel) {
        const newList = document.createElement('ul');
        if (currentList.lastElementChild) {
          currentList.lastElementChild.appendChild(newList);
        } else {
          const li = document.createElement('li');
          li.appendChild(newList);
          currentList.appendChild(li);
        }
        listStack.push(newList);
        currentList = newList;
        currentLevel++;
      }

      while (item.level < currentLevel) {
        listStack.pop();
        currentList = listStack[listStack.length - 1];
        currentLevel--;
      }

      // Create list item with link
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = item.text;
      link.href = '#';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        item.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        item.element.focus();
      });
      li.appendChild(link);
      currentList.appendChild(li);
    });

    toc.appendChild(list);
    return toc;
  }
}

/**
 * Semantic HTML structure validator
 */
export class SemanticValidator {
  /**
   * Validate page structure
   */
  static validateStructure(): {
    hasMain: boolean;
    hasNav: boolean;
    hasHeadings: boolean;
    hasLists: boolean;
    issues: string[];
    structure: {
      mainElement?: HTMLElement;
      navElements: HTMLElement[];
      headingCount: number;
      listCount: number;
    };
  } {
    const issues: string[] = [];
    const main = document.querySelector('main');
    const navs = Array.from(document.querySelectorAll('nav'));
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const lists = Array.from(document.querySelectorAll('ul, ol'));

    // Validate main element
    if (!main) {
      issues.push('No <main> element found. Page should have exactly one <main> element.');
    } else if (document.querySelectorAll('main').length > 1) {
      issues.push('Multiple <main> elements found. Page should have only one.');
    }

    // Validate navigation
    if (navs.length === 0) {
      issues.push('No <nav> elements found. Consider adding navigation landmarks.');
    }

    // Validate headings
    if (headings.length === 0) {
      issues.push('No headings found on page.');
    }

    // Validate lists
    if (lists.length === 0) {
      issues.push('No list elements found. Consider using semantic list markup for grouped content.');
    }

    // Validate heading hierarchy
    const headingHierarchy = this.validateHeadingHierarchy(headings);
    if (!headingHierarchy.isValid) {
      issues.push(...headingHierarchy.issues);
    }

    return {
      hasMain: !!main,
      hasNav: navs.length > 0,
      hasHeadings: headings.length > 0,
      hasLists: lists.length > 0,
      issues,
      structure: {
        mainElement: main as HTMLElement | undefined,
        navElements: navs as HTMLElement[],
        headingCount: headings.length,
        listCount: lists.length
      }
    };
  },

  /**
   * Validate heading hierarchy
   */
  private static validateHeadingHierarchy(headings: HTMLElement[]): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    let lastLevel = 0;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);

      if (level > lastLevel + 1 && index > 0) {
        issues.push(`Heading hierarchy broken: jumped from h${lastLevel} to h${level}`);
      }

      lastLevel = level;
    });

    // Check for only one h1
    const h1Count = headings.filter(h => h.tagName === 'H1').length;
    if (h1Count !== 1) {
      issues.push(`Expected 1 h1 element, found ${h1Count}`);
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }
}

/**
 * Accessible page initialization utility
 */
export class AccessiblePageSetup {
  /**
   * Initialize accessible page structure
   */
  static initializeAccessiblePage(mainContentId: string = 'main-content'): void {
    // Ensure main element exists
    let main = document.querySelector('main');
    if (!main) {
      main = document.createElement('main');
      main.id = mainContentId;
      document.body.appendChild(main);
    }

    // Add skip link
    const skipLink = SemanticHTML.createSkipLink(mainContentId);
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Register landmarks
    const landmarkManager = new LandmarkManager();
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');

    if (header) landmarkManager.registerLandmark('Header', header as HTMLElement, 'banner');
    if (nav) landmarkManager.registerLandmark('Navigation', nav as HTMLElement, 'navigation');
    if (main) landmarkManager.registerLandmark('Main Content', main as HTMLElement, 'main');
    if (footer) landmarkManager.registerLandmark('Footer', footer as HTMLElement, 'contentinfo');

    // Validate structure
    const validation = SemanticValidator.validateStructure();
    if (validation.issues.length > 0) {
      console.warn('Semantic HTML issues detected:', validation.issues);
    }
  }
}

export default {
  SemanticHTML,
  LandmarkManager,
  DocumentOutlineGenerator,
  SemanticValidator,
  AccessiblePageSetup
};
