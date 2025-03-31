<?php
require_once __DIR__ . '/vendor/autoload.php';
session_start();

// Create Google_Client instance
$googleClient = new Google_Client();
    
// Set authentication configuration file
$googleClient->setAuthConfig('client_secret.json');
    
// Set redirect URI after authentication
$googleClient->setRedirectUri('http://w20037161.eastus.cloudapp.azure.com/oauth_callback.php');
    
// Add scope for accessing user's email
$googleClient->addScope('https://www.googleapis.com/auth/userinfo.email');
    

// Initialize variables
$email = null;
$authUrl = null;

// Check if the user is already authenticated
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {

    // Set access token
    $googleClient->setAccessToken($_SESSION['access_token']);

    // Create Google_Service_Oauth2 instance
    $oauth2 = new Google_Service_Oauth2($googleClient);

    // Get user information
    $user = $oauth2->userinfo->get();
    
    // Sanitize email address
    $email = filter_var($user->email, FILTER_SANITIZE_EMAIL);
} else {
    // Generate authentication URL
    $authUrl = $googleClient->createAuthUrl();
}

// Handle sign out
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['signOut'])) {
    // Revoke access token
    $googleClient->revokeToken($_SESSION['access_token']);

    // Destroy session
    session_destroy();

    // Revoke access token
    header('Location: /home.html');
    exit;
}

// Include the template file to render the HTML
include 'oauth_view.php';
?>
