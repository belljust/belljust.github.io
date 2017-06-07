# AlphaQMockup
Mockup Web app for CSC318 course work

This is a web app mockup interface designed for Toronto public transportaion. The app provides information and fun to the passengers, and oppotunity to text someone else on board.

There are three main files. 

The HTML file stores all the contents. It has been seperated into sections each holds a page. There are about 8 pages in total, they are in order, sign in page, status page, news page, games page, messages page, sign up page, news detail page, settings page. Some pages like news and message pages contain page frames that holds sub-pages and tabs for switching between the sub-pages. The status bar at top and the navigation bar at the bottom are written seperately at the end so they stay fixed at where they are. 

The CSS file defines all the styles applied to the HTML elements. The styles are organized in the order similar to the HTML. That is in general, from top to bottom, from left to right, from farther to closer (layers). This makes sure the styles overwrite each other in the correct order.

The JavaScript file makes the page alive. This file contains functions and variables used when interacting. At page load it assigns HTML elements their classes, style them if necessary, and give them their functionalities. 

At current stage only the screens of mobile phones are supported. It is recomended to view it on a phone or in Chrome debugger mode, where responsive mode is turned on and set to a phone.
