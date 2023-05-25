#Dog Detector API

This is a dog detection API built with Node.js, Express, Apollo Server, and the BLIP-2 image and text model. The API takes an image URL as an input and uses the BLIP-2 model to determine whether there's a dog in the image.

##Getting Started

Prerequisites
Node.js
npm
Installation
Clone the repo:
bash
git clone https://github.com/yourusername/dog-detector-api.git
Install NPM packages:
bash
npm install
Create a .env file in the root directory of the project and insert your API token:
makefile
REPLICATE_API_TOKEN=your_api_token_here
Usage
Start the server:

bash
npm start
The server runs on port 4000 by default. You can access the GraphQL playground at http://localhost:4000/graphql.

To use the detectDog query, provide an image URL as follows:

```bash
graphql
{
  detectDog(imageUrl: "https://example.com/dog.jpg")
}
```

The query will return true if a dog is detected in the image and false otherwise.



