<?php

use App\Mail\CreateCommentMailAdmin;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-email', function () {
    $data = [
        'data' => "07/05/2024",
        'hora' => "11:22:55",
        'url' => env('URL_FRONT') . "/solicitacoes/detalhes/" . "68778687-fasdfsadf98-sfsfasfdsfkas-798saffa",
    ];

    return new CreateCommentMailAdmin($data);
});
