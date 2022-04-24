# Veggie Rescue Backend

The backend for this project was implemented using Express. There are a couple things that you need to do to get started.

# Set Up

To make sure you have all the necessary dependencies run

```
npm i
```

This will install all the required libraries that are used in the project.

## URIs and Secret Keys

In order to protect our information, URIs and secret keys were not uploaded into the repo, but are required.

You will need to request these from our tech lead Sophia.

All of those should be copied into a file named `.env` in the root directory.

## Starting Up The Application

After carrying all the previous steps, all that is left is starting up the application.

To do this, run the following command:

```
npm run server
```

This will open the server using Nodemon so that you do not need to restart each time a change is made.

# Routes

## Driver Side Application

## `/api/drivers`

adminProtected route; used to register a new driver.

- POST

### Request

Body:
| ----- | ----------- |
| `name` | Name of driver|
| `pin` | Pin of driver |

### Response

| Field   | Description                                      |
| ------- | ------------------------------------------------ |
| `_id`   | Driver ID                                        |
| `name`  | Driver name                                      |
| `token` | A token to be used as an identifier for a drived |



## `/api/drivers/login`

Unprotected route; used to login a driver.
### Compatible Methods

- POST
- 
### Request

Body:
| ----- | ----------- |
| `pin` | Pin of driver |

### Response

| Field   | Description                                      |
| ------- | ------------------------------------------------ |
| `_id`   | Driver ID                                        |
| `name`  | Driver name                                      |
| `token` | A token to be used as an identifier for a drived |



## Admin Side Application

## `/api/admin`

Unprotected route; used to register a new admin. (Will need to eventually protect this)

### Compatible Methods

- POST

### Request

Body:
| ----- | ----------- |
| `name` | Name of admin|
| `password` | Pin of admin |
| `email` | email of admin |

### Response

| Field   | Description                                      |
| ------- | ------------------------------------------------ |
| `_id`   | Admin ID                                         |
| `name`  | Admin name                                       |
| `email` | Admin name                                       |
| `token` | A token to be used as an identifier for an admin |

## `/api/admin/login`

Unprotected route; used to login an admin.

### Compatible Methods

- POST

### Request

Body:
| ----- | ----------- |
| `email` | email of admin |
| `password` | Pin of admin |

### Response

| Field   | Description                                      |
| ------- | ------------------------------------------------ |
| `_id`   | Admin ID                                         |
| `name`  | Admin name                                       |
| `email` | Admin name                                       |
| `token` | A token to be used as an identifier for an admin |


