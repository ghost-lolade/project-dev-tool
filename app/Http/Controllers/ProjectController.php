<?php

namespace App\Http\Controllers;

use App\Repositories\ProjectRepositoryInterface;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    protected $projectRepository;

    public function __construct(ProjectRepositoryInterface $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function index()
    {
        return response()->json($this->projectRepository->all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project = $this->projectRepository->create($validated);

        return response()->json($project, 201);
    }

    public function show($id)
    {
        return response()->json($this->projectRepository->find($id));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project = $this->projectRepository->update($id, $validated);

        return response()->json($project);
    }

    public function destroy($id)
    {
        $this->projectRepository->delete($id);
        return response()->json(null, 204);
    }
}
