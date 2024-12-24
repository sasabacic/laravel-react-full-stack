<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Training;
use App\Http\Requests\StoreTrainingRequest;
use App\Http\Requests\UpdateTrainingRequest;
use Illuminate\Support\Facades\Log;

class TrainingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // If user is an admin, show all trainings
    if (auth()->user()->role === 'admin') {
        $trainings = Training::with('user')->latest()->get();
    } else {
        // Otherwise, show only their own trainings
        $trainings = auth()->user()->trainings()->latest()->get();
    }

    return response()->json($trainings, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainingRequest $request)
    {
        $training = $request->user()->trainings()->create($request->validated());

        return response()->json([
            'message' => 'Training created successfully',
            'data' => $training
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $training = auth()->user()->trainings()->findOrFail($id);
        return response()->json($training, 201);  
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainingRequest $request, $id)
    {
        //we want to find the training that belongs to the authenticated user
        $training = $request->user()->trainings()->findOrFail($id);

        $validatedData = $request->validated();


        //update the training with the validated data
        $training->update($validatedData);

        //Return a success response with the updated training data
        return response()->json([
            'message' => 'Training update successfully',
            'data' => $training,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $training = Training::findOrFail($id);
        //Checking if the authenticated use is an admin or the owner of the training
        if(auth()->user()->role === 'admin' || $training->user_id === auth()->id()){
            $training->delete();

            return response()->json([
                'message' => 'Training deleted successfully'
            ], 200);
        }

        return response()->json(['message' => 'You are not authorized to delete this training'],403);
    }
}
