#!/usr/bin/env node
const { spawn } = require('child_process');
const vite = spawn('npx', ['vite'], { stdio: 'inherit' });
vite.on('close', (code) => {
  process.exit(code);
});