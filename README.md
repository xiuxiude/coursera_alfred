##Coursera Alfred 
everything occurs here are still changing along with development, so please often get back to get the latest info.

##What is this

Coursera Alfred is an all-in-one chrome extension for coursera.

##Features

* courses'schedule

![screenshots](http://f.cl.ly/items/1E3e2u1U0Q3F032H252e/Screenshot_5_18_13_8_25_PM.png)

![screenshots](http://f.cl.ly/items/0V2N0e061W2g3j1m0g1u/Screenshot_5_18_13_8_26_PM.png)

* multi-download button(under construction)

![screenshots](http://f.cl.ly/items/0u2537413h3q1i2k3b2S/download_button.png)

##Todos

* keyboard-shortcut customization
* desktop notifcation of upcoming deadlines
* auto sync courses calendar to third party calendar account

##For Developer

* oursera alfred is developed with [angluarJS](http://angularjs.org/), so you need to understand some thing about it for better developing.

* Also you are supposed to have some knowledge of [chrome extension api](http://developer.chrome.com/extensions/).

* We use Kris Kowal's [Promise](http://wiki.commonjs.org/wiki/Promises) implementation [Q](https://github.com/kriskowal/q) to deal with async code.


Setup

* install [node.js](http://nodejs.org/) and [npm](https://npmjs.org/) first
* we use [bower](http://bower.io/) as our client-side package manager, run `npm install -g bower` to install bower
* `bower install` to install all the dependencies

Ackownledgement

* Here are three main folders in `./src`.There are `bg`, `browser_action` and `inject`.

* `bg` stands for background page, which is always running at backgroud. We use it to fetch data from coursera, parse data and then store parsed data at localStorage.

* `browser_action` is the popup window when you click the extension icon, which fetch the data from localStorage .

* The `inject` is for all the content-script running in the context of Coursera's own page. Currently, there is only the multi-download button inject in the Coursera course page.

##Contributor

* @seansay
* @PerryPan
* @shanzi

##Feedback

Use github to open a issue if you have any problem or feature request.

Pull requests are welcome;)

##License

Coursera Alfred is released under the [MIT License](http://opensource.org/licenses/MIT).
