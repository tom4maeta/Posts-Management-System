<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are for your SPA: authentication and post management.
| Sanctum protects routes using cookies. Make sure your React app
| calls /sanctum/csrf-cookie first!
|
*/

// ------------------------------------
// Sanctum CSRF cookie endpoint
// ------------------------------------
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['status' => 'OK']);
});

// ------------------------------------
// Public Auth routes
// ------------------------------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ------------------------------------
// Protected routes (require auth:sanctum)
// ------------------------------------
Route::middleware('auth:sanctum')->group(function () {

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Get authenticated user info
    Route::get('/user', [AuthController::class, 'user']);

    // Posts
    Route::get('/posts', [PostController::class, 'index']);          // List posts
    Route::post('/posts', [PostController::class, 'createPost']);    // Create post
    Route::delete('/posts/{id}', [PostController::class, 'destroy']); // Delete post
});