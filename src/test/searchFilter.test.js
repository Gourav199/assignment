import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import SearchFilter from "../component/searchFilter";

test('SearchFilter', () => {

        render(<Router><SearchFilter /></Router>);
        const placeholderElementone = screen.getByPlaceholderText(/select action type/i);
        const placeholderElementtwo = screen.getByPlaceholderText(/select application type/i);
        const placeholderElementthree = screen.getByTestId(/startdate/i);
        const placeholderElementfour = screen.getByTestId(/fromDate/i);
        expect(placeholderElementone).toBeInTheDocument();
        expect(placeholderElementtwo).toBeInTheDocument();
        expect(placeholderElementthree).toBeInTheDocument();
        expect(placeholderElementfour).toBeInTheDocument();
})