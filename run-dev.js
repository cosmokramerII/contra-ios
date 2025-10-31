#!/usr/bin/env node
const { spawn } = require('child_process');
const vite = spawn('npx', ['vite', '--port', '5000', '--host', '0.0.0.0'], { stdio: 'inherit' });
vite.on('close', (code) => {
  process.exit(code);
});