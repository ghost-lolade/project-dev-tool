<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'project_id' => \App\Models\Project::factory(),
            'name' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['todo', 'in-progress', 'done']),
        ];
    }
}
