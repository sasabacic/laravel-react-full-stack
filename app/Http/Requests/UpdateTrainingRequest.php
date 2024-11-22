<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrainingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'training_date' => 'sometimes|nullable|date',
            'activity_type' => 'required|string|in:swim,bike,run',
            'pace' => 'required|string',
            'distance' => 'required|numeric|min:0',
            'duration' => 'required|numeric|min:0',
            'notes' => 'nullable|string'
        ];
    }

}