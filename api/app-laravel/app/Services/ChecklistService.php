<?php

namespace App\Services;

use App\Models\Checklist;

class ChecklistService
{
    public function __construct(
        protected Checklist $repository,
    ) {
    }

    public function getAll()
    {
        return $this->repository
                    ->orderBy('created_at', 'desc')
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
