const { getPath } = require("./getPath");

describe("getPath()", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <ul id="list">
          <li class="item">One</li>
          <li class="item">Two</li>
        </ul>
      </div>
    `;
  });

  test("возвращает селектор по id", () => {
    const el = document.getElementById("list");
    const selector = getPath(el);
    expect(document.querySelector(selector)).toBe(el);
    expect(document.querySelectorAll(selector)).toHaveLength(1);
  });

  test("возвращает уникальный селектор для li", () => {
    const el = document.querySelector("ul li:first-child");
    const selector = getPath(el);
    expect(document.querySelector(selector)).toBe(el);
    expect(document.querySelectorAll(selector)).toHaveLength(1);
  });

  test("работает для body", () => {
    expect(getPath(document.body)).toBe("body");
  });

  test("бросает ошибку если аргумент не элемент", () => {
    expect(() => getPath(null)).toThrow();
  });
});
