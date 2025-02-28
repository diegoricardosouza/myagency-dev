<?php

namespace Database\Seeders;

use App\Models\Checklist;
use App\Models\PageProject;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Project; // Certifique-se de que este model existe e está configurado para gerar o UUID automaticamente
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        // Recupera um usuário existente ou cria um se nenhum for encontrado
        // $user = User::inRandomOrder()->first();


        // Configura o Faker para pt_BR (opcional)
        $faker = \Faker\Factory::create('pt_BR');
        $user = User::create([
            'corporate_name' => $faker->company,
            'fantasy_name' => 'Inovasite',
            'cnpj' => '78.065.983/0001-31',
            'cpf' => '649.575.030-79',
            'responsible' => $faker->name(),
            'zipcode' => $faker->postcode(),
            'address' => $faker->streetAddress(),
            'city' => $faker->city(),
            'neighborhood' => $faker->citySuffix(),
            'state' => $faker->stateAbbr(),
            'number' => $faker->buildingNumber(),
            'phone' => $faker->phoneNumber(),
            'cellphone' => $faker->phoneNumber(),
            'site' => $faker->url,
            'email' => $faker->unique()->safeEmail(),
            'level' => 'CLIENTE',
            'password' => Hash::make('123456'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        // Arrays com os planos (os índices correspondem)
        $plansId = ['9dedc613-bd7c-4f28-b9af-4af3464f5b5c', '9cec0007-351b-4bb6-a2aa-0f32e1a3a6da'];
        $plansName = ['Start', 'Agências - Ouro'];

        for ($i = 0; $i < 10; $i++) {
            // Seleciona um índice aleatório que irá pegar o par de plano
            $randomIndex = array_rand($plansId);
            $selectedPlanId = $plansId[$randomIndex];
            $selectedPlanName = $plansName[$randomIndex];

            // Gera um número aleatório de páginas para o projeto
            $numberPages = $faker->numberBetween(1, 100);
            // Define se o projeto estará finalizado para definir a finished_date
            $finished = $faker->boolean;

            // Cria o projeto utilizando Eloquent (o id é gerado automaticamente)
            $project = Project::create([
                'user_id'               => $user->id,
                'project_name'          => $faker->sentence(3),
                'type'                  => $faker->randomElement(['Site Template', 'Site Personalizado', 'Landing Page', 'Sistema']),
                'name'                  => $faker->name,
                'phone'                 => $faker->phoneNumber,
                'email'                 => $faker->unique()->safeEmail,
                'number_pages'          => $numberPages,
                'technical_information' => $faker->paragraph,
                'observations'          => $faker->paragraph,
                'value_project'         => $faker->randomFloat(2, 100, 10000),
                'payment_method'        => $faker->randomElement(['À Vista', 'Cartão de Crédito', 'Pix', 'Boleto']),
                'installment'           => $faker->numberBetween(1, 12),
                'other'                 => $faker->word,
                'entry_payment'         => $faker->randomFloat(2, 10, 500),
                'proof'                 => $faker->imageUrl(),
                'plan_id'               => $selectedPlanId,
                'plan_name'             => $selectedPlanName,
                'signed_contract'       => $faker->randomElement(['Sim', 'Não', 'Aguardando']),
                'outsource'             => $faker->name,
                'temporary_link'        => $faker->url,
                'closing_date'          => $faker->dateTimeBetween('-1 years', 'now'),
                'calendar_days'         => $faker->numberBetween(1, 365),
                'finished'              => $finished,
                'finished_date'         => $finished ? $faker->dateTimeBetween('-1 years', 'now') : null,
            ]);

            // Para cada página definida em number_pages, insere um registro na tabela page_projects
            for ($j = 1; $j <= $numberPages; $j++) {
                PageProject::create([
                    'name'       => "Página {$j}",
                    'project_id' => $project->id
                ]);
            }

            $numberChecklists = $faker->numberBetween(3, 10);
            for ($k = 1; $k <= $numberChecklists; $k++) {
                Checklist::create([
                    'name'       => "Checklist {$k} - " . $faker->word,
                    'project_id' => $project->id,
                    'active'     => $faker->boolean(40)
                ]);
            }
        }

        // Cria, no máximo, 5 checklists globais (sem project_id)
        $globalChecklistsCount = $faker->numberBetween(1, 3);
        for ($g = 1; $g <= $globalChecklistsCount; $g++) {
            Checklist::create([
                'name'       => "Global Checklist {$g} - " . $faker->word,
                'project_id' => null,
                'active'     => false
            ]);
        }
    }
}
