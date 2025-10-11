import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import App from '../App'

describe('Job Searching App - Vitest Suite', () => {
  it('renders Home component at root ("/")', async () => {
    render(<App />)
    expect(await screen.findByText(/Search Remote Jobs/i)).toBeInTheDocument()
  })

  it('navigates to Search by Location page when clicking Search by Location link', async () => {
    render(<App />)
    const navbars = screen.getAllByRole('navigation')
    const navbar = navbars[0]
  
    const locationLink = within(navbar).getByRole('link', { name: /Location$/i })
    fireEvent.click(locationLink)
  
    await waitFor(() => {
      expect(screen.getByText(/Locations/i)).toBeInTheDocument()
    })
  })
  
  it('navigates to Search by Industry page when clicking Search by Industry link', async () => {
    render(<App />)
    const navbars = screen.getAllByRole('navigation')
    const navbar = navbars[0]
  
    const industryLink = within(navbar).getByRole('link', { name: /Industry$/i })
    fireEvent.click(industryLink)
  
    await waitFor(() => {
      expect(screen.getByText(/Industries/i)).toBeInTheDocument()
    })
  })
  
  it('navigates to Custom Search page when clicking Custom Search link', async () => {
    render(<App />)
    const navbars = screen.getAllByRole('navigation')
    const navbar = navbars[0]
  
    const industryLink = within(navbar).getByRole('link', { name: /^Custom/ })
    fireEvent.click(industryLink)
  
    await waitFor(() => {
      expect(screen.getByText(/Keyword/i)).toBeInTheDocument()
    })
  })

  it('handles invalid location ID gracefully', async () => {
    window.history.pushState({}, '', '/locations/meow')
    render(<App />)
    expect(await screen.findByText(/Could not fetch jobs for the geo "meow"/i)).toBeInTheDocument()
  })

  it('handles invalid industry ID gracefully', async () => {
    window.history.pushState({}, '', '/industries/meow')
    render(<App />)
    expect(await screen.findByText(/Could not fetch jobs for the industry "meow"/i)).toBeInTheDocument()
  })

  it('handles invalid page gracefully', async () => {
    window.history.pushState({}, '', '/meow')
    render(<App />)
    expect(await screen.findByText(/404 - Page Not Found/i)).toBeInTheDocument()
  })
})