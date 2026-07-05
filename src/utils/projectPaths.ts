export function resolveProjectAsset(folder: string, asset: string) {
  if (asset.startsWith("/")) {
    return asset;
  }

  return `/Projects/${folder}/${asset}`;
}
