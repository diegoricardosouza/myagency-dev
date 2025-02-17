<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreUpdateChecklistRequest;
use App\Http\Resources\Api\ChecklistResource;
use App\Services\ChecklistService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ChecklistController extends Controller
{
    public function __construct(
        protected ChecklistService $repository,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ChecklistResource::collection($this->repository->getAll());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateChecklistRequest $request)
    {
        $data = $request->validated();
        $checklists = $this->repository->new($data);

        return new ChecklistResource($checklists);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $plan = $this->repository->findOne($id);

        if (!$plan) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new ChecklistResource($plan);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateChecklistRequest $request, string $id)
    {
        $checklist = $this->repository->update($request->all(), $id);

        // $plan = $this->repository->findOrFail($id);
        // // return $plan->update($data);

        if (!$checklist) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new ChecklistResource($checklist);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!$this->repository->findOne($id)) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        $this->repository->delete($id);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
