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
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('project_name')->nullable();
            $table->string('type')->nullable();
            $table->string('name')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->integer('number_pages')->nullable();
            $table->text('technical_information')->nullable();
            $table->text('observations')->nullable();
            $table->text('layouts')->nullable();
            $table->decimal('value_project', 10, 2)->nullable();
            $table->string('payment_method')->nullable();
            $table->integer('installment')->nullable();
            $table->string('other')->nullable();
            $table->decimal('entry_payment', 10, 2)->nullable();
            $table->string('proof')->nullable();
            $table->uuid('plan_id')->nullable();
            $table->string('plan_name')->nullable();
            $table->string('signed_contract')->nullable();
            $table->string('outsource')->nullable();
            $table->string('temporary_link')->nullable();
            $table->timestamp('closing_date')->nullable();
            $table->integer('calendar_days')->nullable();
            $table->boolean('finished')->default(false);
            $table->timestamp('finished_date')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
