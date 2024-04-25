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
    echo $request->user();
});
// ->middleware('auth')
Route::get('fetch-prev-regs', [App\Http\Controllers\API\ImportController::class, 'fetch_regs'])->name('import.regs');
Route::get('fix-prev-regs', [App\Http\Controllers\API\ImportController::class, 'fix_regs'])->name('import.fix_regs');
Route::get('fix-xray-verif', [App\Http\Controllers\API\ImportController::class, 'fix_xray_verif'])->name('import.fix_xray_verif');
Route::get('fetch-prev-meds', [App\Http\Controllers\API\ImportController::class, 'fetch_medicals'])->name('import.meds');
Route::get('fetch-prev-xrays', [App\Http\Controllers\API\ImportController::class, 'fetch_xrays'])->name('import.xrays');
Route::get('fetch-prev-labs', [App\Http\Controllers\API\ImportController::class, 'fetch_labs'])->name('import.labs');
Route::get('fetch-prev-labsticker', [App\Http\Controllers\API\ImportController::class, 'fetch_labsticker'])->name('import.labsticker');

Route::get('fetch-prev-country', [App\Http\Controllers\API\ImportController::class, 'fetch_country'])->name('import.country');
Route::get('fetch-prev-agency', [App\Http\Controllers\API\ImportController::class, 'fetch_agency'])->name('import.agency');
Route::get('fetch-prev-profession', [App\Http\Controllers\API\ImportController::class, 'fetch_profession'])->name('import.profession');

Route::post('assign-new-token', [App\Http\Controllers\API\TokenManagementController::class, 'assign_token'])->name('token.assign');
Route::post('create-new-token', [App\Http\Controllers\API\TokenManagementController::class, 'new_token'])->name('token.new');
Route::post('now-serving', [App\Http\Controllers\API\TokenManagementController::class, 'now_serving'])->name('token.now_serving');

Route::post('create-new-feedback', [App\Http\Controllers\API\FeedbackController::class, 'new_feedback'])->name('feedback.new');

Route::post('fetch-passport', [App\Http\Controllers\API\PPScannerController::class, 'fetch_passport'])->name('ppscan.new');

//Super Admin API Routes

            //DashboardController
            Route::get('super-admin/fetch-centre-stats/{id}', [App\Http\Controllers\API\SuperAdmin\DashboardController::class, 'stats'])->name('super.centre.stats');
            Route::post('super-admin/fetch-centre-stats/{id}/seperate', [App\Http\Controllers\API\SuperAdmin\DashboardController::class, 'stats_separate'])->name('super.centre.stats_sep');

            //ModulesController
            Route::get('fetch-super-mods', [App\Http\Controllers\API\ModulesController::class, 'fetch_super'])->name('super.mods');

            //CentreManagementController
            Route::get('super-admin/centres/{id}/fetch-staff', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'fetch_users'])->name('super.centre.fetch_staff');
            Route::post('super-admin/centres/{id}/add-staff', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'store_user'])->name('super.centre.add_staff');
            Route::put('super-admin/centres/{id}/edit-staff', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'update_user'])->name('super.centre.edit_staff');
            Route::put('super-admin/centres/{id}/staff-status', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'update_user_status'])->name('super.centre.staff_status');
            Route::put('super-admin/centres/{module_id}/edit-lab-modules/{centre_id}', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'toggle_centre_lab_modules'])->name('super.centre.lab_modules');
            Route::get('super-admin/centres/fetch-lab-module-permissions/{centre_id}/{user_id}', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'fetch_lab_module_permissions'])->name('super.centre.lab_module_permissions');
            Route::post('super-admin/centres/{permission_id}/edit-lab-module-permissions/{user_id}', [App\Http\Controllers\API\SuperAdmin\CentreManagementController::class, 'toggle_lab_module_permissions'])->name('super.centre.toggle_lab_module_permissions');

            //ReportsController
            Route::get('super-admin/get-centres', [App\Http\Controllers\API\SuperAdmin\ReportsController::class, 'fetch_centres'])->name('super.reports.fetch_centres');
            Route::get('super-admin/get-countries', [App\Http\Controllers\API\SuperAdmin\ReportsController::class, 'fetch_countries'])->name('super.reports.fetch_countries');
            Route::get('super-admin/get-reports', [App\Http\Controllers\API\SuperAdmin\ReportsController::class, 'fetch_reports'])->name('super.reports.fetch_reports');
            Route::post('super-admin/generate-report', [App\Http\Controllers\API\SuperAdmin\ReportsController::class, 'generate_report'])->name('super.reports.generate_report');
            Route::post('super-admin/export-report/{type}', [App\Http\Controllers\API\SuperAdmin\ReportsController::class, 'export_report'])->name('super.reports.export_report');

            //SettingsController
            Route::get('super-admin/get-backup-logs', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'backup_logs'])->name('super.settings.fetch_logs');
            Route::get('super-admin/get-backup-settings', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'backup_settings'])->name('super.settings.fetch_settings');
            Route::post('super-admin/update-backup-settings', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'update_backup_settings'])->name('super.settings.update_settings');
            Route::get('super-admin/get-centre-devices', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'centre_devices'])->name('super.settings.fetch_devices');
            Route::post('super-admin/store-centre-devices', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'store_centre_devices'])->name('super.settings.store_devices');
            Route::put('super-admin/update-centre-devices/{id}', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'update_centre_devices'])->name('super.settings.update_devices');
            Route::delete('super-admin/delete-centre-devices/{id}', [App\Http\Controllers\API\SuperAdmin\SettingsController::class, 'delete_centre_devices'])->name('super.settings.delete_devices');

