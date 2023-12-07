<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Centres;

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
    return redirect()->route('login');
});

Route::get('/token-generation', function () {
    return Inertia::render('TokenGeneration', [
        'centres' => App\Models\Centres::where('status','=','Active')->get()
    ]);
});

Route::resource('redirect', App\Http\Controllers\RedirectController::class);

Route::middleware('auth')->group(function () {
    Route::group(['prefix' => 'super-admin'], function () {
        Route::get('/dashboard', function () {
            return Inertia::render('SuperAdmin/Dashboard');
        })->name('super.dashboard');

        Route::resource('users', App\Http\Controllers\SuperAdmin\SuperAdminController::class);
        Route::get('/reports', function () {
            return Inertia::render('SuperAdmin/Reports');
        })->name('super.reports');

        Route::get('/organization-settings', function () {
            return Inertia::render('SuperAdmin/Settings');
        })->name('super.settings');

        Route::resource('centres', App\Http\Controllers\SuperAdmin\CentreManagementController::class);
        Route::put('centres/{id}/suspend', [App\Http\Controllers\SuperAdmin\CentreManagementController::class, 'suspend'])->name('centres.suspend');
    });

    Route::group(['prefix' => 'centre-admin'], function () {

        Route::get('/dashboard', function () {
            return Inertia::render('CentreAdmin/Dashboard');
        })->name('admin.dashboard');

        Route::resource('centre-settings', App\Http\Controllers\CentreAdmin\CentreManagementController::class);

    });
});

require __DIR__.'/auth.php';
