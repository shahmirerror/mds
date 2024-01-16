<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('fetch-prev-regs', [App\Http\Controllers\API\ImportController::class, 'fetch_regs'])->name('import.regs');

Route::get('fetch-prev-meds', [App\Http\Controllers\API\ImportController::class, 'fetch_medicals'])->name('import.meds');
Route::get('fetch-prev-xrays', [App\Http\Controllers\API\ImportController::class, 'fetch_xrays'])->name('import.xrays');
Route::get('fetch-prev-labs', [App\Http\Controllers\API\ImportController::class, 'fetch_labs'])->name('import.labs');
Route::get('fetch-prev-labsticker', [App\Http\Controllers\API\ImportController::class, 'fetch_labsticker'])->name('import.labsticker');

//Super Admin API Routes

            //ModulesController
            Route::get('fetch-super-mods', [App\Http\Controllers\API\ModulesController::class, 'fetch_super'])->name('super.mods');

            //CentreManagementController
            Route::get('super-admin/centres/{id}/fetch-staff', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'fetch_users'])->name('super.centre.fetch_staff');
            Route::post('super-admin/centres/{id}/add-staff', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'store_user'])->name('super.centre.add_staff');
            Route::put('super-admin/centres/{id}/edit-staff', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'update_user'])->name('super.centre.edit_staff');
            Route::put('super-admin/centres/{id}/staff-status', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'update_user_status'])->name('super.centre.staff_status');
            Route::put('super-admin/centres/{module_id}/edit-lab-modules/{centre_id}', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'toggle_centre_lab_modules'])->name('super.centre.lab_modules');

            //ReportsController
            Route::get('super-admin/get-centres', [App\Http\Controllers\API\SuperAdmin\ReportsController::class, 'fetch_centres'])->name('super.reports.fetch_centres');
            Route::get('super-admin/get-reports', [App\Http\Controllers\API\SuperAdmin\ReportsController::class, 'fetch_reports'])->name('super.reports.fetch_reports');

            //SettingsController
            Route::get('super-admin/get-backup-logs', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'backup_logs'])->name('super.settings.fetch_logs');
            Route::get('super-admin/get-backup-settings', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'backup_settings'])->name('super.settings.fetch_settings');
            Route::put('super-admin/update-backup-settings/{id}', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'update_backup_settings'])->name('super.settings.update_settings');
            Route::get('super-admin/get-centre-devices', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'centre_devices'])->name('super.settings.fetch_devices');
            Route::post('super-admin/store-centre-devices', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'store_centre_devices'])->name('super.settings.store_devices');
            Route::put('super-admin/update-centre-devices/{id}', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'update_centre_devices'])->name('super.settings.update_devices');
            Route::delete('super-admin/delete-centre-devices/{id}', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'delete_centre_devices'])->name('super.settings.delete_devices');

//Centre Admin API Routes

            //ModulesController
            Route::get('fetch-admin-mods', [App\Http\Controllers\API\ModulesController::class, 'fetch_admin'])->name('admin.mods');

            //CentreManagementController
            Route::get('admin/centres/{id}/fetch-staff', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'fetch_users'])->name('admin.centre.fetch_staff');
            Route::post('admin/centres/{id}/add-staff', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'store_user'])->name('admin.centre.add_staff');
            Route::put('admin/centres/{id}/edit-staff', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'update_user'])->name('admin.centre.edit_staff');
            Route::put('admin/centres/{id}/staff-status', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'update_user_status'])->name('admin.centre.staff_status');
            Route::put('admin/centres/{module_id}/edit-lab-modules/{centre_id}', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'toggle_centre_lab_modules'])->name('admin.centre.lab_modules');

            //ReportsController
            Route::get('admin/get-reports', [App\Http\Controllers\API\CentreAdmin\ReportsController::class, 'fetch_reports'])->name('admin.reports.fetch_reports');

            //SettingsController
            Route::get('admin/get-centre-devices', [App\Http\Controllers\API\CentreAdmin\SettingsController::class, 'centre_devices'])->name('admin.settings.fetch_devices');
            Route::post('admin/store-centre-devices', [App\Http\Controllers\API\CentreAdmin\SettingsController::class, 'store_centre_devices'])->name('admin.settings.store_devices');
            Route::put('admin/update-centre-devices/{id}', [App\Http\Controllers\API\CentreAdmin\SettingsController::class, 'update_centre_devices'])->name('admin.settings.update_devices');
            Route::delete('admin/delete-centre-devices/{id}', [App\Http\Controllers\API\CentreAdmin\SettingsController::class, 'delete_centre_devices'])->name('admin.settings.delete_devices');