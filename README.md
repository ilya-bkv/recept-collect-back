# Receipt Collection API

## Overview
This is a RESTful API for managing receipts. It allows users to create, read, update, and delete receipts, as well as retrieve receipts by user ID.

## Base URL
```
http://[hostname]:[port]/api
```

The default port is 5000 if not specified in the environment variables.

## Authentication
Currently, this API does not implement authentication. All endpoints are publicly accessible.

## API Endpoints

### Create a Receipt
Creates a new receipt in the system.

**URL**: `/receipts`

**Method**: `POST`

**Request Body**:
```json
{
  "userId": "string",
  "receiptId": "string",
  "receiptData": "string"
}
```

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "_id": "string",
  "userId": "string",
  "receiptId": "string",
  "receiptData": "string"
}
```

**Error Responses**:
- **Code**: 409 Conflict
  - **Content**: `{ "error": "Receipt already exists" }`
- **Code**: 500 Internal Server Error
  - **Content**: `{ "error": "error message" }`

### Get All Receipts
Retrieves all receipts from the system.

**URL**: `/receipts`

**Method**: `GET`

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
[
  {
    "_id": "string",
    "userId": "string",
    "receiptId": "string",
    "receiptData": "string"
  }
]
```

**Error Response**:
- **Code**: 500 Internal Server Error
  - **Content**: `{ "error": "error message" }`

### Get Receipt by ID
Retrieves a specific receipt by its ID.

**URL**: `/receipts/:id`

**Method**: `GET`

**URL Parameters**:
- `id`: The receipt ID

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "_id": "string",
  "userId": "string",
  "receiptId": "string",
  "receiptData": "string"
}
```

**Error Responses**:
- **Code**: 404 Not Found
  - **Content**: `{ "message": "Receipt not found" }`
- **Code**: 500 Internal Server Error
  - **Content**: `{ "error": "error message" }`

### Update a Receipt
Updates an existing receipt.

**URL**: `/receipts/`

**Method**: `PUT`

**Request Body**:
```json
{
  "userId": "string",
  "receiptId": "string",
  "receiptData": "string"
}
```

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
{
  "_id": "string",
  "userId": "string",
  "receiptId": "string",
  "receiptData": "string"
}
```

**Error Responses**:
- **Code**: 404 Not Found
  - **Content**: `{ "message": "Receipt not found" }`
- **Code**: 500 Internal Server Error
  - **Content**: `{ "error": "error message" }`

### Delete a Receipt
Deletes a receipt from the system.

**URL**: `/receipts/:id`

**Method**: `DELETE`

**URL Parameters**:
- `id`: The receipt ID

**Success Response**:
- **Code**: 200 OK
- **Content**: `{ "message": "Receipt deleted successfully" }`

**Error Responses**:
- **Code**: 404 Not Found
  - **Content**: `{ "message": "Receipt not found" }`
- **Code**: 500 Internal Server Error
  - **Content**: `{ "error": "error message" }`

### Get Receipts by User ID
Retrieves all receipts belonging to a specific user.

**URL**: `/receipts/user/:userId`

**Method**: `GET`

**URL Parameters**:
- `userId`: The user ID

**Success Response**:
- **Code**: 200 OK
- **Content**:
```json
[
  {
    "_id": "string",
    "userId": "string",
    "receiptId": "string",
    "receiptData": "string"
  }
]
```

**Error Response**:
- **Code**: 500 Internal Server Error
  - **Content**: `{ "error": "error message" }`

## Data Models

### Receipt
| Field | Type | Description |
|-------|------|-------------|
| userId | String | The ID of the user who owns the receipt |
| receiptId | String | The unique identifier for the receipt |
| receiptData | String | The receipt data (typically JSON stored as a string) |

## Development
This API is built with:
- Node.js
- Express.js
- MongoDB with Mongoose
