<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class UnlimitedSession
{
    public function handle($request, Closure $next)
    {
        // Check if the user meets the criteria to have an unlimited session
        if (Auth::check() && $this->userShouldHaveUnlimitedSession(Auth::user()) == 1) {
            // Override the session configuration
            config(['session.lifetime' => null]); // null means session never expires
        }

        return $next($request);
    }

    private function userShouldHaveUnlimitedSession($user)
    {
        // Implement your logic here to determine if the user should have an unlimited session
        // For example, check the user's role or any other criteria
        return $user->session_unlimited; // Example: user is an admin
    }
}
