/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import Button from '../root/button';

// Type definitions
interface Author {
    name: string;
    avatar: string;
}

interface BlogArticle {
    id: string;
    title: string;
    description: string;
    image: string;
    author: Author;
    publishDate: string;
    slug: string;
}

interface LatestArticlesProps {
    articles?: BlogArticle[];
}

// Sample data
const sampleArticles: BlogArticle[] = [
    {
        id: '1',
        title: 'Ultimate Street Food Guide: Bangkok\'s Hidden Gems',
        description: 'Discover the best street food spots in Bangkok, from local favorites to must-try delicacies that will tantalize your taste buds.',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center',
        author: {
            name: 'Sujan Chen',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        },
        publishDate: 'June 4, 2025',
        slug: 'ultimate-street-food-guide-bangkok'
    },
    {
        id: '2',
        title: 'Eco-Tourism: A Guide to Sustainable Travel',
        description: 'Learn how to minimize your environmental impact while maximizing your travel experiences through responsible tourism practices.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center',
        author: {
            name: 'Michael Torres',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        },
        publishDate: 'June 3, 2025',
        slug: 'eco-tourism-sustainable-travel-guide'
    },
    {
        id: '3',
        title: 'The Colors of Indian Weddings: A myth',
        description: 'Explore the rich traditions, symbolic rituals, and vibrant celebrations that make Indian weddings truly spectacular and amazing .',
        image: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        author: {
            name: 'Priya Sharma',
            avatar: 'https://images.unsplash.com/profile-1570056332984-d34ae348a165image?w=32&dpr=2&crop=faces'
        },
        publishDate: 'June 2, 2025',
        slug: 'colors-of-indian-weddings'
    }
];

const LatestArticles: React.FC<LatestArticlesProps> = ({ articles = sampleArticles }) => {
    const [activeTab, setActiveTab] = useState<'recent' | 'popular'>('recent');
    console.log(activeTab)
    return (
        <div className="mb-16 mx-auto ">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-3xl md:text-[42px] font-bold  mb-2">
                        Latest Articles
                    </h1>
                    <p className="description">
                        Inspiration, guides, and real stories to help you plan your next unforgettable experience.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2  rounded-lg p-1">
                    <Button
                        onClick={() => setActiveTab('recent')}
                        variant='primary'
                        className='!rounded-3xl !border-0'
                    >
                        Most Recent
                    </Button>
                    <Button
                        onClick={() => setActiveTab('popular')}
                        variant="secondary"
                        className="!border-0 box-color !text-black !rounded-3xl"
                    >
                        Popular
                    </Button>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {articles.map((article, index) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        featured={index === 0}
                    />
                ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
                <Button variant='secondary' className="!bg-white">
                    Load More Articles
                </Button>
            </div>
        </div>
    );
};

// Article Card Component
interface ArticleCardProps {
    article: BlogArticle;
    featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
    const handleContinueReading = () => {
        // Placeholder for navigation logic
        console.log(`Navigate to article: ${article.slug}`);
    };

    return (
        <article className="box-color rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Article Image */}
            <div className="aspect-w-16 aspect-h-9 ">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 sm:h-56 object-cover"
                    loading="lazy"
                />
            </div>

            {/* Article Content */}
            <div className="p-6 space-y-4">
                <h3 className="text-[20px] sm:text-[24px] font-plus-jakarta font-semibold leading-[26px] sm:leading-[31px] text-left text-global-1">
                    {article.title}
                </h3>

                <p className="text-sm font-inter description font-normal leading-[22px] text-left text-global-2 w-full">
                    {article.description}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    <span className="description">
                            {article.author.name}
                    </span>
                    </div>
                    <div className="text-xs sm:text-sm muted-color">
                        {article.publishDate}
                    </div>
                </div>

                {/* Continue Reading Button */}
                <Button
                    variant={`${featured
                        ? 'primary'
                        : 'secondary'
                        }`}
                    onClick={handleContinueReading}
                    className="w-full"
                >
                    Continue Reading
                </Button>
            </div>
        </article>
    );
};

export default LatestArticles;