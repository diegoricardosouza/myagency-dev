<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'responsible' => [
                'nullable',
                'min:3',
                'max:255',
            ],
            'corporate_name' => [
                'nullable',
            ],
            'cnpj' => [
                'nullable',
                'min:3',
                'max:255',
                Rule::unique('users')->ignore($this->segment(4))
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
            'neighborhood' => 'nullable',
            'state' => 'nullable',
            'number' => 'nullable',
            'phone' => 'nullable',
            'cellphone' => [
                'nullable',
                'min:13',
                'max:255',
            ],
            'site' => 'nullable',
            'password' => [
                'nullable',
                'min:6',
                'max:100',
            ],
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'fantasy_name.required' => 'O campo nome fantasia é de preenchimento obrigatório.',
            'level.required'        => 'O campo nível é de preenchimento obrigatório.',
            'cellphone.min'         => 'O campo celular precisa ter no mínimo 13 caracteres.',
            'email.required'        => 'O campo email é de preenchimento obrigatório.',
            'email.email'           => 'O e-mail informato tem o formato inválido.',
            'email.unique'          => 'O e-mail informado já está sendo usado.',
            'cpf.unique'            => 'O CPF informado já está sendo usado.',
            'cnpj.unique'           => 'O CNPJ informado já está sendo usado.',
            'password.required'     => 'O campo senha é de preenchimento obrigatório.',
            'password.min'          => 'A senha precisa ter no minimo 6 caracteres.',
        ];
    }
}
