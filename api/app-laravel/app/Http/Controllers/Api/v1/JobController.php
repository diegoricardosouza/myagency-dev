<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreUpdateJobRequest;
use App\Http\Resources\Api\JobResource;
use App\Services\JobService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    protected $userLogged;

    public function __construct(
        protected JobService $repository,
    ) {
        $this->middleware(function ($request, $next) {
            $this->userLogged = Auth::user();

            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $startDate = $request->get('startDate');
        $endDate = $request->get('endDate');

        return JobResource::collection($this->repository->getAll($this->userLogged, $startDate, $endDate));
    }

    public function showAll(Request $request)
    {
        $projectId = $request->get('project_id');
        $startDate = $request->get('startDate');
        $endDate = $request->get('endDate');
        $type = $request->get('type');
        $excludeType = $request->get('excludeType');

        return JobResource::collection($this->repository->getAllNoPagination($projectId, $startDate, $endDate, $type, $excludeType));
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
    public function store(StoreUpdateJobRequest $request)
    {
        // return $request->all();
        $data = $request->all();
        // $data['user_id'] = !empty($data['user_id']) ? $data['user_id'] : $this->userLogged->id;
        $job = $this->repository->createNew($data);
        return new JobResource($job);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $job = $this->repository->findById($id, $this->userLogged);

        if (!$job) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new JobResource($job);
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
    public function update(StoreUpdateJobRequest $request, string $id)
    {
        $job = $this->repository->update($request->all(), $id);

        // $plan = $this->repository->findOrFail($id);
        // // return $plan->update($data);

        if (!$job) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new JobResource($job);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!$this->repository->findById($id)) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        $this->repository->delete($id);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    public function count(Request $request)
    {
        $type = $request->get('type');

        // return $this->repository->countNumberJobs($this->userLogged->id, $type);
    }
}
