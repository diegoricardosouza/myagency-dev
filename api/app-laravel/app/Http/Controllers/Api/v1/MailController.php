<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Mail\FinancialAnalysisMail;
use App\Mail\FinishedProjectMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Response;

class MailController extends Controller
{
    public function verifyFinance(Request $request)
    {
        $mail = Mail::to(env('EMAIL_FINANCEIRO'))->send(new FinancialAnalysisMail([
            'url' => $request->get('url'),
            'project' => $request->get('project'),
            'company' => $request->get('company'),
            'responsible' => $request->get('responsible'),
        ]));

        if(!$mail) {
            return response()->json([
                'error' => 'Error send mail'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json(['message' => 'email sent successfully'], Response::HTTP_OK);
    }

    public function finishedProject(Request $request)
    {
        $email = $request->get('email');

        if(!$email) {
            return response()->json([
                'error' => 'Error send mail, email not provided.'
            ], Response::HTTP_BAD_REQUEST);
        }

        $mailFinished = Mail::to($email)->send(new FinishedProjectMail([
            'email' => $request->get('email'),
            'content' => $request->get('content'),
        ]));

        if (!$mailFinished) {
            return response()->json([
                'error' => 'Error send mail'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json(['message' => 'email sent successfully'], Response::HTTP_OK);
    }
}
