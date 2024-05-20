<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Str;
use Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make(request()->all(), [
            'email' => 'required|email|max:50',
            'password' => 'required|string|min:5|max:32',
        ]);
        // Validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 403);
        }
        // If Success
        $admin = User::where('email', $request->email)->first();
        if ($admin) {
            if (Hash::check($request->password, $admin->password)) {
                $access_token = str::random(64);
                if ($admin->role == 'super_admin') {
                    $superadminrole = true;
                } else {
                    $superadminrole = false;
                }
                User::where('id', $admin->id)->update(
                    [
                        'access_token' => $access_token,
                    ]
                );
                return response()->json([
                    'message' => 'user logged in successfully',
                    'user' => new UserResource($admin),
                    'access_token' => $access_token,
                    'superadminrole' => $superadminrole,
                    'next_request' => url('/v1/dashboard'),
                ]);
            }
            return response()->json([
                'message' => 'incorrect password',
            ], 404);
        }
        return response()->json([
            'message' => 'user not found',
        ], 404);
    }
    public function addAdmin(Request $request)
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|max:50|unique:users,name',
            'email' => 'required|email|max:50|unique:users,email',
            'phone_number' => 'required|string|max:15|unique:users,phone_number',
            'role' => 'nullable|in:admin,super_admin',
            'password' => 'required|string|min:5|max:32',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ]);
        }
        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'role' => $request->role ?? 'admin',
            'password' => bcrypt($request->password),
        ]);
        return response()->json([
            'message' => 'admin created successfully',
            'data' => new UserResource($admin),
        ], 201);
    }
    public function deleteAdmin($adminId)
    {
        $admin = User::find($adminId);

        if ($admin) {
            $admin->delete();
            return response()->json([
                'message' => "admin $admin->name deleted successfully",
                'data' => new UserResource($admin),
            ]);
        } else {
            return response()->json([
                'message' => "no admin found by id $adminId",
            ]);
        }
    }
    public function toggleAdminStatus($adminId)
    {
        $admin = User::find($adminId);
        if ($admin) {
            $status = $admin->status == 1 ? 0 : 1;
            $admin->update(['status' => $status]);

            $action = $status == 1 ? 'activated' : 'deactivated';

            return response()->json([
                'message' => "Admin $action successfully",
                'data' => new UserResource($admin),
            ]);
        } else {
            return response()->json([
                'message' => "No admin found by id $adminId",
            ]);
        }
    }

    public function logout(Request $request)
    {
        $admin = User::where('access_token', '=', $request->header('access_token'))->first();
        $admin->update([
            'access_token' => null,
        ]);
        return response()->json([
            'message' => "Admin $admin->name loggedout successfully",
            'admin' => $admin,
        ], 200);
    }
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required|string|min:5|max:32',
            'password' => 'required|string|min:5|max:32|confirmed',
        ]);
        $old_password = $request->old_password;
        $password = $request->password; //confirmed

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ]);
        }
        $admin = User::where('access_token', '=', $request->header('access_token'))->first();
        if (Hash::check($old_password, $admin->password)) {
            $admin->update([
                'password' => bcrypt($password),
                // 'access_token' => null,
            ]);
            return response()->json([
                'message' => [
                    'admin password changed successfully',
                    'admin logged out successfully'
                ],
                'data' => new UserResource($admin),
                'next_request' => url('api/v1/login'),
                'method' => 'post',
            ]);
        } else {
            return response()->json([
                'error' => 'password is not correct',
            ]);
        }
    }

    public function showAllAdmins()
    {
        return response()->json([
            'admins' => User::where('role', '!=', 'super_admin')->get(),
        ]);
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {

            $googleUser = Socialite::driver('google')->stateless()->user();

            Log::info('Google User: ', (array) $googleUser);

            if (!$googleUser || !$googleUser->getEmail()) {
                Log::error('Failed to retrieve user information from Google');
                return response()->json(['error' => 'Failed to retrieve user information from Google'], 400);
            }

            $user = User::where('email', $googleUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                ]);
            }

            $token = Str::random(64);

            $user->update(['access_token' => $token]);

            // $baseUrl = env('APP_ENV') === 'production'
            //     ? env('LARAVEL_APP_UIAPI_BASE_URL')
            //     : 'http://localhost:3000';

            // $frontendUrl = `{$baseUrl}/auth/callback`;

            $frontendUrl = 'http://localhost:3000/auth/callback';
            return redirect($frontendUrl . '?token=' . $token);
        } catch (\Exception $e) {
            Log::error('Error during Google callback: ' . $e->getMessage());
            return response()->json(['error' => 'Unauthorized: ' . $e->getMessage()], 401);
        }
    }
}
