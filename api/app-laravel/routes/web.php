<?php

use App\Mail\CreateCommentMailAdmin;
use App\Mail\CreateProjectMail;
use App\Mail\FinancialAnalysisMail;
use App\Mail\FinishedProjectMail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

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

// Preflight (OPTIONS)
Route::options('files/{path}', function (Request $request, $path) {
    $origin = $request->header('Origin');

    return response('', 204)
        ->withHeaders([
            'Access-Control-Allow-Origin'      => $origin,
            'Access-Control-Allow-Methods'     => 'GET, OPTIONS',
            'Access-Control-Allow-Headers'     => $request->header('Access-Control-Request-Headers'),
            'Access-Control-Allow-Credentials' => 'true',
        ]);
})->where('path', '.*');

// GET — serve o arquivo e injeta CORS dinâmico
Route::get('files/{path}', function (Request $request, $path) {
    $full = storage_path('app/public/' . $path);
    if (! file_exists($full)) {
        abort(404);
    }

    $origin = $request->header('Origin');

    /** @var BinaryFileResponse $response */
    $response = response()->file($full);
    $response->headers->set('Access-Control-Allow-Origin', $origin);
    $response->headers->set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    $response->headers->set('Access-Control-Allow-Credentials', 'true');

    return $response;
})->where('path', '.*');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-email', function () {
    $data = [
        'cliente' => "Projeto Teste",
        'content' => '<p>🖥️ <b>Seus dados de acesso ao Minha Agência:</b><br>
        Link de Acesso: minhaagencia.inovasite.com<br><br>
        <a href="https://www.youtube.com/watch?v=JbdH5WJixXM&ab_channel=inovasite">▶️ Assista ao tutorial de como usar o Minha Agência</a></p>'
    ];

    return new CreateProjectMail($data, 'teste@teste.com');
});
