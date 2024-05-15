<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->header('access_token')) {
            $user = User::where('access_token', '=', $request->header('access_token'))->first();
            if (!$user) {
                return response()->json([
                    'error' => 'you must login before doing this action',
                ], 404);
            }
            if ($user->role == 'admin' or $user->role == 'super_admin') {
                return $next($request);
            } else {
                return response()->json([
                    'error' => 'you are not allowed',
                ], 403);
            }
        }
        return response()->json([
            'error' => 'you must login before doing this action',
        ], 404);
        return $next($request);
    }
}
