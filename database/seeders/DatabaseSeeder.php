<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Main test account
        User::factory()->create([
            'name' => 'Main Test User',
            'email' => 'main@test.com',
            'password' => bcrypt('password'),
        ]);

        // Account for testing forgot password functionality
        User::factory()->create([
            'name' => 'Forgot Password',
            'email' => 'forgot@test.com',
            'password' => bcrypt('password'),
        ]);

        // Account for testing password update functionality
        User::factory()->create([
            'name' => 'Update Password',
            'email' => 'updatepass@test.com',
            'password' => bcrypt('password'),
        ]);

        // Account for testing email update functionality
        User::factory()->create([
            'name' => 'Update Email',
            'email' => 'updateemail@test.com',
            'password' => bcrypt('password'),
        ]);
    }
}