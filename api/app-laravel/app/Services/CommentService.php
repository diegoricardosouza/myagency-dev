<?php

namespace App\Services;

use App\Mail\CreateCommentMail;
use App\Mail\CreateCommentMailAdmin;
use App\Models\Comment;
use App\Models\FileComment;
use App\Models\Job;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;


class CommentService
{
    public function __construct(
        protected Comment $comment,
        protected User $user,
        protected Job $job,
        protected Project $project,
    ) {
    }

    public function getAll()
    {
        return $this->comment->with('files')->orderBy('created_at', 'desc')->get();
    }

    public function findById($id)
    {
        return $this->comment->findOrFail($id);
    }

    public function createNew($data)
    {
        $commentCreated = $this->comment->create($data);

        if (!empty($data['files'])) {
            foreach ($data['files'] as $file) {
                $dataFile['comment_id'] = $commentCreated->id;
                $dataFile['url'] = $file->storeAs('comments', $file->hashName());
                $fileCreated = FileComment::create($dataFile);
            }
        }

        $commentAfterCreation = $this->comment->with(['files', 'job'])->where('id', $commentCreated->id)->first();
        $job = $this->job->with(['user', 'files', 'project'])->where('id', $commentAfterCreation->job->id)->first();
        // $user = $this->user->with('plan')->where('id', $job->user->id)->first();

        if(Auth::user()->level == 'CLIENTE') {
            // $users_temp = explode(',', env('EMAIL_SOLICITACOES'));
            // foreach ($users_temp as $u) {
            //     $this->sendMail($u, $commentAfterCreation, $job, $user->plan->name);
            // }
            if ($job->type == "Atualizações") {
                $this->sendMail(env('EMAIL_ATUALIZACOES'), $commentAfterCreation, $job, 'AVULSO');
            } else {
                $this->sendMail(env('EMAIL_SOLICITACOES'), $commentAfterCreation, $job, 'AVULSO');
            }
        }
        // $this->sendMail(env('EMAIL_SOLICITACOES_SINGLE'), $commentAfterCreation);

        if(Auth::user()->level != 'CLIENTE') {
            $user = $this->user->where('id', $job->project->user_id)->first();
            // $user = $this->user->where('id', $commentAfterCreation->job->user_id)->first();
            $this->sendMailAdmin($user->email, $commentAfterCreation, $job->project->id, $commentAfterCreation->job->id);
        }

        return $commentCreated;
    }

    public function delete($id)
    {
        $comment = $this->comment->with('files')->findOrFail($id);

        foreach ($comment->files as $file) {
            if ($file->url && Storage::exists($file->url)) {
                Storage::delete($file->url);
            }
        }

        $comment->files()->delete();

        $comment->delete();
    }

    public function sendMail($email, $comment, $job, $plan)
    {
        $urlFile = [];
        foreach ($comment->files as $file) {
            $urlFile[] = url("storage/{$file->url}");
        }

        Mail::to($email)->send(new CreateCommentMail([
            'url' => env('URL_FRONT') . "/projetos/detalhes/" . $job->project->id . "/page/" . $job->id,
            // 'url' => env('URL_FRONT') . "/solicitacoes/detalhes/" . $job->id,
            'data' => Carbon::parse($comment->created_at)->format('d/m/Y'),
            'hora' => Carbon::parse($comment->created_at)->format('H:i:s'),
            'conteudo' => $comment->content,
            'responsavel' => $job->user->responsible,
            'email' => $job->user->email,
            'whatsapp' => $job->user->whatsapp,
            'files' => implode("\n", $urlFile),
        ], "[AJUSTE]" . $job->user->company . " - " . $plan . " - " . $job->phrase . " (" . Carbon::parse($job->created_at)->format('Y') . $job->ref . ")"));
    }

    public function sendMailAdmin($email, $comment, $projectId, $jobId)
    {
        $urlFile = [];
        foreach ($comment->files as $file) {
            $urlFile[] = url("storage/{$file->url}");
        }

        Mail::to($email)->send(new CreateCommentMailAdmin([
            'data' => Carbon::parse($comment->created_at)->format('d/m/Y'),
            'hora' => Carbon::parse($comment->created_at)->format('H:i:s'),
            'url' => env('URL_FRONT') . "/projetos/detalhes/" . $projectId . "/page/". $jobId,
        ]));
    }
}
