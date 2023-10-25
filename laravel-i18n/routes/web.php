<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('language/{locale}', function ($locale) {
    app()->setLocale($locale);
    session()->put('locale', $locale);

    return redirect()->back();
});

Route::get('/', function () {
    $today = \Carbon\Carbon::now()
        ->settings(
            [
                'locale' => app()->getLocale(),
            ]
        );

    // LL is macro placeholder for MMMM D, YYYY (you could write same as dddd, MMMM D, YYYY)
    $dateMessage = $today->isoFormat('dddd, LL');

    return view('welcome', [
        'date_message' => $dateMessage
    ]);
});