# [Simple Survey v2]()
A simple, goofy survey for data collection.

![Screenshot](screenshot.jpg)

## Purpose/Goal
To upgrade my original FCC project using MongoDB, and pug templates.  
To show how I've improved over the last couple of years by redoing an old project.

## Operation
* Put in some fake info.
* A count of entries into the database is diplayed above the form.
* Click on "find inspiration here" link to see some random samples of what other people have added.
* Fill out the form and click submit (First and Last name fields are required).


## Tech/Libraries Used
* HTML
* CSS
* JavaScript
* Pug
* MongoDB
* Express

## Problems/Solutions
* The biggest problem was trying to adapt this express app to work with the react apps I host on my AWS Lightsail instance. I had to refresh my knowledge of using express routes and how the urls are chopped up and used to direct to the correct endpoint.
* Also, keeping the static resources separated and yet still usable for each different endpoint without the program performing GET requests on all of the static dirs before it gets to the matching endpoint was a small hassle. I figured out that I was able to put the app.use() call to the static dir inside the GET call to the endpoint while using app.set() to set pug up outside of the MongoDB connection.
* Then, setting up the <base> tag inside the head of this app so that the static files for this express app are discovered correctly by its own pages and doesn't clash with the react apps I setup in the same express server file that controls my whole portfolio.
* In all, getting the app to work was easy as a standalone app. The tough work came when I had to integrate with with my existing setup to work alongside react apps.

## More Information
The original (version 1) simple survey can be found [here](https://s3-ap-northeast-1.amazonaws.com/wmcooper2.com/fcc-projects/survey/survey.html) if you are interested to see how I've progressed.  
[Color Palette](https://paletton.com/#uid=73i0u0k5vLq0tZR2rUl9z-reHsl)  
[CSS auto prefixer](https://autoprefixer.github.io)  


Ideas for future functionality:
* New data is entered into the database and you will see results on the next screen.
* Send the form to a friend with the Twitter link.
