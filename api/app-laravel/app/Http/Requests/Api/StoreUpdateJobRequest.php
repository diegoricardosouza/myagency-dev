<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules =[
            'type' => 'nullable',
            'status' => [
                Rule::in(['pending', 'approving', 'changing', 'approved'])
            ],
            'files' => 'array',
            'files.*' => 'mimes:jpeg,png,jpg,gif,pdf,svg,doc,docx,csv,xlsx,txt,zip,rar,webp,avif,ico|max:20000',
        ];

        if ($this->method() === 'PATCH') {
            $rules['type'] = [
                'nullable'
            ];
        }

        return $rules;
    }
}
