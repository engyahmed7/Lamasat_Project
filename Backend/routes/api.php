<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\projectController;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\UserResource;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("v1")->group(function () {
    #AUTH
    Route::get('projects/all', [projectController::class, 'showAllProjects']); // GET
    Route::get('projects/show/{projectId}', [ProjectController::class, 'show']); // GET
    Route::post('offers/add', [OfferController::class, 'add']); // POST
    //Login
    Route::post('login', [AuthController::class, 'login']);

    // Google authentication
    Route::get('auth/google', [AuthController::class, 'redirectToGoogle']);
    Route::get('auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

    #Admin
    Route::middleware('admin')->group(function () {
        Route::prefix("projects")->group(function () {
            Route::post('add', [projectController::class, 'add']); // POST
            Route::get('delete/{projectId}', [projectController::class, 'delete']); // GET
        });
        Route::prefix('offers')->group(function () {
            Route::get('all', [OfferController::class, 'showAllOffers']); // GET
            Route::get('show/{offerId}', [OfferController::class, 'show']); // GET
            Route::get('delete/{offerId}', [OfferController::class, 'deleteOffer']); // GET
        });

        //Change_Password
        Route::post('changePassword', [AuthController::class, 'changePassword']); // POST
        //Logout
        Route::get('logout', [AuthController::class, 'logout']); // GET
    });

    #Super_Admin
    Route::middleware('super_admin')->group(function () {
        Route::get('admins', [AuthController::class, 'showAllAdmins']);
        Route::post('addAdmin', [AuthController::class, 'addAdmin']); // POST
        Route::get('deleteAdmin/{adminId}', [AuthController::class, 'deleteAdmin']); // GET
    });

});
