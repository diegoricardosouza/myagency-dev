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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('transaction_id')->unique();
            $table->string('payment_method');
            $table->string('status')->default('pending');
            $table->string('product');
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->nullable();
            $table->string('qrcode')->nullable();
            $table->string('qrcode_url')->nullable();
            $table->string('expires_at_qrcode')->nullable();
            $table->string('brand')->nullable();
            $table->string('last_four_digits')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
