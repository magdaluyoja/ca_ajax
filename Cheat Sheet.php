<?php
1. Downlaod Laravel via Composer

    composer global require "laravel/installe"

2. Create laravel project via composer

    composer create-project --prefer-dist laravel/laravel blog

3. Run the server 

    php artisan serve

4. Create Database and Edit .env file

5. Make the layout

    _head.blade.php
    _stylesheets.blade.php
    _header.blade.php
    _topnav.blade.php
    _footer.blade.php
    _javascripts.blade.php

    main.blade.php

6. Make PageController
 
    php artisan make:controller PageController

7. Make Model and Migration

    php artisan make:model Particular --migration

8. Make fillable fields in the model 

    protected $fillable = [
        'particulars', 'account_code'
    ];

9. Create the table in the migration, visit https://laravel.com/docs/5.5/migrations#creating-columns

    Schema::create('particulars', function (Blueprint $table) {
        $table->increments('id');
        $table->string('particular', 100);
        $table->string('account_code', 10);
        $table->timestamps();
    });

10. 1st Migration, edit the service provider file in the app/Providers/AppServiceProvider.php 

    <?php

    namespace App\Providers;

    use Illuminate\Support\ServiceProvider;
    use Illuminate\Support\Facades\Schema;

    class AppServiceProvider extends ServiceProvider
    {
        /**
         * Bootstrap any application services.
         *
         * @return void
         */
        public function boot()
        {
            Schema::defaultStringLength(191);
        }

        /**
         * Register any application services.
         *
         * @return void
         */
        public function register()
        {
            //
        }
    }

    11. Run migration 

        php artisan migrate 

    12. Create resource controller

        php artisan make:controller ParticularController --resource

    13. Create the route

        Route::resource('particulars','ParticularController');

    14. Create the views

        index.blade.php 
        create.blade.php 
        show.blade.php 
        edit.blade.php 

    15. Routing authentication

    Route::middleware(['auth'])->group(function () {

    });