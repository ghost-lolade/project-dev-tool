<?php

namespace App\Http\Controllers;

use App\Repositories\TaskRepositoryInterface;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected $taskRepository;

    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index($projectId)
    {
        return response()->json($this->taskRepository->all()->where('project_id', $projectId));
    }

    public function store(Request $request, $projectId)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in-progress,done',
        ]);

        $task = $this->taskRepository->create([
            'project_id' => $projectId,
            'name' => $validated['name'],
            'description' => $validated['description'],
            'status' => $validated['status'],
        ]);

        return response()->json($task, 201);
    }

    public function show($projectId, $id)
    {
        return response()->json($this->taskRepository->find($id));
    }

    public function update(Request $request, $projectId, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in-progress,done',
        ]);

        $task = $this->taskRepository->update($id, $validated);

        return response()->json($task);
    }

    public function destroy($projectId, $id)
    {
        $this->taskRepository->delete($id);
        return response()->json(null, 204);
    }
}
