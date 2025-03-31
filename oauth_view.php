<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Living Planet</title>
    <link rel="stylesheet" href="/styles/style-connected.css">
</head>
<body>
    <!-- Banner -->
    <div class="header-title"><h1>Living Planet 2024</h1></div>
    <!-- Header section -->
    <header id="header">
        <div class="nav-container">
            <!-- Navigation menu -->
            <nav>
                <a href="home.html">Home</a>
                <a href="/oauth_handler.php">Open Authorization</a>
                <a href="about.html">About</a>
            </nav>
        </div>
    </header>
    <!-- Main content section -->
    <main class="oauth-main">
        <!-- Section for OAuth login -->
        <section class="oauth-section">
            <!-- Additional information section if user is logged in -->
            <?php if (isset($email)): ?>
                <div class="logged-in">
                    <p class="info-message"><i class="fas fa-info-circle"></i> Hello! Only logged in users can see this page</p>
                    <p class="user-email">You are logged in as: <?php echo htmlspecialchars($email); ?></p>
                    <form method="post">
                        <input type="submit" name="signOut" value="Sign Out" class="button-sign-out">
                    </form>
                </div>
            <!-- If user is not logged in -->
            <?php else: ?>
                <div class="signin-container">
                    <h3>Login with Google</h3>
                    <a href="<?php echo htmlspecialchars($authUrl); ?>" class="button-google"><i class="fab fa-google"></i> Sign In</a>
                </div>
            <?php endif; ?>
        </section>
        <!-- Additional information section if user is logged in -->
        <?php if (isset($email)): ?>
            <aside class="oauth-info">
                <h2>What is OAuth2?</h2>
                <p>OAuth2 (Open Authorization) is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service, such as Google, Facebook, or GitHub, without exposing the user's credentials. This process ensures secure and streamlined user authentication, making it easier for users to log in to your website using their existing accounts on these services.</p>
                <h2>How OAuth2 Works</h2>
                <ol>
                    <li><strong>Authorization Request:</strong> When a user tries to access a protected resource on your website (such as the content available only to logged-in users), they are redirected to the OAuth provider (e.g., Google). This redirection includes a request for authorization, where the user is asked to grant your website permission to access specific data from their account.</li>
                    <li><strong>Authorization Grant:</strong> If the user consents, the OAuth provider issues an authorization grant to your website. This grant is typically in the form of a code that your website can use to request an access token. This step ensures that the user has given explicit permission for your website to access their data.</li>
                    <li><strong>Access Token:</strong> Your website exchanges the authorization grant for an access token by making a request to the OAuth provider's token endpoint. This token acts as a key, allowing your website to access the user's data without needing their password. The token is usually short-lived and can be refreshed if needed.</li>
                    <li><strong>API Request:</strong> With the access token, your website can now make API requests to the OAuth provider to retrieve the user's data. For example, you can request the user's email address to personalize their experience on your site. The token ensures that these requests are authenticated and authorized by the user.</li>
                </ol>
                <h2>Benefits of OAuth2</h2>
                <ul>
                    <li><strong>Security:</strong> Users do not need to share their passwords with your website, reducing the risk of credential theft.</li>
                    <li><strong>User Convenience:</strong> Users can log in using existing accounts from popular services, avoiding the need to create and remember new credentials.</li>
                    <li><strong>Enhanced User Experience:</strong> Personalized content and features based on authenticated user data improve overall user engagement and satisfaction.</li>
                </ul>
            </aside>
        <?php endif; ?>
    </main>
    <!-- Footer section -->
    <footer>
        <div class="container">
            <p>&copy; 2024 Living Planet. Maja Bosy W20037161.</p>
        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</body>
</html>
