<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('project_id');
            $table->unsignedBigInteger('ref')->nullable()->unique();
            $table->string('site')->nullable();
            $table->string('page')->nullable();
            $table->string('format')->nullable();
            $table->string('other_formats')->nullable();
            $table->string('phrase')->nullable();
            $table->text('content')->nullable();
            $table->text('obs')->nullable();
            $table->string('type')->nullable(); //Atualizações - Mídia Digital - Impresso - Apresentações
            $table->enum('status', ['pending', 'approving', 'changing', 'approved'])->default('pending');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
