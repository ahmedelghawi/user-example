# UserExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Guide

When you load up the application you will be taken to a list of the initial 10 users from the reqres.in API which will also have pagination for the next 2 users from the API.

Clicking on the edit icon fab on each user card will take you to the page of that user which you can then edit that user's information (it will reflect locally but not from the server, so if you refresh the page the progress will be lost and again the pagination doesn't work properly because that is based on the data from the server and that does not work). From this you can also delete a user which will reflect on the initial list of 10. 

Clicking on the Add new user will also add a new user who will be added locally and sent through to the reqres.in API but will not actually do anything to the server. The new user will be displayed on the initial list of 10 so there will be 11 users in total on that list, but it would not be a reflection of the actual API functionality.

If I had proper API functionality, then the data would have been stored in the servers and retrieved properly from there with correct pagination functionality.

The forms are reactive and have validators which make all the fields required and an email validator for the email field.

I utilized Angular Material for the the usage of their components and implemented the NgRx store with what I had to work with.
