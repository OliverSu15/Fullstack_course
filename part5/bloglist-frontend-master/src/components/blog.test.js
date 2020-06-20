import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('title and author', () => {
  const blog = {
    title: 'wqeqweqwe',
    author: 'qweqwe',
    users: [{ id:'2313123' }],
    url: '12312',
    likes: 0
  }

  const component = render(<Blog blog={blog}/>)
  const target = component.container.querySelector('.base')

  expect(target).toHaveTextContent('wqeqweqwe qweqwe')
  expect(target).not.toHaveTextContent('12312')
  expect(target).not.toHaveTextContent(0)

})

test('url and likes', () => {
  const blog = {
    title: 'wqeqweqwe',
    author: 'qweqwe',
    users: [{ id:'2313123' }],
    url: '12312',
    likes: 0
  }

  const component = render(<Blog blog={blog}/>)
  const target = component.container.querySelector('.complex')

  expect(target).toHaveTextContent('12312')
  expect(target).toHaveTextContent(0)
})

test('twice', () => {
  const blog = {
    title: 'wqeqweqwe',
    author: 'qweqwe',
    users: [{ id:'2313123' }],
    url: 'qweqw',
    likes: 0
  }

  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} handleLike={mockHandler}/>)
  const button = component.getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})