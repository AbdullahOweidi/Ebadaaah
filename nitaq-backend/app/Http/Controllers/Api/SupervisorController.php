<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Supervisor;
use App\Http\Requests\StoreSupervisorRequest;
use Illuminate\Http\JsonResponse;

class SupervisorController extends Controller
{
    public function store(StoreSupervisorRequest $request): JsonResponse
    {
        // Data is already validated if execution reaches this point
        $supervisor = Supervisor::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Supervisor created successfully.',
            'data' => $supervisor
        ], 201);
    }
}