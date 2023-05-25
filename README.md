# Dog Detector API 🐶

This API is a novel dog detection tool, powered by Node.js, Express, Apollo Server, and the revolutionary BLIP-2 image and text model. By leveraging the prowess of BLIP-2, this API can accurately determine the presence of a dog in any given image.

## Getting Started 🚀

### Installation ⚙️

Follow the steps below to get the API up and running on your local machine:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/dog-detector-api.git
    ```

2. **Navigate into the cloned repository** and **install NPM packages**:
    ```bash
    cd dog-detector-api
    npm install
    ```

3. **Set up your environment file**. Create a `.env` file in the root directory of the project. Insert your Replicate API token:
    ```env
    REPLICATE_API_TOKEN=your_api_token_here
    ```

## Usage 🛠️

To start the server, use the following command:

```bash
npx tsc index.ts 
```

To use the detectDog query, provide an image URL as follows:
Feel free to test using postman

```bash
{
  detectDog(imageUrl: "https://example.com/dog.jpg")
}
```

The query will return true if a dog is detected in the image and false otherwise.
🐕🐕🐕
