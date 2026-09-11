import assert from "node:assert/strict";
import { test } from "node:test";
import { thenHeadlinesUrl } from "./then-news";

test("Google News window is US stock market headlines on or before entry", () => {
  const url = new URL(thenHeadlinesUrl("2020-01-02"));
  assert.equal(url.origin + url.pathname, "https://www.google.com/search");
  const query = url.searchParams.get("q") ?? "";
  assert.match(query, /US stock market outlook/);
  assert.match(query, /after:2019-11-17/);
  assert.match(query, /before:2020-01-03/);
  assert.equal(url.searchParams.get("tbm"), "nws");
  assert.equal(url.searchParams.get("gl"), "us");
  const tbs = url.searchParams.get("tbs") ?? "";
  assert.match(tbs, /cd_min:11\/18\/2019/);
  assert.match(tbs, /cd_max:1\/2\/2020/);
});
