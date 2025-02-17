<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateProjectRequest extends FormRequest
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
        $rules = [
            'type' => 'required',
            'project_name' => 'required',
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'number_pages' => 'required|int',
            'technical_information' => 'nullable',
            'observations' => 'nullable',
            'value_project' => 'required|numeric',
            'payment_method' => 'required',
            'installment' => 'nullable|int',
            'other' => 'nullable',
            'entry_payment' => 'nullable|numeric',
            'proof' => 'nullable',
            'plan_id' => 'required',
            'plan_name' => 'nullable',
            'signed_contract' => 'required',
            'outsource' => 'nullable',
            'closing_date' => 'required',
            'calendar_days' => 'required|int',
            'pages' => 'required|array',
            'pages.*' => 'required|string'
        ];

        return $rules;
    }
}