//Centre Admin API Routes

            //DashboardController
            Route::get('admin/fetch-centre-stats/{id}', [App\Http\Controllers\API\CentreAdmin\DashboardController::class, 'stats'])->name('admin.centre.stats');
            Route::post('admin/fetch-centre-stats/{id}/seperate', [App\Http\Controllers\API\CentreAdmin\DashboardController::class, 'stats_separate'])->name('admin.centre.stats_sep');

            //CandidatesController
            Route::get('admin/candidates/fetch-registration/{id}', [App\Http\Controllers\API\CentreAdmin\CandidatesController::class, 'fetch_reg'])->name('admin.candidate.fetch_reg');
            Route::get('admin/candidates/fetch-medical/{id}', [App\Http\Controllers\API\CentreAdmin\CandidatesController::class, 'fetch_medical'])->name('admin.candidate.fetch_medical');
            Route::get('admin/candidates/fetch-lab/{id}', [App\Http\Controllers\API\CentreAdmin\CandidatesController::class, 'fetch_lab'])->name('admin.candidate.fetch_lab');
            Route::get('admin/candidates/fetch-xray/{id}', [App\Http\Controllers\API\CentreAdmin\CandidatesController::class, 'fetch_xray'])->name('admin.candidate.fetch_xray');

            //ModulesController
            Route::get('fetch-admin-mods/{centre_id}', [App\Http\Controllers\API\ModulesController::class, 'fetch_admin'])->name('admin.mods');

            //CentreManagementController
            Route::get('admin/centres/{id}/fetch-staff/{userid}', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'fetch_users'])->name('admin.centre.fetch_staff');
            Route::post('admin/centres/{id}/add-staff', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'store_user'])->name('admin.centre.add_staff');
            Route::put('admin/centres/{id}/edit-staff', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'update_user'])->name('admin.centre.edit_staff');
            Route::put('admin/centres/{id}/staff-status', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'update_user_status'])->name('admin.centre.staff_status');
            Route::put('admin/centres/{module_id}/edit-lab-modules/{centre_id}', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'toggle_centre_lab_modules'])->name('admin.centre.lab_modules');
            Route::get('admin/centres/fetch-lab-module-permissions/{centre_id}/{user_id}', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'fetch_lab_module_permissions'])->name('admin.centre.lab_module_permissions');
            Route::post('admin/centres/{permission_id}/edit-lab-module-permissions/{user_id}', [App\Http\Controllers\API\CentreAdmin\CentreManagementController::class, 'toggle_lab_module_permissions'])->name('admin.centre.toggle_lab_module_permissions');

            //ReportsController
            Route::get('admin/get-reports', [App\Http\Controllers\API\CentreAdmin\ReportsController::class, 'fetch_reports'])->name('admin.reports.fetch_reports');
            Route::get('admin/get-countries', [App\Http\Controllers\API\CentreAdmin\ReportsController::class, 'fetch_countries'])->name('admin.reports.fetch_countries');
            Route::get('admin/get-reports', [App\Http\Controllers\API\CentreAdmin\ReportsController::class, 'fetch_reports'])->name('admin.reports.fetch_reports');
            Route::post('admin/generate-report', [App\Http\Controllers\API\CentreAdmin\ReportsController::class, 'generate_report'])->name('admin.reports.generate_report');
            Route::post('admin/export-report/{type}', [App\Http\Controllers\API\CentreAdmin\ReportsController::class, 'export_report'])->name('admin.reports.export_report');

            //SettingsController
            Route::get('admin/get-centre-devices', [App\Http\Controllers\API\CentreAdmin\SettingsController::class, 'centre_devices'])->name('admin.settings.fetch_devices');
            Route::post('admin/store-centre-devices', [App\Http\Controllers\API\CentreAdmin\SettingsController::class, 'store_centre_devices'])->name('admin.settings.store_devices');
            Route::put('admin/update-centre-devices/{id}', [App\Http\Controllers\API\CentreAdmin\SettingsController::class, 'update_centre_devices'])->name('admin.settings.update_devices');
            Route::delete('admin/delete-centre-devices/{id}', [App\Http\Controllers\API\CentreAdmin\SettingsController::class, 'delete_centre_devices'])->name('admin.settings.delete_devices');

