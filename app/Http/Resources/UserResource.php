<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * Resource is a class which is used to convert database models into json serializable
     * data which will be sent from the server from the api to the browser or to client
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /**
         * we need to return an array of our data what we want to expose from the user
         */
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
