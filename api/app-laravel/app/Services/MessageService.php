<?php

namespace App\Services;

use App\Models\Message;


class MessageService
{
    public function __construct(
        protected Message $message,
    ) {
    }

    public function getAll()
    {
        return $this->message->orderBy('created_at', 'desc')->get();
    }

    public function findById($id)
    {
        return $this->message->findOrFail($id);
    }

    public function createNew($data)
    {
        $message = $this->message->create($data);

        return $message;
    }

    public function findOne($id)
    {
        return $this->message->findOrFail($id);
    }

    public function update($data, $id)
    {
        $project = $this->message->findOrFail($id);
        $project->update($data);

        return $project;
    }

    public function delete($id)
    {
        $message = $this->message->findOrFail($id);

        $message->delete();
    }
}
