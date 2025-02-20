This financial modeling web app uses Laravel 10, InertiaJs and React.

Laravel Breeze was used to set up the web app's user registration and login using it's built in authentication scaffolding.

How to launch web app:


Assuming you already have MySQL, PHP, composer and NPM:

1. Clone this repository
2. Open a terminal, go to the directory of this cloned repo
3. Run `composer install`
4. Run `php artisan migrate`
5. Copy the contents of `.env.example` to a new `.env` file
3. Run `npm install`
5. Start the server-side development server by running `php artisan serve`
6. Start the client-side development server by running `npm run dev`
7. Visit `localhost:8000` to start using the web app 
