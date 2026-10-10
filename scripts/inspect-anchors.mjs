import fs from 'node:fs';

const s = fs.readFileSync(process.argv[2], 'utf8');

const i = s.indexOf('#contact');
console.log('--- around #contact ---');
console.log(JSON.stringify(s.slice(Math.max(0, i - 400), i + 120)));

const j = s.lastIndexOf('</nav>');
console.log('--- around </nav> ---');
console.log(JSON.stringify(s.slice(Math.max(0, j - 400), j + 10)));
