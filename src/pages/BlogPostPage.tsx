import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, Heart } from 'lucide-react';
import { mockBlogPosts } from '../data/mockData';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = mockBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
          <Link to="/blog" className="text-blue-600 hover:text-blue-700">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        {/* Category */}
        <div className="flex items-center space-x-1 text-blue-600 mb-4">
          <Tag className="h-4 w-4" />
          <span className="text-sm font-medium">{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

        {/* Meta Information */}
        <div className="flex items-center space-x-6 text-gray-600 mb-6">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>{new Date(post.publishedAt!).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 mb-8">
          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-lg transition-all duration-200">
            <Heart className="h-4 w-4" />
            <span>Like</span>
          </button>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          {post.excerpt}
        </p>
        
        <div className="text-gray-800 leading-relaxed space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Points to Consider</h2>
          
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          
          <ul className="list-disc list-inside space-y-2 my-6">
            <li>Enhanced user experience through modern design</li>
            <li>Improved performance and loading times</li>
            <li>Better mobile responsiveness</li>
            <li>Advanced security features</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
          
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 cursor-pointer transition-colors duration-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author Info */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">{post.author.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.author}</h3>
            <p className="text-gray-600 mb-3">
              Technology writer and e-commerce expert with over 5 years of experience in the industry. 
              Passionate about helping businesses grow through innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Profile
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                More Articles
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation to other posts */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex justify-between items-center">
          <Link
            to="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Back to Blog
          </Link>
          <div className="text-sm text-gray-600">
            Published {new Date(post.publishedAt!).toLocaleDateString()}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;