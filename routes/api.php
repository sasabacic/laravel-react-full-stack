<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\UserController;
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

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    // Common `/trainings` route for both roles
    Route::get('/trainings', [TrainingController::class, 'index']);

    // Admin only routes
    Route::middleware('role:admin')->group(function(){
        // Manage the users
        Route::apiResource('/users', UserController::class);
        // Manage all trainings (admin can see all)
        Route::apiResource('/trainings', TrainingController::class)->only(['destroy']);
    });

    // Normal user routes (only their own trainings)
    Route::middleware('role:user')->group(function(){
        // Create a new training
        Route::post('/trainings', [TrainingController::class, 'store']);
        // Update their own training
        Route::put('/trainings/{training}', [TrainingController::class, 'update']);
    });
});

// Public access routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);