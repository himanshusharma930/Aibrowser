---
created: 2025-11-11T10:07:28 (UTC +05:30)
tags: []
source: https://fellou.ai/eko/docs/architecture/web-extraction/
author: 
---

# Web Extraction Technology | Eko Docs

> ## Excerpt
> This guide introduces the details of using web element-extraction techniques to assist visual models in performing browser automation operations.

---
Web Extraction Technology is an innovative browser automation solution, Use in Eko browser use. It combines visual recognition with contextual information about elements to enhance accuracy and efficiency in automated tasks within complex web environments. By extracting interactive elements and relevant data from web pages, Web Extraction Technology significantly improves the success rate of automation tasks.

In today’s digital world, web page designs are increasingly complex, presenting several challenges for traditional browser automation methods:

1.  **Complex Element Structures**: Traditional visual models directly manipulating the browser can suffer from inaccuracies due to variations in devices, resolutions, and browsers, leading to potential misoperations.
    
2.  **Massive HTML Content**: Handling the entire HTML content of a webpage can be time-consuming and error-prone, especially when content extends to hundreds of thousands of characters.
    

Given these limitations, traditional methods often lack the reliability needed in complex scenarios, necessitating a more robust approach to bolster automation effectiveness.

1.  **Identify Interactive Elements**: Extract all interactive elements on a page, like buttons, input fields, and links.
    
2.  **Tag Elements**: Mark each actionable element on the webpage with unique IDs using colored boxes.
    
3.  **Combine Screenshots and Pseudo-HTML**: Construct pseudo-HTML that includes these element details, paired with screenshots, to be processed by automation models.
    

## Technical Principles

Mark executable elements in the webpage, such as clickable, input-enabled elements and those with event listeners, and assign element IDs to each executable element.

