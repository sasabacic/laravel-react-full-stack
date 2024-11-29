<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTrainingRequest extends FormRequest
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
            'activity_type' => 'required|string|in:swim,bike,run',
            'pace' => 'required|string|min:0|max:99.99',
            'distance' => 'required|numeric|min:0|max:86400',
            'duration' => 'required|integer|min:0|max:86400',
            'training_date' => 'nullable|date',
            'notes' => 'nullable|string|max:500',
        ];
    }
}
