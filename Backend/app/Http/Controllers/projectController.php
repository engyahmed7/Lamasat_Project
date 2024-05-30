<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\ProjectPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class projectController extends Controller
{
    public function showAllProjects(Request $request)
    {
        if (!$request->header('access_token')) {
            $projects = Project::orderBy('id', 'desc')->get();
            return response()->json([
                'projects' => ProjectResource::collection($projects),
            ]);
        }
        $user = User::where('access_token', $request->header('access_token'))->first();
        if ($user->role == 'admin') {
            $projects = Project::where('admin_id', $user->id)->orderBy('id', 'desc')->get();
        } else {
            $projects = Project::orderBy('id', 'desc')->get();
        }
        return response()->json([
            'projects' => ProjectResource::collection($projects),
            'admin_id' => $user->id,
            'user_role' => $user->role,
        ]);
    }


    public function show($projectId)
    {
        $project = Project::find($projectId);
        if (!$project) {
            return response()->json([
                'error' => 'project not found',
            ]);
        }
        return response()->json([
            'project' => new ProjectResource($project),
        ]);
    }

    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|json|min:5',
            'description' => 'required|json|min:5',
            'finished_at' => 'required|string',
            'duration' => 'required|string',
            'images.*' => 'nullable|image|mimes:jpg,png',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        }
        $project = Project::create([
            'category_id' => $request->category_id,
            'title' => $request->title,
            'description' => $request->description,
            'finished_at' => $request->finished_at,
            'duration' => $request->duration,
            'admin_id' => User::where('access_token', '=', $request->header('access_token'))->first()->id,
        ]);

        if ($request->hasFile('images')) {
            $image_paths = [];
            foreach ($request->images as $img) {
                $cc = Storage::putFile('images', $img);
                ProjectPhoto::create([
                    'project_id' => $project->id,
                    'photo' => $cc,
                ]);
                $image_paths[] = url('') . '/' . $cc;
            }
        }
        return response()->json([
            'msg' => 'project created successfully',
            'project' => new ProjectResource($project),
            'imgs' => $image_paths,
        ]);
    }

    public function delete($projectId)
    {
        $project = Project::find($projectId);
        if ($project) {
            $project->delete();
            return response()->json([
                'msg' => 'project deleted successfully',
                'project' => new ProjectResource($project),
            ]);
        } else {
            return response()->json([
                'error' => 'project not found',
            ]);
        }
    }
    public function update(Request $request, $projectId)
    {
        $project = Project::find($projectId);
        if (!$project) {
            return response()->json([
                'error' => 'project not found',
            ]);
        }
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|json|min:5',
            'description' => 'required|json|min:5',
            'finished_at' => 'required|string',
            'duration' => 'required|string',
            'images.*' => 'nullable|image|mimes:jpg,png',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ]);
        }
        $project->update([
            'category_id' => $request->category_id,
            'title' => $request->title,
            'description' => $request->description,
            'finished_at' => $request->finished_at,
            'duration' => $request->duration,
        ]);
        if ($request->hasFile('images')) {
            $image_paths = [];
            foreach ($request->images as $img) {
                $cc = Storage::putFile('images', $img);
                ProjectPhoto::create([
                    'project_id' => $project->id,
                    'photo' => $cc,
                ]);
                $image_paths[] = url('') . '/' . $cc;
            }
        }
        return response()->json([
            'msg' => 'project updated successfully',
            'project' => new ProjectResource($project),
        ]);
    }
}
