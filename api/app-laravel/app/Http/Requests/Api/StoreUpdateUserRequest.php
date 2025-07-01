<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateUserRequest extends FormRequest
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
        $id = $this->id ?? '';
        //dd($this->segment(4));

        $rules = [
            'name' => [
                'required',
                'min:3',
                'max:255',
            ],
            'corporate_name' => [
                'nullable',
            ],
            'cnpj' => [
                'nullable',
            ],
            'fantasy_name' => [
                'required',
                'min:3',
                'max:255',
            ],
            'level' => [
                'required',
                Rule::in(['ADMIN', 'EDITOR', 'CLIENTE'])
            ],
            'email' => [
                'required',
                'email',
                'min:3',
                'max:255',
                Rule::unique('users')->ignore($this->segment(4))
            ],
            'cpf' => [
                'nullable',
                'min:3',
                'max:255',
                Rule::unique('users')->ignore($this->segment(4))
            ],
            'address' => 'nullable',
            'zipcode' => 'nullable',
            'city' => 'nullable',
            'state' => 'nullable',
            'password' => [
                'required',
                'min:6',
                'max:100',
            ],
        ];

        if ($this->method() === 'PATCH' || $this->method() === 'POST') {
            // $rules['email'] = [
            //     'required',
            //     'email',
            //     'max:255',
            //     // "unique:users,email,{$id},id",
            //     Rule::unique('users')->ignore($this->segment(4))
            // ];

            $rules = [
                'address' => 'nullable',
                'zipcode' => 'nullable',
                'city' => 'nullable',
                'state' => 'nullable',
                'password' => [
                    'nullable',
                    'min:6',
                    'max:100',
                ],
            ];

            // $rules['password'] = [
            //     'nullable',
            //     'min:6',
            //     'max:100',
            // ];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'email.required'     => 'O campo email é de preenchimento obrigatório.',
            'email.email'        => 'O e-mail informato tem o formato inválido.',
            'email.unique'       => 'O e-mail informato já está sendo usado.',
            'password.required'  => 'O campo senha é de preenchimento obrigatório.',
            'password.min'       => 'A senha precisa ter no minimo 6 caracteres.',
        ];
    }
}
