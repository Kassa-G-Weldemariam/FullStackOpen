import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls the event handler with the right details when a new blog is created', async () => {
  const mockCreateBlog = vi.fn()

  render(<BlogForm createBlog={mockCreateBlog} />)

  // Find inputs by their text labels using regular expressions
  const titleInput = screen.getByLabelText(/title:/i)
  const authorInput = screen.getByLabelText(/author:/i)
  const urlInput = screen.getByLabelText(/url:/i)
  const button = screen.getByText('create')

  const user = userEvent.setup()

  // Type into the input fields
  await user.type(
    titleInput,
    'component testing is done with react-testing-library',
  )
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'http://testurl.com')

  // Click the submit button
  await user.click(button)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe(
    'component testing is done with react-testing-library',
  )
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('test author')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('http://testurl.com')
})
