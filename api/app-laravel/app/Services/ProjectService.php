<?php

namespace App\Services;

use App\Models\PageProject;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;

class ProjectService
{
    public function __construct(
        protected Project $repository,
        protected PageProject $repositoryPages,
    ) {
    }

    public function getAll()
    {
        return $this->repository
                    ->orderBy('created_at', 'desc')
                    ->get();
    }

    public function new($data, $pages)
    {
        if (!empty($data['proof'])) {
            $data['proof'] = $data['proof']->storeAs('projects', $data['proof']->hashName());
        }

        $project = $this->repository->create($data);
        if(!empty($pages)) {
            foreach ($pages as $pageName) {
                $this->repositoryPages->create([
                    'name' => $pageName,
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

    public function update($data, $pages, $id)
    {
        $project = $this->repository->findOrFail($id);

        if (!empty($data['proof']) && !empty($project->proof)) {
            if (!empty($data['proof']) && Storage::exists($project->proof)) {
                Storage::delete($project->proof);
            }

            $data['proof'] = $data['proof']->storeAs('projects', $data['proof']->hashName());
        } else {
            if (!empty($data['proof'])) {
                $data['proof'] = $data['proof']->storeAs('projects', $data['proof']->hashName());
            }
        }

        $project->update($data);

        $newPages = $pages;

        // Buscar as páginas existentes no banco
        $existingPages = $project->pages->pluck('name')->toArray();

        // Descobrir quais páginas precisam ser removidas
        $pagesToDelete = array_diff($existingPages, $newPages);
        if (!empty($pagesToDelete)) {
            $project->pages()->whereIn('name', $pagesToDelete)->delete();
        }

        // Descobrir quais páginas precisam ser adicionadas
        $pagesToAdd = array_diff($newPages, $existingPages);
        foreach ($pagesToAdd as $pageName) {
            $project->pages()->create(['name' => $pageName]);
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
