<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::create([
            'corporate_name' => 'Diego',
            'fantasy_name' => 'Inovasite',
            'cnpj' => '80.491.536/0001-96',
            'cpf' => '963.978.220-36',
            'responsible' => 'Diego',
            'email' => 'desenvolvimento@inovasite.com',
            'level' => 'ADMIN',
            'password' => Hash::make('123456'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        $this->call(ProjectSeeder::class);
    }
}
