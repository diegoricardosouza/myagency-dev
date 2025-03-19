<?php

use App\Mail\CreateCommentMailAdmin;
use App\Mail\FinancialAnalysisMail;
use App\Mail\FinishedProjectMail;
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
        'email' => "teste@teste.com",
        'content' => '<p>🖥️ <b>Seus dados de acesso ao Minha Agência:</b><br>
        Link de Acesso: minhaagencia.inovasite.com<br><br>
        <a href="https://www.youtube.com/watch?v=JbdH5WJixXM&ab_channel=inovasite">▶️ Assista ao tutorial de como usar o Minha Agência</a></p>'
    ];

    return new FinishedProjectMail($data);
});
