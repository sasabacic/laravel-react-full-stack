<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        //Getting the search term from the request
        $search = $request->input('search');

        //Building query
        $query = User::query();

        if($search){
            $query->where(function ($query) use ($search) {
                $query->where('name','LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE',"%{$search}%");
            });
        }

        //Order by id and paginate
        $users = $query->orderBy('id', 'desc')->paginate(10);


        /**
         * we need to call UserResource collection method and pass this user, the result
         * of the pagination and return it
         */
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        /**
         * $request->validated() returns an array containing the fields that passed the validation
         * In the SignupRequest it includes name,email,password
         */

        $data = $request->validated();
        /**
         * User::create is used to insert a new user record into the database
         * It expects an associative array where the keys correspond to the column
         * names in the database table and the values are the data you want to insert
         *
         * */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response('', 204);
    }
}
