##Coursera Alfred 
everything occurs here are still changing along with development, so please often get back to get the latest info.

##What is this

Coursera Alfred is an all-in-one chrome extension for coursera.

##Features

* courses'schedule

![screenshots](http://f.cl.ly/items/3Z3S24153d3V2l1t3x2j/coursera_alfred_v3.1.png)

##Todos

* multi-download button for multi-downloading videos and/or slides
* keyboard-shortcut customization
* desktop notifcation of upcoming deadlines
* auto sync courses calendar to third party calendar account

##To Developer

* Coursera alfred is developed with [angluarJS](http://angularjs.org/), so you need to understand some thing about it for better developing.

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

* [@seansay](https://github.com/seansay)
* [@plrthink](https://github.com/plrthink)
* [@shanzi](https://github.com/shanzi)
* [@xupeixiang](https://github.com/xupeixiang)
* [@kaesire](https://github.com/kaesire)

##Feedback

Use github to open a issue if you have any problem or feature request.

Pull requests are welcome;)

##Donate

If you like it, you may want to donate by alipay(iseansay@gmail.com) or [gratipay](https://gratipay.com/seansay/) to us.

##License

Coursera Alfred is released under the [MIT License](http://opensource.org/licenses/MIT).
