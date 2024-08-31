<?php

namespace App\Http\Controllers;

use App\Events\TaskCreated;
use Illuminate\Http\Request;
use App\Repositories\TaskRepositoryInterface;

class TaskController extends Controller
{
    protected $taskRepository;

    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index(Request $request, $projectId)
    {
        $status = $request->query('status');

        if ($status) {
            $tasks = $this->taskRepository->filterByStatus($projectId, $status);
        } else {
            $tasks = $this->taskRepository->allByProject($projectId);
        }

        return response()->json($tasks, 200);
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

        // Broadcast the event
        broadcast(new TaskCreated($task))->toOthers();

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
