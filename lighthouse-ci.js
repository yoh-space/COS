const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create lighthouse-reports directory if it doesn't exist
const reportsDir = './lighthouse-reports';
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Function to run Lighthouse CI
function runLighthouseCI() {
  return new Promise((resolve, reject) => {
    const lhci = spawn('npx', [
      'lhci',
      'autorun',
      '--collect.url=http://localhost:3000',
      '--collect.settings.preset=mobile',
      '--collect.settings.throttling.cpuSlowdownMultiplier=4',
      '--upload.target=filesystem',
      '--outputDir=./lighthouse-reports'
    ], {
      stdio: 'inherit',
      shell: true
    });

    lhci.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Lighthouse CI exited with code ${code}`));
      }
    });
  });
}

// Function to generate performance report
function generatePerformanceReport() {
  const reportPath = path.join(reportsDir, 'lighthouse-report.json');
  if (fs.existsSync(reportPath)) {
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    const scores = report.categories || {};
    const performance = scores.performance?.score * 100 || 0;
    const accessibility = scores.accessibility?.score * 100 || 0;
    const bestPractices = scores['best-practices']?.score * 100 || 0;
    const seo = scores.seo?.score * 100 || 0;
    
    console.log('\n📊 Lighthouse Performance Report');
    console.log('================================');
    console.log(`Performance: ${performance.toFixed(0)}%`);
    console.log(`Accessibility: ${accessibility.toFixed(0)}%`);
    console.log(`Best Practices: ${bestPractices.toFixed(0)}%`);
    console.log(`SEO: ${seo.toFixed(0)}%`);
    
    // Check if performance meets target
    if (performance >= 80) {
      console.log('\n✅ Performance target achieved! (≥80%)');
    } else {
      console.log('\n❌ Performance target not met. Need optimization.');
    }
    
    return {
      performance,
      accessibility,
      bestPractices,
      seo,
      meetsTarget: performance >= 80
    };
  }
  
  return null;
}

// Main execution
async function main() {
  console.log('🚀 Starting Lighthouse CI Performance Test...');
  
  try {
    await runLighthouseCI();
    const report = generatePerformanceReport();
    
    if (report) {
      console.log('\n📈 Performance Metrics:');
      console.log(`- LCP Target: < 2.5s`);
      console.log(`- TBT Target: < 200ms`);
      console.log(`- CLS Target: < 0.1`);
      
      // Write summary to file
      const summary = {
        timestamp: new Date().toISOString(),
        scores: report,
        targets: {
          performance: 80,
          lcp: 2.5,
          tbt: 200,
          cls: 0.1
        }
      };
      
      fs.writeFileSync(
        path.join(reportsDir, 'performance-summary.json'),
        JSON.stringify(summary, null, 2)
      );
      
      console.log('\n📁 Reports saved to ./lighthouse-reports/');
    }
  } catch (error) {
    console.error('❌ Error running Lighthouse CI:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { runLighthouseCI, generatePerformanceReport };