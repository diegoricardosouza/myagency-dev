<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\CommentController;
use App\Http\Controllers\Api\v1\FileCommentController;
use App\Http\Controllers\Api\v1\FileController;
use App\Http\Controllers\Api\v1\JobController;
use App\Http\Controllers\Api\v1\OrderController;
use App\Http\Controllers\Api\v1\PlanController;
use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function() {
    Route::post('/login', [AuthController::class, 'auth']);
    Route::post('/register', [AuthController::class, 'store']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get("/users/me/", [AuthController::class, 'me']);
        Route::apiResource('/plans', PlanController::class);
        Route::apiResource('/users', UserController::class);
        Route::post("/users/{id}", [UserController::class, 'update']);
        Route::apiResource('/jobs', JobController::class);
        Route::get("/jobs-all", [JobController::class, 'showAll']);
        Route::get("/jobs-count", [JobController::class, 'count']);
        Route::apiResource('/files', FileController::class);
        Route::apiResource('/comments', CommentController::class);
        Route::apiResource('/files-comments', FileCommentController::class);
        Route::apiResource('/orders', OrderController::class);
    });

    // Route::post('/users/{id}', [UserController::class, 'update']);
});

Route::get('/', fn () => response()->json(['message' => 'ok']));
