import assert from "node:assert/strict";
import { test } from "node:test";
import { GUEST_NAME, isGuestName, nameForSubmit, validateDisplayName } from "./names";

test("accepts ordinary display names", () => {
  assert.equal(validateDisplayName("Ada").ok, true);
  const accepted = validateDisplayName("  vault kid  ");
  assert.equal(accepted.ok, true);
  if (accepted.ok) {
    assert.equal(accepted.name, "vault kid");
  }
});

test("rejects reserved and impersonation names", () => {
  assert.equal(validateDisplayName("Admin").ok, false);
  assert.equal(validateDisplayName("100X Official").ok, false);
  assert.equal(validateDisplayName("moderator").ok, false);
});

test("rejects hateful and obfuscated names without echoing them", () => {
  const blocked = ["fuck", "f u c k", "fvck", "n1gger"];
  for (const input of blocked) {
    const result = validateDisplayName(input);
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.error.includes(input), false);
      assert.match(result.error, /different name|reserved|letters/i);
    }
  }
});

test("blank submit names become the guest placeholder", () => {
  assert.equal(nameForSubmit(""), GUEST_NAME);
  assert.equal(nameForSubmit("  "), GUEST_NAME);
  assert.equal(isGuestName(GUEST_NAME), true);
  assert.equal(isGuestName("Ada"), false);
});

test("rejects oversized or symbolic names", () => {
  assert.equal(validateDisplayName("A").ok, false);
  assert.equal(validateDisplayName("this name is way too long").ok, false);
  assert.equal(validateDisplayName("hello@world").ok, false);
});
