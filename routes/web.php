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
        Route::post('centres/{id}', [App\Http\Controllers\SuperAdmin\CentreManagementController::class, 'update'])->name('centres.update');
        Route::put('centres/{id}/suspend', [App\Http\Controllers\SuperAdmin\CentreManagementController::class, 'suspend'])->name('centres.suspend');
    });

    Route::group(['prefix' => 'centre-admin'], function () {

        Route::get('/dashboard', function () {
            return Inertia::render('CentreAdmin/Dashboard');
        })->name('admin.dashboard');

        Route::resource('candidates', App\Http\Controllers\CentreAdmin\CandidatesController::class);

        Route::resource('centre-settings', App\Http\Controllers\CentreAdmin\CentreManagementController::class);

    });

    Route::group(['prefix' => 'centre'], function () {

        Route::get('/registration-desk', function () {
            return Inertia::render('LabModules/Registration');
        })->name('registration-desk.index');

        Route::get('/passport-verification', function () {
            return Inertia::render('LabModules/PassportVerification');
        })->name('passport-verification.index');

        Route::get('/sample-collection', function () {
            return Inertia::render('LabModules/SampleCollection');
        })->name('sample-collection.index');

        Route::get('/medical-examination', function () {
            return Inertia::render('LabModules/MedicalExamination');
        })->name('medical-examination.index');

        Route::get('/lab-result', function () {
            return Inertia::render('LabModules/LabResult');
        })->name('lab-result.index');

        Route::get('/lab-sticker', function () {
            return Inertia::render('LabModules/LabStickers');
        })->name('lab-sticker.index');

        Route::resource('xray-verification', App\Http\Controllers\LabModules\XRAYVerificationController::class);

        Route::resource('xray-result', App\Http\Controllers\LabModules\XRAYResultController::class);

        Route::resource('centre-settings', App\Http\Controllers\CentreAdmin\CentreManagementController::class);

    });
});

require __DIR__.'/auth.php';
