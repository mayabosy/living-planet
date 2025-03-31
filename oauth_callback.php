<?php

require_once __DIR__ . '/vendor/autoload.php';

session_start();
try {
    // Initialize the Google Client
    $googleClient = new Google_Client();
    $googleClient->setAuthConfig('client_secret.json');
    $googleClient->setRedirectUri('http://w20037161.eastus.cloudapp.azure.com/oauth_callback.php');
    $googleClient->addScope('https://www.googleapis.com/auth/userinfo.email');

    // Check if the authorization code is not set
    if (!isset($_GET['code'])) {
        // Generate the authorization URL
        $auth_url = $googleClient->createAuthUrl();
        header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
    } else {
        // Authenticate the authorization code
        $googleClient->authenticate($_GET['code']);
        $_SESSION['access_token'] = $googleClient->getAccessToken();
        $redirect_uri = 'http://' . $_SERVER['HTTP_HOST'] . '/oauth_handler.php';
        header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
    }
} catch (Exception $ex) {
    // Handle exceptions
    echo 'Caught exception: ',  $ex->getMessage(), "\n";
}


?>
