import { render, screen } from "@testing-library/react"
import Table from "../component/Table";
import { BrowserRouter as Router } from 'react-router-dom';

test('Table', () => {
  render(<Router><Table /></Router>);
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
})