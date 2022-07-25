# auctionappAPI

# Setting up the app locally
## Prerequisites
- NodeJS v16.x
- MongoDB v4.x
- [nodemon](https://www.npmjs.com/package/nodemon) npm module.
- Cloudinary [account](https://cloudinary.com/) for uploading images.

## Next Steps
1. Clone the repository
2. Install the dependencies
```sh
npm install
```
2. Run the app in devlopment environment:
- Go to configs folder, `cd configs`
- Create a dev.env file, `touch dev.env`
- Add following environment variables to the file:
```sh
NODE_ENV=Development
JWT_SECRET=<jwt-secret-of-your-choice>
JWT_EXP=7d
MONGODB_URI=mongodb://localhost:27017/auctionAPI
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_KEY=<your-cloudinary-key>
CLOUDINARY_SECRET=<your-cloudinary-secret>
```
3. Finally start the app
```sh
npm run devstart
```

# Contributing
- Read the [Code of Conduct](./docs/code-of-conduct.md) first.
- Contibuting [guidelines](./docs/contributing/contributing.md)


# [<h3>Connect with us on Discord](https://discord.gg/5PNFxQF2nz) 