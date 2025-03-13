import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

function Cosa() {
  return <div data-testid="test">test</div>;
}

it("test", () => {
  render(<Cosa />);
  const algo = screen.getByTestId("test");
  expect(algo).toBeInTheDocument();
});
