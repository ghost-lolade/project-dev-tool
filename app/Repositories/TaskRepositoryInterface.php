<?php

namespace App\Repositories;

use App\Models\Task;

interface TaskRepositoryInterface
{
    public function all();

    public function allByProject($projectId);

    public function filterByStatus($projectId, $status);

    public function find($id);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);
}
