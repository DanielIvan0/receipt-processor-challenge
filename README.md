# Receipt Processor Challenge

## Table of Contents

- [Introduction](#introduction)
- [API Specifications](#api-specifications)
    - [Process Receipts Endpoint](#process-receipts-endpoint)
    - [Get Points Endpoint](#get-points-endpoint)
    - [Rules](#rules)
- [Installation](#installation)
    - [Install Node.js and npm](#install-nodejs-and-npm)
    - [Install and run the API](#install-and-run-the-api)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Unit Testing](#unit-testing)
- [Technical Docs](#technical-docs)

## Introduction

This Node.js and Express-based API provides functionality to process receipts and calculate the points awarded based on a set of predefined rules. The API consists of two main endpoints: "[Process Receipts](#process-receipts-endpoint)" and "[Get Points](#get-points-endpoint)".

## API Specifications

### Process Receipts Endpoint

**Path: '/receipts/process'**

- Method: **POST**
- Payload: Receipt JSON
- Response: JSON containing an ID for the receipt

#### Description

This endpoint takes in a JSON receipt and returns a JSON object with an ID generated by the system. The generated ID should be used to query the number of points awarded for this receipt using the "[Get Points](#get-points-endpoint)" endpoint.

#### Example request body

```JSON
{
  "retailer": "M&MCornerMarket",
  "purchaseDate": "2022-03-20",
  "purchaseTime": "14:33",
  "items": [
    {
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    }
  ],
  "total": "9.00"
}
```

#### Example response

```JSON
{"id": "6ec41bfa-e288-4801-a40a-87129208c1e2"}
```

### Get Points Endpoint

**Path: '/receipts/{id}/points'**

- Method: **GET**
- Response: A JSON object containing the number of points awarded

#### Description

This simple Getter endpoint looks up the receipt by its ID and returns an object specifying the points awarded for the receipt.

#### Example Response:

```JSON
{"points": 109}
```

### Rules

These rules collectively define how many points should be awarded to a receipt.

* One point for every alphanumeric character in the retailer name.
* 50 points if the total is a round dollar amount with no cents.
* 25 points if the total is a multiple of `0.25`.
* 5 points for every two items on the receipt.
* If the trimmed length of the item description is a multiple of 3, multiply the price by `0.2` and round up to the nearest integer. The result is the number of points earned.
* 6 points if the day in the purchase date is odd.
* 10 points if the time of purchase is after 2:00pm and before 4:00pm.

## Installation

### Install Node.js and npm
Before you can run this API, you'll need to have [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) (Node Package Manager) installed on your machine.

If you don't have Node.js and npm installed, you can download and install them from the official website: [Node.js Downloads](https://nodejs.org/en/download/).

Follow the installation instructions for your operating system.

### Install and run the API

To install and run this API on your local machine, follow these steps:

1. Clone this repository:

    ```Bash
    git clone https://github.com/DanielIvan0/receipt-processor-challenge.git
    ```

2. Navigate to the project directory:

    ```Bash
    cd receipt-processor-challenge
    ```

3. Install the dependencies using npm:

    ```Bash
    npm install
    ```

## Getting Started

To get started with using this API, follow these steps:

1. Start the API server:

    ```Bash
    npm start
    ```

2. The API will be accessible at http://localhost:3000

## Usage

To use the API, you can send HTTP requests to the specified endpoints using a tool like [curl](https://curl.se/) or API testing tools like [Postman](https://www.postman.com/).

## Unit Testing

This API is thoroughly tested using [Jest](https://jestjs.io/). To run the unit tests, use the following command:

```Bash
npm run test
```

## Technical Docs

To gain a deeper insight into the technical aspects of how this API has been constructed, please visit the following [webpage](/receipt-processor-challenge/docs/index.html).
