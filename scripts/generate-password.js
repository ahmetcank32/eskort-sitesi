const bcrypt = require('bcryptjs');

// Generate a hashed password
const password = process.argv[2] || 'admin123';
const saltRounds = 10;

const hashedPassword = bcrypt.hashSync(password, saltRounds);

console.log('\n=== Admin Password Generator ===\n');
console.log('Plain text password:', password);
console.log('Hashed password (copy this to .env):');
console.log(hashedPassword);
console.log('\nAdd this to your .env file as:');
console.log(`ADMIN_PASSWORD="${hashedPassword}"\n`);
