<?php

namespace App\Services;

use App\Models\Checklist;
use App\Models\PageProject;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
}
