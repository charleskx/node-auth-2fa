
# Factor Authentication (2FA) with Node.js and Fastify

This is a sample project that demonstrates how to implement two-factor authentication (2FA) in a Node.js application using the Fastify and the Speakeasy library.


## Prerequisites

- Node.js and npm installed on your machine.
- Docker and Docker Compose installed on your machine.


## Installation

Clone this repository on your local machine:

```bash
  git clone https://github.com/charleskx/node-auth-2fa.git
```

Navigate to the project directory:

```bash
  cd node-auth-2fa
```

Install the project dependencies:

```bash
  npm i
```

Start the PostgreSQL database using Docker Compose:

```bash
  docker-compose up -d
```
## Configuration

Copy the `.env.example` file to `.env`:

```
cp .env.example .env
```

Edit the .env file and set the environment variables as required.


## Use

Start the server:

```
npm run start:dev
```

The server will be running on http://localhost:3333 by default.


## API documentation

#### Check that the system is working correctly

```http
  GET /health
```

#### Create a new user

```http
  POST /users
```

| Parameter   | Type       | Description                         |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Required**. User name |
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required**. User password, minimum 6 characters  |

#### Private endpoint that returns user data

```http
  GET /users/me
```

#### User login with access credentials

```http
  POST /sessions
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Required**. User email |
| `password`      | `string` | **Required**. User password |

#### Creates a relationship with a 2FA token

```http
POST /sessions/two-factor
```

#### Activates the 2FA token for use

```http
PATCH /sessions/two-factor/active
```

#### Validates the token entered by the user

```http
POST /sessions/two-factor/verify
```

#### Resets the user's token and returns a new authentication URL

```http
PATCH /sessions/two-factor/reset
```


## Contributing

Contributions are welcome! Feel free to open an issue or send a pull request.


## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)

