<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SupervisorController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (Require a valid Bearer token)
Route::middleware('auth:sanctum')->group(function () {
    
    // Add a supervisor
    Route::post('/supervisors', [SupervisorController::class, 'store']);
    
    // Retrieve the currently authenticated user's details
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

});