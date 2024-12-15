<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {

        // Log for debugging
    \Log::info('User role: ' . auth()->user()->role);
    \Log::info('Required role: ' . $role);
        // Check if the authenticated user exists and has the correct role
        if (!auth()->check() || auth()->user()->role !== $role) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }

}
