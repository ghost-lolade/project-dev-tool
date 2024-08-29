<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome'); // or any other view you want to load
// });

Route::get('/', function () {
    \Log::info("Accessing project with ID:");
    return file_get_contents(public_path('index.html'));
});

Route::get('/projects', function () {
    return file_get_contents(public_path('projects.html'));
});

Route::get('/projects/{id}', function ($id) {
    return file_get_contents(public_path('project-details.html'));
});
