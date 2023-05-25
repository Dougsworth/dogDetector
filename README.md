Dog Detector API

This is a dog detection API built with Node.js, Express, Apollo Server, and the BLIP-2 image and text model. The API takes an image URL as an input and uses the BLIP-2 model to determine whether there's a dog in the image.

Getting Started

Prerequisites
Node.js
npm
Installation
Clone the repo:
bash
Copy code
git clone https://github.com/yourusername/dog-detector-api.git
Install NPM packages:
bash
Copy code
npm install
Create a .env file in the root directory of the project and insert your API token:
makefile
Copy code
REPLICATE_API_TOKEN=your_api_token_here
Usage
Start the server:

bash
Copy code
npm start
The server runs on port 4000 by default. You can access the GraphQL playground at http://localhost:4000/graphql.

To use the detectDog query, provide an image URL as follows:

graphql
Copy code
{
  detectDog(imageUrl: "https://example.com/dog.jpg")
}
The query will return true if a dog is detected in the image and false otherwise.

Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License

Distributed under the MIT License. See LICENSE for more information.

Contact

Your Name - example@example.com

Project Link: https://github.com/yourusername/dog-detector-api