![google](https://fellou.ai/eko/docs/_astro/element_extraction.lKrFv1Wt_ZH6qo8.webp)

Extract text labels and executable element tagNames and attributes, build pseudo HTML for model recognition using text + visual approach.

### Original HTML

![google-html-characters-numbers](https://fellou.ai/eko/docs/_astro/google-html-characters-numbers.CPbVWmxD_1gxFfU.webp)

As shown in the image, the original HTML of the Google homepage is 221,805 characters.

```
<div bis_skin_checked="1"><p><span>[0]:</span><span><span>&lt;</span><span>body</span><span>&gt;&lt;/</span><span>body</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[1]:</span><span><span>&lt;</span><span>div</span><span>&gt;&lt;/</span><span>div</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[2]:</span><span><span>&lt;</span><span>a</span><span> </span></span><span>aria-label</span><span>=</span><span>"</span><span>Gmail </span><span>"</span><span>&gt;</span><span>Gmail</span><span><span>&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[3]:</span><span><span>&lt;</span><span>a</span><span> </span></span><span>aria-label</span><span>=</span><span>"</span><span>Search for Images </span><span>"</span><span>&gt;</span><span>Images</span><span><span>&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[4]:</span><span><span>&lt;</span><span>div</span><span> </span></span><span>id</span><span>=</span><span>"</span><span>gbwa</span><span>"</span><span><span>&gt;&lt;/</span><span>div</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[5]:</span><span><span>&lt;</span><span>a</span><span> </span></span><span>role</span><span>=</span><span>"</span><span>button</span><span>"</span><span> </span><span>tabindex</span><span>=</span><span>"</span><span>0</span><span>"</span><span> </span><span>aria-label</span><span>=</span><span>"</span><span>Google apps</span><span>"</span><span> </span><span>aria-expanded</span><span>=</span><span>"</span><span>false</span><span>"</span><span><span>&gt;&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[6]:</span><span><span>&lt;</span><span>a</span><span> </span></span><span>role</span><span>=</span><span>"</span><span>button</span><span>"</span><span> </span><span>tabindex</span><span>=</span><span>"</span><span>0</span><span>"</span><span> </span><span>aria-label</span><span>=</span><span>"</span><span>Google Account: ACCOUNT EMAIL</span><span>"</span><span> </span><span>aria-expanded</span><span>=</span><span>"</span><span>false</span><span>"</span><span><span>&gt;&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[7]:</span><span><span>&lt;</span><span>img</span><span> </span></span><span>alt</span><span>=</span><span>"</span><span>Google</span><span>"</span><span>&gt;&lt;/</span><span>img</span><span>&gt;</span></p></div><div bis_skin_checked="1"><p><span>[8]:</span><span><span>&lt;</span><span>div</span><span>&gt;&lt;/</span><span>div</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[9]:</span><span><span>&lt;</span><span>textarea</span><span> </span></span><span>id</span><span>=</span><span>"</span><span>APjFqb</span><span>"</span><span> </span><span>title</span><span>=</span><span>"</span><span>Search</span><span>"</span><span> </span><span>name</span><span>=</span><span>"</span><span>q</span><span>"</span><span> </span><span>role</span><span>=</span><span>"</span><span>combobox</span><span>"</span><span> </span><span>aria-label</span><span>=</span><span>"</span><span>Search</span><span>"</span><span> </span><span>aria-expanded</span><span>=</span><span>"</span><span>false</span><span>"</span><span><span>&gt;&lt;/</span><span>textarea</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[10]:</span><span><span>&lt;</span><span>div</span><span> </span></span><span>role</span><span>=</span><span>"</span><span>button</span><span>"</span><span> </span><span>tabindex</span><span>=</span><span>"</span><span>0</span><span>"</span><span> </span><span>aria-label</span><span>=</span><span>"</span><span>Search by voice</span><span>"</span><span><span>&gt;&lt;/</span><span>div</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[11]:</span><span><span>&lt;</span><span>div</span><span> </span></span><span>role</span><span>=</span><span>"</span><span>button</span><span>"</span><span> </span><span>tabindex</span><span>=</span><span>"</span><span>0</span><span>"</span><span> </span><span>aria-label</span><span>=</span><span>"</span><span>Search by image</span><span>"</span><span><span>&gt;&lt;/</span><span>div</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[12]:</span><span><span>&lt;</span><span>input</span><span> </span></span><span>type</span><span>=</span><span>"</span><span>submit</span><span>"</span><span> </span><span>name</span><span>=</span><span>"</span><span>btnK</span><span>"</span><span> </span><span>role</span><span>=</span><span>"</span><span>button</span><span>"</span><span> </span><span>tabindex</span><span>=</span><span>"</span><span>0</span><span>"</span><span> </span><span>aria-label</span><span>=</span><span>"</span><span>Google Search</span><span>"</span><span> </span><span>value</span><span>=</span><span>"</span><span>Google Search</span><span>"</span><span>&gt;&lt;/</span><span>input</span><span>&gt;</span></p></div><div bis_skin_checked="1"><p><span>[13]:</span><span><span>&lt;</span><span>input</span><span> </span></span><span>type</span><span>=</span><span>"</span><span>submit</span><span>"</span><span> </span><span>name</span><span>=</span><span>"</span><span>btnI</span><span>"</span><span> </span><span>aria-label</span><span>=</span><span>"</span><span>I'm Feeling Lucky</span><span>"</span><span> </span><span>value</span><span>=</span><span>"</span><span>I'm Feeling Lucky</span><span>"</span><span>&gt;&lt;/</span><span>input</span><span>&gt;</span></p></div><div bis_skin_checked="1"><p><span>[14]:</span><span><span>&lt;</span><span>a</span><span>&gt;</span></span><span>About</span><span><span>&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[15]:</span><span><span>&lt;</span><span>a</span><span>&gt;</span></span><span>Advertising</span><span><span>&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[16]:</span><span><span>&lt;</span><span>a</span><span>&gt;</span></span><span>Business</span><span><span>&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[17]:</span><span><span>&lt;</span><span>a</span><span>&gt;</span></span><span>How Search works</span><span><span>&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[18]:</span><span><span>&lt;</span><span>a</span><span>&gt;</span></span><span>Privacy</span><span><span>&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[19]:</span><span><span>&lt;</span><span>a</span><span>&gt;</span></span><span>Terms</span><span><span>&lt;/</span><span>a</span><span>&gt;</span></span></p></div><div bis_skin_checked="1"><p><span>[20]:</span><span><span>&lt;</span><span>div</span><span> </span></span><span>role</span><span>=</span><span>"</span><span>button</span><span>"</span><span> </span><span>tabindex</span><span>=</span><span>"</span><span>0</span><span>"</span><span> </span><span>aria-expanded</span><span>=</span><span>"</span><span>false</span><span>"</span><span>&gt;</span><span>Settings</span><span><span>&lt;/</span><span>div</span><span>&gt;</span></span></p></div>
```

Using web extraction technology, the HTML string of the Google homepage was successfully reduced from **221,805** to **1,058** characters.

1.  **Low Cost**: Reduce costs by lowering token usage and minimizing large model expenses.
    
2.  **Improved Accuracy**: Reduces misoperations and errors in element recognition through bounding and ID management.
    
3.  **Performance Optimization**: Pseudo-HTML significantly decreases the data volume compared to processing massive HTML directly, enhancing efficiency.
    
4.  **Enhanced Adaptability**: Maintains consistency across different devices and browser environments.
    
5.  **Strong Capability for Complex Pages**: Suitable for automation needs in complex structured web pages by integrating visual recognition and text understanding.
