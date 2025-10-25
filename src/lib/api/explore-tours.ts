export interface ExploreToursParams {
    query?: string;
    minPrice?: number;
    maxPrice?: number;
    categories?: string[];
    duration?: string;
    groupSize?: string;
    language?: string;
    page?: number;
    limit?: number;
}

export async function fetchExploreTours(params: ExploreToursParams) {
    const queryParams = new URLSearchParams();

    if (params.query) queryParams.set('query', params.query);
    if (params.minPrice) queryParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryParams.set('maxPrice', params.maxPrice.toString());
    if (params.categories?.length) queryParams.set('categories', params.categories.join(','));
    if (params.duration) queryParams.set('duration', params.duration);
    if (params.groupSize) queryParams.set('groupSize', params.groupSize);
    if (params.language) queryParams.set('language', params.language);
    if (params.page) queryParams.set('page', params.page.toString());
    if (params.limit) queryParams.set('limit', params.limit.toString());

    const response = await fetch(`/api/tours/explore?${queryParams.toString()}`);
    console.log('Fetch Explore Tours Response:', response); 
    if (!response.ok) {
        throw new Error('Failed to fetch tours');
    }

    return response.json();
}