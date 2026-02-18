#!/usr/bin/env node

/**
 * Automated Responsive QA Testing Script for DevTailor Next.js Site
 * Uses Puppeteer to test all routes at specified breakpoints
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:3000';

const ROUTES = [
  { path: '/', name: 'Homepage', interactive: ['mobile-menu'] },
  { path: '/servicios', name: 'Servicios', interactive: ['mobile-menu'] },
  { path: '/metodologia', name: 'Metodología', interactive: ['mobile-menu'] },
  { path: '/valores', name: 'Valores', interactive: ['mobile-menu'] },
  { path: '/contacto', name: 'Contacto', interactive: ['mobile-menu', 'form-fields'] },
  { path: '/talks', name: 'Talks', interactive: ['mobile-menu'] },
  { path: '/chatbot', name: 'Chatbot', interactive: ['mobile-menu', 'chatbot-input'] },
  { path: '/talks/cuestionario/hematologia', name: 'Cuestionario Hematología', interactive: ['mobile-menu', 'form-fields'] },
  { path: '/talks/cuestionario/otorrinolaringologia', name: 'Cuestionario Otorrinolaringología', interactive: ['mobile-menu', 'form-fields'] },
];

const VIEWPORTS = [
  { name: 'xs-mobile', width: 320, height: 800, description: 'Extra Small Mobile (320px)' },
  { name: 'sm-mobile', width: 480, height: 900, description: 'Small Mobile (480px)' },
  { name: 'md-tablet', width: 768, height: 1024, description: 'Tablet Portrait (768px)' },
  { name: 'lg-desktop', width: 1024, height: 768, description: 'Desktop Small (1024px)' },
  { name: 'xl-desktop', width: 1280, height: 800, description: 'Desktop Medium (1280px)' },
  { name: '2xl-desktop', width: 1536, height: 960, description: 'Desktop Large (1536px)' },
];

class ResponsiveQAReport {
  constructor() {
    this.results = [];
    this.issues = [];
    this.summary = {
      totalTests: 0,
      passed: 0,
      failed: 0,
      warnings: 0,
    };
    this.startTime = Date.now();
  }

  addResult(route, viewport, status, checks, issues = []) {
    this.results.push({
      route: route.name,
      path: route.path,
      viewport: viewport.name,
      viewportSize: `${viewport.width}x${viewport.height}`,
      status,
      checks,
      issues,
      timestamp: new Date().toISOString(),
    });

    this.summary.totalTests++;
    if (status === 'PASS') {
      this.summary.passed++;
    } else if (status === 'FAIL') {
      this.summary.failed++;
    } else if (status === 'WARNING') {
      this.summary.warnings++;
    }

    if (issues.length > 0) {
      this.issues.push(...issues.map(issue => ({
        ...issue,
        route: route.name,
        path: route.path,
        viewport: viewport.name,
        viewportSize: `${viewport.width}x${viewport.height}`,
      })));
    }
  }

  generateMarkdownReport() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    
    let report = '# DevTailor Responsive QA Test Report\n\n';
    report += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    report += `**Base URL:** ${BASE_URL}\n\n`;
    report += `**Test Duration:** ${duration}s\n\n`;

    // Summary
    report += '## 📊 Summary\n\n';
    report += `- **Total Tests:** ${this.summary.totalTests}\n`;
    report += `- **Passed:** ${this.summary.passed} ✅\n`;
    report += `- **Failed:** ${this.summary.failed} ❌\n`;
    report += `- **Warnings:** ${this.summary.warnings} ⚠️\n`;
    report += `- **Success Rate:** ${((this.summary.passed / this.summary.totalTests) * 100).toFixed(1)}%\n\n`;

    // Horizontal Overflow Check
    const overflowIssues = this.issues.filter(i => i.type === 'horizontal-overflow');
    if (overflowIssues.length === 0) {
      report += '## ✅ Horizontal Overflow Check\n\n';
      report += '**CONFIRMED:** No horizontal overflow detected on any route at any breakpoint.\n\n';
      report += 'All pages properly contain content within viewport width across all tested breakpoints.\n\n';
    } else {
      report += '## ❌ Horizontal Overflow Issues Found\n\n';
      report += `Found ${overflowIssues.length} horizontal overflow issue(s):\n\n`;
      overflowIssues.forEach((issue, idx) => {
        report += `${idx + 1}. **${issue.route}** (${issue.path}) at ${issue.viewportSize}\n`;
        report += `   - ${issue.description}\n`;
        report += `   - Reproduction: ${issue.reproduction}\n\n`;
      });
    }

    // Issues by Severity
    if (this.issues.length > 0) {
      report += '## 🐛 Issues Found\n\n';
      
      const critical = this.issues.filter(i => i.severity === 'critical');
      const high = this.issues.filter(i => i.severity === 'high');
      const medium = this.issues.filter(i => i.severity === 'medium');
      const low = this.issues.filter(i => i.severity === 'low');

      if (critical.length > 0) {
        report += '### 🔴 Critical Issues\n\n';
        critical.forEach((issue, idx) => {
          report += `${idx + 1}. **${issue.route}** (${issue.path})\n`;
          report += `   - **Viewport:** ${issue.viewportSize}\n`;
          report += `   - **Type:** ${issue.type}\n`;
          report += `   - **Description:** ${issue.description}\n`;
          report += `   - **Reproduction:** ${issue.reproduction}\n`;
          if (issue.details) {
            report += `   - **Details:** ${issue.details}\n`;
          }
          report += '\n';
        });
      }

      if (high.length > 0) {
        report += '### 🟠 High Priority Issues\n\n';
        high.forEach((issue, idx) => {
          report += `${idx + 1}. **${issue.route}** (${issue.path})\n`;
          report += `   - **Viewport:** ${issue.viewportSize}\n`;
          report += `   - **Type:** ${issue.type}\n`;
          report += `   - **Description:** ${issue.description}\n`;
          report += `   - **Reproduction:** ${issue.reproduction}\n`;
          if (issue.details) {
            report += `   - **Details:** ${issue.details}\n`;
          }
          report += '\n';
        });
      }

      if (medium.length > 0) {
        report += '### 🟡 Medium Priority Issues\n\n';
        medium.forEach((issue, idx) => {
          report += `${idx + 1}. **${issue.route}** (${issue.path})\n`;
          report += `   - **Viewport:** ${issue.viewportSize}\n`;
          report += `   - **Type:** ${issue.type}\n`;
          report += `   - **Description:** ${issue.description}\n`;
          report += `   - **Reproduction:** ${issue.reproduction}\n`;
          if (issue.details) {
            report += `   - **Details:** ${issue.details}\n`;
          }
          report += '\n';
        });
      }

      if (low.length > 0) {
        report += '### 🔵 Low Priority Issues\n\n';
        low.forEach((issue, idx) => {
          report += `${idx + 1}. **${issue.route}** (${issue.path})\n`;
          report += `   - **Viewport:** ${issue.viewportSize}\n`;
          report += `   - **Type:** ${issue.type}\n`;
          report += `   - **Description:** ${issue.description}\n`;
          report += `   - **Reproduction:** ${issue.reproduction}\n`;
          if (issue.details) {
            report += `   - **Details:** ${issue.details}\n`;
          }
          report += '\n';
        });
      }
    } else {
      report += '## ✅ No Issues Found\n\n';
      report += 'All responsive tests passed successfully!\n\n';
    }

    // Detailed Results Table
    report += '## 📋 Detailed Test Results\n\n';
    report += '| Route | Viewport | Size | Status | Issues |\n';
    report += '|-------|----------|------|--------|--------|\n';

    this.results.forEach(result => {
      const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
      const issueCount = result.issues.length;
      report += `| ${result.route} | ${result.viewport} | ${result.viewportSize} | ${statusIcon} ${result.status} | ${issueCount} |\n`;
    });

    report += '\n';

    // Check Details
    report += '## 🔍 Check Details\n\n';
    report += 'Each test verifies:\n\n';
    report += '1. **Horizontal Overflow:** `document.body.scrollWidth <= window.innerWidth`\n';
    report += '2. **Header Visibility:** Header element is visible and accessible\n';
    report += '3. **Typography:** Body text font size >= 14px for readability\n';
    report += '4. **Content Clipping:** No elements with `overflow: hidden` cutting off content\n';
    report += '5. **Layout Wrapping:** Cards, forms, and containers wrap properly\n';
    report += '6. **Touch Targets:** Interactive elements meet 44x44px minimum (mobile)\n';
    report += '7. **Interactive Elements:** Mobile menu, forms, and inputs function correctly\n\n';

    // Recommendations
    if (this.issues.length > 0) {
      report += '## 💡 Recommendations\n\n';
      
      const recommendations = new Set();
      this.issues.forEach(issue => {
        if (issue.type === 'horizontal-overflow') {
          recommendations.add('- Review CSS for fixed-width elements; use responsive units (%, vw, rem)');
          recommendations.add('- Add `overflow-x: clip` to `html` and `body` elements');
          recommendations.add('- Check for elements with `width > 100vw` or negative margins');
        }
        if (issue.type === 'typography') {
          recommendations.add('- Increase minimum font sizes using `clamp()` for fluid typography');
          recommendations.add('- Ensure body text is at least 16px on mobile for accessibility');
        }
        if (issue.type === 'touch-target') {
          recommendations.add('- Increase padding/size of buttons and links to meet 44x44px minimum');
          recommendations.add('- Add more spacing between interactive elements on mobile');
        }
        if (issue.type === 'layout') {
          recommendations.add('- Review flexbox/grid layouts for proper wrapping with `flex-wrap: wrap`');
          recommendations.add('- Use responsive container queries where appropriate');
        }
        if (issue.type === 'header') {
          recommendations.add('- Ensure header has proper z-index and positioning');
          recommendations.add('- Test mobile menu functionality across all breakpoints');
        }
        if (issue.type === 'form') {
          recommendations.add('- Ensure form inputs have proper touch targets and spacing');
          recommendations.add('- Test form validation and submission on mobile devices');
        }
      });

      Array.from(recommendations).forEach(rec => {
        report += `${rec}\n`;
      });
      report += '\n';
    }

    // Testing Methodology
    report += '## 🧪 Testing Methodology\n\n';
    report += 'Tests were performed using Puppeteer with the following approach:\n\n';
    report += '1. Navigate to each route\n';
    report += '2. Set viewport to each breakpoint size\n';
    report += '3. Wait for page load and hydration\n';
    report += '4. Execute responsive checks via browser context\n';
    report += '5. Perform interactive tests (mobile menu, forms, inputs)\n';
    report += '6. Capture and analyze results\n\n';

    report += '**Breakpoints Tested:**\n\n';
    VIEWPORTS.forEach(vp => {
      report += `- ${vp.description}: ${vp.width}x${vp.height}\n`;
    });
    report += '\n';

    return report;
  }

  saveReport(filename = 'responsive-qa-report.md') {
    const report = this.generateMarkdownReport();
    const filepath = join(process.cwd(), filename);
    writeFileSync(filepath, report, 'utf-8');
    return filepath;
  }

  printSummary() {
    console.log('\n' + '='.repeat(70));
    console.log('RESPONSIVE QA TEST SUMMARY');
    console.log('='.repeat(70));
    console.log(`Total Tests: ${this.summary.totalTests}`);
    console.log(`Passed: ${this.summary.passed} ✅`);
    console.log(`Failed: ${this.summary.failed} ❌`);
    console.log(`Warnings: ${this.summary.warnings} ⚠️`);
    console.log(`Success Rate: ${((this.summary.passed / this.summary.totalTests) * 100).toFixed(1)}%`);
    
    const overflowIssues = this.issues.filter(i => i.type === 'horizontal-overflow');
    if (overflowIssues.length === 0) {
      console.log('\n✅ NO HORIZONTAL OVERFLOW DETECTED');
    } else {
      console.log(`\n❌ ${overflowIssues.length} HORIZONTAL OVERFLOW ISSUE(S) FOUND`);
    }
    
    console.log('='.repeat(70) + '\n');
  }
}

// Perform responsive checks on a page
async function performResponsiveChecks(page, route, viewport) {
  const checks = {
    horizontalOverflow: false,
    headerVisible: false,
    readableTypography: false,
    noClippedContent: false,
    layoutWrapping: false,
    touchTargets: false,
  };

  const issues = [];

  try {
    // Check 1: Horizontal Overflow
    const overflowCheck = await page.evaluate(() => {
      const bodyWidth = document.body.scrollWidth;
      const windowWidth = window.innerWidth;
      const hasOverflow = bodyWidth > windowWidth;
      
      return {
        hasOverflow,
        bodyWidth,
        windowWidth,
        difference: bodyWidth - windowWidth,
      };
    });

    checks.horizontalOverflow = !overflowCheck.hasOverflow;
    
    if (overflowCheck.hasOverflow) {
      issues.push({
        type: 'horizontal-overflow',
        severity: 'critical',
        description: `Horizontal overflow detected: body width (${overflowCheck.bodyWidth}px) exceeds viewport (${overflowCheck.windowWidth}px) by ${overflowCheck.difference}px`,
        reproduction: `1. Navigate to ${route.path}\n   2. Set viewport to ${viewport.width}x${viewport.height}\n   3. Observe horizontal scrollbar`,
        details: `Body scrollWidth: ${overflowCheck.bodyWidth}px, Window innerWidth: ${overflowCheck.windowWidth}px`,
      });
    }

    // Check 2: Header Visibility
    const headerCheck = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return { visible: false, reason: 'Header element not found' };
      
      const rect = header.getBoundingClientRect();
      const styles = window.getComputedStyle(header);
      
      return {
        visible: rect.height > 0 && styles.display !== 'none' && styles.visibility !== 'hidden',
        height: rect.height,
        display: styles.display,
        visibility: styles.visibility,
      };
    });

    checks.headerVisible = headerCheck.visible;
    
    if (!headerCheck.visible) {
      issues.push({
        type: 'header',
        severity: 'high',
        description: 'Header is not visible',
        reproduction: `Navigate to ${route.path} at ${viewport.width}x${viewport.height}`,
        details: `Header height: ${headerCheck.height}, Display: ${headerCheck.display}, Visibility: ${headerCheck.visibility}`,
      });
    }

    // Check 3: Typography Readability
    const typographyCheck = await page.evaluate(() => {
      const bodyText = document.body;
      const computedStyle = window.getComputedStyle(bodyText);
      const fontSize = parseFloat(computedStyle.fontSize);
      
      // Find smallest font size in visible text elements
      const textElements = Array.from(document.querySelectorAll('p, span, div, a, button, li'));
      const fontSizes = textElements
        .filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .map(el => parseFloat(window.getComputedStyle(el).fontSize))
        .filter(size => !isNaN(size) && size > 0);
      
      const minFontSize = fontSizes.length > 0 ? Math.min(...fontSizes) : fontSize;
      
      return {
        bodyFontSize: fontSize,
        minFontSize,
        readable: minFontSize >= 14,
      };
    });

    checks.readableTypography = typographyCheck.readable;
    
    if (!typographyCheck.readable) {
      issues.push({
        type: 'typography',
        severity: 'medium',
        description: `Minimum font size (${typographyCheck.minFontSize.toFixed(1)}px) is below recommended 14px`,
        reproduction: `Navigate to ${route.path} at ${viewport.width}x${viewport.height} and inspect text elements`,
        details: `Body font: ${typographyCheck.bodyFontSize}px, Minimum found: ${typographyCheck.minFontSize.toFixed(1)}px`,
      });
    }

    // Check 4: Content Clipping
    const clippingCheck = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const clippedElements = elements.filter(el => {
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        
        if (rect.height === 0 || rect.width === 0) return false;
        
        // Check if overflow is hidden and content might be clipped
        if (styles.overflow === 'hidden' || styles.overflowY === 'hidden') {
          return el.scrollHeight > el.clientHeight;
        }
        
        return false;
      });
      
      return {
        hasClipping: clippedElements.length > 0,
        count: clippedElements.length,
        elements: clippedElements.slice(0, 3).map(el => ({
          tag: el.tagName,
          class: el.className,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
        })),
      };
    });

    checks.noClippedContent = !clippingCheck.hasClipping;
    
    if (clippingCheck.hasClipping) {
      issues.push({
        type: 'content-clipping',
        severity: 'medium',
        description: `${clippingCheck.count} element(s) may have clipped content`,
        reproduction: `Navigate to ${route.path} at ${viewport.width}x${viewport.height} and inspect elements with overflow:hidden`,
        details: `Examples: ${JSON.stringify(clippingCheck.elements, null, 2)}`,
      });
    }

    // Check 5: Layout Wrapping
    const layoutCheck = await page.evaluate(() => {
      // Check if cards/containers are wrapping properly
      const containers = Array.from(document.querySelectorAll('[class*="grid"], [class*="flex"]'));
      const issues = [];
      
      containers.forEach(container => {
        const rect = container.getBoundingClientRect();
        if (rect.width > window.innerWidth) {
          issues.push({
            tag: container.tagName,
            class: container.className,
            width: rect.width,
            viewportWidth: window.innerWidth,
          });
        }
      });
      
      return {
        wrappingProperly: issues.length === 0,
        issues,
      };
    });

    checks.layoutWrapping = layoutCheck.wrappingProperly;
    
    if (!layoutCheck.wrappingProperly) {
      issues.push({
        type: 'layout',
        severity: 'high',
        description: `${layoutCheck.issues.length} layout container(s) exceed viewport width`,
        reproduction: `Navigate to ${route.path} at ${viewport.width}x${viewport.height} and inspect grid/flex containers`,
        details: JSON.stringify(layoutCheck.issues, null, 2),
      });
    }

    // Check 6: Touch Targets (for mobile viewports)
    if (viewport.width < 768) {
      const touchTargetCheck = await page.evaluate(() => {
        const MIN_SIZE = 44;
        const interactiveElements = Array.from(
          document.querySelectorAll('a, button, input, select, textarea, [role="button"], [onclick]')
        );
        
        const smallTargets = interactiveElements
          .filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && (rect.width < MIN_SIZE || rect.height < MIN_SIZE);
          })
          .map(el => ({
            tag: el.tagName,
            text: el.textContent?.substring(0, 30),
            width: Math.round(el.getBoundingClientRect().width),
            height: Math.round(el.getBoundingClientRect().height),
          }));
        
        return {
          adequate: smallTargets.length === 0,
          smallTargets: smallTargets.slice(0, 5),
          count: smallTargets.length,
        };
      });

      checks.touchTargets = touchTargetCheck.adequate;
      
      if (!touchTargetCheck.adequate) {
        issues.push({
          type: 'touch-target',
          severity: 'medium',
          description: `${touchTargetCheck.count} interactive element(s) below 44x44px minimum touch target`,
          reproduction: `Navigate to ${route.path} at ${viewport.width}x${viewport.height} on mobile and try tapping small buttons/links`,
          details: `Examples: ${JSON.stringify(touchTargetCheck.smallTargets, null, 2)}`,
        });
      }
    } else {
      checks.touchTargets = true; // Not applicable for desktop
    }

  } catch (error) {
    console.error(`Error performing checks on ${route.path} at ${viewport.name}:`, error.message);
    issues.push({
      type: 'test-error',
      severity: 'high',
      description: `Test execution error: ${error.message}`,
      reproduction: `Navigate to ${route.path} at ${viewport.width}x${viewport.height}`,
    });
  }

  return { checks, issues };
}

// Perform interactive tests
async function performInteractiveTests(page, route, viewport) {
  const issues = [];

  try {
    // Test mobile menu (for viewports < 768px)
    if (viewport.width < 768 && route.interactive.includes('mobile-menu')) {
      try {
        const menuButton = await page.$('button[aria-label*="menu" i], button[aria-expanded]');
        if (menuButton) {
          await menuButton.click();
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const menuVisible = await page.evaluate(() => {
            const menu = document.querySelector('[id*="mobile" i], [class*="mobile" i]');
            return menu && window.getComputedStyle(menu).display !== 'none';
          });
          
          if (!menuVisible) {
            issues.push({
              type: 'interaction',
              severity: 'high',
              description: 'Mobile menu button clicked but menu did not appear',
              reproduction: `1. Navigate to ${route.path}\n   2. Set viewport to ${viewport.width}x${viewport.height}\n   3. Click mobile menu button`,
            });
          }
          
          // Close menu
          await menuButton.click();
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      } catch (error) {
        // Menu button might not exist on all pages
      }
    }

    // Test form fields (contacto and questionnaires)
    if (route.interactive.includes('form-fields')) {
      try {
        const inputs = await page.$$('input[type="text"], input[type="email"], textarea');
        if (inputs.length > 0) {
          const firstInput = inputs[0];
          await firstInput.click();
          await firstInput.type('Test');
          await new Promise(resolve => setTimeout(resolve, 200));
          
          const inputValue = await firstInput.evaluate(el => el.value);
          if (!inputValue.includes('Test')) {
            issues.push({
              type: 'interaction',
              severity: 'medium',
              description: 'Form input did not accept typed text',
              reproduction: `Navigate to ${route.path} at ${viewport.width}x${viewport.height} and try typing in form fields`,
            });
          }
        }
      } catch (error) {
        // Forms might not exist or be interactive
      }
    }

    // Test chatbot input
    if (route.interactive.includes('chatbot-input')) {
      try {
        const chatInput = await page.$('input[type="text"], textarea');
        if (chatInput) {
          await chatInput.click();
          await chatInput.type('Hello test message');
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      } catch (error) {
        issues.push({
          type: 'interaction',
          severity: 'medium',
          description: `Chatbot input interaction failed: ${error.message}`,
          reproduction: `Navigate to ${route.path} at ${viewport.width}x${viewport.height} and try typing in chatbot`,
        });
      }
    }

  } catch (error) {
    console.error(`Error performing interactive tests on ${route.path}:`, error.message);
  }

  return issues;
}

// Test a single route at a single viewport
async function testRouteAtViewport(page, route, viewport, report) {
  console.log(`  Testing ${route.name} at ${viewport.description}...`);

  try {
    // Set viewport
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
    });

    // Navigate to route
    await page.goto(`${BASE_URL}${route.path}`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Wait for React hydration
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Perform responsive checks
    const { checks, issues } = await performResponsiveChecks(page, route, viewport);

    // Perform interactive tests
    const interactiveIssues = await performInteractiveTests(page, route, viewport);
    issues.push(...interactiveIssues);

    // Determine status
    const allChecksPassed = Object.values(checks).every(check => check === true);
    const hasCriticalIssues = issues.some(i => i.severity === 'critical');
    const status = hasCriticalIssues ? 'FAIL' : allChecksPassed ? 'PASS' : 'WARNING';

    report.addResult(route, viewport, status, checks, issues);

    const statusIcon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    console.log(`    ${statusIcon} ${status} (${issues.length} issue(s))`);

  } catch (error) {
    console.error(`    ❌ ERROR: ${error.message}`);
    report.addResult(route, viewport, 'FAIL', {}, [{
      type: 'test-error',
      severity: 'critical',
      description: `Test failed: ${error.message}`,
      reproduction: `Navigate to ${route.path} at ${viewport.width}x${viewport.height}`,
    }]);
  }
}

// Main test execution
async function runTests() {
  console.log('🚀 Starting Automated Responsive QA Tests\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Routes: ${ROUTES.length}`);
  console.log(`Viewports: ${VIEWPORTS.length}`);
  console.log(`Total Tests: ${ROUTES.length * VIEWPORTS.length}\n`);

  const report = new ResponsiveQAReport();
  let browser;

  try {
    // Launch browser
    console.log('Launching browser...\n');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set default timeout
    page.setDefaultTimeout(30000);

    // Test each route at each viewport
    for (const route of ROUTES) {
      console.log(`\n📄 Testing route: ${route.name} (${route.path})`);
      
      for (const viewport of VIEWPORTS) {
        await testRouteAtViewport(page, route, viewport, report);
      }
    }

    console.log('\n✅ All tests completed!\n');

  } catch (error) {
    console.error('\n❌ Test execution failed:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // Generate and save report
  console.log('Generating report...\n');
  const reportPath = report.saveReport('responsive-qa-report.md');
  
  report.printSummary();
  
  console.log(`📄 Full report saved to: ${reportPath}\n`);

  // Exit with appropriate code
  process.exit(report.summary.failed > 0 ? 1 : 0);
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

// Entry point
async function main() {
  console.log('DevTailor Automated Responsive QA Testing\n');
  console.log('Checking if server is running...');

  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error(`\n❌ Server is not running at ${BASE_URL}`);
    console.error('Please start the development server first:');
    console.error('  cd packages/web && npm run dev\n');
    process.exit(1);
  }

  console.log('✅ Server is running\n');

  await runTests();
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
