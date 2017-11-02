'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const moment = require('moment');
const path = require('path');

// http://www.launchd.info/

const nodeVersion = fs.readFileSync(path.join(__dirname, '.nvmrc'), 'utf8').trim();
const nodePath = path.join(process.env.HOME, '.nvm', 'versions', 'node', `v${nodeVersion}`, 'bin', 'node');
const scriptPath = path.join(__dirname, 'index.js');
const workingDirectory = __dirname;
const logPath = path.join(__dirname, 'scheduled-task.log');
const filePath = path.join(process.env.HOME, 'Library', 'LaunchAgents', 'lifeOverLikes.plist');

module.exports = {
  schedule() {
    const twoMinutesFromNow = moment().add(2, 'minutes');
    const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>lifeOverLikes</string>
		
    <key>ProgramArguments</key>
    <array>
      <string>${nodePath}</string>
      <string>${scriptPath}</string>
    </array>
    
    <key>StartCalendarInterval</key>
    <dict>
      <key>Hour</key>
      <integer>${twoMinutesFromNow.hours()}</integer>
      <key>Minute</key>
      <integer>${twoMinutesFromNow.minutes()}</integer>
    </dict>
    
    <key>WorkingDirectory</key>
    <string>${workingDirectory}</string>

    <key>EnvironmentVariables</key>
    <dict>
      <key>PATH</key>
      <string>${process.env.PATH}</string>
    </dict>
	
    <key>StandardErrorPath</key>
    <string>${logPath}</string>
    <key>StandardOutPath</key>
    <string>${logPath}</string>
    <key>StandardErrorPath</key>
    <string>${logPath}</string>
  </dict>
</plist>
`;

    fs.writeFileSync(filePath, xml, 'utf8');
    const p = spawn('launchctl', ['load', filePath]);
    p.stdout.on('data', console.log);
    p.stderr.on('data', console.error);
    p.on('close', () => console.log('Successfully scheduled.'))
  },

  unSchedule() {
    const p = spawn('launchctl', ['unload', filePath]);
    p.stdout.on('data', console.log);
    p.stderr.on('data', console.error);
    p.on('close', () => {
      fs.unlinkSync(filePath);
      console.log('Succesfully unscheduled.')
    });
  }
};