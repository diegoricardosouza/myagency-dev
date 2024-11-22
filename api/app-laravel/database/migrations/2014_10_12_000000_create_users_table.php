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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->nullable();
            $table->string('company')->nullable();
            $table->string('responsible')->nullable();
            $table->string('email')->unique();
            $table->enum('level', ['ADMIN', 'EDITOR', 'CLIENTE']);
            $table->string('whatsapp')->nullable();
            $table->integer('day')->nullable();
            $table->string('cpf')->unique();
            $table->string('logo')->nullable();
            $table->integer('credits')->default(2);
            $table->string('address')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('number')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
