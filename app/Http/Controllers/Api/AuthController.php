<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{


    public function signup(SignupRequest $request)
    {
        //Validate the incoming request and then creating the user
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ],
    );

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $auth = $request->validated();
        //I want to try to login with my credentials
        if (!Auth::attempt($auth)) {
            return response([
                'message' => 'Incorrect email address or password'
            ]);
        }
        //If the attempt is successfull and the user is created I want to get user information
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }

    public function logout(Request $request)
    {

        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
