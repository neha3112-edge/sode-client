const fs = require('fs');

const html = fs.readFileSync('scratch_mu_live.html', 'utf8');

function extractBetween(startPattern, endPattern) {
  const startIdx = html.search(startPattern);
  if (startIdx === -1) return '';
  const sub = html.substring(startIdx);
  const endIdx = sub.search(endPattern);
  if (endIdx === -1) return sub.substring(0, 2000);
  return sub.substring(0, endIdx);
}

let out = '';
out += '=== HEADER HTML ===\n' + extractBetween(/<header|<div class="logo"/i, /<div class="top-banner"/i) + '\n\n';
out += '=== HERO / TOP-BANNER HTML ===\n' + extractBetween(/<div class="top-banner"/i, /<h1[^>]*>Mangalayatan University Online<\/h1>|<div class="col-md-12 text-center"|<section id="approvals"/i) + '\n\n';
out += '=== APPROVALS HTML ===\n' + extractBetween(/<h1[^>]*>Mangalayatan University Online<\/h1>|<section id="approvals"|<div[^>]*class="[^"]*approv/i, /<h2 id="pro-hd"|<div class="container">\s*<h2 id="pro-hd"/i) + '\n\n';
out += '=== PROGRAMMES HTML (first 1000 chars) ===\n' + extractBetween(/<h2 id="pro-hd"/i, /<div class="container">\s*<h2>About Mangalayatan/i).substring(0, 1200) + '\n\n';
out += '=== ABOUT HTML ===\n' + extractBetween(/<h2>About Mangalayatan/i, /<h2>Why Choose/i) + '\n\n';
out += '=== WHY CHOOSE HTML ===\n' + extractBetween(/<h2>Why Choose/i, /<h2>Mangalayatan University Top-Tier/i) + '\n\n';
out += '=== RECRUITERS HTML ===\n' + extractBetween(/<h2>Mangalayatan University Top-Tier/i, /<section id="sode_about"/i) + '\n\n';
out += '=== SODE ABOUT HTML ===\n' + extractBetween(/<section id="sode_about"/i, /<section class="apply-section"/i) + '\n\n';
out += '=== APPLY SECTION HTML ===\n' + extractBetween(/<section class="apply-section"/i, /<section id="faq"/i) + '\n\n';
out += '=== FAQ HTML ===\n' + extractBetween(/<section id="faq"/i, /<footer|<div class="footer_sticky_buttons"|<section class="media-footer-strip"/i).substring(0, 1500) + '\n\n';

fs.writeFileSync('scratch/extracted_sections.utf8.txt', out, 'utf8');
console.log('Saved scratch/extracted_sections.utf8.txt successfully');

