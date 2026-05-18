import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'component testing is done with react-testing-library',
    author: 'test author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'test user',
    },
  }

  render(<Blog blog={blog} />)

  // Checks that title and author are rendered
  const element = screen.getByText(
    'component testing is done with react-testing-library test author',
    { exact: false },
  )
  expect(element).toBeDefined()

  // Checks that URL and likes are not rendered by default
  const urlElement = screen.queryByText('http://testurl.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('likes 5')
  expect(likesElement).toBeNull()
})

test('shows URL and likes when the view button is clicked', async () => {
  const blog = {
    title: 'component testing is done with react-testing-library',
    author: 'test author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'test user',
    },
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  // Checks that URL and likes are visible after clicking
  const urlElement = screen.getByText('http://testurl.com')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('likes 5', { exact: false })
  expect(likesElement).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'component testing is done with react-testing-library',
    author: 'test author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'test user',
    },
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()

  // Open details view first
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  // Click the like button twice
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
