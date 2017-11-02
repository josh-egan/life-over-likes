'use strict';

const os = require('os');

if (os.type() === 'Darwin') require('./sheduler-mac').schedule();
else throw new Error('Scheduling is currently not supported for your operating system.');


