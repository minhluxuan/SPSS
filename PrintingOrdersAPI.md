
# Printing Orders API Documentation

## Base URL
```
http://localhost:3000/v1
```

## Endpoints

### GET /printing_order
Retrieve all printing orders.

#### Responses:
- **200 OK**: Successfully retrieved all orders.
  ```json
  {
    "success": true,
    "message": "Find all successfully",
    "data": [
      {
        "id": "string",
        "numFaces": 5,
        "orientation": "LANDSCAPE",
        "size": "A4",
        "documentId": "uuid",
        "printerId": "uuid",
        "printingStatus": "PENDING",
        "purchasingStatus": "PENDING"
      }
    ]
  }
  ```
- **500 Internal Server Error**: Error retrieving orders.

### GET /printing_order/search
Search orders by printing or purchasing status.

#### Parameters:
- `printingStatus` (optional): Filter by printing status.
- `purchasingStatus` (optional): Filter by purchasing status.

#### Responses:
- **200 OK**: Successfully retrieved orders.
  ```json
  [
    {
      "id": "string",
      "numFaces": 5,
      "orientation": "LANDSCAPE",
      "size": "A4",
      "documentId": "uuid",
      "printerId": "uuid",
      "printingStatus": "PENDING",
      "purchasingStatus": "PENDING"
    }
  ]
  ```
- **500 Internal Server Error**: Error searching for orders.

### GET /printing_order/{id}
Get a printing order by its ID.

#### Parameters:
- `id`: The ID of the order to retrieve.

#### Responses:
- **200 OK**: Successfully retrieved order.
  ```json
  {
    "id": "string",
    "numFaces": 5,
    "orientation": "LANDSCAPE",
    "size": "A4",
    "documentId": "uuid",
    "printerId": "uuid",
    "printingStatus": "PENDING",
    "purchasingStatus": "PENDING"
  }
  ```
- **404 Not Found**: Order not found.
- **500 Internal Server Error**: Error retrieving order.

### PUT /printing_order/{id}
Update an existing printing order.

#### Parameters:
- `id`: The ID of the order to update.

#### Request Body:
```json
{
  "numFaces": 5,
  "orientation": "LANDSCAPE",
  "size": "A4",
  "documentId": "uuid",
  "printerId": "uuid"
}
```

#### Responses:
- **200 OK**: Successfully updated order.
  ```json
  {
    "id": "string",
    "numFaces": 5,
    "orientation": "LANDSCAPE",
    "size": "A4",
    "documentId": "uuid",
    "printerId": "uuid",
    "printingStatus": "PENDING",
    "purchasingStatus": "PENDING"
  }
  ```
- **500 Internal Server Error**: Error updating order.

### DELETE /printing_order/{id}
Delete a printing order by its ID.

#### Parameters:
- `id`: The ID of the order to delete.

#### Responses:
- **200 OK**: Successfully deleted order.
- **500 Internal Server Error**: Error deleting order.

### POST /printing_order/create
Create a new printing order.

#### Security:
- Requires JWT authentication.

#### Request Body:
```json
{
  "numFaces": 5,
  "orientation": "LANDSCAPE",
  "size": "A4",
  "documentId": "uuid",
  "printerId": "uuid"
}
```

#### Responses:
- **201 Created**: Successfully created order.
  ```json
  {
    "id": "string",
    "numFaces": 5,
    "orientation": "LANDSCAPE",
    "size": "A4",
    "documentId": "uuid",
    "printerId": "uuid",
    "printingStatus": "PENDING",
    "purchasingStatus": "PENDING"
  }
  ```
- **400 Bad Request**: Invalid request.
- **500 Internal Server Error**: Error creating order.

### GET /printing_order/confirm_status
Confirm order status.

#### Parameters:
- `id`: The ID of the order to update.
- `status`: The status to confirm.

#### Responses:
- **201 Created**: Successfully confirmed status.
- **404 Not Found**: Order not found.
- **500 Internal Server Error**: Error confirming status.

## Components

### Enums

- **PrintingStatus**
  - `PENDING`: The order is pending.
  - `CANCELLED`: The order is cancelled.
  - `PROCESSING`: The order is being processed.
  - `FAILED`: The order failed.
  - `SUCCESS`: The order was successful.

- **PurchasingStatus**
  - `PENDING`: The payment is pending.
  - `PAID`: The payment has been made.
  - `CANCELLED`: The payment was cancelled.
  - `REFUNDED`: The payment was refunded.
  - `PROCESSING`: The payment is processing.
  - `FAILED`: The payment failed.

- **PaperOrientation**
  - `LANDSCAPE`: The paper is in landscape orientation.
  - `PORTRAIT`: The paper is in portrait orientation.

- **PaperSize**
  - `A0`, `A1`, `A2`, `A3`, `A4`, `A5`: Various paper sizes.

### Data Models

- **PrintingOrder**
  - `id`: string
  - `numFaces`: integer
  - `orientation`: string (`LANDSCAPE`, `PORTRAIT`)
  - `size`: string (`A0`, `A1`, `A2`, `A3`, `A4`, `A5`)
  - `documentId`: string (UUID)
  - `printerId`: string (UUID)
  - `printingStatus`: string (`PENDING`, `CANCELLED`, `PROCESSING`, `FAILED`, `SUCCESS`)
  - `purchasingStatus`: string (`PENDING`, `PAID`, `CANCELLED`, `REFUNDED`, `PROCESSING`, `FAILED`)

- **CreatePrintingOrderDto**
  - `numFaces`: integer
  - `orientation`: string (`LANDSCAPE`, `PORTRAIT`)
  - `size`: string (`A0`, `A1`, `A2`, `A3`, `A4`, `A5`)
  - `documentId`: string (UUID)
  - `printerId`: string (UUID)

- **UpdatePrintingOrderDto**
  - `numFaces`: integer (optional)
  - `orientation`: string (`LANDSCAPE`, `PORTRAIT`, optional)
  - `size`: string (`A0`, `A1`, `A2`, `A3`, `A4`, `A5`, optional)
  - `documentId`: string (UUID, optional)
  - `printerId`: string (UUID, optional)
