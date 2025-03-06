<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'type',
        'name',
        'phone',
        'email',
        'number_pages',
        'technical_information',
        'observations',
        'value_project',
        'payment_method',
        'installment',
        'other',
        'entry_payment',
        'proof',
        'plan_id',
        'plan_name',
        'signed_contract',
        'outsource',
        'closing_date',
        'calendar_days',
        'user_id',
        'project_name',
        'temporary_link',
        'finished',
        'finished_date',
    ];

    public function pages()
    {
        return $this->hasMany(PageProject::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function checklists()
    {
        return $this->hasMany(Checklist::class);
    }
}
