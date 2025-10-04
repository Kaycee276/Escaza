# Escaza Backend

A Node.js/Express backend with Google OAuth authentication for the Escaza application.

## Features

- Google OAuth authentication
- JWT token management
- User session handling
- Secure API endpoints
- Rate limiting and security middleware

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Set application type to "Web application"
6. Add authorized origins:
   - `http://localhost:5173` (for development)
   - Your production domain
7. Add authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - Your production domain
8. Copy the Client ID and Client Secret to your `.env` file

### 4. Generate JWT Secret

Generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Add the generated string to your `.env` file as `JWT_SECRET`.

### 5. Run the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### POST `/api/auth/google`

Authenticate with Google OAuth

**Request Body:**

```json
{
	"credential": "google_jwt_token_here"
}
```

**Response:**

```json
{
	"success": true,
	"message": "Authentication successful",
	"token": "jwt_token_here",
	"user": {
		"id": "google_id",
		"email": "user@example.com",
		"name": "User Name",
		"picture": "profile_picture_url",
		"emailVerified": true
	}
}
```

#### GET `/api/auth/me`

Get current user information (requires authentication)

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
	"success": true,
	"user": {
		"id": "google_id",
		"email": "user@example.com",
		"name": "User Name",
		"picture": "profile_picture_url",
		"emailVerified": true,
		"createdAt": "2024-01-01T00:00:00.000Z",
		"lastLogin": "2024-01-01T00:00:00.000Z"
	}
}
```

#### POST `/api/auth/logout`

Logout user (requires authentication)

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
	"success": true,
	"message": "Logout successful"
}
```

#### GET `/api/auth/verify`

Verify if token is valid (requires authentication)

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
	"success": true,
	"message": "Token is valid",
	"user": {
		"userId": "google_id",
		"email": "user@example.com",
		"name": "User Name"
	}
}
```

### Health Check

#### GET `/health`

Check server status

**Response:**

```json
{
	"status": "OK",
	"message": "Server is running"
}
```

## Frontend Integration

Update your frontend SignIn component to call the backend:

```typescript
onSuccess={async (credentialResponse) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credential: credentialResponse.credential
      })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      // Redirect or update state
    }
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}}
```

## Security Features

- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes per IP)
- CORS configuration
- JWT token validation
- Input validation with express-validator
- Google OAuth token verification

## Production Considerations

1. **Database**: Replace in-memory user storage with a proper database (PostgreSQL, MongoDB, etc.)
2. **Environment**: Set `NODE_ENV=production`
3. **HTTPS**: Use HTTPS in production
4. **Domain**: Update CORS origins and Google OAuth redirect URIs
5. **Monitoring**: Add logging and monitoring
6. **Backup**: Implement proper backup strategies

## Development

The server uses nodemon for development, which will automatically restart when files change.

## License

ISC
