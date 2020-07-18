#!/usr/bin/env node

const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')
const prompt = require('prompt-sync')()

const tweetTextAreaPath = "/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div[2]/div[1]/div/div/div/div[2]/div[1]/div/div/div/div/div/div/div/div/div/div[1]/div/div/div/div[2]/div/div/div/div"
const tweetButtonPath = '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[2]/div/div[2]/div[1]/div/div/div/div[2]/div[2]/div/div/div[2]/div[3]/div'

const screen = {
  width: 300,
  height: 300
}

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

(async function sendTweet() {
  let driver = new webdriver.Builder()
                .setChromeOptions(new chrome.Options().windowSize(screen))
                .withCapabilities(webdriver.Capabilities.chrome())
                .build()

  const username = prompt('Enter your user name: ')
  const password = prompt('Enter your password: ')
  const tweetText = prompt('Type the tweet: ')

  try {
      await driver.get('https://www.twitter.com/login')

      await driver.findElement(webdriver.By.name("session[username_or_email]")).sendKeys(username)
      await driver.findElement(webdriver.By.name("session[password]")).sendKeys(password)
      await driver.findElement(webdriver.By.name('session[password]')).sendKeys(webdriver.Key.ENTER)

      await driver.findElement(webdriver.By.xpath(tweetTextAreaPath)).sendKeys(tweetText)
      await driver.findElement(webdriver.By.xpath(tweetButtonPath)).click()
  } finally {
      setTimeout(() => driver.quit(), 1500)
    }
})()