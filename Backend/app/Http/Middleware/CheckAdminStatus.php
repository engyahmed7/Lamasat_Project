<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->header('access_token')) {
            $user = User::where('access_token', $request->header('access_token'))->first();
            if (!$user) {
                return response()->json([
                    'error' => 'You must login before doing this action',
                ], 404);
            }
            if ($user->status == 0) {
                return response()->json([
                    'error' => 'You are not allowed to perform this action. Please contact the super admin to activate your account.',
                ], 403);
            }
            return $next($request);
        }
        return response()->json([
            'error' => 'You must login before doing this action',
        ], 404);
    }
}
