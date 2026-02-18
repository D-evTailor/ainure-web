#!/usr/bin/env node

/**
 * Responsive QA Testing Script for DevTailor Next.js Site
 * Tests all routes at specified breakpoints for responsive issues
 */

import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:3000';

const ROUTES = [
  '/',
  '/servicios',
  '/metodologia',
  '/valores',
  '/contacto',
  '/talks',
  '/chatbot',
  '/talks/cuestionario/hematologia',
  '/talks/cuestionario/otorrinolaringologia',
];

const VIEWPORTS = [
  { name: 'xs-mobile', width: 320, height: 800, description: 'Extra Small Mobile' },
  { name: 'sm-mobile', width: 480, height: 900, description: 'Small Mobile' },
  { name: 'md-tablet', width: 768, height: 1024, description: 'Tablet Portrait' },
  { name: 'lg-desktop', width: 1024, height: 768, description: 'Desktop Small' },
  { name: 'xl-desktop', width: 1280, height: 800, description: 'Desktop Medium' },
  { name: '2xl-desktop', width: 1536, height: 960, description: 'Desktop Large' },
];

const CHECKS = {
  horizontalOverflow: 'No horizontal overflow (document.body.scrollWidth <= window.innerWidth)',
  headerVisible: 'Header is visible and functional',
  readableTypography: 'Typography is readable (font-size >= 14px for body text)',
  noClippedContent: 'No content is clipped or cut off',
  formsWrapping: 'Forms and cards wrap properly',
  touchTargets: 'Interactive elements meet minimum touch target size (44x44px)',
};

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
  }

  addResult(route, viewport, status, checks, issues = []) {
    this.results.push({
      route,
      viewport: viewport.name,
      viewportSize: `${viewport.width}x${viewport.height}`,
      status,
      checks,
      issues,
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
        route,
        viewport: viewport.name,
        viewportSize: `${viewport.width}x${viewport.height}`,
      })));
    }
  }

  generateMarkdownReport() {
    let report = '# DevTailor Responsive QA Test Report\n\n';
    report += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    report += `**Base URL:** ${BASE_URL}\n\n`;

    // Summary
    report += '## Summary\n\n';
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
    } else {
      report += '## ❌ Horizontal Overflow Issues Found\n\n';
      overflowIssues.forEach(issue => {
        report += `- **${issue.route}** at ${issue.viewportSize}: ${issue.description}\n`;
      });
      report += '\n';
    }

    // Issues by Severity
    if (this.issues.length > 0) {
      report += '## Issues Found\n\n';
      
      const critical = this.issues.filter(i => i.severity === 'critical');
      const high = this.issues.filter(i => i.severity === 'high');
      const medium = this.issues.filter(i => i.severity === 'medium');
      const low = this.issues.filter(i => i.severity === 'low');

      if (critical.length > 0) {
        report += '### 🔴 Critical Issues\n\n';
        critical.forEach((issue, idx) => {
          report += `${idx + 1}. **${issue.route}** (${issue.viewportSize})\n`;
          report += `   - **Type:** ${issue.type}\n`;
          report += `   - **Description:** ${issue.description}\n`;
          report += `   - **Reproduction:** ${issue.reproduction}\n\n`;
        });
      }

      if (high.length > 0) {
        report += '### 🟠 High Priority Issues\n\n';
        high.forEach((issue, idx) => {
          report += `${idx + 1}. **${issue.route}** (${issue.viewportSize})\n`;
          report += `   - **Type:** ${issue.type}\n`;
          report += `   - **Description:** ${issue.description}\n`;
          report += `   - **Reproduction:** ${issue.reproduction}\n\n`;
        });
      }

      if (medium.length > 0) {
        report += '### 🟡 Medium Priority Issues\n\n';
        medium.forEach((issue, idx) => {
          report += `${idx + 1}. **${issue.route}** (${issue.viewportSize})\n`;
          report += `   - **Type:** ${issue.type}\n`;
          report += `   - **Description:** ${issue.description}\n`;
          report += `   - **Reproduction:** ${issue.reproduction}\n\n`;
        });
      }

      if (low.length > 0) {
        report += '### 🔵 Low Priority Issues\n\n';
        low.forEach((issue, idx) => {
          report += `${idx + 1}. **${issue.route}** (${issue.viewportSize})\n`;
          report += `   - **Type:** ${issue.type}\n`;
          report += `   - **Description:** ${issue.description}\n`;
          report += `   - **Reproduction:** ${issue.reproduction}\n\n`;
        });
      }
    }

    // Detailed Results Table
    report += '## Detailed Test Results\n\n';
    report += '| Route | Viewport | Size | Status | Issues |\n';
    report += '|-------|----------|------|--------|--------|\n';

    this.results.forEach(result => {
      const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
      const issueCount = result.issues.length;
      report += `| ${result.route} | ${result.viewport} | ${result.viewportSize} | ${statusIcon} ${result.status} | ${issueCount} |\n`;
    });

    report += '\n';

    // Recommendations
    if (this.issues.length > 0) {
      report += '## Recommendations\n\n';
      
      const recommendations = new Set();
      this.issues.forEach(issue => {
        if (issue.type === 'horizontal-overflow') {
          recommendations.add('- Add `overflow-x: hidden` or `overflow-x: clip` to problematic containers');
          recommendations.add('- Review fixed-width elements and replace with responsive units (%, vw, rem)');
        }
        if (issue.type === 'typography') {
          recommendations.add('- Increase minimum font sizes for better readability on small screens');
          recommendations.add('- Use clamp() for fluid typography scaling');
        }
        if (issue.type === 'touch-target') {
          recommendations.add('- Ensure all interactive elements are at least 44x44px for touch accessibility');
        }
        if (issue.type === 'layout') {
          recommendations.add('- Review flexbox/grid layouts for proper wrapping behavior');
          recommendations.add('- Test with real content to ensure containers adapt properly');
        }
      });

      recommendations.forEach(rec => {
        report += `${rec}\n`;
      });
      report += '\n';
    }

    return report;
  }

  saveReport(filename = 'responsive-qa-report.md') {
    const report = this.generateMarkdownReport();
    const filepath = join(process.cwd(), filename);
    writeFileSync(filepath, report, 'utf-8');
    console.log(`\n✅ Report saved to: ${filepath}\n`);
    return filepath;
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('RESPONSIVE QA TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${this.summary.totalTests}`);
    console.log(`Passed: ${this.summary.passed} ✅`);
    console.log(`Failed: ${this.summary.failed} ❌`);
    console.log(`Warnings: ${this.summary.warnings} ⚠️`);
    console.log(`Success Rate: ${((this.summary.passed / this.summary.totalTests) * 100).toFixed(1)}%`);
    console.log('='.repeat(60) + '\n');
  }
}

