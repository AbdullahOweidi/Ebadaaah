<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// This is a simple test API for you and your team
Route::get('/test', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Laravel backend is live on Render!',
        'environment' => app()->environment(),
        'timestamp' => now()->toDateTimeString(),
        'team' => 'Abdallah & Crew'
    ]);
});

// Default user route (requires authentication usually)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});