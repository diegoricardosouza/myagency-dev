<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'site',
        'page',
        'format',
        'other_formats',
        'phrase',
        'content',
        'obs',
        'type',
        'status',
        'user_id',
        'ref'
    ];

    protected static function booted()
    {
        static::creating(function ($job) {
            if (is_null($job->ref)) {
                // Define o valor de 'ref' como o próximo número sequencial
                $job->ref = Job::max('ref') + 1;
            }
        });
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'desc');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
