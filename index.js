'use strict';

require('dotenv').config();

const path = require('path');
const { Builder, By, Key } = require('selenium-webdriver');
const winston = require('winston');

winston.add(winston.transports.File, { filename: path.join(__dirname, 'life-over-likes.log') });

const e = process.env;

let driver;
new Builder().forBrowser('chrome').build()
  .then(d => driver = d)
  .then(() => driver.manage().setTimeouts({ implicit: 5000 }))
  .then(() => driver.get('https://republicwireless.com/sweepstakes/?icid=sweepstakes-homepage-banner'))
  .then(() => driver.findElement(By.css('body')).sendKeys(
    Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB,
    e.FIRST_NAME, Key.TAB,
    e.LAST_NAME, Key.TAB,
    e.EMAIL, Key.TAB,
    e.ZIP_CODE, Key.ENTER))
  .then(() => new Promise(resolve => setTimeout(resolve, 5000)))
  .then(() => driver.quit())
  .then(() => winston.info('The form has successfully been filled out and submitted.'))
  .catch(err => {
    winston.error(err);
    return driver.quit().then(() => Promise.reject(err));
  });

