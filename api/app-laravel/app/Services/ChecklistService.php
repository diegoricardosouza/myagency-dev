<?php

namespace App\Services;

use App\Models\Checklist;

class ChecklistService
{
    public function __construct(
        protected Checklist $repository,
    ) {
    }

    public function getAll($project = null)
    {
        return $this->repository
                    ->orderBy('created_at', 'desc')
                    ->where('project_id', '=', $project)
                    ->get();
    }

    public function new($data)
    {
        return $this->repository->create($data);
    }

    public function findOne($id)
    {
        return $this->repository->findOrFail($id);
    }

    public function update($data, $id)
    {
        $plan = $this->repository->findOrFail($id);
        $plan->update($data);

        return $plan;
    }

    public function delete($id)
    {
        $plan = $this->repository->findOrFail($id);
        $plan->delete();
    }
}
