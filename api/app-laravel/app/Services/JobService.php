<?php

namespace App\Services;

use App\Mail\CreateJobMail;
use App\Mail\createJobMailAtt;
use App\Mail\NoticeJobsExceeded;
use App\Models\Comment;
use App\Models\File;
use App\Models\Job;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class JobService
{
    public function __construct(
        protected Job $job,
        protected Comment $comment,
        protected User $user,
    ) {
    }

    public function findById($id, $userLogged = null)
    {
        if (!empty($userLogged) && $userLogged->level == 'CLIENTE') {
            return $this->job->where('user_id', $userLogged->id)
                ->findOrFail($id);
        }
        return $this->job->findOrFail($id);
    }

    public function getAll($user = null, $startDate = null, $endDate = null, $perPage = 6)
    {
        // Formatação de datas
        $startDate = $startDate ? $startDate . "T00:00:00.000000Z" : null;
        $endDate = $endDate ? $endDate . "T23:59:59.000000Z" : null;

        // Query base com relacionamentos e ordenação
        $query = $this->job->with(['files', 'comments'])->orderBy('created_at', 'desc');

        // Condições para CLIENTE
        if ($user && $user->level == 'CLIENTE') {
            $query->where('user_id', $user->id);
        }

        // Condições de data
        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }

        // Retorna os resultados paginados
        return $query->paginate($perPage);
    }

    public function getAllNoPagination($projectId = null, $startDate = null, $endDate = null, $type = null, $excludeType = null)
    {
        // Formatação de datas
        $startDate = $startDate ? $startDate . "T00:00:00.000000Z" : null;
        $endDate = $endDate ? $endDate . "T23:59:59.000000Z" : null;

        // Query base com relacionamentos
        $query = $this->job->with(['files', 'comments'])->orderBy('created_at', 'desc');

        // Condições para CLIENTE
        // if ($user && $user->level == 'CLIENTE') {
        //     $query->where('user_id', $user->id);
        // }

        if ($projectId) {
            $query->where('project_id', $projectId);
        }

        // Condições de data
        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }

        // Condição de tipo
        if ($type) {
            $query->where('type', $type);
        }
        // Condição de exclusão de tipo
        if ($excludeType) {
            $query->where('type', '!=' , $excludeType);
        }

        // Retorna os resultados
        return $query->get();
    }

    public function createNew($data)
    {
        // dd($data['files'][0]->getMimeType());
        $jobCreated = $this->job->create($data);

        if(!empty($data['files'])){
            foreach ($data['files'] as $file) {
                $dataFile['size'] = $file->getSize();
                $dataFile['type'] = $file->getMimeType();
                $dataFile['job_id'] = $jobCreated->id;
                $dataFile['name'] = $file->storeAs('jobs', $file->hashName());
                $fileCreated = File::create($dataFile);
            }
        }

        $jobAfterCreation = $this->job->with(['user', 'files'])->where('id', $jobCreated->id)->first();
        $this->sendMail($jobAfterCreation, env('EMAIL_SOLICITACOES'), 'Desenvolvimento');

        return $jobCreated;
    }

    public function update($data, $id)
    {
        $job = $this->job->findOrFail($id);
        // foreach ($job->files as $file) {
        //     if ($file->name && Storage::exists($file->name)) {
        //         Storage::delete($file->name);
        //     }
        // }
        if (!empty($data['files'])) {
            foreach ($data['files'] as $file) {
                $dataFile['size'] = $file->getSize();
                $dataFile['type'] = $file->getMimeType();
                $dataFile['job_id'] = $job->id;
                $dataFile['name'] = $file->storeAs('jobs', $file->hashName());
                $fileCreated = File::create($dataFile);
            }
        }

        $job->update($data);

        return $job;
    }

    public function delete($id)
    {
        $job = $this->job->with(['files', 'comments'])->findOrFail($id);

        foreach ($job->files as $file) {
            if ($file->name && Storage::exists($file->name)) {
                Storage::delete($file->name);
            }
        }

        $job->files()->delete();

        //Comentários
        $comments = $job->comments()->with('files')->get();

        foreach ($comments as $fileC) {
            $this->deleteCommentsAndFiles($fileC->id);
        }
        $job->comments()->delete();

        $job->delete();
    }

    public function deleteCommentsAndFiles($id) {
        $comments = $this->comment->with('files')->findOrFail($id);

        foreach ($comments->files as $file) {
            if ($file->url && Storage::exists($file->url)) {
                Storage::delete($file->url);
            }
        }

        $comments->files()->delete();
    }

    public function calculateNumberJobs($userDayCut, $userId, $type)
    {
        $day = date('d');
        $month = date('m');
        $year = date('Y');
        $dataCorte = $year . "-" . $month . "-" . $userDayCut;

        if ((int)$day < $userDayCut) {
            $dataAtualObj = date('Y-m-d', strtotime("-1 month", strtotime($dataCorte)));
            $dateStart = $dataAtualObj . "T00:00:00.000000Z";
            $dateEnd = $year . "-" . $month . "-" . $userDayCut . "T23:59:59.000000Z";
        } else {
            $dataAtualObj = date('Y-m-d', strtotime("+1 month", strtotime($dataCorte)));
            $dateStart = $year . "-" . $month . "-" . $userDayCut . "T00:00:00.000000Z";
            $dateEnd = $dataAtualObj . "T23:59:59.000000Z";
        }

        // return $dateStart . "-----------" . $dateEnd;

        return $this->job->where('user_id', $userId)
                        ->where('type', $type)
                        ->whereBetween('created_at', [$dateStart, $dateEnd])
                        ->count();
    }

    public function sendMail($job, $emails, $plan)
    {
        $urlFile = [];
        foreach($job->files as $file){
            $urlFile[] = url("storage/{$file->name}");
        }

        Mail::to($emails)->send(new CreateJobMail([
            'url' => env('URL_FRONT')."/projetos/detalhes/".$job->id,
            'ref' => 'DEV'.Carbon::parse($job->created_at)->format('Y').$job->ref,
            'data' => Carbon::parse($job->created_at)->format('d/m/Y'),
            'hora' => Carbon::parse($job->created_at)->format('H:i:s'),
            'formatos' => $job->format,
            'outros_formatos' => $job->other_formats,
            'frase_destaque' => $job->phrase,
            'informacoes' => $job->content,
            'observacoes' => $job->obs,
            'files' => implode("\n", $urlFile),
        ], $plan ." - ". $job->phrase." (DEV" . Carbon::parse($job->created_at)->format('Y').$job->ref . ")"));
    }

    // public function sendMailAtt($job, $emails, $plan)
    // {
    //     $urlFile = [];
    //     foreach($job->files as $file){
    //         $urlFile[] = url("storage/{$file->name}");
    //     }

    //     Mail::to($emails)->send(new createJobMailAtt([
    //         'url' => env('URL_FRONT') . "/solicitacoes/detalhes/" . $job->id,
    //         'ref' => Carbon::parse($job->created_at)->format('Y').$job->ref,
    //         'data' => Carbon::parse($job->created_at)->format('d/m/Y'),
    //         'hora' => Carbon::parse($job->created_at)->format('H:i:s'),
    //         'site' => $job->site,
    //         'page' => $job->page,
    //         'frase_destaque' => $job->phrase,
    //         'informacoes' => $job->content,
    //         'observacoes' => $job->obs,
    //         'responsavel' => $job->user->responsible,
    //         'email' => $job->user->email,
    //         'whatsapp' => $job->user->whatsapp,
    //         'files' => implode("\n", $urlFile),
    //     ], $job->user->company . " - " . $plan . " - " . $job->phrase . " (" . Carbon::parse($job->created_at)->format('Y') . $job->ref . ")"));
    // }

    // private function sendExceededJob($job, $emails, $type, $plan)
    // {
    //     $urlFile = [];
    //     foreach ($job->files as $file) {
    //         $urlFile[] = url("storage/{$file->name}");
    //     }

    //     Mail::to($emails)->send(new NoticeJobsExceeded([
    //         'url' => env('URL_FRONT') . "/solicitacoes/detalhes/" . $job->id,
    //         'ref' => Carbon::parse($job->created_at)->format('Y') . $job->ref,
    //         'data' => Carbon::parse($job->created_at)->format('d/m/Y'),
    //         'hora' => Carbon::parse($job->created_at)->format('H:i:s'),
    //         'formatos' => $job->format,
    //         'outros_formatos' => $job->other_formats,
    //         'frase_destaque' => $job->phrase,
    //         'informacoes' => $job->content,
    //         'observacoes' => $job->obs,
    //         'responsavel' => $job->user->responsible,
    //         'company' => $job->user->company,
    //         'type' => $type,
    //         'email' => $job->user->email,
    //         'whatsapp' => $job->user->whatsapp,
    //         'files' => implode("\n", $urlFile),
    //     ], '[SOLICITAÇÃO EXTRA]' . $job->user->company . " - " . $plan . " - (" . Carbon::parse($job->created_at)->format('Y') . $job->ref . ")"));
    // }
}
