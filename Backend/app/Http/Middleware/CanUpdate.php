<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Models\Project;

class CanUpdate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $accessToken = $request->header('access_token');

        if (!$accessToken) {
            return response()->json(['error' => 'Access token not provided'], 401);
        }

        $user = User::where('access_token', $accessToken)->first();

        if (!$user) {
            return response()->json(['error' => 'Invalid access token'], 401);
        }

        $projectId = $request->route('projectId');

        if ($projectId) {
            $project = Project::find($projectId);

            if (!$project || $project->admin_id != $user->id) {
                return response()->json(['error' => 'Unauthorized action'], 403);
            }
        }

        return $next($request);
    }
}
