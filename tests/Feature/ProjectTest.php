<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProjectTest extends TestCase
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
    public function it_can_create_a_project()
    {
        $payload = [
            'name' => 'Test Project',
            'description' => 'This is a test project.'
        ];

        $this->postJson('/api/projects', $payload)
             ->assertStatus(201)
             ->assertJson(['name' => 'Test Project']);

        $this->assertDatabaseHas('projects', ['name' => 'Test Project']);
    }

    /** @test */
    public function it_can_update_a_project()
    {
        $project = Project::factory()->create();

        $payload = [
            'name' => 'Updated Project Name',
            'description' => 'Updated project description.'
        ];

        $this->putJson('/api/projects/' . $project->id, $payload)
             ->assertStatus(200)
             ->assertJson(['name' => 'Updated Project Name']);

        $this->assertDatabaseHas('projects', ['id' => $project->id, 'name' => 'Updated Project Name']);
    }

    /** @test */
    public function it_can_delete_a_project()
    {
        $project = Project::factory()->create();

        $this->deleteJson('/api/projects/' . $project->id)
             ->assertStatus(204);

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    /** @test */
    public function it_can_list_projects()
    {
        Project::factory()->count(5)->create();

        $this->getJson('/api/projects')
             ->assertStatus(200)
             ->assertJsonStructure([
                 '*' => ['id', 'name', 'description', 'created_at', 'updated_at']
             ]);
    }
}
