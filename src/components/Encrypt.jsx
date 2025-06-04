import forge from "node-forge";
const ENKEY = "+ZG07ITTijzCn+6OWNc+PvCq32E0O5sqzz5kTLnlp6c=";

const expectedKeyLength = 32;
const ivLength = 16;
let base64Key = ENKEY;

function toBase64Url(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function encryptData(plainText) {    
  if (!base64Key) {
    throw new Error("Encryption key is required.");
  }

  let keyBytes;
  try {
    keyBytes = forge.util.decode64(base64Key);
  } catch (e) {
    throw new Error("Invalid base64 key.");
  }

  if (keyBytes.length !== expectedKeyLength) {
    throw new Error(
      `Encryption key must be 32 bytes (256 bits). Got ${keyBytes.length} bytes.`
    );
  }

  const ivBytes = forge.random.getBytesSync(ivLength);
  const cipher = forge.cipher.createCipher("AES-CBC", keyBytes);
  cipher.start({ iv: ivBytes });

  const utf8Text = forge.util.encodeUtf8(JSON.stringify(plainText));
  cipher.update(forge.util.createBuffer(utf8Text));
  const success = cipher.finish();

  if (!success) throw new Error("Encryption failed.");

  const encrypted = cipher.output.getBytes();
  const ivHex = forge.util.bytesToHex(ivBytes);
  const encryptedBase64 = forge.util.encode64(encrypted);
  const combined = `${ivHex}:${encryptedBase64}`;
  const combinedUtf8 = forge.util.encodeUtf8(combined);
  const base64 = forge.util.encode64(combinedUtf8);

  return toBase64Url(base64);
}

export function encryptStringData(plainText) {
  if (!base64Key) {
    throw new Error("Encryption key is required.");
  }

  let keyBytes;
  try {
    keyBytes = forge.util.decode64(base64Key);
  } catch (e) {
    throw new Error("Invalid base64 key.");
  }

  if (keyBytes.length !== expectedKeyLength) {
    throw new Error(
      `Encryption key must be 32 bytes (256 bits). Got ${keyBytes.length} bytes.`
    );
  }

  const ivBytes = forge.random.getBytesSync(ivLength);
  const cipher = forge.cipher.createCipher("AES-CBC", keyBytes);
  cipher.start({ iv: ivBytes });

  const utf8Text = forge.util.encodeUtf8(plainText);
  cipher.update(forge.util.createBuffer(utf8Text));
  const success = cipher.finish();

  if (!success) throw new Error("Encryption failed.");

  const encrypted = cipher.output.getBytes();
  const ivHex = forge.util.bytesToHex(ivBytes);
  const encryptedBase64 = forge.util.encode64(encrypted);
  const combined = `${ivHex}:${encryptedBase64}`;
  const combinedUtf8 = forge.util.encodeUtf8(combined);
  const base64 = forge.util.encode64(combinedUtf8);

  return toBase64Url(base64);
}

export function decrypt(base64UrlCiphertext) {
  if (!base64Key) throw new Error("Encryption key must be provided");

  const keyBytes = forge.util.decode64(base64Key);
  if (keyBytes.length !== 32) {
    throw new Error("Encryption key must be 32 bytes (256 bits)");
  }

  // Convert base64url to base64
  const base64 = base64UrlCiphertext
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(
      base64UrlCiphertext.length + ((4 - (base64UrlCiphertext.length % 4)) % 4),
      "="
    );

  const combinedUtf8 = forge.util.decode64(base64);
  const combined = forge.util.decodeUtf8(combinedUtf8);
  const [ivHex, encryptedBase64] = combined.split(":");

  if (!ivHex || !encryptedBase64) {
    throw new Error("Invalid encrypted payload format");
  }

  const ivBytes = forge.util.hexToBytes(ivHex);
  const encryptedBytes = forge.util.decode64(encryptedBase64);

  const decipher = forge.cipher.createDecipher("AES-CBC", keyBytes);
  decipher.start({ iv: ivBytes });
  decipher.update(forge.util.createBuffer(encryptedBytes));
  const success = decipher.finish();

  if (!success) throw new Error("Decryption failed");

  return forge.util.decodeUtf8(decipher.output.getBytes());
}
