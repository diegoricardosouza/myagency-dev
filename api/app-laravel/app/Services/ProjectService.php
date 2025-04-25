<?php

namespace App\Services;

use App\Mail\CreateProjectMail;
use App\Models\Checklist;
use App\Models\PageProject;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;

class ProjectService
{
    public function __construct(
        protected Project $repository,
        protected PageProject $repositoryPages,
        protected Checklist $repositoryChecklist
    ) {
    }

    public function getAll($perPage = 50)
    {
        return $this->repository
                    ->orderBy('created_at', 'desc')
                    ->paginate($perPage);
    }

    public function getAllNoPagination($finished)
    {
        $query = $this->repository->orderBy('created_at', 'desc');

        if ($finished !== null) {
            $finished = filter_var($finished, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            $query->when(!is_null($finished), function ($query) use ($finished) {
                return $query->where('finished', $finished);
            });
        }

        if(Auth::user()->level != 'ADMIN') {
            $query->where('user_id', Auth::user()->id);
        }

        return $query->get();

        // return $this->repository
        //     ->when(!is_null($finished), function ($query) use ($finished) {
        //         return $query->where('finished', $finished);
        //     })
        //     ->orderBy('created_at', 'desc')
        //     ->get();
    }

    public function new($data, $pages, $checklists = null)
    {
        if (!empty($data['proof'])) {
            $data['proof'] = $data['proof']->storeAs('projects', $data['proof']->hashName());
        }

        // dd($checklists);

        $project = $this->repository->create($data);
        if(!empty($pages)) {
            foreach ($pages as $pageName) {
                $this->repositoryPages->create([
                    'name' => $pageName,
                    'project_id' => $project->id
                ]);
            }
        }

        if(!empty($checklists)) {
            foreach ($checklists as $checklist) {
                $this->repositoryChecklist->create([
                    'name' => $checklist['name'],
                    'active' => false,
                    'project_id' => $project->id
                ]);
            }
        }

        //TODO: ENVIAR EMAIL PARA O FINANCEIRO E COMERCIAL -  financeiro@inovasite.com e marcelo@inovasite.com
        $projectAfterCreation = $this->repository->with(['pages', 'user'])->where('id', $project->id)->first();
        foreach (['financeiro@inovasite.com', 'marcelo@inovasite.com'] as $recipient) {
            // Mail::to($recipient)->send(new OrderShipped($order));
            $this->sendMailCreateProject($projectAfterCreation, $recipient);
        }

        return $project;
    }

    public function findOne($id)
    {
        return $this->repository->findOrFail($id);
    }

    public function update($data, $pages, $checklists, $id)
    {
        $project = $this->repository->findOrFail($id);

        // Atualizar a prova se houver upload
        if (!empty($data['proof'])) {
            if (!empty($data['proof']) && Storage::exists($project->proof)) {
                Storage::delete($project->proof);
            }
            $data['proof'] = $data['proof']->storeAs('projects', $data['proof']->hashName());
        }

        $project->update($data);

        // dd($project);

        // Atualizar páginas
        if($pages) {
            $existingPages = $project->pages->pluck('name')->toArray();
            $pagesToDelete = array_diff($existingPages, $pages);
            $pagesToAdd = array_diff($pages, $existingPages);

            if ($pagesToDelete) {
                $project->pages()->whereIn('name', $pagesToDelete)->delete();
            }
            foreach ($pagesToAdd as $pageName) {
                $project->pages()->create(['name' => $pageName]);
            }
        }

        // Atualizar checklists
        // Extraímos os nomes dos checklists enviados (array de arrays)
        if($checklists) {
            $newChecklistNames = array_column($checklists, 'name');
            $existingChecks = $project->checklists->pluck('name')->toArray();

            $checksToDelete = array_diff($existingChecks, $newChecklistNames);
            $checksToAdd = array_diff($newChecklistNames, $existingChecks);

            if ($checksToDelete) {
                $project->checklists()->whereIn('name', $checksToDelete)->delete();
            }
            foreach ($checksToAdd as $checkName) {
                $project->checklists()->create(['name' => $checkName, 'active' => false]);
            }
        }

        return $project;
    }

    public function delete($id)
    {
        $projects = $this->repository->findOrFail($id);

        if ($projects->proof && Storage::exists($projects->proof)) {
            Storage::delete($projects->proof);
        }

        $projects->delete();
    }

    public function sendMailCreateProject($project, $emails)
    {
        $urlFile = [];
        foreach ($project->pages as $page) {
            $urlFile[] = $page->name;
        }

        Mail::to($emails)->send(new CreateProjectMail([
            'cliente' => $project->user->corporate_name,
            'nomeprojeto' => $project->project_name,
            'tipoprojeto' => $project->type,
            'nomeresponsavel' => $project->name,
            'whatsresponsavel' => $project->phone,
            'emailresponsavel' => $project->email,
            'paginas' => implode("\n", $urlFile),
            'observacao' => $project->observations,
            'valorprojeto' => 'R$ ' . number_format($project->value_project, 2, ",", "."),
            'formapagamento' => $project->payment_method,
            'parcelamento' => $project->installment,
            'outra' => $project->other,
            'entrada' => 'R$ ' . number_format($project->entry_payment, 2, ",", "."),
            'comprovante' => $project->proof ? url("storage/$project->proof") : '',
            'plano' => $project->plan_name,
            'contratoassinado' => $project->signed_contract,
            'tercerizar' => $project->outsource,
            'datafechamento' => Carbon::parse($project->closing_date)->format('d/m/Y'),
            'diascorridos' => $project->calendar_days
        ], "Projeto Criado - " . $project->project_name));
    }
}
