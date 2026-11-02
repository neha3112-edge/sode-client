const fs = require('fs');

const html = fs.readFileSync('scratch_mu_live.html', 'utf8');

// Let's strip scripts
const cleanHtml = html.replace(/<script[\s\S]*?<\/script>/gi, '');

// Let's find all headers and main content
const bodyMatch = cleanHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
const bodyContent = bodyMatch ? bodyMatch[1] : cleanHtml;

// Let's list top-level elements or sections
const sectionRegex = /(<header[\s\S]*?<\/header>|<section[\s\S]*?<\/section>|<div class="(?:top-banner|banner|footer_sticky_buttons)[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>|<div id="[^"]*"[^>]*>[\s\S]*?<\/div>)/gi;

// Let's inspect sections sequentially
const lines = bodyContent.split('\n');
console.log('Total body lines:', lines.length);

// Let's print lines with headings or section/container tags
lines.forEach((line, idx) => {
  if (line.match(/<(h[1-6]|section|header|div class="(?:top-banner|banner|container|header|logo|course|about|why|recruit|process|faq|footer))/i)) {
    if (idx < 500 || line.includes('<h') || line.includes('<section')) {
      console.log(`L${idx+1}: ${line.trim().substring(0, 120)}`);
    }
  }
});
