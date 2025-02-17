<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreUpdateUserRequest;
use App\Http\Resources\Api\UserResource;
use App\Services\UserService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected $userLogged;

    public function __construct(
        protected UserService $repository,
    ) {
        $this->middleware(function ($request, $next) {
            $this->userLogged = Auth::user();
            // Bloqueia usuários não-administradores para métodos que não sejam o `update`
            if (
                $request->route()->getActionMethod() !== 'update' && $request->route()->getActionMethod() !== 'show' &&
                ($this->userLogged && $this->userLogged->level != 'ADMIN')
            ) {
                return response()->json([
                    'error' => 'Unauthorized'
                ], Response::HTTP_UNAUTHORIZED);
            }

            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection($this->repository->getAll($this->userLogged->id));
    }

    /**
     * Display a listing of the resource.
     */
    public function showAll()
    {
        return UserResource::collection($this->repository->getAllNoPagination($this->userLogged->id));
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
    public function store(StoreUpdateUserRequest $request)
    {
        // $this->verifyUserLogged();

        $user = $this->repository->createNew($request->all());
        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->repository->findById($id);

        if (!$user) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new UserResource($user);
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
    public function update(StoreUpdateUserRequest $request, string $id)
    {
        $user = $this->repository->findById($id);

        if (!$user) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        $this->repository->update($request->all(), $id);

        return new UserResource($user);

        // return $request->all();
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

        if($this->userLogged->id == $id) {
            return response()->json([
                'error' => 'Action not allowed'
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $this->repository->delete($id);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
