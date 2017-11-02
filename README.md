# Life over Likes

This is a little script, complete with a task scheduler, that will fill out and submit the Life over Likes sweepstakes form every day.

## Usage

Ensure that the selenium chrome driver is installed. Downloads can be found here: https://chromedriver.storage.googleapis.com/index.html For Mac, the latest did not work for me, so based on a recommendation from StackOverflow I installed version 2.27 and that worked. To install, download and unpack the zip file, and then move the executable to `/usr/local/bin/chromedriver`.

You will need to create a `.env` file with the following variables, providing the correct values of course:

```txt
FIRST_NAME=John
LAST_NAME=Doe
EMAIL=jdoe@example.com
ZIP_CODE=12345
```

You will need `nvm` previously installed.

```bash
nvm install
npm install
npm run schedule
```