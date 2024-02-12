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
            return Inertia::render('SuperAdmin/Dashboard', ['centres' => Centres::select('id as value','name as label')->where('status','Active')->get()]);
        })->name('super.dashboard');

        Route::resource('users', App\Http\Controllers\SuperAdmin\SuperAdminController::class);
        Route::post('users/{id}/update', [App\Http\Controllers\SuperAdmin\SuperAdminController::class, 'update'])->name('users.update');
        Route::get('/reports', function () {
            return Inertia::render('SuperAdmin/Reports');
        })->name('super.reports');

        Route::resource('organization-settings', App\Http\Controllers\SuperAdmin\OrganizationSettingsController::class);

        Route::resource('centres', App\Http\Controllers\SuperAdmin\CentreManagementController::class);
        Route::post('centres/{id}', [App\Http\Controllers\SuperAdmin\CentreManagementController::class, 'update'])->name('centres.update');
        Route::put('centres/{id}/suspend', [App\Http\Controllers\SuperAdmin\CentreManagementController::class, 'suspend'])->name('centres.suspend');
    });

    Route::group(['prefix' => 'centre-admin'], function () {

        Route::get('/dashboard', function () {
            return Inertia::render('CentreAdmin/Dashboard');
        })->name('admin.dashboard');

        Route::get('/reports', function () {
            return Inertia::render('CentreAdmin/Reports');
        })->name('admin.reports');

        Route::resource('nationality-setup', App\Http\Controllers\CentreAdmin\NationalityController::class);
        Route::resource('profession-setup', App\Http\Controllers\CentreAdmin\ProfessionController::class);
        Route::resource('agency-setup', App\Http\Controllers\CentreAdmin\AgencyController::class);
        Route::resource('place-of-issue-setup', App\Http\Controllers\CentreAdmin\PlaceOfIssueController::class);
        Route::resource('country-setup', App\Http\Controllers\CentreAdmin\CountryController::class);

        Route::resource('candidates', App\Http\Controllers\CentreAdmin\CandidatesController::class);

        Route::resource('centre-settings', App\Http\Controllers\CentreAdmin\CentreManagementController::class);

    });

    Route::group(['prefix' => 'centre'], function () {

        Route::resource('registration-desk', App\Http\Controllers\LabModules\RegistrationsController::class);

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

        Route::get('/electronic-number', function () {
            return Inertia::render('LabModules/ENO/Update');
        })->name('electronic-number.index');

        Route::get('/print-report', function () {
            return Inertia::render('LabModules/PrintReport');
        })->name('print-report.index');

        Route::get('/duplicate-lab-stickers', function () {
            return Inertia::render('LabModules/DuplicateLabStickers');
        })->name('duplicate-lab-stickers.index');

        Route::get('/token-status', function () {
            return Inertia::render('LabModules/TokenStatus');
        })->name('token-status.index');

        Route::resource('xray-verification', App\Http\Controllers\LabModules\XRAYVerificationController::class);

        Route::resource('xray-result', App\Http\Controllers\LabModules\XRAYResultController::class);

        Route::resource('centre-settings', App\Http\Controllers\CentreAdmin\CentreManagementController::class);

    });
});

require __DIR__.'/auth.php';
