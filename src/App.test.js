import { render, screen } from "@testing-library/react"
import App from "./App"
import {BrowserRouter as Router} from 'react-router-dom'

test('app',()=>{
    render(<Router><App/></Router>);
    const element = screen.getByTestId('app');
    expect(element).toBeInTheDocument()
})