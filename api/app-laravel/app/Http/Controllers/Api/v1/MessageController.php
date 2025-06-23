<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreUpdateMessageRequest;
use App\Http\Resources\Api\MessageResource;
use App\Services\MessageService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MessageController extends Controller
{
    public function __construct(
        protected MessageService $repository,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MessageResource::collection($this->repository->getAll());
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
    public function store(StoreUpdateMessageRequest $request)
    {
        $data = $request->all();
        $message = $this->repository->createNew($data);
        return new MessageResource($message);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $message = $this->repository->findOne($id);

        if (!$message) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new MessageResource($message);
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
    public function update(StoreUpdateMessageRequest $request, string $id)
    {
        $message = $this->repository->findOne($id);

        if (!$message) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        $this->repository->update($request->all(), $id);

        return new MessageResource($message);
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
}