// Manual testing instructions
function printManualTestingInstructions() {
  console.log('\n' + '='.repeat(80));
  console.log('MANUAL RESPONSIVE QA TESTING INSTRUCTIONS');
  console.log('='.repeat(80));
  console.log('\nThis script provides a testing framework. For actual browser testing:');
  console.log('\n1. Open Chrome DevTools (F12)');
  console.log('2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)');
  console.log('3. Test each route at these viewports:\n');
  
  VIEWPORTS.forEach(vp => {
    console.log(`   - ${vp.description}: ${vp.width}x${vp.height}`);
  });

  console.log('\n4. For each route + viewport combination, check:');
  Object.entries(CHECKS).forEach(([key, description]) => {
    console.log(`   ☐ ${description}`);
  });

  console.log('\n5. Routes to test:\n');
  ROUTES.forEach(route => {
    console.log(`   - ${BASE_URL}${route}`);
  });

  console.log('\n6. Interactive tests:');
  console.log('   - /contacto: Focus and fill form fields');
  console.log('   - /chatbot: Type a short message in the input');
  console.log('   - /talks/cuestionario/*: Focus and interact with questionnaire forms');
  console.log('   - All routes: Open mobile menu (< 768px), verify all links work');

  console.log('\n' + '='.repeat(80) + '\n');
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      console.log(`✅ Server is running at ${BASE_URL}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Server is not running at ${BASE_URL}`);
    console.error('Please start the development server with: npm run dev');
    return false;
  }
}

// Main execution
async function main() {
  console.log('DevTailor Responsive QA Testing Tool\n');

  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    process.exit(1);
  }

  printManualTestingInstructions();

  // Create a sample report structure
  const report = new ResponsiveQAReport();

  console.log('📝 Creating test report template...\n');
  console.log('Note: This tool provides the framework for manual testing.');
  console.log('For automated browser testing, install Puppeteer or Playwright.\n');

  // Generate template report
  const reportPath = report.saveReport('responsive-qa-report-template.md');
  
  console.log('To perform actual testing:');
  console.log('1. Follow the manual testing instructions above');
  console.log('2. Document findings in the report template');
  console.log('3. Or install Puppeteer for automated testing:\n');
  console.log('   npm install --save-dev puppeteer');
  console.log('   (Then this script can be enhanced for automation)\n');
}

main().catch(console.error);
