const fs = require('fs');
let html = fs.readFileSync('c:\\Users\\USER\\Downloads\\jeddai\\af_logistics_landing\\index.html', 'utf8');

const aboutStart = html.indexOf('<section class="about" id="about">');
const aboutEnd = html.indexOf('</section>', aboutStart) + '</section>'.length;

const aboutHtml = html.substring(aboutStart, aboutEnd);
html = html.substring(0, aboutStart) + html.substring(aboutEnd);

const footerStart = html.indexOf('<footer id="contact">');
html = html.substring(0, footerStart) + aboutHtml + '\n\n    ' + html.substring(footerStart);

fs.writeFileSync('c:\\Users\\USER\\Downloads\\jeddai\\af_logistics_landing\\index.html', html);
console.log('Moved about section');
