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

Route::resource('redirect', App\Http\Controllers\RedirectController::class);

Route::middleware('auth')->group(function () {

    Route::get('now-serving', function () {
        return Inertia::render('NowServing');
    });

    Route::get('/token-generation', function () {
        return Inertia::render('TokenGeneration', [
            'centres' => App\Models\Centres::where('status','=','Active')->get(),
            'printerIP' => $_SERVER['REMOTE_ADDR']
        ]);
    })->name('token-generation-page');
    
    Route::get('/feedback', function () {
        return Inertia::render('Feedback', [
            'centres' => App\Models\Centres::where('status','=','Active')->get()
        ]);
    })->name('feedback-page');
    
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

    Route::group(['prefix' => 'centre-staff'], function () {

        Route::get('/dashboard', function () {
            return Inertia::render('CentreStaff/Dashboard');
        })->name('staff.dashboard');

        Route::get('/reports', function () {
            return Inertia::render('CentreStaff/Reports');
        })->name('staff.reports');
        Route::resource('nationalitysetup', App\Http\Controllers\CentreStaff\NationalityController::class);
        Route::resource('professionsetup', App\Http\Controllers\CentreStaff\ProfessionController::class);
        Route::resource('agencysetup', App\Http\Controllers\CentreStaff\AgencyController::class);
        Route::resource('place-of-issuesetup', App\Http\Controllers\CentreStaff\PlaceOfIssueController::class);
        Route::resource('countrysetup', App\Http\Controllers\CentreStaff\CountryController::class);

    });

    Route::group(['prefix' => 'centre'], function () {

        Route::resource('candidates-in-centre', App\Http\Controllers\CentreStaff\CandidatesController::class);

        Route::resource('registration-desk', App\Http\Controllers\LabModules\RegistrationsController::class);
        Route::post('registration-desk/update', [App\Http\Controllers\LabModules\RegistrationsController::class, 'update'])->name('registration-desk.update');
        Route::post('registration-desk/store', [App\Http\Controllers\LabModules\RegistrationsController::class, 'store'])->name('registration-desk.store');

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

        Route::get('/report-issuance', function () {
            return Inertia::render('LabModules/ReportIssuance');
        })->name('report-issuance.index');

        Route::get('/duplicate-lab-stickers', function () {
            return Inertia::render('LabModules/DuplicateLabStickers');
        })->name('duplicate-lab-stickers.index');

        Route::resource('token-status', App\Http\Controllers\LabModules\TokenStatusController::class);

        Route::resource('xray-verification', App\Http\Controllers\LabModules\XRAYVerificationController::class);

        Route::resource('xray-result', App\Http\Controllers\LabModules\XRAYResultController::class);

        Route::resource('centre-settings', App\Http\Controllers\CentreAdmin\CentreManagementController::class);

    });
});

require __DIR__.'/auth.php';
