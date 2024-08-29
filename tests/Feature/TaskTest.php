<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create and authenticate a user for all tests
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    /** @test */
    public function it_can_create_a_task()
    {
        $project = Project::factory()->create();

        $payload = [
            'project_id' => $project->id,
            'name' => 'Test Task',
            'description' => 'This is a test task.',
            'status' => 'todo'
        ];

        $this->postJson('/api/projects/' . $project->id . '/tasks', $payload)
             ->assertStatus(201)
             ->assertJson(['name' => 'Test Task']);

        $this->assertDatabaseHas('tasks', ['name' => 'Test Task', 'project_id' => $project->id]);
    }

    /** @test */
    public function it_can_update_a_task()
    {
        $project = Project::factory()->create();
        $task = Task::factory()->create(['project_id' => $project->id]);

        $payload = [
            'name' => 'Updated Task Name',
            'description' => 'Updated task description.',
            'status' => 'in-progress'
        ];

        $this->putJson('/api/projects/' . $project->id . '/tasks/' . $task->id, $payload)
             ->assertStatus(200)
             ->assertJson(['name' => 'Updated Task Name']);

        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'name' => 'Updated Task Name']);
    }

    /** @test */
    public function it_can_delete_a_task()
    {
        $project = Project::factory()->create();
        $task = Task::factory()->create(['project_id' => $project->id]);

        $this->deleteJson('/api/projects/' . $project->id . '/tasks/' . $task->id)
             ->assertStatus(204);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    /** @test */
    public function it_can_list_tasks_for_a_project()
    {
        $project = Project::factory()->create();
        Task::factory()->count(5)->create(['project_id' => $project->id]);

        $this->getJson('/api/projects/' . $project->id . '/tasks')
             ->assertStatus(200)
             ->assertJsonStructure([
                 '*' => ['id', 'project_id', 'name', 'description', 'status', 'created_at', 'updated_at']
             ]);
    }
}
