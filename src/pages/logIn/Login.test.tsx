import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LogIn from "./LogIn";

it("renders", async () => {
    // Arrange
    
    //render(<LogIn />)

    // Act
    await screen.findByRole("heading");

    // Assert
    //expect(screen.getByRole("heading")).toHaveTextContent("New Game");
})