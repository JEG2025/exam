<?php

use App\Http\Controllers\CompanyInformationController;
use App\Http\Controllers\CompanyQuoteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(['prefix' => 'company-information', 'middleware' => ['verified']], function () {
    Route::get('/', [CompanyInformationController::class, 'index'])->name('company-information.index');
    Route::get('/profile', [CompanyInformationController::class, 'getCompanyInformation'])->name('company-information.profile');
});
Route::group(['prefix' => 'company-quote', 'middleware' => []], function () {
    Route::get('/', [CompanyQuoteController::class, 'index'])->name('company-quote.index');
    Route::get('/full', [CompanyQuoteController::class, 'getFullCompanyQuote'])->name('company-quote.full');
});



require __DIR__.'/auth.php';
