<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreUpdateProjectRequest;
use App\Http\Resources\Api\ProjectResource;
use App\Services\ProjectService;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct(
        protected ProjectService $repository,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProjectResource::collection($this->repository->getAll());
    }

    public function showAll(Request $request)
    {
        $finished = $request->get('finished');
        return ProjectResource::collection($this->repository->getAllNoPagination($finished));
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
    public function store(StoreUpdateProjectRequest $request)
    {
        $data = $request->except(['pages', 'checklists']);
        $project = $this->repository->new($data, $request->pages, $request->checklists);

        return new ProjectResource($project);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = $this->repository->findOne($id);

        if (!$project) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new ProjectResource($project);
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
    public function update(StoreUpdateProjectRequest $request, string $id)
    {
        // dd($request->except(['pages', 'checklists']));

        $project = $this->repository->update($request->except(['pages', 'checklists']), $request->pages, $request->checklists, $id);

        // $plan = $this->repository->findOrFail($id);
        // // return $plan->update($data);

        if (!$project) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new ProjectResource($project);
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
