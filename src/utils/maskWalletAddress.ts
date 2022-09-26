export function maskWalletAddress(address: string) {
  const prefix = address.substring(0, 6);
  const suffix = address.substring(address.length - 4);
  return `${prefix}...${suffix}`;
}
