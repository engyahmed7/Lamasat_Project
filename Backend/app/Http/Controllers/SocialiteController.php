<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->stateless()->redirect();
    }

    public function handleFacebookCallback()
    {
        try {
            $facebookUser = Socialite::driver('facebook')->stateless()->user();

            Log::info('facebook User: ', (array) $facebookUser);

            if (!$facebookUser || !$facebookUser->getEmail()) {
                Log::error('Failed to retrieve user information from facebook');
                return response()->json(['error' => 'Failed to retrieve user information from facebook'], 400);
            }

            $user = User::where('email', $facebookUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'name' => $facebookUser->getName(),
                    'email' => $facebookUser->getEmail(),
                    'facebook_id' => $facebookUser->getId(),
                ]);
            }

            $token = Str::random(64);

            $user->update(['access_token' => $token]);

            $frontendUrl = 'http://127.0.0.1:3000/auth/callback';
            return redirect($frontendUrl . '?token=' . $token);
        } catch (\Exception $e) {
            Log::error('Error during facebook callback: ' . $e->getMessage());
            return response()->json(['error' => 'Unauthorized: ' . $e->getMessage()], 401);
        }
    }
}
