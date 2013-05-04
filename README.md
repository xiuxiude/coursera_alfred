##Coursera Alfred 
everything occurs here are still changing along with development, so please ofen get back to get the lastset info.

##What is this

Coursera Alfred is an all-in-one chrome extension for coursera.

##Features

* courses'schedule
![screenshots](http://f.cl.ly/items/0Z26461429290V223P1N/deadlines.png)
* multi-download button(under construction)
![screenshots](http://f.cl.ly/items/0u2537413h3q1i2k3b2S/download_button.png)

##Todos

* keyboard-shortcut customization
* desktop notifcation of upcoming deadlines
* auto sync courses calendar to third party calendar account

##For Developer

* coursera alfred developed with [angluarJS](http://angularjs.org/), so you need to understand some thing about it fo r better developing.
* also you are supposed to get some knowledge of [chrome extension api](http://developer.chrome.com/extensions/).

Setup

* install node.js and npm first
* run `npm install -g bower` to install bower
* `bower install` to install dependencies for developing

Ackownledgement

* Here are three main folders in `./coursera_alfred/src`.There are `bg`, `browser_action` and `inject`.
* `bg` stands for background page, which is always running at backgroud. we use it to fetch data from coursera, parse data and then store parsed data at localstorage.
* `browser_action` is made for courses'schedule feature, it only has the ablity to fetch data from localstorage since we stored data which we want at localstorage.
* The `inject` subfolder is for 'multi-download' feture. 

##Contributor

* @seansay
* @PerryPan
* @shanzi

##Feedback

Use github to open a issue if you have any problem or feature request.

Pull requests are welcome;)

##License

Coursera Alfred is under MIT license

* [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)
