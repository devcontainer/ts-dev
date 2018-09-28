import { join } from "path";
import * as express from "express";
// const Bundler = require("parcel-bundler");

// // import { ParcelHMR } from "./src/server/middlewares/serve-static/serve-static";
// export const parcelHMR = (entry, opts) => {
//   // Run Parcel bundler for client development
//   const bundler = new Bundler(entry, opts);
//   // Bugfix: parcel bundler must call bundle at least once using middleware
//   bundler.bundle();
//   return bundler;
// };
// export const isDev = p => {
//   const debugEnv = ["production", "release", "prod", "rel", "qa"];
//   return !!p.env.DEBUG || debugEnv.indexOf(p.env.NODE_ENV) === -1;
// };

const app = express();
console.log("Starting Express");
// if (isDev(process)) {
//   const parcelEntryFiles = [join(__dirname, "./index.html")];
//   const parcelOptions = {
//     https: true,
//     hmr: true,
//     hmrPort: process.env.HMR_PORT
//   };
//   console.log(parcelEntryFiles);
//   const bundler = parcelHMR(parcelEntryFiles, parcelOptions);
//   app.use(bundler.middleware());
// }
// app.use(express.static(join(__dirname), { maxAge: 31557600000 }));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
});
