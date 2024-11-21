import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from 'app/(root)/test/page'
 
describe('Test Page', () => {
  const setup = () => render(<Page/>) 

  it('renders a heading', () => {
    setup()
    const heading = screen.getByRole('heading', { level: 1 }) 
    expect(heading).toBeInTheDocument()
  })

  it('should renders public text', () => {
    setup()
    const text = screen.getByText('Public page test');
    expect(text).toBeInTheDocument();
  })
})