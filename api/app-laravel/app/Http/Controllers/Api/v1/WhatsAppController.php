<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class WhatsAppController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'phone'   => 'required|string',
            'message' => 'required|string',
        ]);

        $token   = config('services.whatsapp.token');
        $phoneId = config('services.whatsapp.phone_id');
        $url     = "https://graph.facebook.com/"
            . config('services.whatsapp.version')
            . "/{$phoneId}/messages";

        $response = Http::withToken($token)
            ->post($url, [
                'messaging_product' => 'whatsapp',
                'to'                => $request->phone,
                'type'              => 'text',
                'text'              => [
                    'body' => $request->message
                ],
            ]);

        if ($response->failed()) {
            return response()->json([
                'success' => false,
                'error'   => $response->json(),
            ], $response->status());
        }

        return response()->json([
            'success' => true,
            'data'    => $response->json(),
        ]);
    }
}
