import { Bundler } from "parcel-bundler";

export const ParcelHMR = async (entry, opts) => {
  // Run Parcel bundler for client development
  const bundler = new Bundler(entry, opts);
  // Bugfix: parcel bundler must call bundle at least once using middleware
  await bundler.bundle();
  return bundler;
};