//Lab Modules API Routes

Route::post('lab-modules/prints/log-attempts', [App\Http\Controllers\API\LabModulesController::class, 'log_print_attempts'])->name('prints.log_attempts');
            //XRAY Result
            Route::post('lab-modules/xray/fetch-result', [App\Http\Controllers\API\LabModulesController::class, 'fetch_xray_result'])->name('xray.fetch_result');
            //Registration Desk
            Route::post('lab-modules/fetch-registration', [App\Http\Controllers\API\LabModulesController::class, 'fetch_registration'])->name('lab.fetch_registration');
            Route::post('lab-modules/fetch-prev-registration', [App\Http\Controllers\API\LabModulesController::class, 'fetch_prev_registration'])->name('lab.fetch_prev_registration');
            Route::post('lab-modules/fetch-registration-edit', [App\Http\Controllers\API\LabModulesController::class, 'fetch_registration_edit'])->name('lab.fetch_registration_edit');
            Route::post('lab-modules/fetch-registration-repeat', [App\Http\Controllers\API\LabModulesController::class, 'fetch_registration_repeat'])->name('lab.fetch_registration_repeat');
            Route::post('lab-modules/store-registration', [App\Http\Controllers\API\LabModulesController::class, 'store_registration'])->name('lab.store_registration');
            Route::post('lab-modules/repeat-case-registration', [App\Http\Controllers\API\LabModulesController::class, 'repeat_case_registration'])->name('lab.repeat_case_registration');
            Route::post('lab-modules/update-registration', [App\Http\Controllers\API\LabModulesController::class, 'update_registration'])->name('lab.update_registration');
            Route::post('lab-modules/export-reg-report', [App\Http\Controllers\API\LabModulesController::class, 'export_reg_report'])->name('lab.export_reg_report');
            //Report
            Route::post('lab-modules/fetch-registration-print-normal', [App\Http\Controllers\API\LabModulesController::class, 'fetch_registration_print_normal'])->name('lab.fetch_registration_print_normal');
            Route::post('lab-modules/fetch-registration-print-passport', [App\Http\Controllers\API\LabModulesController::class, 'fetch_registration_print_passport'])->name('lab.fetch_registration_print_passport');
            Route::post('lab-modules/update-registration-portion', [App\Http\Controllers\API\LabModulesController::class, 'update_registration_portion'])->name('lab.update_registration_portion');
            Route::post('lab-modules/update-registration-status', [App\Http\Controllers\API\LabModulesController::class, 'update_registration_status'])->name('lab.update_registration_status');
            Route::post('lab-modules/export-final-report', [App\Http\Controllers\API\LabModulesController::class, 'export_final_report'])->name('lab.export_final_report');
            Route::post('lab-modules/export-embassy-report', [App\Http\Controllers\API\LabModulesController::class, 'export_embassy_report'])->name('lab.export_embassy_report');
            //Barcode
            Route::post('lab-modules/barcode/fetch', [App\Http\Controllers\API\LabModulesController::class, 'fetch_barcode'])->name('barcode.new');
            //Biometric
            Route::post('lab-modules/biometric/fetch', [App\Http\Controllers\API\LabModulesController::class, 'fetch_by_fingerprint'])->name('lab.fetch_by_fingerprint');
            //Passport Verification
            Route::post('lab-modules/verify-passport', [App\Http\Controllers\API\LabModulesController::class, 'verify_passport'])->name('lab.verify_passport');
            //Sample Collection
            Route::post('lab-modules/collect-sample', [App\Http\Controllers\API\LabModulesController::class, 'collect_sample'])->name('lab.collect_sample');
            //Xray
            Route::post('lab-modules/verify-xray', [App\Http\Controllers\API\LabModulesController::class, 'verify_xray'])->name('lab.verify_xray');
            Route::post('lab-modules/store-xray-result', [App\Http\Controllers\API\LabModulesController::class, 'store_xray_result'])->name('lab.store_xray_result');
            Route::post('lab-modules/update-xray-result', [App\Http\Controllers\API\LabModulesController::class, 'update_xray_result'])->name('lab.update_xray_result');
            //Lab Result
            Route::post('lab-modules/store-lab-result', [App\Http\Controllers\API\LabModulesController::class, 'store_lab_result'])->name('lab.store_lab_result');
            Route::post('lab-modules/update-lab-result', [App\Http\Controllers\API\LabModulesController::class, 'update_lab_result'])->name('lab.update_lab_result');
            //Medical
            Route::post('lab-modules/store-medical-result', [App\Http\Controllers\API\LabModulesController::class, 'store_medical_result'])->name('lab.store_medical_result');
            Route::post('lab-modules/update-medical-result', [App\Http\Controllers\API\LabModulesController::class, 'update_medical_result'])->name('lab.update_medical_result');
            //Report Issue
            Route::post('lab-modules/report-issue', [App\Http\Controllers\API\LabModulesController::class, 'report_issue'])->name('lab.report_issue');
            //Print Sticker
            Route::post('lab-modules/print-sticker', [App\Http\Controllers\API\LabModulesController::class, 'print_sticker'])->name('lab.print_sticker');
            //ENO
            Route::post('lab-modules/make-eno', [App\Http\Controllers\API\LabModulesController::class, 'make_eno'])->name('lab.submit_eno');

//Centre Staff API Routes

            //CandidatesController
            Route::get('staff/candidates/fetch-registration/{id}', [App\Http\Controllers\API\CentreStaff\CandidatesController::class, 'fetch_reg'])->name('staff.candidate.fetch_reg');
            Route::get('staff/candidates/fetch-medical/{id}', [App\Http\Controllers\API\CentreStaff\CandidatesController::class, 'fetch_medical'])->name('staff.candidate.fetch_medical');
            Route::get('staff/candidates/fetch-lab/{id}', [App\Http\Controllers\API\CentreStaff\CandidatesController::class, 'fetch_lab'])->name('staff.candidate.fetch_lab');
            Route::get('staff/candidates/fetch-xray/{id}', [App\Http\Controllers\API\CentreStaff\CandidatesController::class, 'fetch_xray'])->name('staff.candidate.fetch_xray');

            //ModulesController
            Route::get('fetch-staff-mods/{centre_id}/{user_id}', [App\Http\Controllers\API\ModulesController::class, 'fetch_staff'])->name('staff.mods');

            Route::get('lab/status-restore', [App\Http\Controllers\API\LabModulesController::class, 'status_restore'])->name('lab.status_restore');
