import type { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Storytelling',
    excerpt: 'Discover the fundamental principles that make a story truly captivating.',
    content: 'Full content here...',
    author: 'Emma Wilson',
    date: '2023-09-15',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjI0MDE0NjU0&ixlib=rb-1.2.1&q=80',
    slug: 'art-of-storytelling'
  },
  {
    id: '2',
    title: 'Writing Tips for Beginners',
    excerpt: 'Essential writing tips that every aspiring author should know.',
    content: 'Full content here...',
    author: 'David Chen',
    date: '2023-09-10',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjI0MDE0NjU4&ixlib=rb-1.2.1&q=80',
    slug: 'writing-tips-beginners'
  }
];