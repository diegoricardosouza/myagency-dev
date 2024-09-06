<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function __construct(
        protected User $user,
    ) {
    }

    public function getAll($authUserId, $perPage = 50)
    {
        return $this->user
                    ->where('id', '!=', $authUserId)
                    ->orderBy('created_at', 'desc')
                    ->paginate($perPage);
    }

    public function createNew($data)
    {
        $data['password'] = bcrypt($data['password']);

        if($data['logo']){
            $data['logo'] = $data['logo']->storeAs('users', $data['logo']->hashName());
        }

        return $this->user->create($data);
    }

    public function findById($id)
    {
        return $this->user->findOrFail($id);
    }

    public function findByEmail(string $email)
    {
        return $this->user->where('email', $email)->first();
    }

    public function update($data, $id)
    {
        $user = $this->user->findOrFail($id);

        if(!empty($data['logo'])) {
            if (!empty($data['logo']) && Storage::exists($user->logo)) {
                Storage::delete($user->logo);
                // $data['logo'] = $data['logo']->storeAs('users', $data['logo']->hashName());
            }

            $data['logo'] = $data['logo']->storeAs('users', $data['logo']->hashName());
        }

        if(!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);

        return $user;
    }

    public function delete($id)
    {
        $user = $this->user->findOrFail($id);
        $newUserId = "9bde441b-6781-4a2c-ad02-7757400bef5a";

        if ($user->logo && Storage::exists($user->logo)) {
            Storage::delete($user->logo);
        }

        $user->comments()->update(['user_id' => $newUserId]);
        $user->delete();
    }
}
